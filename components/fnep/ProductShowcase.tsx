"use client";

import React, { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Boxes } from "./ui/background-boxes";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1.5rem] [gap:var(--gap)]",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const productImages1 = [
  "/momo-pic-1536x1536.jpg",
  "/bbq-masala-1536x1536.jpg",
  "/sundried-radish-pickle.jpg",
  "/Picture8.jpg",
];

const productImages2 = [
  "/Picture11.jpg",
  "/Picture12.jpg",
  "/Picture13.jpg",
  "/Picture14.jpg",
];

function ScrambleButton() {
  const [displayText, setDisplayText] = useState("Explore Inventory");
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = "Explore Inventory";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <motion.button
      onMouseEnter={scramble}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="px-10 py-4 bg-neps-blue text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neps-blue/90 transition-all shadow-lg"
    >
      {displayText}
    </motion.button>
  );
}

export default function ProductShowcase() {
  return (
    <section
      id="products"
      className="relative min-h-screen bg-slate-50 flex items-center overflow-hidden py-24 md:py-32"
    >
      {/* Background Boxes for texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <Boxes />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-neps-red font-black uppercase tracking-[0.3em] text-xs">
                Our Collection
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-neps-blue leading-[0.9] tracking-tighter">
                Premium Foods <br />
                <span className="text-neps-gold">Globally Sourced</span>
              </h2>
            </div>

            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
              From authentic hand-crafted momos to industrial-grade wholesale
              spices, our product line is built for consistency and scale.
            </p>

            <div className="flex items-center gap-8 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                HALAL CERTIFIED
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                HACCP COMPLIANT
              </div>
            </div>

            <div className="pt-4">
              <ScrambleButton />
            </div>
          </div>

          {/* Right Marquee Grid */}
          <div className="space-y-6 overflow-hidden">
            <Marquee speed={35} reverse className="[--gap:1.5rem]">
              {productImages1.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-56 h-72 md:w-64 md:h-80 rounded-3xl overflow-hidden flex-shrink-0 group shadow-xl"
                >
                  <img
                    src={src}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neps-dark-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-black text-sm uppercase tracking-widest">
                      Premium Frozen Range
                    </p>
                  </div>
                </div>
              ))}
            </Marquee>

            <Marquee speed={40} className="[--gap:1.5rem]">
              {productImages2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-56 h-72 md:w-64 md:h-80 rounded-3xl overflow-hidden flex-shrink-0 group shadow-xl"
                >
                  <img
                    src={src}
                    alt={`Product ${idx + 5}`}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neps-gold/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-black text-sm uppercase tracking-widest">
                      Wholesale Spices & Pulses
                    </p>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
