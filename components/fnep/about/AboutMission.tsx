'use client';

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Star, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMission() {
  const container = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".mission-title", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".mission-tabs", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .from(".mission-content", {
      opacity: 0,
      scale: 0.98,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");
  }, { scope: container });

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: <Target className="w-5 h-5" /> },
    { id: 'vision', label: 'Long-Term Vision', icon: <Eye className="w-5 h-5" /> },
    { id: 'values', label: 'Core Values', icon: <Star className="w-5 h-5" /> }
  ] as const;

  const content = {
    mission: {
      title: "Our Mission",
      desc: "To authentically produce and distribute Nepalese culinary products on a commercial scale, ensuring that the true taste of Nepal is accessible to businesses and consumers worldwide without compromising on quality or tradition.",
      points: [
        "Scale traditional recipes for B2B markets",
        "Maintain absolute authenticity in flavor profiles",
        "Provide reliable, high-volume supply chains"
      ]
    },
    vision: {
      title: "Long-Term Vision",
      desc: "We envision a future where Nepalese cuisine is a globally recognized and accessible staple. By setting the standard for commercial-scale ethnic food production, we aim to be the premier global partner for Nepalese food products.",
      points: [
        "Global distribution networks across multiple continents",
        "Pioneering automated production for ethnic foods",
        "Elevating the perception of Nepalese cuisine globally"
      ]
    },
    values: {
      title: "Core Values",
      desc: "Our operations and decisions are guided by principles that honor both our heritage and our commitment to modern business excellence.",
      points: [
        "Authenticity: Never compromising the original recipe's soul.",
        "Quality: Rigorous standards from raw material to final product.",
        "Innovation: Using modern tech to solve traditional cooking challenges."
      ]
    }
  };

  return (
    <section ref={container} className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neps-blue rounded-full blur-[120px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neps-red rounded-full blur-[100px] opacity-10 pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 mission-title">
          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight mb-6">
            Purpose & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neps-blue to-blue-400">Direction</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Guiding principles that drive our growth and ensure we stay true to our roots while expanding our global footprint.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 mission-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-300 font-bold uppercase tracking-wider text-sm ${
                  activeTab === tab.id 
                    ? 'bg-neps-blue text-white shadow-lg shadow-neps-blue/20 border border-neps-blue/50' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/3 mission-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-3xl"
              >
                <h3 className="font-display font-black text-3xl mb-6">{content[activeTab].title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {content[activeTab].desc}
                </p>
                <div className="space-y-4">
                  {content[activeTab].points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-neps-blue shrink-0 mt-0.5" />
                      <span className="text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
