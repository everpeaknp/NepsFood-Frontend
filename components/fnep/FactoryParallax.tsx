'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Factory, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FactoryParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin calculation is only stable on desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
          anticipatePin: 1
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const factoryImages = [
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
      title: "Advanced Food Engineering",
      desc: "Precision controlled environments for consistent quality."
    },
    {
      url: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2671&auto=format&fit=crop",
      title: "High-Capacity Automation",
      desc: "Scalable packaging lines capable of meeting massive demand."
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
      title: "R&D & Quality Control",
      desc: "In-house lab for nutritional analysis and recipe perfecting."
    },
    {
      url: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2671&auto=format&fit=crop",
      title: "Global Distribution",
      desc: "Logistics hub designed for seamless export and local supply."
    }
  ];

  return (
    <section ref={sectionRef} className="relative bg-neps-blue overflow-hidden" id="factory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column - Pinned on Desktop */}
          <div ref={leftColRef} className="lg:h-screen flex flex-col justify-center py-20 lg:py-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-neps-gold mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Kathmandu Valley • 11 Ropani Facility</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-8">
                State-of-the-Art <br />
                <span className="text-transparent border-b-4 border-white inline-block pb-2" style={{ WebkitTextStroke: '1px white' }}>Production.</span>
              </h2>
              
              <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed opacity-90">
                Our facility represents the intersection of Nepalese heritage 
                and modern industrial efficiency.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  'ISO 22000 Certified',
                  'Automated Lines',
                  'Cold Chain Logistics',
                  'Sustainability Focus'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-neps-gold" />
                    {item}
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#CC9A34', color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-neps-gold text-neps-gold rounded-xl font-black text-lg inline-flex items-center gap-3 transition-colors duration-300"
              >
                Discover Our Facility <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Scrolling Content */}
          <div className="space-y-24 py-20 lg:py-32">
            {factoryImages.map((img, idx) => (
              <div key={idx} className="relative group perspective-1000">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-slate-900"
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-[400px] md:h-[600px] object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neps-blue/90 via-transparent to-transparent group-hover:from-neps-red/90 transition-all duration-500 rounded-3xl" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{img.title}</h3>
                    <p className="text-white/70 font-medium text-sm md:text-base max-w-sm">
                      {img.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
