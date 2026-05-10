"use client";

import { useFooterData } from "@/hooks/useFooterData";

export default function CopyrightFooter() {
    const { siteSettings, loading } = useFooterData();

    if (loading) {
        return (
            <section className="w-full bg-[#F9FAFB] py-6 lg:py-8">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <p className="text-center text-gray-600 text-sm">Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-[#F9FAFB] py-6 lg:py-8">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 border-t border-[#E5E7EB] pt-6 lg:pt-8">
                    {/* Left Column - Copyright Text */}
                    <div className="flex flex-col w-full sm:w-auto">
                        <p
                            className="text-center sm:text-left text-[12px] sm:text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-[#6B7280]"
                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                            {siteSettings?.copyright_text || 'Copyright 2026 © Supgor WordPress Theme. All right reserved. Powered by KLBTheme.'}
                        </p>
                    </div>

                    {/* Right Column - Payment Icons */}
                    <div className="flex flex-col w-full sm:w-auto">
                        <div className="flex flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4">
                            {/* Mastercard */}
                            <div className="py-1.5">
                                <div className="flex flex-col justify-center items-center w-[30px] sm:w-[36px] h-[18px] sm:h-[22px]">
                                    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <circle cx="7.4" cy="7.4" r="7.4" fill="#DD3D31" />
                                        <circle cx="16.6" cy="7.4" r="7.4" fill="#EEB046" />
                                        <path d="M12 2.6C13.5 3.8 14.5 5.5 14.5 7.4C14.5 9.3 13.5 11 12 12.2C10.5 11 9.5 9.3 9.5 7.4C9.5 5.5 10.5 3.8 12 2.6Z" fill="#EF7D2F" />
                                    </svg>
                                </div>
                            </div>

                            {/* Visa */}
                            <div className="py-1.5">
                                <div className="flex flex-col justify-center items-center w-[45px] sm:w-[54px] h-[16px] sm:h-[19px]">
                                    <svg width="36" height="13" viewBox="0 0 36 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <rect width="36" height="12" rx="2" fill="url(#visa-gradient)" />
                                        <text x="3" y="9" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">VISA</text>
                                        <defs>
                                            <linearGradient id="visa-gradient" x1="0" y1="0" x2="36" y2="0">
                                                <stop offset="4%" stopColor="#2C3572" />
                                                <stop offset="98%" stopColor="#3C62AB" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {/* PayPal */}
                            <div className="flex flex-col justify-center items-center w-[66px] sm:w-[79px] h-[18px] sm:h-[22px]">
                                <svg width="53" height="15" viewBox="0 0 53 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <path d="M9.71 0H0L0 11.16L9.71 11.16C12 11.16 14 9.16 14 6.58C14 4 12 0 9.71 0Z" fill="#283B82" />
                                    <path d="M18.54 3.54H9.11L9.11 11.35L18.54 11.35C20.5 11.35 22 9.85 22 7.95C22 6.05 20.5 3.54 18.54 3.54Z" fill="#469BDB" />
                                    <path d="M28.81 3.73H19.51L19.51 13.77L28.81 13.77C30.7 13.77 32.2 12.27 32.2 10.75C32.2 9.23 30.7 3.73 28.81 3.73Z" fill="#283B82" />
                                    <path d="M38.38 0H28.66L28.66 11.16L38.38 11.16C40.67 11.16 42.67 9.16 42.67 6.58C42.67 4 40.67 0 38.38 0Z" fill="#469BDB" />
                                    <path d="M47.21 3.54H37.77L37.77 11.35L47.21 11.35C49.17 11.35 50.67 9.85 50.67 7.95C50.67 6.05 49.17 3.54 47.21 3.54Z" fill="#283B82" />
                                    <path d="M51.66 0.01H47.49L47.49 11.17L51.66 11.17C52.5 11.17 53.17 10.5 53.17 9.59C53.17 8.68 52.5 0.01 51.66 0.01Z" fill="#469BDB" />
                                </svg>
                            </div>

                            {/* Skrill */}
                            <div className="flex flex-col justify-center items-center w-[51px] sm:w-[61px] h-[18px] sm:h-[22px]">
                                <svg width="41" height="15" viewBox="0 0 41 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <rect x="0.5" y="0.6" width="40" height="14" rx="2" fill="#862565" />
                                    <text x="5" y="10" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">Skrill</text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
