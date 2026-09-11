"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ zIndex = 50 }: { zIndex?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQs", href: "/faqs" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header 
        className="absolute top-6 left-6 right-6 lg:left-12 lg:right-12 h-12 flex items-center justify-between"
        style={{ zIndex }}
      >
        <Link href="/" className="flex items-center justify-center w-32 block no-underline z-50 bg-white px-4 py-2 rounded-xl transition-all hover:bg-zinc-200" aria-label="HRDK home">
          <img src="/logo.svg" alt="HRDK Logo" className="h-8 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-[16px] font-medium tracking-wide">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative group transition-colors ${pathname === link.href ? "text-white" : "text-zinc-400 hover:text-white"}`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform origin-left transition-transform duration-300"></span>
                )}
              </Link>
            ))}
          </nav>
          <button className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition-colors">Sign Up</button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 gap-1.5 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ zIndex: 9998 }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-black/80 backdrop-blur-md border-l border-white/10 transform transition-transform duration-300 ease-out md:hidden flex flex-col px-8 py-24 gap-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 9999 }}
      >
        <nav className="flex flex-col gap-6 text-xl font-medium tracking-wide">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`transition-colors relative group ${pathname === link.href ? "text-white" : "text-zinc-400 hover:text-zinc-300"}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white transform origin-left transition-transform duration-300"></span>
              )}
            </Link>
          ))}
        </nav>
        <button className="mt-auto px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition-colors w-full">
          Sign Up
        </button>
      </div>
    </>
  );
}
