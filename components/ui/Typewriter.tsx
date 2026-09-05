"use client";
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  cursor?: boolean;
}

export function Typewriter({ text, speed = 100, className, delay = 0, cursor = true }: TypewriterProps) {
  const textRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < text.length) {
          if (textRef.current) {
            textRef.current.textContent = text.slice(0, i + 1);
          }
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(typingInterval);
    };
  }, [text, speed, delay]);

  return (
    <span className={cn(className)}>
      <span ref={textRef}></span>
      {cursor && <span className="animate-pulse opacity-70">|</span>}
    </span>
  );
}
