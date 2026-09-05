"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import React from 'react';

export default function FUIBentoGridDark() {
  return (
    <div className="pt-32 container mx-auto min-w-screen flex flex-col p-10 bg-black">
      <h1 className="font-geistMono tracking-tight text-4xl md:text-5xl font-bold text-white">
        Services & Features
      </h1>
      <p className="max-w-3xl text-xl/8 font-medium tracking-tight mt-2 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
        Everything you need to build the next generation of web applications.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Development"
          title="Custom Web Apps"
          description="We build fully custom, highly interactive web applications using React, Next.js, and modern tech."
          graphic={
            <div className="absolute inset-0 bg-[url('/assets/mars1.png')] bg-cover bg-center opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700 ease-out" />
          }
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          dark={true}
        />
        <BentoCard
          eyebrow="Design"
          title="Stunning Interfaces"
          description="Our designs focus on micro-interactions, smooth animations, and premium aesthetics."
          graphic={
            <div className="absolute inset-0 bg-[url('/assets/mars2.png')] bg-cover bg-center opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700 ease-out" />
          }
          className="lg:col-span-3 lg:rounded-tr-4xl"
          dark={true}
        />
        <BentoCard
          eyebrow="Performance"
          title="Lightning Fast"
          description="Optimized for speed and SEO from the ground up."
          graphic={
            <div className="absolute inset-0 bg-[url('/assets/mars3.png')] bg-cover bg-center opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700 ease-out" />
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
          dark={true}
        />
        <BentoCard
          eyebrow="AI Integration"
          title="Smart Features"
          description="Integrate cutting-edge AI models directly into your workflows."
          graphic={
            <div className="absolute inset-0 bg-[url('/assets/mars4.png')] bg-cover bg-center opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700 ease-out" />
          }
          className="lg:col-span-2"
          dark={true}
        />
        <BentoCard
          eyebrow="Global"
          title="Scale Anywhere"
          description="Deploy globally with edge functions and distributed databases."
          graphic={
            <div className="absolute inset-0 bg-[url('/assets/mars5.png')] bg-cover bg-center opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700 ease-out" />
          }
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
          dark={true}
        />
      </div>
    </div>
  );
}

export function BentoCard({
  dark = true,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl ",
        "bg-black dark:bg-transparent transform-gpu border border-white/10 shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.05)_inset]",
        "data-[dark]:bg-zinc-950"
      )}
    >
      <div className="relative h-[29rem] shrink-0 bg-black overflow-hidden">
        {graphic}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      <div className="relative p-10 z-20 isolate mt-[-150px] h-[14rem] text-white">
        <h1 className="text-white/50 text-sm font-semibold uppercase tracking-wider">{eyebrow}</h1>
        <p className="mt-1 text-2xl/8 font-bold tracking-tight text-white group-data-[dark]:text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-300 group-data-[dark]:text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
