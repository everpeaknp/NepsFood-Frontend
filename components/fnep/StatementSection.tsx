'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatementSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const text = "Neps Foods is a bridge between generations. We bring traditional Nepalese culinary heritage into the modern world through world-class engineering and scalable commercial production.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      const words = textRef.current.querySelectorAll('.statement-word');

      gsap.to(words, {
        color: "#0F172A", // slate-900 (dark text)
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 md:py-20 bg-[#FFF8F0] flex items-center justify-center border-y border-slate-900/5"
    >
      <div className="container mx-auto px-8 max-w-6xl">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-7xl font-display font-black leading-[0.9] text-slate-900/10 text-center tracking-tighter text-balance uppercase"
        >
          {text.split(" ").map((word, i) => (
            <span 
              key={i} 
              className="statement-word inline-block mr-[0.25em]"
            >
              {word}
            </span>
          ))}
        </h2>
        
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="w-[1px] h-12 bg-slate-900/20" />
          <span className="text-[11px] font-black tracking-[0.5em] text-slate-900/40 uppercase">
            A Global Mandate
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatementSection;
