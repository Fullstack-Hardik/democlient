"use client";
import ReactLenis from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisOptions = {
    lerp: 0.05,
    duration: 1.5,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  };
  
  return <ReactLenis root options={lenisOptions}>{children}</ReactLenis>;
}
