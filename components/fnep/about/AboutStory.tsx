'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { History, Leaf, Globe2, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const container = useRef<HTMLElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !scrollWrapper.current) return;

    // Use a dynamic getter for scroll width so it is always accurate even if fonts/images load late
    const getScrollAmount = () => {
      if (!scrollWrapper.current) return 0;
      return -(scrollWrapper.current.scrollWidth - window.innerWidth);
    };

    const tl = gsap.to(scrollWrapper.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Parallax effect on images inside the cards
    gsap.utils.toArray('.story-image-inner').forEach((img: any) => {
      gsap.to(img, {
        x: 60,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => {
      tl.kill();
    };
  }, { scope: container });

  const storyItems = [
    {
      icon: <History className="w-8 h-8 text-neps-red" />,
      title: "The Reality",
      content: "It started with a frustrating reality: finding truly authentic Nepalese flavors at a commercial scale was impossible. You either went to a small family kitchen, or settled for mass-produced compromises that lost their soul.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <Leaf className="w-8 h-8 text-neps-gold" />,
      title: "The Challenge",
      content: "Nepalese cooking is notoriously complex. It relies on slow roasting, precise spice tempering, and generations of intuition. Traditional wisdom said you couldn't automate it without ruining it. We decided to prove that wrong.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <Globe2 className="w-8 h-8 text-neps-blue" />,
      title: "The Breakthrough",
      content: "Instead of changing recipes for machines, we engineered processes for the recipes. Today, Neps Foods bridges the gap between artisanal kitchens and the industrial supply chain. We scaled the unscalable.",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <section ref={container} className="h-screen bg-neps-dark-blue overflow-hidden relative">
      {/* Background ambient light - Fixed z-index to stay strictly behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-neps-blue/20 rounded-full blur-[150px] pointer-events-none z-0" />

      <div 
        ref={scrollWrapper} 
        className="flex h-full w-fit flex-nowrap relative z-10"
      >
        {/* Intro Slide */}
        <div className="w-screen h-full flex flex-col justify-center px-8 sm:px-12 md:px-24 shrink-0 relative">
          <div className="max-w-4xl z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[2px] bg-neps-gold" />
              <span className="text-neps-gold font-bold tracking-[0.2em] uppercase text-sm">Where we began</span>
            </div>
            
            <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[110px] uppercase tracking-tighter text-white leading-[0.9]">
              Scaling the <br/>
              <span className="text-neps-red">Unscalable.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-200 mt-10 font-sans font-medium max-w-2xl leading-relaxed">
              Scaling up usually means watering down. We refused to let that happen to our heritage. Scroll to uncover our journey.
            </p>
            
            <div className="mt-14 flex items-center gap-4 text-white/80 animate-pulse">
              <span className="text-sm font-bold uppercase tracking-[0.15em]">Scroll to explore</span>
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
          
          {/* Faint background text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[25vh] font-display font-black text-white/[0.03] uppercase pointer-events-none whitespace-nowrap">
            Heritage
          </div>
        </div>

        {/* Story Slides */}
        {storyItems.map((item, idx) => (
          <div key={idx} className="w-screen md:w-[70vw] lg:w-[50vw] h-full flex items-center justify-center p-6 sm:p-12 pt-24 md:pt-32 shrink-0">
            {/* 
              Card styling updated for higher contrast and better readability:
              Solid, slightly translucent background with strong white text.
            */}
            <div className="w-full h-[65vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden flex flex-col group relative shadow-2xl border border-white/10 bg-slate-900">
              
              {/* Full Bleed Image Section */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="w-[120%] h-full story-image-inner relative -left-[10%]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out" 
                  />
                </div>
              </div>

              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-neps-dark-blue via-neps-dark-blue/80 to-transparent z-10" />

              {/* Content Section - High Contrast Typography */}
              <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 lg:p-14 flex flex-col z-20">
                <div className="mt-auto">
                  <h3 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6 group-hover:text-neps-gold transition-colors duration-500">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-slate-200 text-lg sm:text-xl leading-relaxed max-w-xl">
                    {item.content}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
