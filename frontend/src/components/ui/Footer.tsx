import React from "react";
import { Skiper39 } from "@/components/ui/crowd-canvas";
import { Phone, Mail } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Background crowd animation */}
      <div className="absolute bottom-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Skiper39 />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight uppercase tracking-tight text-center text-white mb-6">
          Let's Build Something<br/><span className="text-zinc-500">Extraordinary.</span>
        </h2>
        
        <button className="h-14 px-10 rounded-full bg-white text-black font-semibold shadow-2xl flex items-center gap-4 hover:scale-105 hover:bg-zinc-100 transition-all group mb-24">
          Start a Project
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10 bg-[#050505]/80 backdrop-blur-sm p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 25 25" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.5" cy="12.5" r="12.5" fill="#ededed"/>
              <path d="M12.5 4 L16 12.5 L12.5 21 L9 12.5 Z" fill="#050606"/>
              <path d="M4 12.5 L12.5 16 L21 12.5 L12.5 9 Z" fill="#737778" opacity="0.8"/>
              <circle cx="12.5" cy="12.5" r="2" fill="#fafafa"/>
            </svg>
            <span className="font-semibold text-lg tracking-wide text-white">Vantage</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            {/* Page Links */}
            <div className="flex gap-6 text-sm font-medium text-zinc-400">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
              <a href="/gallery" className="hover:text-white transition-colors">Gallery</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 text-zinc-400">
              <a href="#" className="hover:text-[#ff5800] transition-colors" aria-label="Twitter"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#ff5800] transition-colors" aria-label="LinkedIn"><FaLinkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#ff5800] transition-colors" aria-label="Instagram"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#ff5800] transition-colors" aria-label="GitHub"><FaGithub className="w-5 h-5" /></a>
              <a href="mailto:hello@vantage.com" className="hover:text-[#ff5800] transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
              <a href="tel:+15551234567" className="hover:text-[#ff5800] transition-colors" aria-label="Phone"><Phone className="w-5 h-5" /></a>
            </div>
          </div>

          <p className="text-zinc-600 text-sm mt-4 md:mt-0 text-center md:text-right">
            © {new Date().getFullYear()} Digital Empire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
