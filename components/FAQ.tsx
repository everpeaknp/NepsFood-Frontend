"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cmsAPI } from "@/lib/api";
import { FAQ as FAQType } from "@/types/cms";

export default function FAQ() {
    const [faqs, setFaqs] = useState<FAQType[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [openItems, setOpenItems] = useState<number[]>([0]);

    useEffect(() => {
        setMounted(true);
        
        const fetchFAQs = async () => {
            try {
                const response = await cmsAPI.getFAQs();
                console.log('FAQs response:', response.data);
                if (response.data) {
                    const faqs = response.data.results || response.data;
                    if (Array.isArray(faqs)) {
                        setFaqs(faqs);
                        console.log('FAQs loaded:', faqs.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    const toggleAccordion = (index: number) => {
        setOpenItems(prev => {
            if (prev.includes(index)) {
                return prev.filter(item => item !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    if (!mounted || loading) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-[40px] items-start lg:items-center">
                        <div className="w-full lg:w-[420px] flex-shrink-0">
                            <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[470px] bg-gray-100 animate-pulse rounded-[12px]" />
                        </div>
                        <div className="flex-1 w-full space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-16 bg-gray-100 animate-pulse rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-[40px] items-start lg:items-center">
                    {/* Left Column - Image */}
                    <div className="w-full lg:w-[420px] flex-shrink-0">
                        <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[470px] relative rounded-[12px] overflow-hidden">
                            <Image
                                src="/faqsection.webp"
                                alt="FAQ"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column - FAQ Accordion */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col gap-[14px] sm:gap-[15px] md:gap-[16px]">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="border-b border-[#E5E7EB] pb-[14px] sm:pb-[15px] md:pb-[16px]"
                                >
                                    {/* Question */}
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex justify-between items-center gap-3 sm:gap-4 md:gap-[16px] text-left group cursor-pointer"
                                    >
                                        <h3
                                            className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-semibold leading-[1.4em] tracking-[-0.5%] text-[#212529] group-hover:text-[#064C50] transition-colors"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            {faq.question}
                                        </h3>
                                        <div className="flex-shrink-0">
                                            {openItems.includes(index) ? (
                                                <ChevronUp className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] text-[#757575]" />
                                            ) : (
                                                <ChevronDown className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] text-[#757575]" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openItems.includes(index) ? 'max-h-[500px] mt-3 sm:mt-4 md:mt-[16px]' : 'max-h-0'
                                            }`}
                                    >
                                        <div
                                            className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6em] tracking-[-0.5%] text-[#757575]"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
