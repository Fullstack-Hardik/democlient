import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useScroll } from "framer-motion";
import gsap from "gsap";

interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Pixel-Perfect UI/UX",
    clipId: "clip-original",
    image: "/pixel_perfect_ui.png"
  },
  {
    num: "02",
    name: "Full-Stack Architecture",
    clipId: "clip-hexagons",
    image: "/fullstack_arch.png"
  },
  {
    num: "03",
    name: "Performance Optimized",
    clipId: "clip-pixels",
    image: "/performance_opt.png"
  },
  {
    num: "04",
    name: "Global Deployment",
    clipId: "clip-waves",
    image: "/global_deployment.png"
  }
];

export const ConnoisseurStackInteractor = ({
  items = defaultItems,
  className
}: { items?: MenuItem[]; className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      // Add a slight buffer at ends, map 0-1 to 0-(items.length-1)
      const numItems = items.length;
      let newIndex = Math.floor(v * numItems);
      if (newIndex >= numItems) newIndex = numItems - 1;
      if (newIndex < 0) newIndex = 0;
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  const createLoop = (index: number) => {
    const item = items[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
    
    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // 1. IN (Very Fast)
    tl.to(selector, {
      scale: 1,
      duration: 0.2,
      stagger: { amount: 0.1, from: "random" },
      ease: "power3.out",
    })
    // 2. IDLE (Sine Breath)
    .to(selector, {
      scale: 1.02,
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      stagger: { amount: 0.05, from: "center" }
    })
    // 3. OUT (Very Fast)
    .to(selector, {
      scale: 0,
      duration: 0.15,
      stagger: { amount: 0.1, from: "edges" },
      ease: "power3.in",
    });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(activeIndex);
    }, containerRef);
    return () => ctx.revert();
  }, [activeIndex]);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full h-[300vh]", className)}>
      <div className="sticky top-0 flex flex-col md:flex-row items-center justify-between w-full h-screen p-8 md:p-24 overflow-hidden transition-colors duration-500 bg-[#050505]">
      
      {/* LEFT SIDE: HIGH CONTRAST MENU */}
      <div className="z-20 w-full md:w-1/2">
        <nav>
          <ul className="flex flex-col gap-14">
            {items.map((item, index) => (
              <li
                key={item.num}
                onMouseEnter={() => handleItemHover(index)}
                className="group cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  {/* Numbers */}
                  <span className={cn(
                    "text-3xl font-bold transition-all duration-500 mt-2",
                    activeIndex === index 
                      ? "text-[#ff5800] scale-110" 
                      : "text-zinc-600" 
                  )}>
                    {item.num}
                  </span>
                  
                  {/* Main Text */}
                  <h2 className={cn(
                    "text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] transition-all duration-700",
                    activeIndex === index 
                      ? "text-white opacity-100 translate-x-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                      : "opacity-40 translate-x-0 text-white/50 hover:text-white/70"
                  )}>
                    {item.name.split(' ')[0]}<br />
                    {item.name.split(' ')[1] || ''}
                  </h2>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE: SQUARE GRID (Sharp Squares) */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
        <div className="absolute w-[120%] h-[120%] bg-[#ff5800]/5 blur-[120px] rounded-full transition-opacity duration-1000" />
        
        <svg viewBox="0 0 500 500" className="w-[100%] max-w-[500px] h-auto z-10 drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <defs>
            <clipPath id="clip-original">
              <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>

            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>

            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="4" 
                />
              ))}
            </clipPath>

            <clipPath id="clip-waves">
              {Array.from({ length: 5 }).map((_, i) => (
                <path
                  key={i}
                  className="path"
                  d={`M20,${i * 100 + 40} Q120,${i * 100 - 10} 250,${i * 100 + 40} T480,${i * 100 + 40} L480,${i * 100 + 90} Q380,${i * 100 + 140} 250,${i * 100 + 90} T20,${i * 100 + 90} Z`}
                />
              ))}
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0].clipId})`}>
            <image
              ref={imageRef}
              href={items[0].image}
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
      </div>
    </div>
  );
};
