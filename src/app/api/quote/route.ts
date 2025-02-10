import { db } from "@/db/index";
import { quote, service, submission } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()

    const formSubmission = await db
    .select()
    .from(submission)
    .where(eq(submission.id, body.id))

    // Calculate service, setting, editing, travel cost prices.
}