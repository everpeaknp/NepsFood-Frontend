"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useCategories } from "@/hooks/useCategories";

export default function ShopByCategories() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    
    // Fetch categories from API
    const { categories: apiCategories, loading, error } = useCategories();
    
    // Ensure categories is always an array
    const categories = Array.isArray(apiCategories) ? apiCategories : [];

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    // Show loading state
    if (loading) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50]"></div>
                    </div>
                </div>
            </section>
        );
    }

    // Show error state
    if (error) {
        return (
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="text-center py-12">
                        <p className="text-red-500">Failed to load categories</p>
                    </div>
                </div>
            </section>
        );
    }

    // Don't render if no categories
    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="w-full flex flex-col gap-5 sm:gap-6 lg:gap-[30px]">
                    {/* Header */}
                    <div className="flex justify-between items-center w-full">
                        {/* Title Column */}
                        <div className="flex-1 flex items-center">
                            <div className="w-full">
                                <h2 className="w-full">
                                    <span
                                        className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold leading-[1] tracking-[-1%] text-[#111827] text-left block"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Shop by Categories
                                    </span>
                                </h2>
                            </div>
                        </div>

                        {/* View All Column */}
                        <div className="flex items-center">
                            <Link
                                href="/shop"
                                className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.4em] tracking-[-0.5%] text-[#064C50] hover:text-[#053d41] transition-colors"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                View All
                            </Link>
                        </div>
                    </div>

                    {/* Categories Slider */}
                    <div className="w-full">
                        <div className="w-full border border-[#F3F4F6] rounded-[12px] bg-white overflow-hidden">
                            <div
                                ref={scrollContainerRef}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseLeave}
                                className={`flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            >
                                {categories.map((category, index) => (
                                    <div key={category.id} className="flex-shrink-0 w-[140px] sm:w-[160px] lg:flex-1 relative">
                                        <div className="flex flex-col items-stretch">
                                            <Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="flex flex-col gap-2 sm:gap-3 lg:gap-[10px] p-4 sm:p-5 lg:p-[20px] hover:bg-gray-50 transition-colors">
                                                {/* Category Thumbnail */}
                                                <div className="flex justify-center items-center bg-[#F3F4F6] rounded-[8px] p-2 sm:p-3 lg:p-[10px]">
                                                    <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] relative">
                                                        {category.image ? (
                                                            <Image
                                                                src={category.image}
                                                                alt={category.name}
                                                                fill
                                                                className="object-cover rounded-[4px]"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-[4px]">
                                                                <span className="text-gray-400 text-xs">No Image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Category Name */}
                                                <div className="flex flex-col items-center">
                                                    <h4 className="text-center">
                                                        <span
                                                            className="text-[13px] sm:text-[14px] font-medium leading-[1] tracking-[-0.5%] text-[#374151] group-hover:text-[#064C50] transition-colors line-clamp-2"
                                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                        >
                                                            {category.name}
                                                        </span>
                                                    </h4>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Divider (except for last item) */}
                                        {index < categories.length - 1 && (
                                            <div className="absolute top-[10px] bottom-[10px] right-0 w-[1px] bg-[#E5E7EB]"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}