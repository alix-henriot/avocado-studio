"use server";

import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormData } from "@/app/quote/page";

export default async function saveForm(formData: FormData) {
  const id = uuidv4();

  try {
    const formObject = { ...formData, id };

    const filePath = path.resolve(process.cwd(), "db/form.json");
    try {
      await fs.access(filePath);
    } catch {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    if (!Array.isArray(jsonData)) {
      throw new Error("Invalid JSON structure: expected an array.");
    }

    jsonData.push(formObject);

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

    return { redirectUrl: `/quote/${id}` }; // Return the redirect URL
  } catch (error) {
    console.error("Error saving form data:", error);
    throw new Error("Failed to save form data. Please try again.");
  }
}