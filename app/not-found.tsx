"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* 404 Section */}
            <main className="w-full py-16 md:py-24">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">

                        {/* 404 Illustration */}
                        <div className="relative mb-8">
                            {/* "oops!" text */}
                            <div className="mb-4">
                                <span
                                    className="text-[#FF4444] text-2xl md:text-3xl font-medium"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    oops!
                                </span>
                            </div>

                            {/* 404 Numbers */}
                            <div className="flex items-center justify-center">
                                <span
                                    className="text-[#FF4444] text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    404
                                </span>
                            </div>

                            {/* Dotted line */}
                            <div className="w-full max-w-md mx-auto mt-6 mb-8">
                                <div className="border-t-2 border-dotted border-gray-300"></div>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-4">
                            <h1
                                className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                That Page Cant Be Found
                            </h1>

                            <p
                                className="text-gray-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                It looks like nothing was found at this location. Maybe try to search for what you are looking for?
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full max-w-md mx-auto mt-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent text-base"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#064C50] text-white px-4 py-2 rounded-md hover:bg-[#053d41] transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Back to Home Button */}
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 bg-[#064C50] text-white font-medium rounded-lg hover:bg-[#053d41] transition-colors"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />
        </div>
    );
}