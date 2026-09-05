"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  cursor?: boolean;
}

export function Typewriter({ text, speed = 100, className, delay = 0, cursor = true }: TypewriterProps) {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed / 1000, delayChildren: delay / 1000 },
    },
  };

  const child = {
    visible: { opacity: 1, display: "inline-block" },
    hidden: { opacity: 0, display: "none" },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap items-center", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span variants={child} key={index} className="whitespace-pre">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
}
