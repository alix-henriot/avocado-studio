import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avocado Studio Pro",
  description: "Chinese Photography Service in South France.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  //params: Promise<{ locale: string }>
}>) {


  return (
    <html>
      <body
        className={`${robotoFlex.variable} antialiased debug-screens`}
        >
          <NextUIProvider>
            <NextThemesProvider attribute="class">
            {children}
            </NextThemesProvider>
          </NextUIProvider>
      </body>
    </html>
  );
}
