/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"

export interface SectionData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    reverse: boolean;
}

interface ParallaxScrollFeatureSectionProps {
    title: string;
    subtitle: string;
    sections: SectionData[];
}

export const ParallaxScrollFeatureSection = ({ title, subtitle, sections }: ParallaxScrollFeatureSectionProps) => {
    // Create refs and animations for each section
    const sectionRefs = sections.map(() => useRef(null));
    
    const scrollYProgress = sections.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    // Create animations for each section
    const opacityContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], [0, 1])
    );
    
    const clipProgresses = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
    );
    
    const translateContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
    <div className="bg-black py-24 overflow-hidden relative border-t border-zinc-900">
      <div className='w-full flex flex-col items-center justify-center mb-32 px-6'>
        <h2 className='text-4xl md:text-6xl font-bold max-w-2xl text-center text-white tracking-tight'>
          {title}
        </h2>
        <p className='mt-8 flex items-center gap-1.5 text-sm text-zinc-400 tracking-widest uppercase'>
          {subtitle} <ArrowDown size={15} />
        </p>
      </div>

       <div className="flex flex-col md:px-0 px-6 max-w-7xl mx-auto">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={`min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:gap-32 gap-12 py-16 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
                >
                    <motion.div style={{ y: translateContents[index] }} className="flex-1 w-full flex flex-col items-start">
                        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-lg text-white leading-tight">
                            {section.title}
                        </div>
                        <motion.p 
                            style={{ y: translateContents[index] }} 
                            className="text-zinc-400 text-lg md:text-xl max-w-md mt-6 md:mt-10 leading-relaxed font-light whitespace-pre-line"
                        >
                            {section.description}
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="flex-1 w-full relative flex justify-center items-center"
                    >
                        <img 
                            src={section.imageUrl} 
                            className="w-full max-w-sm aspect-[3/4] object-cover rounded-2xl shadow-2xl shadow-zinc-900/50" 
                            alt={section.title}
                        />
                    </motion.div>
                </div>
            ))}
        </div>
    </div>
  );
};

