'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Factory, Heart, ShieldCheck, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPassion() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".passion-header", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".passion-item", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.5)"
    }, "-=0.4")
    .from(".passion-image", {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");
  }, { scope: container });

  const passions = [
    {
      icon: <Heart className="w-6 h-6 text-neps-red" />,
      title: "Food & Culture",
      desc: "Preserving the rich culinary heritage of Nepal in every recipe."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-neps-blue" />,
      title: "Uncompromising Quality",
      desc: "Strict quality control protocols to ensure consistency and safety."
    },
    {
      icon: <Factory className="w-6 h-6 text-slate-700" />,
      title: "Commercial Scale",
      desc: "Equipped to handle massive volume without losing artisanal quality."
    },
    {
      icon: <Flame className="w-6 h-6 text-neps-gold" />,
      title: "Modern Production",
      desc: "Translating traditional slow-cooking into efficient, scalable processes."
    }
  ];

  return (
    <section ref={container} className="py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden passion-image shadow-2xl">
            {/* Placeholder for actual factory/food image */}
            <div className="absolute inset-0 bg-slate-800 mix-blend-multiply opacity-20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=2850&auto=format&fit=crop" 
              alt="Commercial food production" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="font-bold text-neps-blue text-lg">Traditional Taste. Industrial Scale.</p>
              <p className="text-slate-600 text-sm mt-1">Bridging the gap between artisanal and commercial.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="passion-header mb-12">
              <span className="text-neps-red font-bold tracking-widest uppercase text-sm">Our Passion</span>
              <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-slate-900 mt-4 mb-6">
                Scaling Tradition <br /> With Precision
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We are deeply passionate about Nepalese food and culture. However, passion alone doesn't feed the masses. That's why we've dedicated ourselves to mastering commercial food production. We take complex, traditional Nepalese recipes and re-engineer them for modern, scalable production facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {passions.map((item, idx) => (
                <div key={idx} className="passion-item group flex flex-col gap-6 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8F0] border border-neps-gold/20 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-2xl text-slate-900 mb-3 group-hover:text-neps-blue transition-colors duration-300">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
