// src/app/api/quote/[id]/route.ts
import { db } from "@/db";
import { quote, submission } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // note that params is a Promise now
) {
  try {
    // Await the params promise to access the id
    const { id } = await context.params;
    const quoteId = Number(id);

    const quoteData = await db.query.quote.findFirst({
      where: eq(quote.id, quoteId),
      with: {
        submission: {
          with: {
            service: true,
            material: true,
            editing: true,
            setting: {
              with: {
                setting: true,
              },
            },
          },
        },
      },      
    });

    if (!quoteData || !quoteData.submission) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const responseData = {
      id: quoteData.id,
      publicId: quoteData.public,
      createdAt: quoteData.createdAt,
      customer: {
        name: quoteData.submission.name,
        email: quoteData.submission.email,
        company: quoteData.submission.company,
        location: {
          city: quoteData.submission.city,
          coordinates: {
            lat: quoteData.submission.latitude,
            lng: quoteData.submission.longitude,
          },
        },
      },
      details: {
        service: quoteData.submission.service?.value || "Unknown",
        material: quoteData.submission.material?.value || "Unknown",
        editing: quoteData.submission.editing?.value ? "With Editing" : "Without Editing",
        settings: quoteData.submission.setting.map((s) => s.setting?.value).filter(Boolean),
        quantity: quoteData.quantity,
      },
      pricing: {
        basePrice: quoteData.servicePrice,
        travelPrice: quoteData.travelPrice,
        subtotal: quoteData.subtotal_price,
        discount: {
          applied: quoteData.discount,
          percentage: quoteData.discountPercentage,
          amount: quoteData.discountPrice,
        },
        taxPercentage: quoteData.taxPercentage,
        total: quoteData.total_price,
      },
      travel: {
        distance: quoteData.distance,
        price: quoteData.travelPrice,
      },
      expiration: quoteData.discountExpiration,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
