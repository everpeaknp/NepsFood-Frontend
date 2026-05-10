'use client';

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play } from "lucide-react";
import { motion } from "motion/react";
gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

interface SmokeParticle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    velocityX: number;
    velocityY: number;
    rotation: number;
    rotationSpeed: number;
    life: number;
}

const Hero = () => {
    const container = useRef<HTMLElement>(null);
    const videoPillRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);
    const particleIdRef = useRef(0);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useGSAP(() => {
        // ── Entry animation ───────────────────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-line span", {
            y: "110%",
            duration: 1.2,
            stagger: 0.1,
        }).from(".hero-ui, .hero-fade", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
        }, "-=0.5")
          .from(videoPillRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "back.out(1.7)"
          }, "-=0.8");

        // ── Responsive Scroll Animation ──────────────────────────────────────────
        if (!videoPillRef.current || !container.current) return;

        const pill = videoPillRef.current;
        const hero = container.current;
        const spacer = document.getElementById("video-spacer");
        if (!spacer) return;

        // Function to calculate responsive dimensions
        const calculateDimensions = () => {
            const heroRect = hero.getBoundingClientRect();
            const pillRect = pill.getBoundingClientRect();

            // Dynamic padding calculation based on screen size
            const screenWidth = window.innerWidth;
            let horizontalPadding: number;

            if (screenWidth < 640) {
                horizontalPadding = 24;
            } else if (screenWidth < 768) {
                horizontalPadding = 40;
            } else if (screenWidth < 1024) {
                horizontalPadding = 64;
            } else {
                horizontalPadding = 80;
            }

            // Calculate final dimensions dynamically
            const finalWidth = heroRect.width;
            const finalHeight = window.innerHeight;
            const finalLeft = 0;
            const finalTop = 0;

            return {
                initialRect: {
                    top: pillRect.top,
                    left: pillRect.left,
                    width: pillRect.width,
                    height: pillRect.height
                },
                finalDimensions: {
                    top: finalTop,
                    left: finalLeft,
                    width: finalWidth,
                    height: finalHeight
                }
            };
        };

        // Initial setup
        const setupAnimation = () => {
            const { initialRect, finalDimensions } = calculateDimensions();

            pill.style.borderRadius = "60px";

            gsap.set(pill, {
                position: "fixed",
                top: initialRect.top,
                left: initialRect.left,
                width: initialRect.width,
                height: initialRect.height,
                xPercent: 0,
                yPercent: 0,
                margin: 0,
                zIndex: 60,
                backgroundColor: "black"
            });

            const tlScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "+=200%", // Pin for much longer to let the video "play"
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    refreshPriority: 10,
                },
            });

            // 1. Fade UI out (except CTAs)
            tlScroll.to(".hero-fade, .hero-line", {
                opacity: 0,
                y: -50,
                stagger: 0.05,
                ease: "power2.inOut"
            }, 0);

            // 2. Fade out CTAs separately with delay
            tlScroll.to(".hero-cta", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power2.inOut"
            }, 0.3);

            // 2. Expand pill to full viewport
            tlScroll.to(pill, {
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                ease: "power1.inOut"
            }, 0.2);

            return tlScroll;
        };

        let currentAnimation = setupAnimation();

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (currentAnimation) {
                    currentAnimation.scrollTrigger?.kill();
                    currentAnimation.kill();
                }
                currentAnimation = setupAnimation();
                ScrollTrigger.refresh();
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
            if (currentAnimation) {
                currentAnimation.scrollTrigger?.kill();
                currentAnimation.kill();
            }
        };

    }, { dependencies: [] });

    // Smoke trail effect with physics
    useEffect(() => {
        let throttleTimer: NodeJS.Timeout | null = null;
        
        const handleMouseMove = (e: MouseEvent) => {
            // Update cursor position directly via DOM for instant movement
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            
            if (throttleTimer) return;
            
            throttleTimer = setTimeout(() => {
                throttleTimer = null;
            }, 15); // Spawn particles every 15ms for much denser smoke

            // Create multiple particles per mouse move for denser smoke
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 0.5 + 0.3;
                const spread = 15;
                
                const newParticle: SmokeParticle = {
                    id: particleIdRef.current++,
                    x: e.clientX + (Math.random() - 0.5) * spread,
                    y: e.clientY + (Math.random() - 0.5) * spread,
                    size: Math.random() * 40 + 25,
                    opacity: Math.random() * 0.5 + 0.4,
                    velocityX: Math.cos(angle) * speed,
                    velocityY: Math.sin(angle) * speed - 1.5, // Upward bias
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 2,
                    life: 1.0,
                };

                setSmokeParticles(prev => [...prev, newParticle]);
            }
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        const heroElement = container.current;
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
            heroElement.addEventListener('mouseenter', handleMouseEnter);
            heroElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
                heroElement.removeEventListener('mouseenter', handleMouseEnter);
                heroElement.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (throttleTimer) {
                clearTimeout(throttleTimer);
            }
        };
    }, []);

    // Animate smoke particles with physics
    useEffect(() => {
        const interval = setInterval(() => {
            setSmokeParticles(prev => 
                prev
                    .map(particle => {
                        // Physics simulation
                        const drag = 0.98; // Air resistance
                        const gravity = -0.05; // Slight upward force (negative gravity)
                        const turbulence = (Math.random() - 0.5) * 0.3;
                        
                        return {
                            ...particle,
                            x: particle.x + particle.velocityX,
                            y: particle.y + particle.velocityY,
                            velocityX: particle.velocityX * drag + turbulence,
                            velocityY: (particle.velocityY + gravity) * drag,
                            rotation: particle.rotation + particle.rotationSpeed,
                            opacity: particle.opacity * 0.97, // Gradual fade
                            size: particle.size + 0.8, // Expand as it rises
                            life: particle.life - 0.015,
                        };
                    })
                    .filter(particle => particle.life > 0 && particle.opacity > 0.01)
            );
        }, 16); // ~60fps

        return () => clearInterval(interval);
    }, []);

    return (
        <main
            ref={container}
            className="relative min-h-screen bg-[#FFF8F0] text-slate-900 font-sans z-10 overflow-hidden cursor-none"
        >
            {/* Custom Black Circle Cursor */}
            <div
                ref={cursorRef}
                className="fixed w-5 h-5 bg-slate-900 rounded-full pointer-events-none z-[60]"
                style={{
                    transform: 'translate(-50%, -50%)',
                    opacity: isHovered ? 1 : 0,
                }}
            />

            {/* Smoke Trail Particles - Behind content */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {smokeParticles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            opacity: particle.opacity,
                            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
                            transition: 'none',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 70%)',
                            filter: 'blur(15px)',
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32">
                <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center text-center">
               

                    <h1 className="flex flex-col items-center font-display font-black text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] leading-[0.9] tracking-tighter uppercase text-slate-900">
                        <div className="hero-line overflow-hidden">
                            <span className="inline-block">TRADITIONAL TASTE</span>
                        </div>
                        <div className="hero-line overflow-hidden">
                            <span className="inline-block text-neps-red">
                                INDUSTRIAL SCALE.
                            </span>
                        </div>
                    </h1>

                    <div className="hero-ui hero-fade max-w-2xl mt-8 mb-12">
                        <p className="text-sm md:text-base leading-relaxed tracking-wide text-slate-500 font-medium uppercase">
                            Operating across Australia and our 11-ropani facility in Nepal,<br className="hidden sm:block" />
                            providing authentic flavor with precision-engineered<br className="hidden sm:block" />
                            supply chain excellence for the B2B market.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
                            >
                                <ArrowDown className="w-4 h-4 text-neps-blue group-hover:text-neps-gold transition-colors" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar CTAs */}
            <div className="absolute bottom-10 w-full z-30 pointer-events-none">
                <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col sm:flex-row justify-between items-center gap-6 pointer-events-auto">
                    <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hero-cta w-full sm:w-auto font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 bg-white shadow-lg"
                    >
                        Explore Products
                    </motion.button>

                    {/* Spacer for Video Pill */}
                    <div className="hidden md:block w-[320px] h-[200px] shrink-0 pointer-events-none" />

                    <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hero-cta w-full sm:w-auto font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full border-2 border-neps-blue text-neps-blue hover:bg-neps-blue hover:text-white transition-all duration-300 bg-white shadow-lg"
                    >
                        Get in touch
                    </motion.button>
                </div>
            </div>

            {/* Cinematic Video Pill */}
            <div
                ref={videoPillRef}
                className="w-[200px] h-[130px] md:w-[260px] md:h-[165px] lg:w-[320px] lg:h-[200px] bg-black border-2 border-slate-100 rounded-[50px] overflow-hidden absolute bottom-10 left-1/2 -translate-x-1/2 shadow-2xl z-20 cursor-pointer group"
                style={{ willChange: 'transform' }}
            >
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/60">
                        <Play className="w-5 h-5 text-neps-blue fill-neps-blue" />
                    </div>
                </div>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover opacity-100 brightness-110 contrast-[1.1]"
                    src="/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => {
                        // Ensure video plays after loading
                        videoRef.current?.play().catch(err => console.log('Video play failed:', err));
                    }}
                />
            </div>
        </main>
    );
};

export default Hero;

