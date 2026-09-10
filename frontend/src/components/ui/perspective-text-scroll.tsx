"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { Amita } from "next/font/google";

const amitaFont = Amita({ weight: ["400", "700"], subsets: ["devanagari", "latin"] });

const Skiper28 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const yMotionValue = useTransform(scrollYProgress, [0, 1], [600, -1000]);
  const transform = useMotionTemplate`rotateX(25deg) translateY(${yMotionValue}px) translateZ(10px)`;

  return (
    <>
      <div
        ref={targetRef}
        className="relative z-0 h-[200vh] w-screen bg-[#050505] text-white"
      >
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll down to see
          </span>
        </div>
        <div
          className="sticky top-0 mx-auto flex items-center justify-center bg-transparent py-20"
          style={{
            transformStyle: "preserve-3d",
            perspective: "400px",
          }}
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transform,
              textShadow: "0px 10px 20px rgba(255, 88, 0, 0.4)",
            }}
            className={`${amitaFont.className} w-full max-w-5xl text-center text-4xl md:text-6xl font-extrabold tracking-tighter text-[#ff5800] leading-normal`}
          >
            रे मैं पूरे लोगो 4 भकाया बरस फलाणी ने<br/>
            मेरा तोड्या दिल नादान ना आया तरस फ्लानी ने<br/><br/>
            मुडया भी ना जावे उस मोड़ पे तू छोड़ेगी<br/>
            मोड़गी निशानी सारी दिल क्यू न मोड़गी<br/>
            झूठी तेरी कस्म थी झूठी तेरी बात सारी<br/>
            गेल तेरे देख द वे खाब सारे तोड़गी<br/><br/>
            नुते कई बे राखे झूठे लोगो बरत फलाणी ने<br/>
            मेरा तोड्या दिल नादान ना आया तरस फ्लानी ने<br/><br/>
            बस घाटे खाए छोरे ने पर मिल्या किमे ना यारी में<br/>
            बेठ्या रोज गिनूं तारे अर सौ रात ने वारी में<br/>
            बस तू ई अपनी लागे थी मने पूरी दुनियादारी में<br/>
            भूल ना पावेगा विक्रम तने छोरी जिंदगी सारी में<br/><br/>
            रे मेरे जाति हाना हाथ थमाया चर्स फ्लानी ने<br/>
            मेरा तोड्या दिल नादान ना आया तरस फ्लानी ने<br/><br/>
            रे मीठे कदे होया क्रते आज बोल लगते जहर तेरे<br/>
            हाथ करागी पीले तू अर गये कदम ये ठहर मेरे<br/>
            सांभ के राखे थे letter जो पाड़ वागाये नेहर तेरे<br/>
            बायपास ते लिकडे छोरा बढ़ता ना पर शहर तेरे<br/><br/>
            मेरे पाया नीचे काड बगाया फ़र्श फलानी ने<br/>
            मेरा तोड्या दिल नादान ना आया तरस फ्लानी ने<br/><br/>
            रे मैं पूरे लोगो 4 भकाया बरस फलाणी ने
            <div className="absolute bottom-0 left-0 h-[60vh] w-full bg-gradient-to-b from-transparent to-[#050505]" />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export { Skiper28 };
