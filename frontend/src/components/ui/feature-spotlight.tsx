"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export interface FeatureSpotlightProps {
  title1: string;
  title2: string;
  description: string;
  index: string;
  linkTo: string;
  imageSrc: string;
  label?: string;
}

export function FeaturedSpotlight({
  title1,
  title2,
  description,
  index,
  linkTo,
  imageSrc,
  label = "Featured"
}: FeatureSpotlightProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16 mb-20 md:mb-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Text Block */}
      <div className="relative z-10 flex w-full max-w-[320px] shrink-0 flex-col items-center text-center md:w-[240px] md:items-start md:text-left lg:w-[280px] lg:pt-4">
        {/* Label with animated line */}
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-foreground transition-all duration-700"
            style={{
              width: isHovered ? 48 : 32,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground transition-all duration-700 md:text-xs"
            style={{
              letterSpacing: isHovered ? "0.3em" : "0.25em",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {label}
          </span>
        </div>

        {/* Title - responsive text sizes */}
        <h2 className="relative">
          <span
            className="block text-4xl font-normal tracking-tight text-foreground transition-all duration-700 sm:text-5xl md:text-5xl lg:text-6xl"
            style={{
              transform: isHovered ? "translateX(8px)" : "translateX(0)",
            }}
          >
            {title1}
          </span>
          <span
            className="block text-4xl font-normal tracking-tight text-muted-foreground transition-all duration-700 sm:text-5xl md:text-5xl lg:text-6xl"
            style={{
              transform: isHovered ? "translateX(16px)" : "translateX(0)",
            }}
          >
            {title2}
          </span>
        </h2>

        {/* Description */}
        <p
          className="mt-6 text-sm leading-relaxed text-muted-foreground transition-all duration-700 md:mt-8 md:text-base lg:text-lg"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {description}
        </p>

        {/* Action Button */}
        <div
          className="mt-8 flex items-center gap-4 transition-all duration-700 md:mt-12"
          style={{
            transform: isHovered ? "translateX(8px)" : "translateX(0)",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors duration-500 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
          </div>
          <span className="text-sm font-medium tracking-wide text-foreground uppercase">
            View Project
          </span>
        </div>
      </div>

      {/* Right: Image Block */}
      <div className="relative w-full flex-1 overflow-hidden">
        {/* Index Number */}
        <div
          className="absolute -left-4 -top-8 z-20 text-[120px] font-bold leading-none text-foreground/5 transition-all duration-700 md:-left-8 md:-top-12 md:text-[180px] lg:-left-12 lg:-top-16 lg:text-[240px]"
          style={{
            transform: isHovered ? "translate(-8px, -8px) scale(1.05)" : "translate(0, 0) scale(1)",
          }}
        >
          {index}
        </div>

        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg md:aspect-[4/5] lg:aspect-[3/4] max-w-sm ml-auto mr-auto md:mr-0 md:max-w-none shadow-2xl">
          <Link href={linkTo} target="_blank" rel="noopener noreferrer">
            <div className="absolute inset-0 bg-background/10 transition-colors duration-500 group-hover:bg-transparent z-10" />
            <img
              src={imageSrc}
              alt={`${title1} ${title2}`}
              className="h-full w-full object-cover transition-all duration-1000"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1.01)",
                filter: isHovered ? "grayscale(0%) brightness(1.1)" : "grayscale(50%) brightness(0.9)",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
