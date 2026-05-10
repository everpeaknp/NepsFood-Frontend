'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, Factory, Package, UtensilsCrossed } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ScaleTicker = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftCard1Ref = useRef<HTMLDivElement>(null);
    const leftCard2Ref = useRef<HTMLDivElement>(null);
    const rightCard1Ref = useRef<HTMLDivElement>(null);
    const rightCard2Ref = useRef<HTMLDivElement>(null);

    const themeStyles = {
        background: '#FFF8F0',
        cardBg: '#F8FAFC',
        cardText: '#1E293B',
        numberText: '#CC9A34', // Neps Gold
        labelText: '#0F172A',
        cardBorder: 'rgba(0,0,0,0.08)',
        cardShadow: 'shadow-xl',
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        const leftCards = [leftCard1Ref.current, leftCard2Ref.current].filter(Boolean);
        const rightCards = [rightCard1Ref.current, rightCard2Ref.current].filter(Boolean);

        const calculateAnimationValues = () => {
            const screenWidth = window.innerWidth;
            let animationDistance: number;
            let rotationAmount: number;

            if (screenWidth < 640) {
                animationDistance = 60;
                rotationAmount = 2;
            } else if (screenWidth < 1024) {
                animationDistance = 80;
                rotationAmount = 3;
            } else {
                animationDistance = 100;
                rotationAmount = 5;
            }
            return { animationDistance, rotationAmount };
        };

        const setupAnimations = () => {
            const { animationDistance, rotationAmount } = calculateAnimationValues();

            // Set initial state for left cards
            leftCards.forEach((card) => {
                if (card) {
                    gsap.set(card, {
                        opacity: 0,
                        x: -animationDistance,
                        rotateZ: -rotationAmount,
                        transformOrigin: "center center",
                    });
                }
            });

            // Set initial state for right cards
            rightCards.forEach((card) => {
                if (card) {
                    gsap.set(card, {
                        opacity: 0,
                        x: animationDistance,
                        rotateZ: rotationAmount,
                        transformOrigin: "center center",
                    });
                }
            });

            // Create animations array to track for cleanup
            const animations: gsap.core.Tween[] = [];

            // Animate left cards with fully scroll-linked animation
            leftCards.forEach((card) => {
                if (card) {
                    const animation = gsap.to(card, {
                        opacity: 1,
                        x: 0,
                        rotateZ: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 30%",
                            scrub: true,
                            invalidateOnRefresh: true,
                            fastScrollEnd: true,
                            refreshPriority: -1,
                        },
                    });
                    animations.push(animation);
                }
            });

            // Animate right cards with fully scroll-linked animation
            rightCards.forEach((card) => {
                if (card) {
                    const animation = gsap.to(card, {
                        opacity: 1,
                        x: 0,
                        rotateZ: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 30%",
                            scrub: true,
                            invalidateOnRefresh: true,
                            fastScrollEnd: true,
                            refreshPriority: -1,
                        },
                    });
                    animations.push(animation);
                }
            });

            return animations;
        };

        // Initialize animations
        let currentAnimations = setupAnimations();

        // Handle window resize with debouncing for performance
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Kill current animations
                currentAnimations.forEach(animation => {
                    if (animation.scrollTrigger) {
                        animation.scrollTrigger.kill();
                    }
                    animation.kill();
                });
                // Recreate animations with new responsive values
                currentAnimations = setupAnimations();
                // Refresh ScrollTrigger
                ScrollTrigger.refresh();
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
            currentAnimations.forEach(animation => {
                if (animation.scrollTrigger) {
                    animation.scrollTrigger.kill();
                }
                animation.kill();
            });
        };

    }, { scope: containerRef });

    return (
        <div
            id="scale-ticker"
            className="relative z-30 flex items-center justify-center min-h-screen font-sans py-8 overflow-hidden"
            style={{ backgroundColor: themeStyles.background }}
        >
            <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
                <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start justify-center">
                    
                    {/* Left Column */}
                    <div className="flex flex-col w-full md:w-auto">
                        {/* 01: Operations */}
                        <div
                            ref={leftCard1Ref}
                            className={`flex flex-col justify-between w-full md:w-[480px] lg:w-[540px] min-h-[280px] md:min-h-[340px] p-8 md:p-12 rounded-[32px] mb-8 hover:!bg-[#20409A] hover:!scale-[1.02] transition-all duration-500 cursor-pointer group mx-auto md:mx-0 border relative overflow-hidden ${themeStyles.cardShadow}`}
                            style={{
                                backgroundColor: themeStyles.cardBg,
                                borderColor: themeStyles.cardBorder
                            }}
                        >
                            <Globe2 className="absolute top-8 right-8 w-8 h-8 text-slate-300 group-hover:text-white/30 transition-colors" />
                            <div
                                className="font-black text-[90px] md:text-[130px] leading-[0.8] tracking-tighter text-black group-hover:text-neps-red transition-colors duration-500"
                            >
                                02
                            </div>
                            <div className="text-right">
                                <p className="font-black text-2xl md:text-4xl leading-none uppercase tracking-tighter text-slate-900 group-hover:text-white transition-colors duration-500">
                                    AU & NP<br />Operations
                                </p>
                            </div>
                        </div>

                        {/* 02: Facility */}
                        <div
                            ref={leftCard2Ref}
                            className={`flex flex-col justify-between w-full md:w-[480px] lg:w-[540px] min-h-[280px] md:min-h-[340px] p-8 md:p-12 rounded-[32px] hover:!bg-[#ED1C24] hover:!scale-[1.02] transition-all duration-500 cursor-pointer group mx-auto md:mx-0 border relative overflow-hidden ${themeStyles.cardShadow}`}
                            style={{
                                backgroundColor: themeStyles.cardBg,
                                borderColor: themeStyles.cardBorder
                            }}
                        >
                            <Factory className="absolute top-8 right-8 w-8 h-8 text-slate-300 group-hover:text-white/30 transition-colors" />
                            <div
                                className="font-black text-[90px] md:text-[130px] leading-[0.8] tracking-tighter text-black group-hover:text-neps-blue transition-colors duration-500"
                            >
                                11
                            </div>
                            <div className="text-right">
                                <p className="font-black text-2xl md:text-4xl leading-none uppercase tracking-tighter text-slate-900 group-hover:text-white transition-colors duration-500">
                                    Ropani<br />Facility
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Offset) */}
                    <div className="flex flex-col w-full md:w-auto md:mt-[100px] lg:mt-[160px]">
                        {/* 03: Products */}
                        <div
                            ref={rightCard1Ref}
                            className={`flex flex-col justify-between w-full md:w-[480px] lg:w-[540px] min-h-[280px] md:min-h-[340px] p-8 md:p-12 rounded-[32px] mb-8 hover:!bg-[#CC9A34] hover:!scale-[1.02] transition-all duration-500 cursor-pointer group mx-auto md:mx-0 border relative overflow-hidden ${themeStyles.cardShadow}`}
                            style={{
                                backgroundColor: themeStyles.cardBg,
                                borderColor: themeStyles.cardBorder
                            }}
                        >
                            <Package className="absolute top-8 right-8 w-8 h-8 text-slate-300 group-hover:text-black/30 transition-colors" />
                            <div
                                className="font-black text-[90px] md:text-[130px] leading-[0.8] tracking-tighter text-black group-hover:text-neps-blue transition-colors duration-500"
                            >
                                65
                                <span className="text-[0.4em] align-top ml-1">+</span>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-2xl md:text-4xl leading-none uppercase tracking-tighter text-slate-900 group-hover:text-white transition-colors duration-500">
                                    Premium<br />Products
                                </p>
                            </div>
                        </div>

                        {/* 04: Catering */}
                        <div
                            ref={rightCard2Ref}
                            className={`flex flex-col justify-between w-full md:w-[480px] lg:w-[540px] min-h-[280px] md:min-h-[340px] p-8 md:p-12 rounded-[32px] hover:!bg-[#0D0D0D] hover:!scale-[1.02] transition-all duration-500 cursor-pointer group mx-auto md:mx-0 border relative overflow-hidden ${themeStyles.cardShadow}`}
                            style={{
                                backgroundColor: themeStyles.cardBg,
                                borderColor: themeStyles.cardBorder
                            }}
                        >
                            <UtensilsCrossed className="absolute top-8 right-8 w-8 h-8 text-slate-300 group-hover:text-white/20 transition-colors" />
                            <div
                                className="font-black text-[90px] md:text-[130px] leading-[0.8] tracking-tighter text-black group-hover:text-neps-red transition-colors duration-500"
                            >
                                100
                                <span className="text-[0.4em] align-top ml-1">%</span>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-2xl md:text-4xl leading-none uppercase tracking-tighter text-slate-900 group-hover:text-white transition-colors duration-500">
                                    Commercial<br />Catering
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScaleTicker;
