// src/app/api/submission/route.ts
import { db } from "@/db";
import { submission, submissionSetting, quote, serviceMaterial, materialEditing, travel } from "@/db/schema";
import { NextResponse } from "next/server";
import { and, eq, gt, gte, lt, lte } from "drizzle-orm";
import { getDistance } from 'geolib';
import { sql } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Enhanced validation
    const requiredFields = ['service_id', 'material_id', 'editing_id', 'latitude', 'longitude'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (isNaN(Number(body.latitude)) || isNaN(Number(body.longitude))) {
      return NextResponse.json(
        { error: "Invalid latitude or longitude values" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.setting)) {
      return NextResponse.json(
        { error: "Settings must be an array" },
        { status: 400 }
      );
    }

    const result = await db.transaction(async (tx) => {
      // Create submission with proper returning()
      const [newSubmission] = await tx.insert(submission).values({
        service_id: body.service_id,
        material_id: body.material_id,
        editing_id: body.editing_id,
        quantity: body.quantity || 1,
        city: body.city,
        longitude: body.longitude,
        latitude: body.latitude,
        date: body.date,
        name: body.name,
        email: body.email,
        company: body.company,
      }).$returningId();

      const submissionId = newSubmission.id

      // Create submission settings
      if (body.setting.length > 0) {
        await tx.insert(submissionSetting).values(
          body.setting.map((settingId: number) => ({
            submissionId: submissionId,
            settingId: settingId,
          }))
        );
      }

      // Fetch pricing data with existence checks
      const [serviceMaterialResult] = await tx.select({ price: serviceMaterial.price })
        .from(serviceMaterial)
        .where(and(
          eq(serviceMaterial.service_id, body.service_id),
          eq(serviceMaterial.material_id, body.material_id)
        ));

      if (!serviceMaterialResult) {
        throw new Error("Service material combination not found");
      }

      const [materialEditingResult] = await tx.select({ price: materialEditing.price })
        .from(materialEditing)
        .where(and(
          eq(materialEditing.material_id, body.material_id),
          eq(materialEditing.editing_id, body.editing_id)
        ));

      if (!materialEditingResult) {
        throw new Error("Material editing combination not found");
      }

      const settingsPrices = await tx.select({ price: serviceMaterial.price })
        .from(serviceMaterial)
        .innerJoin(submissionSetting, eq(serviceMaterial.id, submissionSetting.settingId))
        .where(eq(submissionSetting.submissionId, submissionId));

      // Calculate distance
      const studioCoords = { latitude: 43.62505, longitude: 3.862038 };
      const submissionCoords = {
        latitude: Number(body.latitude),
        longitude: Number(body.longitude),
      };
      const distance = getDistance(studioCoords, submissionCoords);

      // Get travel price with existence check
      const [travelResult] = await tx.select({ price: travel.price })
        .from(travel)
        .where(and(lt(travel.min, distance), gt(travel.max, distance)));


      if (!travelResult) {
        throw new Error("No travel price found for calculated distance");
      }

      // Calculate quote components
      const quantity = body.quantity || 1;
      const basePrice = serviceMaterialResult.price + materialEditingResult.price + settingsPrices.reduce((sum, s) => sum + s.price, 0);
      const subtotal = basePrice * quantity + travelResult.price;
      const discountPercentage = 10;
      const discountAmount = (serviceMaterialResult.price + settingsPrices.reduce((sum, s) => sum + s.price, 0)) * quantity * (discountPercentage / 100);
      const total = subtotal - discountAmount;

      // Create quote with proper returning()
      const [newQuote] = await tx.insert(quote).values({
        submission_id: submissionId,
        public: `#${(body.name || '').slice(0,3)}${(body.company || '').slice(0,3)}${submissionId}`,
        servicePrice: serviceMaterialResult.price,
        quantity: quantity,
        discount: true,
        discountPercentage: discountPercentage,
        discountExpiration: sql`DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 1 WEEK)`,
        distance: distance,
        travelPrice: travelResult.price,
        taxPercentage: 0,
        subtotal_price: subtotal,
        discountPrice: discountAmount,
        total_price: total,
      }).$returningId();

      const quoteId = newQuote.id;

      // Update submission with quote ID
      await tx.update(submission)
        .set({ quote_id: quoteId })
        .where(eq(submission.id, submissionId));

      return { submissionId, quoteId };
    });

    return NextResponse.json({
      success: true,
      submissionId: result.submissionId,
      quoteId: result.quoteId,
    }, { status: 201 });

  } catch (error) {
    console.error("Submission creation failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}