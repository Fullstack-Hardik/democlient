"use client";

import React, { useEffect } from "react";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/ui/Footer";
import { Skiper30 } from "@/components/ui/parallax-gallery";
import { Skiper47 } from "@/components/ui/carousel-gallery";
import { Skiper17 } from "@/components/ui/sticky-cards";

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
      
      {/* Header */}
      <header className="absolute top-6 left-6 right-6 lg:left-12 lg:right-12 h-12 flex items-center justify-between z-50">
        <a href="/" className="w-[25px] h-[25px] block no-underline" aria-label="Vantage home">
          <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
            <circle cx="12.5" cy="12.5" r="12.5" fill="#ededed"/>
            <path d="M12.5 4 L16 12.5 L12.5 21 L9 12.5 Z" fill="#050606"/>
            <path d="M4 12.5 L12.5 16 L21 12.5 L12.5 9 Z" fill="#737778" opacity="0.8"/>
            <circle cx="12.5" cy="12.5" r="2" fill="#fafafa"/>
          </svg>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-[16px] font-medium tracking-wide">
            <a href="/" className="text-zinc-400 hover:text-white transition-colors relative group">
              Home
            </a>
            <a href="/about" className="text-zinc-400 hover:text-white transition-colors relative group">
              About
            </a>
            <a href="/projects" className="text-zinc-400 hover:text-white transition-colors">Projects</a>
            <a href="/gallery" className="text-white relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform origin-left transition-transform duration-300"></span>
            </a>
            <a href="/contact" className="text-zinc-400 hover:text-white transition-colors relative group">
              Contact
            </a>
          </nav>
          <button className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition-colors">Sign Up</button>
        </div>
      </header>

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
