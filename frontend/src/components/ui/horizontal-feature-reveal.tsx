"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface FeatureRevealProperty {
  image?: string;
  title?: string;
  paragraphs?: string[];
  no?: string | number;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop", // Web Dev
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2864&auto=format&fit=crop", // UI/UX
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2938&auto=format&fit=crop", // SEO
  "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2938&auto=format&fit=crop", // Digital Marketing
];

const FEATURES: FeatureRevealProperty[] = [
  {
    no: "01",
    title: "Web Development",
    paragraphs: ["We build beautiful, fast, and scalable web applications using modern technologies. Performance and accessibility are our core tenets."],
    image: IMAGES[0]
  },
  {
    no: "02",
    title: "UI/UX Design",
    paragraphs: ["Our designs are user-centric, aesthetically pleasing, and functionally robust. We craft experiences that resonate with your users."],
    image: IMAGES[1]
  },
  {
    no: "03",
    title: "SEO Optimization",
    paragraphs: ["We ensure your website ranks high on search engines to drive organic traffic, expanding your digital footprint effortlessly."],
    image: IMAGES[2]
  },
  {
    no: "04",
    title: "Digital Marketing",
    paragraphs: ["We help you reach your target audience and grow your brand online with data-driven and results-oriented strategies."],
    image: IMAGES[3]
  }
];

export function HorizontalFeatureReveal() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // 4 items, we need to scroll exactly 3 viewport widths to reach the end (-75% of the 400vw width)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black text-white" id="services">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-10 left-10 md:top-20 md:left-20 z-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase">Our Services</h1>
          <div className="h-1 w-20 bg-[#ff5800] mt-2" />
        </div>
        <motion.div style={{ x }} className="flex w-[400vw]">
          {FEATURES.map((feature, i) => (
            <div key={i} className="w-screen flex-shrink-0 flex items-center justify-center px-4 md:px-20">
              <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <div className="flex-1 space-y-6 md:space-y-8 z-10">
                  <span className="text-[#ff5800] text-3xl md:text-5xl font-extrabold tracking-widest opacity-80">{feature.no}</span>
                  <h2 className="text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-none">
                    {feature.title}
                  </h2>
                  {feature.paragraphs?.map((p, j) => (
                    <p key={j} className="text-zinc-400 text-lg md:text-2xl max-w-xl leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="w-full md:w-[400px] flex-shrink-0 relative h-[60vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8),_15px_15px_0px_rgba(255,88,0,1)] border-2 border-white/20 bg-zinc-900">
                  <div className="absolute inset-0 bg-[#ff5800]/20 mix-blend-overlay z-10 pointer-events-none" />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,1)] z-10 pointer-events-none" />
                  <Image
                    src={feature.image!}
                    alt={feature.title!}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
