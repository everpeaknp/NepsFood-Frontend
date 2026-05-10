'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import FeaturesInfo from "@/components/FeaturesInfo";
import Image from "next/image";
import { cmsAPI } from '@/lib/api';
import type { AboutHero, AboutSection, AboutImage } from '@/types/cms';

export default function AboutPage() {
    const [hero, setHero] = useState<AboutHero | null>(null);
    const [sections, setSections] = useState<AboutSection[]>([]);
    const [images, setImages] = useState<AboutImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const [heroRes, sectionsRes, imagesRes] = await Promise.all([
                    cmsAPI.getAboutHero().catch(() => ({ data: null })),
                    cmsAPI.getAboutSections().catch(() => ({ data: { results: [] } })),
                    cmsAPI.getAboutImages().catch(() => ({ data: { results: [] } })),
                ]);

                setHero(heroRes.data);
                // Backend returns paginated response with results array
                setSections(sectionsRes.data.results || sectionsRes.data || []);
                setImages(imagesRes.data.results || imagesRes.data || []);
            } catch (error) {
                console.error('Failed to fetch about data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center py-20">
                    <p className="text-gray-600">Loading...</p>
                </div>
                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        );
    }

    const getImageUrl = (url: string | null) => {
        if (!url) return '/abouthero.jpg';
        return url.startsWith('http') ? url : `http://localhost:8000${url}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section with Background Image */}
            <section className="relative w-full h-[400px] overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={getImageUrl(hero?.background_image || null)}
                        alt={hero?.title || "About Us"}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                    <h1
                        className="text-[48px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.2em] text-white mb-4 text-center"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        {hero?.title || "About Us"}
                    </h1>
                    <p
                        className="text-[16px] sm:text-[18px] font-normal leading-[1.6em] text-white/90 max-w-[800px] text-center"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        {hero?.subtitle || ""}
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <FeaturesInfo />

            {/* Dynamic About Sections */}
            {sections.map((section) => (
                <section key={section.id} className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                        <div className="max-w-[1340px] mx-auto">
                            <div className="flex flex-col lg:flex-row items-start lg:items-start" style={{ gap: 'clamp(30px, 8vw, 107.59px)' }}>
                                {/* Left Column - Label */}
                                {section.label && (
                                    <div className="w-full lg:w-auto lg:flex-shrink-0">
                                        <span
                                            className="block text-left"
                                            style={{
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 300,
                                                fontSize: '12px',
                                                lineHeight: '1.5em',
                                                letterSpacing: '-2%',
                                                textTransform: 'uppercase',
                                                color: '#757575',
                                            }}
                                        >
                                            {section.label}
                                        </span>
                                    </div>
                                )}

                                {/* Right Column - Main Content */}
                                <div className="w-full flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2vw, 20px)' }}>
                                    {/* Heading */}
                                    {section.heading && (
                                        <h2
                                            className="text-left"
                                            style={{
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 600,
                                                fontSize: 'clamp(20px, 2.5vw, 28px)',
                                                lineHeight: '1.4em',
                                                letterSpacing: '-1%',
                                                color: '#212529',
                                                margin: 0,
                                            }}
                                        >
                                            {section.heading}
                                        </h2>
                                    )}

                                    {/* Content */}
                                    <div
                                        className="text-left prose prose-sm max-w-none"
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 300,
                                            fontSize: 'clamp(15px, 1.5vw, 17.3px)',
                                            lineHeight: '1.6647em',
                                            letterSpacing: '-2.31%',
                                            color: '#212529',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />

                                    {/* Statistics if available */}
                                    {section.statistics && section.statistics.length > 0 && (
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-4">
                                            {section.statistics.map((stat) => (
                                                <div key={stat.id} className="text-left">
                                                    <div
                                                        style={{
                                                            fontFamily: 'Inter, sans-serif',
                                                            fontWeight: 300,
                                                            fontSize: 'clamp(48px, 6vw, 80px)',
                                                            lineHeight: '1.2em',
                                                            color: '#E8E8E8',
                                                            marginBottom: 'clamp(8px, 1vw, 12px)',
                                                        }}
                                                    >
                                                        {stat.number}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontFamily: 'Inter, sans-serif',
                                                            fontWeight: 400,
                                                            fontSize: 'clamp(13px, 1.2vw, 15px)',
                                                            lineHeight: '1.5em',
                                                            color: '#212529',
                                                        }}
                                                    >
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Images Section */}
            {images.length > 0 && (
                <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                        <div className="max-w-[1340px] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                                {images.map((img) => (
                                    <div key={img.id} className="w-full">
                                        <div className="relative w-full" style={{ paddingBottom: '103.64%' }}>
                                            <Image
                                                src={getImageUrl(img.image)}
                                                alt={img.alt_text}
                                                fill
                                                className="object-cover"
                                                style={{ borderRadius: '12px' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />
        </div>
    );
}
