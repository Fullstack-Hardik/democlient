"use client";
import React, { useState, useEffect } from 'react';
import MorphSlider from "@/components/ui/MorphSlider";
import LogoLoop from "@/components/LogoLoop";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import AccordionGallery from "@/components/ui/AccordionGallery";
import ModelViewer from "@/components/ui/ModelViewer";
import GradientWaves from "@/components/ui/GradientWaves";
import Shuffle from "@/components/ui/Shuffle";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Typewriter } from "@/components/ui/Typewriter";
import { ArrowRight, PlayCircle, Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiNvidia, SiSupabase, SiGoogle, SiVercel, SiGithub, SiCloudflare, SiDocker, SiStripe } from 'react-icons/si';
import Lenis from 'lenis';

const sliderItems = [
  { image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop', caption: 'Create' },
  { image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop', caption: 'Design' },
  { image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop', caption: 'Innovate' },
  { image: 'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=1600&auto=format&fit=crop', caption: 'Explore' }
];

const serviceLogos = [
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiNvidia className="w-8 h-8"/> NVIDIA</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiSupabase className="w-8 h-8"/> supabase</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiGoogle className="w-8 h-8"/> Google</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiVercel className="w-8 h-8"/> Vercel</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiGithub className="w-8 h-8"/> GitHub</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiCloudflare className="w-8 h-8"/> Cloudflare</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiDocker className="w-8 h-8"/> Docker</span> },
  { node: <span className="text-3xl text-white/50 hover:text-white transition-colors flex items-center gap-3"><SiStripe className="w-8 h-8"/> Stripe</span> },
];

const features = [
	{
		title: 'Lightning Fast',
		icon: Zap,
		description: 'Optimized for speed. Our entire stack is built to help developers deploy in milliseconds.',
	},
	{
		title: 'Incredibly Powerful',
		icon: Cpu,
		description: 'Leverage the latest cutting-edge processors and edge computing frameworks.',
	},
	{
		title: 'Enterprise Security',
		icon: Fingerprint,
		description: 'Bank-grade encryption, automated compliance, and real-time threat detection.',
	},
	{
		title: 'Endless Customization',
		icon: Pencil,
		description: 'Tailor every aspect of your application with our highly flexible APIs.',
	},
	{
		title: 'Absolute Control',
		icon: Settings2,
		description: 'Full access to your infrastructure, logs, and deployment pipelines.',
	},
	{
		title: 'Built for AI',
		icon: Sparkles,
		description: 'Native integration with top tier LLMs and vector databases out of the box.',
	},
];

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();
	if (shouldReduceMotion) return <div className={className}>{children}</div>;
	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-black min-h-screen selection:bg-white/20 overflow-x-hidden font-sans">
      <main className="relative z-10 w-full bg-black flex flex-col text-white shadow-2xl rounded-b-[40px] pb-32">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-20">
          <div className="absolute inset-0 z-0">
            <MorphSlider
              items={sliderItems}
              transition="melt"
              intensity={0.55}
              aberration={0.35}
              drift={0.4}
              autoplay={true}
              autoplayDelay={5}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent pointer-events-none" />
        <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 bg-black overflow-hidden z-20">
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
            
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white tracking-wide">Next Generation Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white mb-6 leading-[1.1] font-serif">
              <Typewriter
                text="Journey Beyond Earth Into the Cosmos"
                speed={50}
                delay={300}
                loop={false}
              />
            </h1>

            <div className="max-w-3xl text-lg md:text-xl font-medium text-white/80 mb-10 drop-shadow-md">
              <Shuffle
                text="Experience the future of space exploration with our cutting-edge technology. Build, deploy, and scale faster than ever before."
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover={true}
                respectReducedMotion={true}
            
            <div className="mt-24 text-sm font-medium text-white/50 tracking-wider">
              Partnering with leading tech companies worldwide
            </div>
          </div>
        </section>

        {/* --- GRADIENT WAVES SECTION --- */}
        <div style={{ width: '100%', height: '300px', position: 'relative', marginTop: '-150px', zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
          <GradientWaves
            horizonColor="#000000"
            waveColor="#333333"
            crestColor="#ffffff"
            speed={0.4}
            amplitude={1.5}
            waveScale={0.8}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.2}
            zoom={1.2}
            height={5.0}
            fogDepth={10}
            detail="medium"
            brightness={0.8}
            opacity={0.8}
            mouseInteraction={false}
            parallaxStrength={0}
            grain={true}
            grainIntensity={0.05}
          />
        </div>

        {/* --- MARQUEE SECTION --- */}
        <section className="w-full py-16 bg-black overflow-hidden relative z-20 flex flex-col items-center justify-center gap-10">
          <div className="w-[110%] transform-gpu bg-black border-y border-white/10 py-8">
            <LogoLoop logos={serviceLogos} speed={40} direction="left" fadeOut fadeOutColor="#000000" gap={100} />
          </div>
        </section>

        {/* --- 3D MODEL SECTION --- */}
        <section className="w-full relative z-20 pt-8 pb-16 bg-black flex flex-col items-center pointer-events-none">
          <AnimatedContainer className="w-full max-w-6xl px-4 flex flex-col items-center">
            <div className="w-full h-[500px] md:h-[600px] relative pointer-events-auto">
              <ModelViewer
                url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
                width="100%"
                height="100%"
                autoRotate={true}
                autoRotateSpeed={1.0}
                defaultZoom={0.12}
                minZoomDistance={0.05}
                enableManualZoom={false}
                enableManualRotation={false}
                enableHoverRotation={false}
                showScreenshotButton={false}
              />
            </div>
          </AnimatedContainer>
        </section>

        {/* --- SERVICES / FEATURE GRID SECTION --- */}
        <section className="w-full relative z-20 py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl space-y-12 px-4">
            <AnimatedContainer className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold text-white">
                Power. Speed. Control.
              </h2>
              <p className="text-gray-400 mt-4 text-sm tracking-wide text-balance md:text-base">
                Everything you need to build fast, secure, scalable apps.
              </p>
            </AnimatedContainer>

            <AnimatedContainer
              delay={0.4}
              className="grid grid-cols-1 divide-x divide-y divide-white/20 divide-dashed border border-white/20 border-dashed sm:grid-cols-2 md:grid-cols-3 bg-black"
            >
              {features.map((feature, i) => (
                <FeatureCard key={i} feature={feature} />
              ))}
            </AnimatedContainer>
          </div>
        </section>

        {/* --- GALLERY SECTION --- */}
        <section className="w-full relative z-20 py-16 bg-black flex flex-col items-center">
          <div className="w-full max-w-6xl px-4">
            <AnimatedContainer className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl">
                Stunning Visuals
              </h2>
              <p className="text-gray-400 mt-4 text-sm md:text-base">
                Explore our breathtaking gallery of cosmic destinations.
              </p>
            </AnimatedContainer>
            <AccordionGallery
              defaultIndex={2}
              expandRatio={0.52}
              trigger="hover"
            />
          </div>
        </section>

      </main>

      {/* --- CINEMATIC FOOTER --- */}
      <CinematicFooter />
    </div>
  );
}
