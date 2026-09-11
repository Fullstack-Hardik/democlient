"use client";

import { useEffect, useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";
import Beams from "@/components/ui/Beams";
import { Footer } from "@/components/ui/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Outfit } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const premiumFont = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });

const faqs = [
  {
    question: "What services does your digital agency offer?",
    answer: "We are a full-service digital agency specializing in High-Performance Web Development, UI/UX Design, SEO Optimization, and Data-Driven Digital Marketing. From modern landing pages to complex, scalable full-stack web applications, we handle everything from the initial design concept to deploying robust backend architectures on modern cloud infrastructure."
  },
  {
    question: "How long does a typical website project take to launch?",
    answer: "Project timelines vary strictly based on complexity. A standard corporate website typically takes 4-6 weeks to design, develop, and launch. For complex web applications with custom backends and integrations, the timeline is usually 3-4 months. We provide a fully detailed milestone breakdown during our initial planning phase so you are always updated."
  },
  {
    question: "Do you offer ongoing website maintenance and support?",
    answer: "Absolutely! We offer ongoing retainer packages that cover critical security updates, uptime and performance monitoring, content updates, and continuous SEO optimization. This ensures your site stays lightning fast, deeply secure, and highly ranked on search engines long after launch."
  },
  {
    question: "How much does a new website or web application cost?",
    answer: "Every project is entirely unique. We price based on scope, technical features, and required design resources. We offer flexible pricing packages tailored to both aggressive startups and scalable enterprise solutions. Please reach out to us for a free, comprehensive technical consultation and quote."
  },
  {
    question: "Will my website be mobile-friendly and SEO optimized?",
    answer: "Yes, without a doubt. Every website we build is fully responsive using a mobile-first approach, meaning it looks and performs flawlessly on any screen size. We also strictly adhere to modern SEO best practices to ensure high visibility on search engines right out of the box."
  },
  {
    question: "What technologies and frameworks do you use?",
    answer: "We utilize modern, high-performance tech stacks to ensure blazing fast speeds. Our primary tools include React, Next.js, Node.js, Express.js, TypeScript, and Tailwind CSS. We also leverage top-tier Cloud platforms (like AWS and GCP) for powerful, scalable backend infrastructure and databases."
  }
];

function AccordionItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10 overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-8 text-left focus:outline-none group"
      >
        <span className="text-xl md:text-2xl font-medium text-white group-hover:text-[#ff5800] transition-colors duration-300">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-6 h-6 text-[#ff5800]" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="pb-8">
              <p className="text-zinc-400 text-lg leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQsPage() {
  const [currentWord, setCurrentWord] = useState("FAQS");
  
  useEffect(() => {
    // Smoothly transition between FAQS and ANSWERS every 4 seconds
    const timer = setInterval(() => {
      setCurrentWord(prev => prev === "FAQS" ? "ANSWERS" : "FAQS");
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | HRDK Digital</title>
        <meta name="description" content="Find answers to all your questions about our digital agency services, web development, SEO, and more." />
      </Head>
      
      {/* SEO Schema for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 
        Removed overflow-hidden and fixed height from main wrapper 
        to allow native window scrolling for touchpads and mobile devices.
      */}
      <main className="w-full bg-[#050505] selection:bg-[#ff5800] selection:text-white">
        <div 
          tabIndex={0} 
          role="region" 
          aria-label="Answers. Scroll to step inside."
          style={{ width: "100%", background: "#050505" }}
        >
          <GlyphPortal 
            word={currentWord} 
            fontFamily={premiumFont.style.fontFamily} 
            fontWeight={900} 
            scrollLength={2.4} 
            interactive={true} 
            annotations={false} 
            enterLabel="Find Answers"
            background={
              <div className="absolute inset-0 z-0">
                <Beams 
                  backgroundColor="#050505" 
                  beamColor="#ffffff" 
                  lightColor="#ffbb88" 
                  noiseIntensity={0.8}
                  speed={1.5}
                  scale={0.4}
                />
                <div 
                  className="absolute inset-0 backdrop-blur-[12px] bg-[#050505]/30 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: 'calc(var(--gp-progress, 0) * 1.5)'
                  }}
                />
              </div>
            }
            style={{ 
              fontFamily: premiumFont.style.fontFamily,
              "--gp-paper": "#050505",
              "--gp-ink": "#ffffff",
              "--gp-field": "#050505",
              "--gp-foreground": "#ffffff"
            } as any}
            front={
              <>
                <header className="absolute top-6 left-6 right-6 lg:left-12 lg:right-12 h-12 flex items-center justify-between z-50">
                  <Link href="/" className="flex items-center justify-center w-32 block no-underline z-50 bg-white px-4 py-2 rounded-xl transition-all hover:bg-zinc-200" aria-label="HRDK home">
                    <img src="/logo.svg" alt="HRDK Logo" className="h-8 w-auto" />
                  </Link>
                  
                  <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-8 text-[16px] font-medium tracking-wide">
                      <Link href="/" className="text-zinc-400 hover:text-white transition-colors relative group">Home</Link>
                      <Link href="/about" className="text-zinc-400 hover:text-white transition-colors relative group">About</Link>
                      <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors relative group">Projects</Link>
                      <Link href="/gallery" className="text-zinc-400 hover:text-white transition-colors relative group">Gallery</Link>
                      <Link href="/faqs" className="text-white relative group">
                        FAQs
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform origin-left transition-transform duration-300"></span>
                      </Link>
                      <Link href="/#services" className="text-zinc-400 hover:text-white transition-colors relative group">Services</Link>
                      <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors relative group">Contact</Link>
                    </nav>
                    <button className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition-colors pointer-events-auto">Sign Up</button>
                  </div>
                </header>
                
                <div className="absolute bottom-[10%] left-0 right-0 flex justify-center pointer-events-none">
                  <span className="text-[#ffffff] text-sm tracking-widest uppercase animate-pulse opacity-70">Scroll to enter ↓</span>
                </div>
              </>
            }
          >
            {/* CONTENT INSIDE THE PORTAL */}
            <div className="w-full max-w-4xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-start min-h-screen relative z-10 pointer-events-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#ffffff]/10 rounded-xl">
                  <MessageCircleQuestion className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">How can we help?</h2>
              </div>
              
              <p className="text-xl text-zinc-400 mb-16 max-w-2xl">
                Everything you need to know about our services, pricing, and how we can elevate your digital presence.
              </p>
              
              <div className="w-full flex flex-col gap-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} index={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
              
              <div className="mt-20 p-8 rounded-2xl bg-[#ffffff]/5 border border-[#ffffff]/20 w-full">
                <h3 className="text-2xl font-bold text-white mb-4">Want a custom solution?</h3>
                <p className="text-zinc-400 mb-6">Our experts can tailor a perfect package exactly for your business needs.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-white" /> High-performance custom web apps
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-white" /> Secure cloud integrations & APIs
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-white" /> Real-time tracking and metrics
                  </li>
                </ul>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-32 p-12 md:p-16 rounded-[3rem] bg-zinc-900/50 border border-white/5 w-full text-center relative overflow-hidden backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">Still have questions?</h3>
                  <p className="text-xl text-zinc-400 mb-10 max-w-lg mx-auto">
                    Can't find the answer you're looking for? Please chat to our friendly team.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-sm font-bold uppercase tracking-widest bg-white hover:bg-zinc-200 text-black rounded-full transition-transform hover:scale-105 duration-300">
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <Footer />
          </GlyphPortal>
        </div>
      </main>
    </>
  );
}
