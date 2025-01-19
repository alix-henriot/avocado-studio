"use server"
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { FormData } from "../page";
import { quoteGenerator } from "@/components/server/quoteGenerator";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import { Button, Divider, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";


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
    <div className="container grid grid-flow-row gap-5 p-6 lg:p-10 mx-auto my-16 items-center max-w-screen md:max-w-xl bg-default rounded-2xl lg:rounded-3xl overflow-clip">
      <h1 className="text-2xl font-semibold mb-4">Quote Details for {request.name}</h1>
      <div className="grid gap-4">
        {Object.entries(quote).map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 items-center">
            <strong className="text-left">{quoteLabels[key as keyof typeof quoteLabels]}:</strong>
            <p className="text-right">€{value}</p>
          </div>
        ))}
      </div>
      <Button color="success">Approve quote</Button>
      <Button variant="ghost" color="success">Send by email</Button>
    </div>
  </main>  
  );
}
