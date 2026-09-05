import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Journey Beyond Earth | Mars 2026",
  description: "Experience the first commercial flight to Mars in 2026. Join us on an unprecedented journey beyond Earth.",
  keywords: ["space exploration", "Mars", "commercial spaceflight", "Mars 2026", "space travel"],
  openGraph: {
    title: "Journey Beyond Earth | Mars 2026",
    description: "Experience the first commercial flight to Mars in 2026.",
    url: "https://demo-site.com",
    siteName: "Mars 2026 Journey",
    images: [
      {
        url: "https://demo-site.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Journey Beyond Earth to Mars",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey Beyond Earth | Mars 2026",
    description: "Experience the first commercial flight to Mars in 2026.",
    images: ["https://demo-site.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://demo-site.com",
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
