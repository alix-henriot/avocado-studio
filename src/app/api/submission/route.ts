// src/app/api/submission/route.ts
import { db } from "@/db/index";
import { submission } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.service_id || !body.material_id || !body.editing_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Type-safe insert with Drizzle
    const newSubmission = await db.insert(submission).values({
      service_id: body.service_id,
      material_id: body.material_id,
      editing_id: body.editing_id,
      quantity: body.quantity,
      city: body.city,
      longitude: body.longitude,
      latitude: body.latitude,
      date: body.date,
      name: body.name,
      email: body.email,
      company: body.company,
      quote_id: body.quote_id,
    }).$returningId();

    return NextResponse.json({
      success: true,
      submission: newSubmission,
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
