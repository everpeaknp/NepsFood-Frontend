"use client";

import Image from "next/image";
import Link from "next/link";
import ClientPrice from "./ClientPrice";
import { useState, useEffect } from "react";
import { bannersAPI } from "@/lib/api";
import { HeroBanner } from "@/types/banner";

export default function Hero() {
    const [slides, setSlides] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [blinkingDot, setBlinkingDot] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
        
        const fetchBanners = async () => {
            try {
                const response = await bannersAPI.getHeroBanners();
                console.log('Hero banners response:', response.data);
                if (response.data) {
                    // Handle both paginated and non-paginated responses
                    const banners = response.data.results || response.data;
                    if (Array.isArray(banners)) {
                        setSlides(banners);
                        console.log('Hero banners loaded:', banners.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching hero banners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const goToSlide = (index: number) => {
        setBlinkingDot(index);
        setCurrentSlide(index);

        // Remove blink effect after animation
        setTimeout(() => {
            setBlinkingDot(null);
        }, 300);
    };

    // Prevent hydration mismatch
    if (!mounted || loading) {
        return (
            <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[740px] overflow-hidden bg-gray-100">
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                </div>
            </section>
        );
    }

    if (!slides || !Array.isArray(slides) || slides.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[740px] overflow-hidden">
            {/* Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 h-full flex items-center">
                    {/* Left Content */}
                    <div className="w-full lg:w-[670px] space-y-3 sm:space-y-4 lg:space-y-5">
                        {/* Discount Badge and Text */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4 lg:mb-5">
                            {/* Discount Circle */}
                            <div
                                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: 'linear-gradient(-40deg, rgba(255, 201, 201, 1) 0%, rgba(255, 201, 201, 0) 50%)'
                                }}
                            >
                                <div className="flex items-end gap-[2px] pr-[2px]">
                                    <span
                                        className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold leading-[1.1em] tracking-[-2%] text-[#C70036]"
                                        style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                    >
                                        -{slides[currentSlide].discount_percentage}
                                    </span>
                                    <span
                                        className="text-[22px] sm:text-[27px] lg:text-[31.4px] font-bold leading-[1.398em] tracking-[-1.27%] text-[#C70036]"
                                        style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                    >
                                        %
                                    </span>
                                </div>
                            </div>

                            {/* Discount Text */}
                            <div className="text-center sm:text-left">
                                <p
                                    className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#064C50]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    dangerouslySetInnerHTML={{ __html: slides[currentSlide].discount_text }}
                                />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-[19.3px] pb-2 sm:pb-3 lg:pb-4">
                            {/* Main Heading */}
                            <h1 className="w-full">
                                <span
                                    className="text-[28px] sm:text-[40px] lg:text-[56px] font-bold leading-[1.2em] tracking-[-1%] text-[#064C50] block transition-all duration-500"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {slides[currentSlide].title}
                                </span>
                            </h1>

                            {/* Description */}
                            <div className="w-full sm:w-[450px] lg:w-[528px]">
                                <div
                                    className="text-[13px] sm:text-[14px] lg:text-[16px] font-normal leading-[1.6em] tracking-[-0.5%] text-[#064C50] transition-all duration-500"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    dangerouslySetInnerHTML={{ __html: slides[currentSlide].description }}
                                />
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 lg:gap-8 w-full">
                            {/* Shop Now Button */}
                            <Link href={slides[currentSlide].button_link}>
                                <button
                                    className="flex items-center justify-center px-6 sm:px-7 lg:px-8 h-10 sm:h-11 lg:h-12 bg-[#064C50] text-white rounded-full border border-transparent hover:bg-[#053d41] transition-colors w-full sm:w-auto cursor-pointer"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.4em] tracking-[-0.5%]">
                                        {slides[currentSlide].button_text}
                                    </span>
                                </button>
                            </Link>

                            {/* Price Section */}
                            <div className="relative w-full sm:w-auto flex items-center justify-center sm:justify-start">
                                <div className="flex items-end gap-2">
                                    {/* Price */}
                                    <ClientPrice
                                        price={parseFloat(slides[currentSlide].price)}
                                        className="text-[32px] sm:text-[36px] lg:text-[40px] font-semibold leading-[1.1em] tracking-[-2%] text-[#15803D]"
                                        style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                    />

                                    {/* Price Text */}
                                    <div className="opacity-60 pb-1">
                                        <p
                                            className="text-[11px] sm:text-[12px] lg:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#064C50] whitespace-nowrap"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            dangerouslySetInnerHTML={{ __html: slides[currentSlide].price_text.replace(/\n/g, '<br />') }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div
                className="absolute bottom-4 sm:bottom-6 lg:bottom-[36px] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 rounded-[90px] flex items-center justify-center px-2 py-2 z-20"
            >
                <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-[8px] h-[8px] rounded-full transition-all duration-200 hover:scale-125 active:scale-90 cursor-pointer ${index === currentSlide
                                ? 'bg-yellow-500 shadow-lg'
                                : 'bg-gray-400 hover:bg-yellow-400'
                                } ${blinkingDot === index ? 'animate-ping' : ''}`}
                            style={{
                                boxShadow: index === currentSlide ? '0 0 8px rgba(234, 179, 8, 0.6)' : 'none'
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}