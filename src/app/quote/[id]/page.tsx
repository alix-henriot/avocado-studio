"use server"
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { FormData } from "../page";
import { quoteGenerator } from "@/components/server/quoteGenerator";


export default async function QuotePage({ params }: { params: { id: string } }) {
  const id = (await params).id

  const dbPath = path.join(process.cwd(), "db", "form.json");
  const dbContent = await fs.readFile(dbPath, "utf-8");
  const db: FormData[] = JSON.parse(dbContent);

  const request = db.find((entry) => entry.id === id);

  if (!request) {
    notFound();
  }

  const quote = await quoteGenerator(request)

  const quoteLabels = {
    basePrice: 'Base Price',
    settingCost: 'Setting Cost',
    optionsCost: 'Options Cost',
    travelCost: 'Travel Cost',
    totalAmount: 'Total Amount',
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto p-8 rounded-3xl bg-default-200">
        <h1 className="text-2xl font-semibold mb-4">Quote Details</h1>
        <div className="space-y-4">
        {Object.entries(quote).map(([key, value]) => (
          <div key={key}>
            <strong>{quoteLabels[key as keyof typeof quoteLabels]}:</strong> €{value}
          </div>
        ))}
        </div>
      </div>
    </main>
  );
}
