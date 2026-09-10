"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper47 = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
      alt: "Coding image",
    },
    {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
      alt: "Coding setup",
    },
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop",
      alt: "Laptop coding",
    },
    {
      src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop",
      alt: "Programmer code",
    },
    {
      src: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=3006&auto=format&fit=crop",
      alt: "Programming screen",
    },
    {
      src: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop",
      alt: "Programming desk",
    },
  ];

  return (
    <div className="flex w-full items-center justify-center overflow-hidden bg-black py-20 border-t border-white/5">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Our Skills & Setup</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">A glimpse into our development environment and the technologies we use to build extraordinary digital experiences.</p>
        </div>
        <Carousel_001 className="w-full" images={images} showPagination loop autoplay={true} />
      </div>
    </div>
  );
};

export { Skiper47 };

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  .swiper-pagination-bullet {
    background: #52525b;
  }
  .swiper-pagination-bullet-active {
    background: #ff5800;
  }
  `;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("w-full relative", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!h-[250px] md:!h-[400px] w-full border border-white/10 rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_001 };
