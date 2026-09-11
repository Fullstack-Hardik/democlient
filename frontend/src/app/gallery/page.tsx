"use client";

import React, { useEffect } from "react";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/ui/Footer";
import { Skiper30 } from "@/components/ui/parallax-gallery";
import { Skiper47 } from "@/components/ui/carousel-gallery";
import { Skiper17 } from "@/components/ui/sticky-cards";
import Navbar from "@/components/ui/Navbar";

const premiumFont = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function GalleryPage() {
  useEffect(() => {
    // Setup animation fallback
    const fallbackTimeout = setTimeout(() => {
      document.documentElement.classList.remove('motion-pending');
      document.documentElement.classList.add('motion-animating');
    }, 3500);

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('motion-pending');
      document.documentElement.classList.add('motion-animating');
    });

    return () => clearTimeout(fallbackTimeout);
  }, []);

  return (
    <main className={`w-full relative min-h-screen bg-black text-white ${premiumFont.className}`}>
      
      <Navbar zIndex={50} />

      {/* Parallax Gallery */}
      <Skiper30 />

      {/* Carousel Gallery */}
      <Skiper47 />

      {/* Sticky Cards Gallery */}
      <Skiper17 />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
