"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";

export function FeaturesSectionWithBentoGrid() {
  const features = [
    {
      title: "Pixel-Perfect UI/UX",
      description:
        "Crafting beautiful, responsive interfaces with modern tools like React, Tailwind, and Framer Motion.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 md:col-span-4 lg:col-span-4 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Full-Stack Architecture",
      description:
        "Building robust backend systems and seamless integrations.",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b dark:border-neutral-800",
    },
    {
      title: "Performance Optimized",
      description:
        "Ensuring blazing fast load times and smooth animations.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Global Deployment",
      description:
        "Deploying scalable applications that are accessible worldwide.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Advanced Development Capabilities
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From stunning frontend interfaces to scalable backend architectures, I build comprehensive solutions tailored to your needs.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 mt-12 xl:border rounded-md border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 0.98, rotateX: 2, rotateY: 2, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(`p-6 sm:p-10 relative overflow-hidden transition-all duration-300 backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-orange-500/20 rounded-3xl perspective-1000`, className)}
    >
      {children}
    </motion.div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-400 text-center font-normal",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full min-h-[16rem]">
      <div className="w-full p-5 mx-auto bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl group h-full border border-white/10">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <Image
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-xl opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-[#050505] to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-[#050505] to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Link
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10 h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-orange-500 m-auto" />
          <Image
            src="https://images.unsplash.com/photo-1531297172864-822d1fea59d7?w=800&q=80"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-xl blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: (idx % 2 === 0 ? 5 : -5) + idx,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-neutral-800 border-neutral-700 border flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="tech images"
              width="500"
              height="500"
              className="rounded-lg h-16 w-16 md:h-28 md:w-28 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: (idx % 2 === 0 ? -5 : 5) - idx,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-neutral-800 border-neutral-700 border flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="tech images"
              width="500"
              height="500"
              className="rounded-lg h-16 w-16 md:h-28 md:w-28 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-[#050505] to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-[#050505] to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10 overflow-hidden">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.5, 0],
      glowColor: [1, 0.5, 0],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += 0.01;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
