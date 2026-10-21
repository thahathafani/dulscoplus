import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — Integrated Solutions for Qatar`,
  description: brand.description,
  keywords: [
    "Dulsco Plus",
    "Qatar workforce solutions",
    "environmental solutions Qatar",
    "hazardous waste Qatar",
    "industrial supply Qatar",
    "people solutions Qatar",
  ],
  openGraph: {
    title: `${brand.name} — Integrated Solutions for Qatar`,
    description: brand.description,
    type: "website",
    locale: "en_QA",
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — Integrated Solutions for Qatar`,
    description: brand.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
