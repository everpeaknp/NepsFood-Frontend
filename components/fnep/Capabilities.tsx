
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Factory, Truck, Utensils, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'Precision Manufacturing',
    description: 'High-capacity production of traditional Nepalese staples, adhering to international food safety standards at our 11-ropani facility.',
    icon: Factory,
    accent: 'bg-neps-blue',
    tags: ['Mass Production', 'Quality Control', 'R&D']
  },
  {
    title: 'Global Wholesale',
    description: 'Reliable supply chain solutions for retailers and distributors across Australia and Nepal, offering competitive bulk pricing.',
    icon: Globe,
    accent: 'bg-neps-red',
    tags: ['Bulk Distribution', 'Export/Import', 'Logistics']
  },
  {
    title: 'Industrial Catering',
    description: 'End-to-end catering solutions for corporate events, industrial canteens, and large-scale social gatherings with authentic flavor.',
    icon: Utensils,
    accent: 'bg-neps-gold',
    tags: ['Event Catering', 'Industrial Supply', 'Menu Planning']
  },
  {
    title: 'Logistics Network',
    description: 'Temperature-controlled logistics ensuring that frozen and fresh products reach their destination in peak condition.',
    icon: Truck,
    accent: 'bg-slate-900',
    tags: ['Cold Chain', 'Rapid Delivery', 'Fleet Management']
  },
  {
    title: 'Quality Assurance',
    description: 'Every batch undergoes rigorous lab testing to ensure compliance with global sanitary and phytosanitary (SPS) standards.',
    icon: ShieldCheck,
    accent: 'bg-emerald-600',
    tags: ['HACCP', 'ISO 22000', 'Lab Tested']
  }
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const horizontalContainer = horizontalRef.current;
      if (!horizontalContainer) return;

      gsap.to(horizontalContainer, {
        x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalContainer.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // Character split animation for the title
      gsap.from(".cap-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power4.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="capabilities" 
      className="relative bg-[#FFF8F0] overflow-hidden h-screen flex flex-col justify-center py-8 md:py-12"
    >
      <div className="absolute inset-0 bg-[#FFF8F0] opacity-50" />
      
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-between px-12 pointer-events-none opacity-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-px h-full bg-neps-blue" />
        ))}
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 mb-8 md:mb-10">
          <div className="max-w-4xl">
            <h2 className="cap-title text-4xl md:text-6xl lg:text-7xl font-black text-neps-blue tracking-tighter leading-none mb-4">
              ENGINEERED <span className="text-neps-red">FOR SCALE.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl leading-relaxed uppercase tracking-wide">
              Advanced food infrastructure built for the next generation of global hospitality and retail.
            </p>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={horizontalRef}
            className="flex gap-4 md:gap-6 px-6 md:px-12 w-fit will-change-transform"
          >
            {capabilities.map((item, idx) => (
              <div 
                key={idx}
                className="capability-item shrink-0 w-[75vw] md:w-[400px]"
              >
                <div className="group relative h-[380px] md:h-[450px] bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden hover:border-slate-300 transition-colors duration-500 shadow-sm hover:shadow-2xl">
                  {/* Card Background Accent */}
                  <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700", item.accent)} />
                  
                  <div className="relative z-10">
                    <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg transform group-hover:rotate-6 transition-transform duration-500", item.accent)}>
                      <item.icon size={28} />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex-shrink-0 w-6 h-px bg-slate-300" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Capability 0{idx + 1}</span>
                    </div>

                    <h3 className="text-2xl md:text-2xl font-black text-neps-blue mb-4 tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-100 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-auto flex items-center justify-between border-t border-slate-50">
                    <button className="flex items-center gap-2 text-neps-blue font-black uppercase tracking-widest text-[10px] group/btn">
                      Read Specs
                      <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center group-hover/btn:bg-neps-blue group-hover/btn:text-white group-hover/btn:border-neps-blue transition-all duration-300">
                        <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                    
                    <Zap size={16} className="text-slate-100 group-hover:text-neps-gold transition-colors duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
