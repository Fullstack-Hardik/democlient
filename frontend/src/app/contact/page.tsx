"use client";

import React, { useEffect } from "react";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/ui/Footer";
import { Skiper28 } from "@/components/ui/perspective-text-scroll";
import { Mail, MapPin, Phone } from "lucide-react";

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
            <a href="/gallery" className="text-zinc-400 hover:text-white transition-colors relative group">
              Gallery
            </a>
            <a href="/#services" className="text-zinc-400 hover:text-white transition-colors relative group">
              Services
            </a>
            <a href="/contact" className="text-white relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform origin-left transition-transform duration-300"></span>
            </a>
          </nav>
          <button className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition-colors">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[40svh] min-h-[300px] flex flex-col items-center justify-center overflow-hidden border-b border-white/10 pt-20">
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="relative z-10 flex flex-col items-center w-full px-6 lg:px-24 xl:px-32 text-center">
          <h1 className="flex flex-col font-semibold tracking-tighter text-5xl md:text-6xl lg:text-[4rem] leading-[1.1] mb-4 drop-shadow-xl text-white">
            <span>Get in Touch.</span>
          </h1>
          <p className="text-zinc-400 font-light text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
            We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
          </p>
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
