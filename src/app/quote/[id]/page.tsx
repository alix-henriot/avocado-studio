// src/app/quote/[id]/page.tsx
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
  Input,
} from "@nextui-org/react";
import Nav from "@/components/ui/Nav";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';



type QuoteResponse = {
  id: number;
  publicId: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    company: string;
    location: {
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
  details: {
    service: string;
    material: string;
    editing: string;
    settings: string[];
    quantity: number;
  };
  pricing: {
    basePrice: number;
    travelPrice: number;
    subtotal: number;
    discount: {
      applied: boolean;
      percentage: number;
      amount: number;
    };
    taxPercentage: number;
    total: number;
  };
  travel: {
    distance: number;
    price: number;
  };
  expiration: string;
};

export default function QuotePage() {
  const { id } = useParams(); // Retrieve the dynamic route parameter
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Ensure id exists

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/quote/${id}`);
        if (!response.ok) throw new Error("Quote not found");
        const data = await response.json();
        setQuoteData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quote");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner label="Loading quote..." color="primary" />
      </div>
    );
  }

  if (error || !quoteData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  const formattedDate = new Date(quoteData.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const expirationDate = new Date(quoteData.expiration).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="h-screen">
      <Nav />
      <div className="container grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-3 p-6 lg:p-10 mx-auto my-16 max-w-screen md:max-w-3xl">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-semibold">{quoteData.publicId}</h1>
          <span className="text-sm">
            {quoteData.customer.location.city}, {formattedDate}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3">
          {/* <Button variant="light" color="success" radius="full"
          >
            Save as PDF
          </Button> */}
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
          <TableBody>
            {[
              {
                key: "base",
                description: `${quoteData.details.service} (${quoteData.details.material})`,
                unitPrice: quoteData.pricing.basePrice,
                unit: "session",
                quantity: quoteData.details.quantity,
                amount: quoteData.pricing.basePrice * quoteData.details.quantity,
              },
              ...quoteData.details.settings.map((setting, index) => ({
                key: `setting-${index}`,
                description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} Setting`,
                unitPrice: 50, // Assuming fixed setting price
                unit: "setting",
                quantity: 1,
                amount: 50,
              })),
              {
                key: "editing",
                description: quoteData.details.editing,
                unitPrice: quoteData.details.editing.includes("With") ? 200 : 0,
                unit: "service",
                quantity: 1,
                amount: quoteData.details.editing.includes("With") ? 200 : 0,
              },
              {
                key: "travel",
                description: "Travel Fees",
                unitPrice: quoteData.pricing.travelPrice,
                unit: "trip",
                quantity: 1,
                amount: quoteData.pricing.travelPrice,
              },
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
              { key: "subtotal", label: "SUB TOTAL", value: quoteData.pricing.subtotal },
              ...(quoteData.pricing.discount.applied
                ? [
                  {
                    key: "discount",
                    label: `DISCOUNT (${quoteData.pricing.discount.percentage}%)`,
                    value: -quoteData.pricing.discount.amount,
                  },
                ]
                : []),
              { key: "total", label: "TOTAL", value: quoteData.pricing.total },
            ].map((item) => (
              <TableRow key={item.key}>
                <TableCell className={item.key === "total" ? "font-bold text-md" : ""}>
                  {item.label}
                </TableCell>
                <TableCell className={item.key === "total" ? "font-bold text-md" : ""}>
                  {item.value.toFixed(2)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer Note */}
        <p className="text-sm p-6">
          Offer and discount valid until {expirationDate}.<br />
          50% deposit paid on acceptance of quotation.
        </p>
      </div>
    </main>
  );
}
