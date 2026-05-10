"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannersAPI } from "@/lib/api";
import { MarketplaceBanner } from "@/types/banner";

export default function MarketplaceBanners() {
    const [banners, setBanners] = useState<MarketplaceBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const fetchBanners = async () => {
            try {
                const response = await bannersAPI.getMarketplaceBanners();
                console.log('Marketplace banners response:', response.data);
                if (response.data) {
                    const banners = response.data.results || response.data;
                    if (Array.isArray(banners)) {
                        setBanners(banners);
                        console.log('Marketplace banners loaded:', banners.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching marketplace banners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (!mounted || loading) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[400px] sm:h-[450px] lg:h-[520px] rounded-[12px] bg-gray-100 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!banners || !Array.isArray(banners) || banners.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banners.map((banner, index) => (
                        <div key={banner.id}>
                            <div className="flex flex-col justify-center items-stretch h-full">
                                <div className="w-full">
                                    <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[520px] rounded-[12px] overflow-hidden bg-gray-100">
                                        {/* Background Image */}
                                        <div className="absolute inset-0 w-full h-full">
                                            <Image
                                                src={banner.image}
                                                alt={`Banner ${banner.id}`}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-5 sm:p-6 lg:p-[30px] flex flex-wrap">
                                            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[15px] w-full h-fit">
                                                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[12px] pb-4 sm:pb-5 lg:pb-[20px] w-full">
                                                    {/* Title */}
                                                    <h2 className="w-full">
                                                        <span
                                                            className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold leading-[1.1em] tracking-[-1%] text-[#064C50] text-left block whitespace-pre-line"
                                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                            dangerouslySetInnerHTML={{ __html: banner.title }}
                                                        />
                                                    </h2>

                                                    {/* Description */}
                                                    <div className="w-full max-w-[260px] sm:max-w-[280px]">
                                                        <div
                                                            className="text-[13px] sm:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#064C50] text-left"
                                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                            dangerouslySetInnerHTML={{ __html: banner.description }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Button */}
                                                <div className="flex items-center w-full">
                                                    <Link href={banner.button_link}>
                                                        <button
                                                            className="flex justify-center items-center px-5 sm:px-6 lg:px-[20px] h-[38px] sm:h-[40px] bg-[#064C50] border border-transparent rounded-full hover:bg-[#053d41] transition-colors cursor-pointer"
                                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                        >
                                                            <span className="text-[13px] sm:text-[14px] font-medium leading-[1.4em] tracking-[-0.5%] text-white">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}