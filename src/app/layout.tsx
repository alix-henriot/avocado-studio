import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avocado Studio Pro",
  description: "Chinese Photography Service in South France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} antialiased debug-screens`}
      >
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
