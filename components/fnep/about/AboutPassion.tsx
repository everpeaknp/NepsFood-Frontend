'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";


const PASSION_SECTIONS = [
  {
    id: "01",
    label: "Heritage",
    title: "Authentic Heritage",
    description: "Our foundation is built on traditional Nepalese recipes passed down through generations. We honor these roots by ensuring every flavor profile remains untouched by time, even as we expand.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop",
    accent: "text-neps-red"
  },
  {
    id: "02",
    label: "Quality",
    title: "Precision Quality",
    description: "World-class manufacturing standards ensure that our traditional products meet the rigorous safety and quality demands of the global market. Artisanal care meets industrial precision.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
    accent: "text-neps-blue"
  },
  {
    id: "03",
    label: "Scale",
    title: "Modern Scale",
    description: "We bridge the gap between small family kitchens and the global supply chain. Our engineered processes allow us to produce authentic Nepalese flavors at a scale that feeds continents.",
    image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2000&auto=format&fit=crop",
    accent: "text-neps-gold"
  },
  {
    id: "04",
    label: "Future",
    title: "Future Vision",
    description: "Continuous innovation in food science and production technology. We are engineering the future of ethnic cuisine, making the taste of Nepal a globally accessible staple.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    accent: "text-neps-red"
  }
];

export default function AboutPassion() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const leftColumn = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!mainContainer.current || !leftColumn.current) return;

    const sections = gsap.utils.toArray(".passion-item");
    const contentItems = gsap.utils.toArray(".passion-content-node");

    // Pinning the left column
    ScrollTrigger.create({
      trigger: mainContainer.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColumn.current,
      pinSpacing: false,
      anticipatePin: 1,
      pinType: "fixed",
    });

    // Unified switch function to prevent overlaps
    const switchContent = (index: number) => {
      const activeItem = contentItems[index] as HTMLElement;
      
      // Animate out ALL items except the one that is currently active if it's already active
      contentItems.forEach((item: any, i: number) => {
        if (i !== index) {
          gsap.to(item, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            display: "none",
            ease: "power2.in",
            overwrite: true,
            force3D: true,
            z: 0.01
          });
        }
      });

      // Animate in the target item
      gsap.set(activeItem, { display: "block" });
      gsap.to(activeItem, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
        overwrite: true,
        force3D: true,
        z: 0.01
      });

      // Update progress bar
      gsap.to(".passion-progress-bar", {
        height: `${((index + 1) / sections.length) * 100}%`,
        duration: 0.8,
        ease: "expo.out",
        overwrite: "auto"
      });
    };

    // Observers for each image section
    sections.forEach((section: any, i: number) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center+=100",
        end: "bottom center+=100",
        onEnter: () => switchContent(i),
        onEnterBack: () => switchContent(i),
      });

      // Parallax Image
      gsap.fromTo(section.querySelector("img"), 
        { y: -80, scale: 1.1 },
        { 
          y: 80, 
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // Entry animation
    gsap.from(".passion-entrance", {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "top 75%",
      }
    });

  }, { scope: mainContainer });

  return (
    <section 
      ref={mainContainer} 
      className="relative bg-[#FDFCF9] overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row">
        
        {/* LEFT COLUMN: Pinned Content */}
        <div 
          ref={leftColumn}
          className="lg:w-1/2 lg:h-screen flex flex-col justify-center px-10 sm:px-20 lg:px-32 py-20 bg-transparent z-10"
        >
          <div className="passion-entrance w-full max-w-lg">
            <div className="flex items-center gap-6 mb-16">
              <div className="w-16 h-[1px] bg-slate-900/10" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">
                Chapter 02 / Our Philosophy
              </span>
            </div>

            <div className="relative pl-12">
              {/* Vertical Progress Line */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-slate-900/[0.03] overflow-hidden">
                <div className="passion-progress-bar absolute top-0 left-0 w-full h-0 bg-neps-red transition-all shadow-[0_0_15px_rgba(196,30,58,0.1)]" />
              </div>

              {/* Dynamic Content Layers */}
              <div className="relative min-h-[400px]">
                {PASSION_SECTIONS.map((section, i) => (
                  <div 
                    key={section.id}
                    className="passion-content-node absolute top-0 left-0 w-full [backface-visibility:hidden] [transform-style:preserve-3d]"
                    style={{ display: i === 0 ? "block" : "none", opacity: i === 0 ? 1 : 0 }}
                  >
                    <div className="mb-6">
                      <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${section.accent}`}>
                        {section.id} — {section.label}
                      </span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1]">
                      {section.title.split(' ')[0]} <br/>
                      <span className="text-slate-400">{section.title.split(' ')[1]}</span>
                    </h2>
                    
                    <p className="text-lg lg:text-xl text-slate-700 leading-relaxed max-w-sm mt-8">
                      {section.description}
                    </p>
                    
                    <button className="mt-12 flex items-center gap-3 group px-8 py-4 rounded-full border border-slate-900/10 hover:border-neps-red/40 transition-all duration-300 bg-white shadow-sm hover:shadow-md">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                        View Details
                      </span>
                      <ArrowDownRight className="w-4 h-4 text-neps-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Images */}
        <div className="lg:w-1/2">
          {PASSION_SECTIONS.map((section) => (
            <div 
              key={section.id}
              className="passion-item h-[80vh] lg:h-screen w-full overflow-hidden relative border-b border-white/10"
            >
              <img 
                src={section.image} 
                alt={section.title}
                className="w-full h-[140%] object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/20" />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}