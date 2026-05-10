'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".about-hero-line span", {
      y: "110%",
      duration: 1.2,
      stagger: 0.1,
    }).from(".about-hero-fade", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
    }, "-=0.5");
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-[90vh] bg-[#FFF8F0] text-slate-900 font-sans z-10 overflow-hidden flex flex-col justify-center pt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center text-center">
        <div className="mb-4 about-hero-fade">
          <span className="text-neps-red font-bold tracking-widest uppercase text-sm">Our Story</span>
        </div>
        <h1 className="flex flex-col items-center font-display font-black text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] leading-[0.9] tracking-tighter uppercase text-slate-900 mb-8">
          <div className="about-hero-line overflow-hidden">
            <span className="inline-block">The Journey</span>
          </div>
          <div className="about-hero-line overflow-hidden">
            <span className="inline-block text-neps-blue">
              Of Neps Foods
            </span>
          </div>
        </h1>

        <div className="about-hero-fade max-w-3xl mt-4">
          <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
            From humble beginnings to commercial scale production. We bring traditional Nepalese recipes to the modern world without compromising on authenticity.
          </p>
        </div>

        <div className="mt-16 about-hero-fade">
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => {
              const el = document.getElementById("about-story");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer group"
          >
            <ArrowDown className="w-5 h-5 text-neps-blue group-hover:text-neps-red transition-colors" />
          </motion.button>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neps-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neps-red/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
