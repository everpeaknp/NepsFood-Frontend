"use client";

import Image from "next/image";
import { useHeaderData } from "@/hooks/useHeaderData";

interface CategoriesMegaMenuProps {
    isOpen: boolean;
}

export default function CategoriesMegaMenu({ isOpen }: CategoriesMegaMenuProps) {
    const { megaMenuCategories, categories, megaMenuSettings, loading } = useHeaderData();

    const getImageUrl = (url: string | null | undefined, fallback: string) => {
        if (!url) return fallback;
        return url.startsWith('http') ? url : `http://localhost:8000${url}`;
    };

    if (!isOpen) return null;

    // Show loading state
    if (loading) {
        return (
            <div className="w-full bg-white shadow-lg border-t border-gray-200">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-6">
                    <div className="text-center text-gray-400">Loading...</div>
                </div>
            </div>
        );
    }

    // Use dynamic categories, fallback to regular categories, or fallback to static
    let displayCategories = megaMenuCategories.length > 0 
        ? megaMenuCategories 
        : categories.length > 0 
            ? categories.slice(0, 9).map(c => ({
                id: c.id,
                category_name: c.name,
                category_slug: c.slug,
                category_image: c.image,
                order: 0
            }))
            : [
                { id: 1, category_name: "Bakery", category_slug: "bakery", category_image: "/categ1.png", order: 1 },
                { id: 2, category_name: "Beverages", category_slug: "beverages", category_image: "/categ2.png", order: 2 },
                { id: 3, category_name: "Dairy & Eggs", category_slug: "dairy-eggs", category_image: "/categ3.png", order: 3 },
                { id: 4, category_name: "Deli", category_slug: "deli", category_image: "/categ4.png", order: 4 },
                { id: 5, category_name: "Frozen Foods", category_slug: "frozen-foods", category_image: "/categ5.png", order: 5 },
                { id: 6, category_name: "Fruits & Vegetables", category_slug: "fruits-vegetables", category_image: "/categ6.png", order: 6 },
                { id: 7, category_name: "Healthcare", category_slug: "healthcare", category_image: "/categ7.png", order: 7 },
                { id: 8, category_name: "Meat & Seafood", category_slug: "meat-seafood", category_image: "/categ8.png", order: 8 },
                { id: 9, category_name: "Snacks", category_slug: "snacks", category_image: "/categ9.png", order: 9 },
            ];

    if (displayCategories.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white shadow-lg border-t border-gray-200">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-8">
                <div className="w-full bg-white">
                    <div className="flex w-full justify-between gap-4">
                        {displayCategories.map((category) => (
                            <div key={category.id} className="flex-1 max-w-[120px]">
                                <div className="flex flex-col items-center">
                                    <a href={`/shop?category=${encodeURIComponent(category.category_name)}`} className="flex flex-col gap-4 group w-full items-center">
                                        {/* Category Thumbnail */}
                                        <div className="flex justify-center items-center bg-[#F3F4F6] rounded-xl p-4 w-full aspect-square transition-transform group-hover:scale-105">
                                            <div className="w-full h-full relative">
                                                <Image
                                                    src={getImageUrl(category.category_image, '/categ1.png')}
                                                    alt={category.category_name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Category Name */}
                                        <div className="flex flex-col items-center">
                                            <h4 className="text-center">
                                                <span
                                                    className="text-[13px] font-semibold text-[#374151] group-hover:text-teal-600 transition-colors line-clamp-1"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                >
                                                    {category.category_name}
                                                </span>
                                            </h4>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic description text */}
                {megaMenuSettings && megaMenuSettings.description_text && (
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-[14px] text-gray-500" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                            {megaMenuSettings.description_text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
