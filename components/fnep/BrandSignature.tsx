"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandSignature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isOverText, setIsOverText] = useState(false);

  useEffect(() => {
    // Scroll-triggered dot animation
    const ctx = gsap.context(() => {
      if (dotRef.current) {
        gsap.fromTo(dotRef.current,
          { x: 200, rotation: 0 },
          {
            x: 0,
            rotation: 360,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.5,
            }
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is actually over the text element
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      setIsOverText(isInside);
      
      setMousePos({ x, y });
      
      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative bg-white h-[40vh] md:h-[50vh] min-h-[250px] md:min-h-[400px] overflow-hidden border-none cursor-none"
    >
      {/* Custom circular cursor - Desktop only */}
      <div
        ref={cursorRef}
        className={`hidden md:block fixed w-[20px] h-[20px] bg-black rounded-full pointer-events-none z-50 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <div className="absolute inset-0 z-10">
        <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <motion.div 
            className="text-[8px] md:text-[10px] font-black tracking-[0.6em] uppercase mb-8"
            animate={{ 
              color: isHovered ? '#CC9A34' : '#CC9A34',
              opacity: isHovered ? 1 : 0.6
            }}
            transition={{ duration: 0.3 }}
          >
            The Standard of Industrial Excellence
          </motion.div>
          <div className="relative">
            <h2 
              ref={textRef}
              className="font-display text-6xl sm:text-8xl md:text-[12vw] font-black tracking-tighter uppercase leading-none select-none text-neps-blue/40"
            >
              NEPS <span className="text-neps-red/40">FOODS</span>
              <span 
                ref={dotRef}
                className="text-neps-gold inline-block"
              >.</span>
            </h2>
            
            {/* Bright blue text overlay on hover - Desktop only */}
            <h2 
              aria-hidden="true"
              className="absolute top-0 left-0 font-display text-6xl sm:text-8xl md:text-[12vw] font-black tracking-tighter uppercase leading-none select-none text-neps-blue pointer-events-none hidden md:block"
              style={{
                clipPath: isOverText 
                  ? `circle(150px at ${mousePos.x}px ${mousePos.y}px)`
                  : 'circle(0px at 50% 50%)',
              }}
            >
              NEPS <span className="text-neps-red">FOODS</span>
              <span className="text-neps-gold inline-block">.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
