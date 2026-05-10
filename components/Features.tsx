"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cmsAPI } from "@/lib/api";
import { Feature } from "@/types/cms";

export default function Features() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const fetchFeatures = async () => {
            try {
                const response = await cmsAPI.getFeatures();
                console.log('Features response:', response.data);
                if (response.data) {
                    const features = response.data.results || response.data;
                    if (Array.isArray(features)) {
                        setFeatures(features);
                        console.log('Features loaded:', features.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching features:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatures();
    }, []);

    if (!mounted || loading) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 w-full">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="lg:px-5">
                                <div className="h-16 bg-gray-100 animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!features || !Array.isArray(features) || features.length === 0) {
        return null;
    }
    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 w-full">
                    {features.map((feature) => (
                        <div key={feature.id} className="lg:px-5">
                            <div className="flex items-start gap-4 lg:gap-[18px] w-full">
                                {/* Icon */}
                                <div className="flex items-center justify-center flex-shrink-0">
                                    <div className="w-8 h-8">
                                        <Image
                                            src={`/icon-${feature.icon_name}.svg`}
                                            alt={feature.title}
                                            width={32}
                                            height={32}
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col gap-[1px]">
                                    <div className="w-full">
                                        <h3
                                            className="text-[15px] sm:text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-[#212529] w-full"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <div className="w-full">
                                        <div
                                            className="text-[13px] sm:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#757575] w-full"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            dangerouslySetInnerHTML={{ __html: feature.description }}
                                        />
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