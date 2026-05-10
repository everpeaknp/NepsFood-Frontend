'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import Image from "next/image";
import { cmsAPI } from '@/lib/api';
import type { FAQ } from '@/types/cms';

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await cmsAPI.getFAQs();
                // Backend returns paginated response with results array
                setFaqs(response.data.results || response.data);
            } catch (error) {
                console.error('Failed to fetch FAQs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section with Background Image */}
            <section className="relative w-full h-[400px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/abouthero.jpg"
                        alt="FAQ"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                    <h1
                        className="text-[48px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.2em] text-white text-center"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        FAQ
                    </h1>
                </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="w-full py-16 px-4">
                <div className="max-w-[1200px] mx-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Loading FAQs...</p>
                        </div>
                    ) : faqs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No FAQs available at the moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-lg font-medium text-gray-900">
                                            {faq.question}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                                openIndex === index ? 'transform rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                            <p className="text-gray-700 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />
        </div>
    );
}
