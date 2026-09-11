"use client";
import React from "react";
import { cn } from "@/lib/utils";

import { Footer } from "@/components/ui/Footer";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { FeaturedSpotlight } from "@/components/ui/feature-spotlight";
import Navbar from "@/components/ui/Navbar";

const projects = [
  {
    title1: "Vertexiae",
    title2: "Platform",
    description: "A comprehensive event and HR management dashboard with real-time analytics and employee tracking.",
    imageSrc: "/proj_event.png",
    linkTo: "#",
    index: "01",
    label: "HR & Events"
  },
  {
    title1: "Earnetix",
    title2: "Hub",
    description: "A centralized task management and team collaboration hub with kanban boards and workflow automation.",
    imageSrc: "/proj_task.png",
    linkTo: "#",
    index: "02",
    label: "Productivity"
  },
  {
    title1: "Earnetix",
    title2: "Updates",
    description: "A modern tech blog and news portal featuring seamless reading experiences and content discovery.",
    imageSrc: "/proj_blog.png",
    linkTo: "#",
    index: "03",
    label: "Publishing"
  },
  {
    title1: "Garry",
    title2: "Digital 360",
    description: "An immersive virtual tour agency platform showcasing 3D spatial mapping and interactive property views.",
    imageSrc: "/proj_tour.png",
    linkTo: "#",
    index: "04",
    label: "Virtual Reality"
  },
  {
    title1: "Delta",
    title2: "Traders",
    description: "A sophisticated corporate portfolio and trading platform with real-time market integrations.",
    imageSrc: "/proj_business.png",
    linkTo: "#",
    index: "05",
    label: "Finance"
  },
  {
    title1: "Ratna",
    title2: "Kanchan",
    description: "A luxurious e-commerce storefront for premium jewelry with seamless checkout and product visualization.",
    imageSrc: "/proj_jewelry.png",
    linkTo: "#",
    index: "06",
    label: "E-Commerce"
  }
];

const HERO_IMAGES = projects.map(p => ({
  src: p.imageSrc,
  alt: p.title1
}));

export default function ProjectsPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-orange-500/30">
      <Navbar />

      {/* Hero Parallax section acting as the header for the page */}
      <div className="pt-24 pb-12 w-full flex justify-center bg-black overflow-hidden relative">
        <ImageStreamHero
          images={HERO_IMAGES}
          className="h-[560px] w-full max-w-7xl rounded-lg bg-black"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-center py-12 text-center pointer-events-none">
            <div className="px-6 mb-8 mt-20">
              <h1 className="text-balance text-5xl font-medium tracking-tight text-white sm:text-6xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                Our Showcase
              </h1>
            </div>
            <p className="max-w-md text-balance px-6 text-sm text-zinc-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Discover a gallery of cutting-edge applications, engaging websites, and digital experiences we've crafted.
            </p>
          </div>
        </ImageStreamHero>
      </div>

      {/* Projects List Section */}
      <main className="relative z-10 w-full bg-black py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-20">
            {projects.map((project, idx) => (
              <FeaturedSpotlight key={idx} {...project} isReversed={idx % 2 !== 0} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
