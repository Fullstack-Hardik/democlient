"use client"

import { useState, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export interface FeatureSpotlightProps {
  title1: string;
  title2: string;
  description: string;
  index: string;
  linkTo: string;
  imageSrc: string;
  label?: string;
  isReversed?: boolean;
}

export function FeaturedSpotlight({
  title1,
  title2,
  description,
  index,
  linkTo,
  imageSrc,
  label = "Featured",
  isReversed = false
}: FeatureSpotlightProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 3D Parallax Scroll Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth springs for buttery performance
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // 3D Transforms based on scroll
  const yImage = useTransform(springProgress, [0, 1], [60, -60])
  const yText = useTransform(springProgress, [0, 1], [30, -30])
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [15, 0, -15])
  const opacity = useTransform(springProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.8, 1, 0.9])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center gap-12 md:items-start md:gap-16 lg:gap-24 mb-32 md:mb-48",
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Text Block */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-10 flex w-full max-w-[360px] shrink-0 flex-col items-center text-center md:w-[320px] md:items-start md:text-left lg:w-[400px] lg:pt-8"
      >
        {/* Label with animated line */}
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-foreground transition-all duration-700"
            style={{
              width: isHovered ? 64 : 40,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground transition-all duration-700 md:text-xs"
            style={{
              letterSpacing: isHovered ? "0.35em" : "0.25em",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {label}
          </span>
        </div>

        {/* Title - responsive text sizes */}
        <h2 className="relative">
          <span
            className="block text-5xl font-normal tracking-tight text-foreground transition-all duration-700 sm:text-6xl md:text-6xl lg:text-7xl"
            style={{
              transform: isHovered ? "translateX(12px)" : "translateX(0)",
            }}
          >
            {title1}
          </span>
          <span
            className="block text-5xl font-normal tracking-tight text-muted-foreground transition-all duration-700 sm:text-6xl md:text-6xl lg:text-7xl"
            style={{
              transform: isHovered ? "translateX(24px)" : "translateX(0)",
            }}
          >
            {title2}
          </span>
        </h2>

        {/* Description */}
        <p
          className="mt-8 text-base leading-relaxed text-muted-foreground transition-all duration-700 md:mt-10 md:text-lg lg:text-xl"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {description}
        </p>

        {/* Action Button */}
        <div
          className="mt-10 flex items-center gap-4 transition-all duration-700 md:mt-14"
          style={{
            transform: isHovered ? "translateX(12px)" : "translateX(0)",
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border transition-colors duration-500 group-hover:border-[#ff5800] group-hover:bg-[#ff5800] group-hover:text-black">
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
          </div>
          <span className="text-sm font-bold tracking-widest text-foreground uppercase group-hover:text-[#ff5800] transition-colors duration-500">
            Explore Project
          </span>
        </div>
      </motion.div>

      {/* Right: Image Block */}
      <motion.div 
        style={{ y: yImage, rotateX, perspective: 1000 }}
        className="relative w-full flex-1"
      >
        {/* Index Number */}
        <div
          className="absolute -left-6 -top-10 z-20 text-[140px] font-bold leading-none text-foreground/5 transition-all duration-700 md:-left-12 md:-top-16 md:text-[200px] lg:-left-16 lg:-top-24 lg:text-[280px]"
          style={{
            transform: isHovered ? "translate(-12px, -12px) scale(1.05)" : "translate(0, 0) scale(1)",
          }}
        >
          {index}
        </div>

        {/* Image Container - Increased max-w and removed strict cropping aspect ratio */}
        <div 
          className="relative aspect-video w-full overflow-hidden rounded-xl md:aspect-[4/3] max-w-[90%] md:max-w-[480px] lg:max-w-xl mx-auto md:mx-0 shadow-2xl transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered ? "translateZ(30px)" : "translateZ(0)"
          }}
        >
          <Link href={linkTo} target="_blank" rel="noopener noreferrer">
            <div className="absolute inset-0 bg-[#050505]/40 transition-colors duration-500 group-hover:bg-transparent z-10" />
            <img
              src={imageSrc}
              alt={`${title1} ${title2}`}
              className="h-full w-full object-cover transition-all duration-1000"
              style={{
                transform: isHovered ? "scale(1.08)" : "scale(1.0)",
                // Black and white by default, colorful on hover
                filter: isHovered ? "grayscale(0%) brightness(1.1) contrast(1.1)" : "grayscale(100%) brightness(0.8) contrast(1.2)",
              }}
            />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
