"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    isDragging: boolean;
}

// --- FlipCard Component ---
const IMG_WIDTH = 120;  // Slightly larger than the template for food detail
const IMG_HEIGHT = 160; 

const FlipCard: React.FC<FlipCardProps> = ({
    src,
    index,
    total,
    phase,
    target,
    isDragging,
}) => {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 45,
                damping: 22,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className={`group transition-colors duration-500 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-xl bg-slate-100 border border-slate-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`product-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-xl bg-neps-blue flex flex-col items-center justify-around p-3 border border-blue-400"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-black text-neps-gold uppercase tracking-[0.2em] mb-1">NEPS FOODS</p>
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">Authentic Industrial Scale</p>
                    </div>
                    <button className="w-full py-1.5 bg-white text-neps-blue text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-neps-gold hover:text-white transition-colors cursor-pointer">
                        Explore
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


// --- Main Hero Component ---
const TOTAL_IMAGES = 12;
const MAX_SCROLL = 3000; // Increased for a slower, more deliberate scroll feel

// Industry relevant images
const IMAGES = [
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80", // Noodles
    "https://images.unsplash.com/photo-1596797038530-2c39da0a7aa3?w=400&q=80", // Spices
    "https://images.unsplash.com/photo-1589113331629-0d84a30553ef?w=400&q=80", // Grains
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", // Fresh veg
    "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80", // Dal
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80", // Flour
    "https://images.unsplash.com/photo-1592119747782-d8c12c2ea2b7?w=400&q=80", // Rice
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80", // Market
    "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=400&q=80", // Production
    "https://images.unsplash.com/photo-1505253468034-514d2507d914?w=400&q=80", // Snacks
    "https://images.unsplash.com/photo-1615485240384-552e400e9c24?w=400&q=80", // Herbs
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80", // Oil
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0); // Keep track of scroll value without re-renders
    const [isDragging, setIsDragging] = useState(false);
    const dragStartY = useRef(0);
    const dragStartX = useRef(0);
    const dragStartScroll = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const rect = container.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isInView) return;

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Touch support
        let touchStartY = 0;
        let touchStartX = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = touchStartY - touchY;
            const deltaX = touchStartX - touchX;
            touchStartY = touchY;
            touchStartX = touchX;

            const delta = deltaY + deltaX;
            const newScroll = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Mouse Drag Support
        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            dragStartY.current = e.clientY;
            dragStartX.current = e.clientX;
            dragStartScroll.current = scrollRef.current;
        };

        const handleMouseMoveGlobal = (e: MouseEvent) => {
            if (!isDragging) return;
            const deltaY = dragStartY.current - e.clientY;
            const deltaX = dragStartX.current - e.clientX;
            // Combining X and Y for a more "circular" feel during drag
            const delta = deltaY + deltaX;
            const newScroll = Math.min(Math.max(dragStartScroll.current + delta * 1.2, 0), MAX_SCROLL); // Reduced multiplier for slower drag
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        const handleMouseUpGlobal = () => {
            setIsDragging(false);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMoveGlobal);
        window.addEventListener("mouseup", handleMouseUpGlobal);

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMoveGlobal);
            window.removeEventListener("mouseup", handleMouseUpGlobal);
        };
    }, [virtualScroll, isDragging]);

    const morphProgress = useTransform(virtualScroll, [0, 400], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 25 });

    const scrollRotate = useTransform(virtualScroll, [400, 2800], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 30 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 100);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 700);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div 
            ref={containerRef} 
            className={`relative w-full h-[600px] md:h-[800px] bg-white overflow-hidden transition-colors duration-500 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-7xl font-black tracking-tighter text-neps-blue uppercase"
                    >
                        Quality at Scale.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-6 text-[10px] md:text-xs font-black tracking-[0.3em] text-slate-400 uppercase"
                    >
                        SCROLL TO EXPLORE THE PANTRY
                    </motion.p>
                </div>

                {/* Arc Active Content */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-6"
                >
                    <h2 className="text-3xl md:text-6xl font-black text-neps-blue tracking-tighter mb-4 uppercase">
                        Our Industrial Supply
                    </h2>
                    <p className="text-sm md:text-base text-slate-500 max-w-2xl font-medium leading-relaxed uppercase tracking-wider">
                        Consistent quality across 65+ certified products, from traditional frozen staples to premium wholesale spices.
                    </p>
                    <div className="flex gap-4 mt-8 pointer-events-auto">
                        <button className="px-8 py-3 bg-neps-blue text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-lg">
                            Explore Full Catalog
                        </button>
                        <button className="px-8 py-3 border-2 border-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest hover:border-neps-gold hover:text-neps-gold transition-all bg-white">
                            Request Samples
                        </button>
                    </div>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 130; 
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 0.8, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            const circleRadius = Math.min(minDimension * 0.35, 300);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.2 : 0.9);
                            const arcApexY = containerSize.height * (isMobile ? 0.3 : 0.2);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 80 : 110;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            // Significantly increase the rotation range for "circle rotation" feel
                            const rotationRange = isMobile ? 180 : 270;
                            const boundedRotation = -scrollProgress * rotationRange;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.2 : 1.5, 
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                isDragging={isDragging}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

