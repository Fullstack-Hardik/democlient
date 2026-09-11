"use client";

import React, { useEffect } from "react";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/ui/Footer";
import { Skiper28 } from "@/components/ui/perspective-text-scroll";
import { Mail, MapPin, Phone, Heart, BrainCircuit } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

const premiumFont = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function ContactPage() {
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

      {/* Hero Section */}
      <section className="relative w-full min-h-[90svh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10 bg-[#050505] bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px]">
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] opacity-80" />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center pt-24 pb-32">
          
          {/* Main Typography Layout */}
          <div className="relative w-full flex flex-col items-center justify-center gap-6 md:gap-12 mt-12">
            
            {/* Top Row: DIGITAL */}
            <div className="w-full flex justify-center md:justify-end md:pr-32 lg:pr-48 relative">
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tight text-white/90">
                DIGITAL
              </h1>
              {/* Floating Text 1 */}
              <div className="hidden md:block absolute -left-12 lg:left-0 top-0 max-w-[200px] text-right">
                <p className="text-zinc-400 text-sm leading-relaxed">
                  I am india digital product designer based in Bokaro Steel City, India.
                </p>
              </div>
            </div>

            {/* Middle Row: PR [Icon] DUCTS */}
            <div className="w-full flex justify-center items-center gap-4 md:gap-8 relative">
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tight text-white/90">
                PR
              </h1>
              <div className="relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
                <BrainCircuit className="w-full h-full text-white/90 stroke-1" />
                <span className="absolute text-2xl md:text-4xl font-light text-white/90">?</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tight text-white/90">
                DUCTS
              </h1>
              
              {/* Floating Text 2 */}
              <div className="hidden md:block absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 max-w-[240px] text-left">
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Open to all forms of design collaboration, regardless of location and language.
                </p>
              </div>
            </div>

            {/* Bottom Row: DESIGN [Icon] CODE */}
            <div className="w-full flex justify-center items-center gap-4 md:gap-8">
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tight text-white/90">
                DESIGN
              </h1>
              <div className="flex items-center justify-center">
                <Heart className="w-16 h-16 md:w-28 md:h-28 text-[#ff4b5c] fill-[#ff4b5c]" />
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tight text-white/90">
                CODE
              </h1>
            </div>

          </div>
          
          {/* Footer Bar inside Hero */}
          <div className="absolute bottom-0 left-0 right-0 w-full px-6 md:px-12 py-6 border-t border-white/10 flex flex-col md:flex-row justify-end items-center gap-4 text-sm md:text-base">
            <span className="text-zinc-300 font-medium tracking-widest uppercase text-xs md:text-sm">
              Bokaro Steel City, India 827010
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium tracking-widest uppercase text-lg md:text-xl">DESIGNER</span>
              <span className="text-[#ff5800] italic font-semibold text-xl md:text-2xl" style={{ fontFamily: 'Georgia, serif' }}>Hardik</span>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form & Details */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 bg-black">
        
        {/* Contact Details */}
        <div className="flex flex-col justify-center space-y-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Contact Information</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#ff5800]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Email</h3>
                <p className="text-zinc-400">hello@vantage.com</p>
                <p className="text-zinc-400">support@vantage.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#ff5800]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Phone</h3>
                <p className="text-zinc-400">+1 (555) 123-4567</p>
                <p className="text-zinc-400">Mon-Fri from 8am to 5pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#ff5800]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Office</h3>
                <p className="text-zinc-400">123 Innovation Drive</p>
                <p className="text-zinc-400">Tech District, SF 94103</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-zinc-900/50 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#ff5800] focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#ff5800] focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300 ml-1">Message</label>
              <textarea 
                id="message" 
                placeholder="How can we help you?" 
                rows={5}
                className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#ff5800] focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
            
            <button className="w-full mt-4 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-[#ff5800] hover:text-white transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Perspective Text Scroll Animation */}
      <div className="relative w-full overflow-hidden bg-[#050505]">
        <Skiper28 />
      </div>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
