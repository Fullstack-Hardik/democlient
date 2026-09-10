"use client";
import React from "react";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { FeaturedSpotlight } from "@/components/ui/feature-spotlight";
import { Footer } from "@/components/ui/Footer";

const projects = [
  {
    title1: "Vertexiae",
    title2: "Event & HR Platform",
    description: "Company website for Vertex Innovations for event management and admin post hirings. Beautifully designed using Vite, Next.js, Tailwind, MongoDB, and Express.",
    imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1200&fit=crop&q=80",
    linkTo: "https://vertexiae.com",
    index: "01",
    label: "Event Management"
  },
  {
    title1: "EarnetixHub",
    title2: "Task Management",
    description: "Platform for assigning tasks, where users can complete and share them. Built with React, Tailwind, MongoDB, Express, Cloudinary, and Brevo for OTP.",
    imageSrc: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=1200&fit=crop&q=80",
    linkTo: "https://earnetixhub.com",
    index: "02",
    label: "Task Platform"
  },
  {
    title1: "Earnetix",
    title2: "Updates & Blogs",
    description: "The main portal for Earnetix updates, comprehensive blogs, and company details.",
    imageSrc: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=1200&fit=crop&q=80",
    linkTo: "https://earnetix.com",
    index: "03",
    label: "Blog / Info"
  },
  {
    title1: "GarryDigital360",
    title2: "Virtual Tours",
    description: "Rich, SEO-friendly single-page agency website showcasing 360 virtual tours and web development services using 3D iframes.",
    imageSrc: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=1200&fit=crop&q=80",
    linkTo: "https://garrydigital360.in",
    index: "04",
    label: "Virtual Tours / Agency"
  },
  {
    title1: "Delta Traders",
    title2: "Business Portfolio",
    description: "High-ranking, SEO-optimized business website for a PVC pipes and carpentry shop, designed to boost local sales.",
    imageSrc: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=1200&fit=crop&q=80",
    linkTo: "https://deltatraders.co.in",
    index: "05",
    label: "E-Commerce / Business"
  },
  {
    title1: "Ratna Kanchan",
    title2: "Jewelry E-Commerce",
    description: "Premium e-commerce platform for jewelry, crafted with a high-end UI to showcase stunning pieces and facilitate secure shopping.",
    imageSrc: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1200&fit=crop&q=80",
    linkTo: "https://ratnakanchan.vercel.app",
    index: "06",
    label: "E-Commerce"
  }
];

export default function ProjectsPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-orange-500/30">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <a href="/" className="text-xl font-bold tracking-tighter text-white z-50 relative group">
          <span className="relative z-10 text-white font-black mix-blend-difference">HK</span>
        </a>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/about" className="text-zinc-400 hover:text-white transition-colors relative group">About</a>
          <a href="/projects" className="text-white relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform origin-left transition-transform duration-300"></span>
          </a>
          <a href="/gallery" className="text-zinc-400 hover:text-white transition-colors relative group">Gallery</a>
          <a href="/#services" className="text-zinc-400 hover:text-white transition-colors relative group">Services</a>
          <a href="/contact" className="text-zinc-400 hover:text-white transition-colors relative group">Contact</a>
        </nav>
        <a href="/contact" className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors">
          Get in touch
        </a>
      </header>

      {/* Hero Parallax section acting as the header for the page */}
      <ParallaxComponent />

      {/* Projects List Section */}
      <main className="relative z-10 w-full bg-black py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-20">
            {projects.map((project, idx) => (
              <FeaturedSpotlight key={idx} {...project} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
