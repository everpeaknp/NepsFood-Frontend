"use client";

import Image from "next/image";
import { Phone } from "lucide-react";

export default function Footer1() {
    return (
        <section className="w-full bg-white py-6 lg:py-8">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 border-t border-[#E5E7EB] pt-6 lg:pt-8">
                    {/* Left Column - App Download */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                        <div
                            className="flex flex-col sm:flex-row items-center gap-6"
                        >
                            {/* App Icons */}
                            <div className="flex flex-row items-center gap-1">
                                {/* App Store Button */}
                                <a href="#" className="block">
                                    <div
                                        className="relative"
                                        style={{ width: "120px", height: "36px" }}
                                    >
                                        <Image
                                            src="/app-store-button-1d9f7d.png"
                                            alt="Download on the App Store"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>

                                {/* Google Play Button */}
                                <a href="#" className="block">
                                    <div
                                        className="relative"
                                        style={{ width: "120px", height: "36px" }}
                                    >
                                        <Image
                                            src="/google-play-button-1d9f7d.png"
                                            alt="Get it on Google Play"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>
                            </div>

                            {/* App Detail */}
                            <div className="flex flex-col items-center sm:items-start gap-1">
                                {/* Title */}
                                <div className="flex flex-col">
                                    <h4
                                        className="text-[14px] sm:text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-center sm:text-left text-[#212529]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Download our app
                                    </h4>
                                </div>

                                {/* Subtitle */}
                                <div className="flex flex-col">
                                    <p
                                        className="text-[12px] sm:text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-center sm:text-left text-[#6B7280]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Download App Get -10% Discount
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Phone Contact */}
                    <div className="flex flex-row justify-center lg:justify-end items-center w-full lg:w-auto">
                        <div className="flex flex-row items-center gap-4">
                            {/* Phone Icon */}
                            <div
                                className="flex flex-row justify-center items-center bg-[rgba(6,76,80,0.1)] rounded-[24px]"
                                style={{ width: "48px", height: "48px" }}
                            >
                                <Phone className="w-[24px] h-[24px] text-[#064C50]" />
                            </div>

                            {/* Phone Detail */}
                            <div className="flex flex-col items-start gap-1">
                                {/* Phone Number */}
                                <div className="flex flex-col">
                                    <h4
                                        className="text-[20px] sm:text-[24px] font-bold leading-[1.2em] tracking-[-0.5%] text-left text-[#064C50]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        +91 289 87 21
                                    </h4>
                                </div>

                                {/* Phone Description */}
                                <div className="flex flex-col">
                                    <p
                                        className="text-[12px] sm:text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-left text-[#6B7280]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Contact us by calling the Helpline 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
