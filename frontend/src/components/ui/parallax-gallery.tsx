"use client";

import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2874&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2928&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2864&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2938&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2938&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2976&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2874&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=3006&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  
  // Apply spring physics for smoother animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { height } = dimension;
  const y = useTransform(smoothProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(smoothProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full bg-black text-white relative">
      <div className="font-geist flex h-[40vh] pt-20 pb-10 items-center justify-center gap-2 border-b border-white/5 relative z-10 bg-black">
        <div className="flex flex-col items-center justify-center gap-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl">
            Our <span className="text-[#ff5800]">Gallery</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            A visual journey through our codebase, setups, and engineering culture.
          </p>
          <span className="mt-6 relative max-w-[12ch] text-xs uppercase leading-tight opacity-60 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-transparent after:content-['']">
            scroll down to see
          </span>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      
      <div className="font-geist relative flex h-[40vh] items-center justify-center gap-2 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none mt-[-20vh]">
        <div className="absolute left-1/2 bottom-[10%] grid -translate-x-1/2 content-end justify-items-center gap-6 text-center text-white">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 before:absolute before:left-1/2 before:bottom-full before:mb-2 before:h-16 before:w-px before:bg-gradient-to-t before:from-white before:to-transparent before:content-['']">
            scroll Up to see
          </span>
        </div>
      </div>
    </div>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[200px] md:min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-xl border border-white/10">
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
