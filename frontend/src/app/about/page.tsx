"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { Coffee } from "lucide-react";
import GenerativeMountainScene from "@/components/ui/mountain-scene";
import AboutUsSection from "@/components/about/AboutUsSection";
import ColorBends from "@/components/ui/ColorBends";
import { ConnoisseurStackInteractor } from "@/components/ui/connoisseur-stack-interactor";
import { Footer } from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const premiumFont = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function AboutPage() {

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

      {/* Mountain Scene Hero */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <GenerativeMountainScene />
        </Suspense>
        
        <div className="relative z-10 text-center max-w-4xl px-4 pointer-events-none mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 animate-in slide-in-from-bottom duration-1000 slide-in-from-bottom-8 tracking-tighter">
            Visionary <span className="text-orange-400">Builder</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-200/80 animate-in slide-in-from-bottom duration-1000 delay-300 slide-in-from-bottom-8 fill-mode-both font-medium">
            I'm Hardik Yadav. I build digital excellence.
          </p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* About Us Section with ColorBends background */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ColorBends
            colors={["#a855f7", "#8a5cff", "#06b6d4"]}
            rotation={90}
            speed={0.2}
            scale={1}
            frequency={1.5}
            warpStrength={2}
            mouseInfluence={1}
            noise={0.1}
            parallax={0.5}
            iterations={2}
            intensity={1.2}
            bandWidth={6}
            transparent={false}
          />
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
        </div>
        <div className="relative z-10">
          <AboutUsSection />
        </div>
      </section>

      {/* Interactive Stack Section */}
      <div className="bg-black border-t border-white/5 py-24">
        <ConnoisseurStackInteractor />
      </div>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
