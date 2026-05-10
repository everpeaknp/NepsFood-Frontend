'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MISSION_DATA = [
  {
    id: "01",
    label: "Mission",
    title: "Culinary Scale",
    subtitle: "Authenticity at volume",
    description: "To authentically produce and distribute Nepalese culinary products on a commercial scale, ensuring that the true taste of Nepal is accessible worldwide without compromising on quality or tradition.",
    icon: <Target className="w-6 h-6" />,
    points: [
      "B2B Scalability",
      "Absolute Flavor Integrity",
      "Global Supply Chains"
    ],
    accent: "text-neps-red",
    borderColor: "border-neps-red/10",
    hoverBg: "hover:bg-neps-red/[0.02]"
  },
  {
    id: "02",
    label: "Vision",
    title: "Global Anchor",
    subtitle: "Defining the standard",
    description: "A future where Nepalese cuisine is a globally recognized staple. We aim to be the premier global partner, setting the standard for commercial-scale ethnic food production.",
    icon: <Eye className="w-6 h-6" />,
    points: [
      "Continental Networks",
      "Automated Excellence",
      "Cultural Elevation"
    ],
    accent: "text-neps-blue",
    borderColor: "border-neps-blue/10",
    hoverBg: "hover:bg-neps-blue/[0.02]"
  },
  {
    id: "03",
    label: "Values",
    title: "Core Ethos",
    subtitle: "Modern Heritage",
    description: "Our operations are guided by principles that honor our heritage while embracing business excellence through innovation and rigorous quality standards.",
    icon: <Star className="w-6 h-6" />,
    points: [
      "Uncompromising Soul",
      "Rigorous Standards",
      "Innovative Solutions"
    ],
    accent: "text-neps-gold",
    borderColor: "border-neps-gold/20",
    hoverBg: "hover:bg-neps-gold/[0.02]"
  }
];

export default function AboutMission() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    // Reveal Header
    gsap.fromTo(".mission-header > *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".mission-header",
          start: "top 85%",
        }
      }
    );

    // Reveal Cards
    gsap.fromTo(".mission-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mission-grid",
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-[#FDFCF9] text-slate-900 relative overflow-hidden">
      {/* Subtle Texture/Grain Overlay if needed, but keeping it clean for now */}
      
      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Header Section */}
        <div className="mission-header max-w-4xl mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-neps-gold" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-neps-gold">Our Foundation</span>
          </div>
          
          <h2 className="text-5xl lg:text-8xl font-display font-black tracking-tight leading-[0.9] mb-8 text-slate-900">
            Purpose & <br />
            <span className="text-slate-400">Global Direction</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            We are driven by the ambition to bridge tradition and modern scale, 
            bringing the soul of Nepal to every corner of the world.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="mission-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {MISSION_DATA.map((item) => (
            <div 
              key={item.id}
              className={`mission-card group relative p-10 rounded-[40px] bg-white border ${item.borderColor} ${item.hoverBg} transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 overflow-hidden`}
            >
              <div className="relative z-10">
                {/* ID & Label */}
                <div className="flex justify-between items-start mb-12">
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${item.accent}`}>
                    {item.id} / {item.label}
                  </span>
                  <div className={`p-3 rounded-2xl bg-slate-50 ${item.accent} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-8">
                  <h3 className="text-3xl font-display font-black mb-2 leading-none text-slate-900">{item.title}</h3>
                  <p className={`text-sm font-display italic opacity-60 ${item.accent}`}>{item.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-10 text-sm">
                  {item.description}
                </p>

                {/* Points */}
                <div className="space-y-4">
                  {item.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.accent.replace('text-', 'bg-')} opacity-40`} />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl group-hover:bg-slate-100 transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Removed Footer Accent per user request */}
        
      </div>
    </section>
  );
}
