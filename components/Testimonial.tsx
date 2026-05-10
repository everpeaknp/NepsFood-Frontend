"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/lib/api";
import { Testimonial as TestimonialType } from "@/types/cms";

export default function Testimonial() {
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
        
        const fetchTestimonials = async () => {
            try {
                const response = await cmsAPI.getTestimonials();
                console.log('Testimonials response:', response.data);
                if (response.data) {
                    const testimonials = response.data.results || response.data;
                    if (Array.isArray(testimonials)) {
                        setTestimonials(testimonials);
                        console.log('Testimonials loaded:', testimonials.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (!mounted || !testimonials || !Array.isArray(testimonials) || testimonials.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [mounted, testimonials]);

    if (!mounted || loading) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="w-full bg-[#FFF7ED] rounded-[12px] py-12 sm:py-16 md:py-20 lg:py-[90px] px-6 sm:px-8 md:px-10 lg:px-[42px]">
                        <div className="h-64 flex items-center justify-center">
                            <div className="text-gray-400">Loading testimonials...</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!testimonials || !Array.isArray(testimonials) || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                {/* div.site-testimonial */}
                <div className="w-full bg-[#FFF7ED] rounded-[12px] py-12 sm:py-16 md:py-20 lg:py-[90px] px-6 sm:px-8 md:px-10 lg:px-[42px]">
                    {/* div.site-slider-wrapper */}
                    <div className="w-full overflow-hidden">
                        {/* div.site-slider */}
                        <div className="w-full relative">
                            {/* Testimonial Content */}
                            <div className="relative min-h-[280px] sm:min-h-[260px] md:min-h-[240px]">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        className={`flex flex-col items-center gap-6 sm:gap-8 md:gap-[40px] transition-all duration-1000 ease-in-out ${index === currentIndex
                                            ? 'opacity-100 translate-x-0'
                                            : index < currentIndex
                                                ? 'opacity-0 -translate-x-full absolute top-0 left-0 w-full'
                                                : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
                                            }`}
                                    >
                                        {/* div.testimonial-stars */}
                                        <div className="flex justify-center items-center gap-[4px]">
                                            {[...Array(testimonial.rating)].map((_, starIndex) => (
                                                <Star
                                                    key={starIndex}
                                                    className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px] fill-[#064C50] text-[#064C50]"
                                                />
                                            ))}
                                        </div>

                                        {/* p - Testimonial Text */}
                                        <div className="flex flex-col items-center max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[992px] px-4 sm:px-0">
                                            <p
                                                className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6em] tracking-[-0.5%] text-[#212529] text-center m-0"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                {testimonial.text}
                                            </p>
                                        </div>

                                        {/* div.author */}
                                        <div className="flex flex-col gap-[4px] w-full">
                                            {/* h4.author-name */}
                                            <div className="flex flex-col items-center w-full">
                                                <h4
                                                    className="text-[15px] sm:text-[15.5px] md:text-[16px] font-medium leading-[1.4em] tracking-[-0.5%] text-[#212529] text-center m-0"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                >
                                                    {testimonial.author_name}
                                                </h4>
                                            </div>

                                            {/* span - Role */}
                                            <div className="flex flex-col items-center w-full">
                                                <span
                                                    className="text-[13px] sm:text-[13.5px] md:text-[14px] font-normal leading-[1.4em] tracking-[-0.5%] text-[#757575] text-center"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                >
                                                    {testimonial.author_role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dots Navigation */}
                            <div className="flex justify-center items-center gap-[6px] sm:gap-[8px] mt-8 sm:mt-10 md:mt-[40px]">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-[8px] sm:h-[9px] md:h-[10px] rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-[#064C50] w-[24px] sm:w-[28px] md:w-[30px]'
                                            : 'bg-[#D1D5DB] hover:bg-[#9CA3AF] w-[8px] sm:w-[9px] md:w-[10px]'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
