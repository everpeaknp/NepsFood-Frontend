"use client";

import { useEffect, useState } from "react";
import { bannersAPI } from "@/lib/api";
import { ScrollingBanner } from "@/types/banner";

export default function ScrollingOfferBanner() {
    const [banners, setBanners] = useState<ScrollingBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const fetchBanners = async () => {
            try {
                const response = await bannersAPI.getScrollingBanners();
                console.log('Scrolling banners response:', response.data);
                if (response.data) {
                    const banners = response.data.results || response.data;
                    if (Array.isArray(banners)) {
                        setBanners(banners);
                        console.log('Scrolling banners loaded:', banners.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching scrolling banners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (!mounted || loading) {
        return (
            <section className="w-full bg-white py-3">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="h-8 bg-gray-100 animate-pulse rounded" />
                </div>
            </section>
        );
    }

    if (!banners || !Array.isArray(banners) || banners.length === 0) {
        return null;
    }
    return (
        <section className="w-full bg-white py-3">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="overflow-hidden">
                    <div className="flex animate-scroll-left whitespace-nowrap">
                        {/* Repeat the content multiple times for seamless loop */}
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="flex items-center">
                                {banners.map((banner, bannerIndex) => (
                                    <div key={`${index}-${bannerIndex}`} className="flex items-center">
                                        <span
                                            className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[1.4em] tracking-[-0.5%] uppercase"
                                            style={{
                                                fontFamily: 'var(--font-inter), sans-serif',
                                                color: 'rgba(0, 0, 0, 0.4)'
                                            }}
                                        >
                                            {banner.text}
                                        </span>
                                        <span
                                            className="mx-8 text-[20px] sm:text-[22px] lg:text-[24px]"
                                            style={{ color: 'rgba(0, 0, 0, 0.4)' }}
                                        >
                                            •
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll-left {
                    animation: scroll-left 20s linear infinite;
                }
            `}</style>
        </section>
    );
}
