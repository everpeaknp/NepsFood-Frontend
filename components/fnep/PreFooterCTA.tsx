'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PreFooterCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="pt-16 md:pt-24 pb-8 md:pb-12 bg-[#FFF8F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-8xl font-black text-neps-blue mb-8 tracking-tighter leading-[0.95]">
          Ready to scale your <br />
          <span className="text-neps-red">food operations?</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-medium mb-10 leading-relaxed">
          From industrial catering to global wholesale distribution, 
          NEPS provides the infrastructure for your growth.
        </p>

        <div className="flex flex-col items-center gap-6">
          <motion.button
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-neps-red text-white rounded-2xl font-black text-2xl shadow-[0_20px_50px_rgba(237,28,36,0.3)] flex items-center gap-4 group"
          >
            Contact Our Team
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </motion.button>
          
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-4">
            Response within 24 business hours
          </p>
        </div>
      </div>
    </section>
  );
}
