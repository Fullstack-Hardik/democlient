"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LogoLoop from "@/components/ui/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiNodedotjs, SiFigma, SiGooglecloud, SiFirebase } from "react-icons/si";
import { Outfit } from "next/font/google";

const HorizontalFeatureReveal = dynamic(() => import("@/components/ui/horizontal-feature-reveal").then(mod => mod.HorizontalFeatureReveal));
const MagicBento = dynamic(() => import("@/components/ui/MagicBento"));
const FlowArt = dynamic(() => import("@/components/ui/story-scroll"));
const FlowSection = dynamic(() => import("@/components/ui/story-scroll").then(mod => mod.FlowSection));
const Footer = dynamic(() => import("@/components/ui/Footer").then(mod => mod.Footer));
import Navbar from "@/components/ui/Navbar";

const premiumFont = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Home() {

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

  const techLogos = [
    { node: <SiReact className="text-zinc-500 hover:text-[#61DAFB] transition-colors" />, title: "React" },
    { node: <SiNextdotjs className="text-zinc-500 hover:text-white transition-colors" />, title: "Next.js" },
    { node: <SiTypescript className="text-zinc-500 hover:text-[#3178C6] transition-colors" />, title: "TypeScript" },
    { node: <SiTailwindcss className="text-zinc-500 hover:text-[#06B6D4] transition-colors" />, title: "Tailwind CSS" },
    { node: <SiPython className="text-zinc-500 hover:text-[#3776AB] transition-colors" />, title: "Python" },
    { node: <SiNodedotjs className="text-zinc-500 hover:text-[#339933] transition-colors" />, title: "Node.js" },
    { node: <SiFigma className="text-zinc-500 hover:text-[#F24E1E] transition-colors" />, title: "Figma" },
    { node: <SiGooglecloud className="text-zinc-500 hover:text-[#4285F4] transition-colors" />, title: "Google Cloud" },
    { node: <SiFirebase className="text-zinc-500 hover:text-[#FFCA28] transition-colors" />, title: "Firebase" },
  ];

  const servicesData = [
    {
        id: 1,
        title: "Website Development",
        description: "Robust, modern website development customized to meet your exact business needs and scale with your growth.",
        imageUrl: '/services/website_dev.png',
        reverse: false
    },
    {
        id: 2,
        title: "Graphic Designing",
        description: "Creative graphic designing that stands out, capturing your brand identity through stunning visual experiences.",
        imageUrl: '/services/graphic_design.png',
        reverse: true
    },
    {
        id: 3,
        title: "SEO & Marketing",
        description: "Data-driven SEO and digital marketing strategies designed to boost your reach and convert leads into loyal customers.",
        imageUrl: '/services/digital_marketing.png',
        reverse: false
    },
    {
        id: 4,
        title: "Deployment Solutions",
        description: "Seamless deployment, hosting, and continuous integration solutions ensuring maximum uptime and performance.",
        imageUrl: '/services/deployment_design.png',
        reverse: true
    },
    {
        id: 5,
        title: "UI/UX Web Designing",
        description: "Beautiful, intuitive web designing tailored specifically to optimize user experience and engagement.",
        imageUrl: '/services/web_design.png',
        reverse: false
    },
    {
        id: 6,
        title: "System Architecture",
        description: "Scalable system designing and robust cloud architecture to handle high-traffic, complex applications.",
        imageUrl: '/services/system_architecture.png',
        reverse: true
    },
    {
        id: 7,
        title: "Teaching Coding",
        description: "Expert mentorship and teaching coding to empower individuals and teams with cutting-edge programming skills.",
        imageUrl: '/services/teaching_coding.png',
        reverse: false
    }
  ];

  return (
    <main className={`w-full relative min-h-screen bg-black text-white ${premiumFont.className}`}>
      
      {/* Hero Section */}
      <section className="relative w-full h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <video 
          className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none opacity-40" 
          autoPlay 
          muted 
          loop 
          playsInline 
          disablePictureInPicture 
          aria-hidden="true"
          preload="auto"
          style={{ backgroundColor: '#050505' }}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-black/20 to-black" />

        <Navbar zIndex={20} />

        <div className="relative z-10 flex flex-col items-start w-full px-6 lg:px-24 xl:px-32">
          <h1 className="flex flex-col font-semibold tracking-tighter text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-6 drop-shadow-xl text-white">
            <span>Build Your</span>
            <span className="text-zinc-300">Digital Empire.</span>
          </h1>
          <p className="text-zinc-300 font-light text-lg md:text-xl max-w-xl mb-10 drop-shadow-lg">
            We provide end-to-end digital services to grow your brand.<br className="hidden md:block"/>
            From web design to scalable architecture, we<br className="hidden md:block"/>
            deliver solutions that drive real results.
          </p>
          <button className="h-12 px-8 rounded-lg bg-white text-black font-semibold shadow-xl flex items-center gap-4 hover:bg-zinc-200 transition-colors group">
            Get Started
            <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Marquee loop icons line in bottom of hero section */}
        <div className="absolute bottom-12 left-0 w-full z-20 transform -rotate-2 py-4">
          <LogoLoop
            logos={techLogos}
            speed={40}
            direction="left"
            logoHeight={40}
            gap={64}
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology partners"
          />
        </div>
      </section>

      {/* Services Section */}
      <HorizontalFeatureReveal />

      {/* Skills Section */}
      <MagicBento 
        textAutoHide={false}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
      />

      {/* About Me Section (Story Scroll) */}
      <FlowArt aria-label="About Me Section">
        <FlowSection aria-label="About Me" style={{ backgroundColor: '#18181b', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">01 — About Me</p>
          <hr className="my-[2vw] border-none border-t border-zinc-700" />
          <div>
            <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Create
              <br />
              Without
              <br />
              Limits
            </h1>
          </div>
          <hr className="my-[2vw] border-none border-t border-zinc-700" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-light leading-relaxed text-zinc-300">
            I am a passionate developer and architect dedicated to turning complex problems into elegant solutions. My journey in tech is driven by an insatiable curiosity and a love for building products that matter.
          </p>
        </FlowSection>

        <FlowSection aria-label="My Skills" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">02 — My Skills</p>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <div>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Full
              <br />
              Stack
              <br />
              Mastery
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-light leading-relaxed text-white/90">
            Expertise across the stack, enabling robust solutions from the pixel to the database.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Frontend</p>
              <p className="text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed text-white/80">
                React, Next.js, and beautiful UI/UX that delights users.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Backend</p>
              <p className="text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed text-white/80">
                Node.js, Express.js REST APIs, and scalable architecture.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Architecture</p>
              <p className="text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed text-white/80">
                Cloud deployments, CI/CD, and robust infrastructure.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="Good Quotes" style={{ backgroundColor: '#fff', color: '#000' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">03 — Good Quotes</p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <div>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Words
              <br />
              To
              <br />
              Live By
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-medium leading-relaxed">
            “Code is like humor. When you have to explain it, it’s bad.”
          </p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Simplicity</p>
              <p className="text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed opacity-75">
                “Simplicity is the soul of efficiency.” — Austin Freeman
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Problem First</p>
              <p className="text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed opacity-75">
                “First, solve the problem. Then, write the code.” — John Johnson
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="Working Tips" style={{ backgroundColor: '#2563eb', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">04 — Working Tips & Ideas</p>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <div>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Think.
              <br />
              Plan.
              <br />
              Execute.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-light leading-relaxed text-blue-100">
            1. Always plan your architecture before writing the first line of code. <br />
            2. Consistency compounds. Write a little bit of code every day. <br />
            3. Never stop learning. The tech landscape shifts fast, stay curious.
          </p>
        </FlowSection>

      </FlowArt>

      {/* Footer Section */}
      <Footer />

    </main>
  );
}
