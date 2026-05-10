'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';


interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Reset lag smoothing for consistent performance
    gsap.ticker.lagSmoothing(0);

    // Initial refresh to ensure ScrollTrigger knows the page length
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ScrollTrigger.update); // Optional cleanup
    };
  }, []);

  return <div className="lenis-content">{children}</div>;
}
