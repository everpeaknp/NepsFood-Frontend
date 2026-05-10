"use client";

import { useFooterData } from "@/hooks/useFooterData";

export default function Footer3() {
    const { siteSettings, loading } = useFooterData();

    if (loading) {
        return (
            <footer className="w-full bg-[#F9FAFB] py-6 lg:py-8">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <p className="text-center text-gray-600">Loading...</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="w-full bg-[#F9FAFB] py-6 lg:py-8">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                {/* Newsletter Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-6 w-full">
                    {/* Left Side - Text Content */}
                    <div className="flex flex-col gap-2 w-full lg:max-w-[520px]">
                        <h2
                            className="text-[20px] sm:text-[24px] font-bold leading-[1.2em] tracking-[-0.5%] text-[#212529]"
                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                            {siteSettings?.newsletter_title || 'Join the Supgor Club!'}
                        </h2>
                        <div
                            className="text-[13px] sm:text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-[#6B7280]"
                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            dangerouslySetInnerHTML={{ 
                                __html: siteSettings?.newsletter_description || 
                                "Whether you're welcoming new contacts or sharing the latest news, you can make your business look good in just a few clicks." 
                            }}
                        />
                    </div>

                    {/* Right Side - Email Subscription */}
                    <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[380px]">
                        {/* Email Input and Button */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full sm:flex-1 lg:w-[320px] px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-[14px] font-normal text-[#6B7280] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            />
                            <button
                                className="w-full sm:w-auto px-6 py-3 bg-[#064C50] text-white rounded-lg text-[14px] font-medium hover:bg-[#053a3d] transition-colors whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                Subscribe
                            </button>
                        </div>

                        {/* Terms Text */}
                        <p
                            className="text-[11px] sm:text-[12px] font-normal leading-[1.4em] tracking-[-0.5%] text-[#9CA3AF]"
                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                            By subscribing you agree to our{' '}
                            <a href="#" className="text-[#064C50] hover:underline">Terms & Conditions</a>
                            {' '}and{' '}
                            <a href="#" className="text-[#064C50] hover:underline">Privacy & Cookies Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
