"use client";
//import { promises as fs } from "fs";
//import path from "path";
import { notFound } from "next/navigation";
import { FormValues } from "../page";
//import { quoteGenerator } from "@/components/server/quoteGenerator";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import {
  Button,
  Divider,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Nav from "@/components/ui/Nav";

export default function QuotePage({
  params,
}: {
  params: { id: string };
}) {
  //const id = (await params).id;

  /* const dbPath = path.join(process.cwd(), "db", "form.json");
  const dbContent = await fs.readFile(dbPath, "utf-8");
  const db: FormData[] = JSON.parse(dbContent);

  const request = db.find((entry) => entry.id === id);

  if (!request) {
    notFound();
  } */

  return (

    <main className="h-screen">
      <Nav/>
      <div className="container grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-3 p-6 lg:p-10 mx-auto my-16 max-w-screen md:max-w-3xl">
        <div className="">
          <h1 className="text-2xl font-semibold">
            Quote #45688
          </h1>
          <span className="text-sm">Montpellier, January 26th 2025</span>
        </div>
        
        {/* <div className="w-full text-sm rounded-lg">
          <h3>
            Stark Industries
          </h3>
          <p>
            163 Boulevard Street, 123 Las Vegas
          </p>
          <p>
            contact@starkindustries.com
          </p>
        </div> */}

        <div className="flex justify-end items-center gap-3">
          <Button variant='light' color="success" radius="full">Save as PDF</Button>
          <Button color="success" radius="full">Approve quote</Button>
        </div>

        <Table aria-label="Price Quote" className="sm:col-span-2">
          <TableHeader>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>UNIT PRICE</TableColumn>
            <TableColumn>UNIT</TableColumn>
            <TableColumn align="end">QUANTITY</TableColumn>
            <TableColumn align="end">AMOUNT EXCL. VAT</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Fashion Shooting</TableCell>
              <TableCell>300.00 €</TableCell>
              <TableCell>Set</TableCell>
              <TableCell>1</TableCell>
              <TableCell>300.00 €</TableCell>
            </TableRow>
            <TableRow key="2">
            <TableCell>Photo Editing </TableCell>
              <TableCell>0.00 €</TableCell>
              <TableCell>#</TableCell>
              <TableCell>1</TableCell>
              <TableCell>00.00 €</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Extra Hours</TableCell>
              <TableCell>80.00 €</TableCell>
              <TableCell>Hour</TableCell>
              <TableCell>2</TableCell>
              <TableCell>160.00 €</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Travel Fees</TableCell>
              <TableCell>50.00 €</TableCell>
              <TableCell>Set</TableCell>
              <TableCell>1</TableCell>
              <TableCell>50.00 €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-sm p-6">
            Offer and discount valid until February 2, 2025.
            50% deposit paid on acceptance of quotation.
        </p>

        <Table hideHeader aria-label="Tital amount" isStriped className="col-span-1">
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn align="end">AMOUNT</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
                <TableCell>SUB TOTAL</TableCell>
                <TableCell>410.00 €</TableCell>
            </TableRow>
            <TableRow key="2">
                <TableCell>DISCOUNT</TableCell>
                <TableCell>- 30.00 €</TableCell>
            </TableRow>
            <TableRow key="3">
                <TableCell className="font-bold text-md">TOTAL</TableCell>
                <TableCell className="font-bold text-md">380.00 €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <span/>
      </div>
    </main>
  );
}
