"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannersAPI } from "@/lib/api";
import { PromoBanner as PromoBannerType } from "@/types/banner";

export default function PromoBanner() {
    const [banner, setBanner] = useState<PromoBannerType | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const fetchBanner = async () => {
            try {
                const response = await bannersAPI.getPromoBanners();
                console.log('Promo banner response:', response.data);
                if (response.data) {
                    const banners = response.data.results || response.data;
                    if (Array.isArray(banners) && banners.length > 0) {
                        setBanner(banners[0]);
                        console.log('Promo banner loaded');
                    }
                }
            } catch (error) {
                console.error('Error fetching promo banner:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    if (!mounted || loading) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="w-full h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-[12px] bg-gray-100 animate-pulse" />
                </div>
            </section>
        );
    }

    if (!banner) {
        return null;
    }
    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="w-full">
                    {/* div.site-banner - Responsive height with 12px border radius */}
                    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-[12px] overflow-hidden">
                        {/* div.site-banner-media - Background Image Layer */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>

                        {/* div.site-banner-content - Content Overlay with responsive padding */}
                        <div className="absolute inset-0 w-full h-full flex flex-wrap p-4 sm:p-6 md:p-8 lg:p-[30px]">
                            {/* div.site-banner-inner - Column with responsive gap */}
                            <div className="flex flex-col gap-3 sm:gap-4 md:gap-[15px]">
                                {/* div.site-banner-main - Main content with responsive gap and padding */}
                                <div className="flex flex-col w-full gap-2 sm:gap-3 md:gap-[12px] pb-3 sm:pb-4 md:pb-[20px]">
                                    {/* h2.entry-title - Title */}
                                    <h2 className="w-full">
                                        <span
                                            className="block text-left whitespace-pre-line text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-[1.1em] tracking-[-1%] text-[#064C50]"
                                            style={{
                                                fontFamily: "var(--font-inter), sans-serif"
                                            }}
                                            dangerouslySetInnerHTML={{ __html: banner.title }}
                                        />
                                    </h2>

                                    {/* p - Description with max-width */}
                                    <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px]">
                                        <div
                                            className="text-left text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#064C50]"
                                            style={{
                                                fontFamily: "var(--font-inter), sans-serif"
                                            }}
                                            dangerouslySetInnerHTML={{ __html: banner.description }}
                                        />
                                    </div>
                                </div>

                                {/* div.site-banner-footer - Button container */}
                                <div className="flex items-center w-full">
                                    {/* Component 6 - Button with responsive sizing */}
                                    <Link href={banner.button_link}>
                                        <button
                                            className="flex justify-center items-center transition-colors px-4 sm:px-5 md:px-[20px] h-[36px] sm:h-[38px] md:h-[40px] bg-[#064C50] border border-transparent rounded-full hover:bg-[#053d41] cursor-pointer"
                                            style={{
                                                fontFamily: "var(--font-inter), sans-serif"
                                            }}
                                        >
                                            <span
                                                className="text-[13px] sm:text-[13.5px] md:text-[14px] font-medium leading-[1.4em] tracking-[-0.5%] text-white"
                                            >
                                                {banner.button_text}
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}