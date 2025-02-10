"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
} from "@nextui-org/react";
import Nav from "@/components/ui/Nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type QuoteResult = {
  basePrice: number;
  unitType: string;
  baseTotal: number;
  editingPrice: number;
  hourlyRate: number;
  extraHours: number;
  travelFee: number;
  subTotal: number;
  discount: number;
  total: number;
  validUntilDate: string;
  description: string;
};

type FormSubmission = {
  id: number;
  material: Array<'photos' | 'videos'>;
  service: 'fashion' | 'event' | 'food' | 'product' | 'wedding';
  editing: boolean;
  unit: number;
  name: string;
  company: string;
  email: string;
  city: string;
  setting: Array<'indoor' | 'outdoor' | 'studio'>;
  date: string;
  coordinates: [number, number];
};

export default function QuotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch submission data
        const submissionRes = await fetch(`/api/submissions/${params.id}`);
        if (!submissionRes.ok) throw new Error('Submission not found');
        const submissionData: FormSubmission = await submissionRes.json();

        // 2. Get travel cost
        const travelRes = await fetch('/api/pricing/travel-cost', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coordinates: submissionData.coordinates })
        });
        if (!travelRes.ok) throw new Error('Failed to calculate travel cost');
        const { cost: travelFee } = await travelRes.json();

        // 3. Get base quote
        const quoteRes = await fetch('/api/pricing/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
        });
        if (!quoteRes.ok) throw new Error('Failed to calculate quote');
        const { quote: quoteData } = await quoteRes.json();

        // 4. Combine results
        const fullQuote = {
          ...quoteData,
          travelFee,
          total: quoteData.total + travelFee
        };

        setSubmission(submissionData);
        setQuote(fullQuote);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quote');
        router.push('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner label="Loading quote..." color="primary" />
      </div>
    );
  }

  if (error || !submission || !quote) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  const formattedDate = new Date(submission.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="h-screen">
      <Nav />
      <div className="container grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-3 p-6 lg:p-10 mx-auto my-16 max-w-screen md:max-w-3xl">
        {/* Header Section */}
        <div className="">
          <h1 className="text-2xl font-semibold">
            Quote #{params.id.padStart(5, "0")}
          </h1>
          <span className="text-sm">
            {submission.city}, {formattedDate}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3">
          <Button variant="light" color="success" radius="full">
            Save as PDF
          </Button>
          <Button color="success" radius="full">
            Approve quote
          </Button>
        </div>

        {/* Main Price Table */}
        <Table aria-label="Price Quote" className="sm:col-span-2">
          <TableHeader>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>UNIT PRICE</TableColumn>
            <TableColumn>UNIT</TableColumn>
            <TableColumn align="end">QUANTITY</TableColumn>
            <TableColumn align="end">AMOUNT EXCL. VAT</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={loading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {[
              {
                key: 'shooting',
                description: quote.description,
                unitPrice: quote.basePrice,
                unit: quote.unitType,
                quantity: submission.unit,
                amount: quote.baseTotal
              },
              ...(quote.editingPrice > 0 ? [{
                key: 'editing',
                description: 'Photo Editing',
                unitPrice: quote.editingPrice,
                unit: 'service',
                quantity: 1,
                amount: quote.editingPrice
              }] : []),
              ...(quote.extraHours > 0 ? [{
                key: 'extra-hours',
                description: 'Extra Hours',
                unitPrice: quote.hourlyRate,
                unit: 'hour',
                quantity: quote.extraHours,
                amount: quote.hourlyRate * quote.extraHours
              }] : []),
              ...(quote.travelFee > 0 ? [{
                key: 'travel',
                description: 'Travel Fees',
                unitPrice: quote.travelFee,
                unit: 'trip',
                quantity: 1,
                amount: quote.travelFee
              }] : [])
            ].map((item) => (
              <TableRow key={item.key}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.unitPrice.toFixed(2)} €</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.amount.toFixed(2)} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Section */}
        <Table hideHeader aria-label="Total amount" isStriped className="col-span-1">
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn align="end">AMOUNT</TableColumn>
          </TableHeader>
          <TableBody>
            {[
              { key: 'subtotal', label: 'SUB TOTAL', value: quote.subTotal },
              ...(quote.discount > 0 ? [{
                key: 'discount', 
                label: 'DISCOUNT', 
                value: -quote.discount
              }] : []),
              { key: 'total', label: 'TOTAL', value: quote.total }
            ].map((item) => (
              <TableRow key={item.key}>
                <TableCell className={item.key === 'total' ? 'font-bold text-md' : ''}>
                  {item.label}
                </TableCell>
                <TableCell className={item.key === 'total' ? 'font-bold text-md' : ''}>
                  {item.value.toFixed(2)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer Note */}
        <p className="text-sm p-6">
          Offer and discount valid until {new Date(quote.validUntilDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}.<br />
          50% deposit paid on acceptance of quotation.
        </p>
      </div>
    </main>
  );
}