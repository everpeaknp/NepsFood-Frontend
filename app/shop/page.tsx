"use client";

import Header from "@/components/Header";
import ShopSidebar from "@/components/ShopSidebar";
import ProductGrid from "@/components/ProductGrid";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ShopPage() {
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get('category');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        urlCategory ? [urlCategory] : []
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Calculate max product price (hardcoded for now, should match ProductGrid)
    const maxProductPrice = 24.99; // This is the highest price in the product list
    const [priceRange, setPriceRange] = useState({ min: 0, max: maxProductPrice + 10 });

    // Update selected categories when URL changes
    useEffect(() => {
        if (urlCategory) {
            setSelectedCategories([urlCategory]);
        } else {
            setSelectedCategories([]);
        }
    }, [urlCategory]);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="max-w-[1400px] mx-auto px-4 py-4 lg:py-8">
                <div className="flex gap-8 items-start">
                    {/* Left Sidebar - Hidden on mobile, slide-in panel */}
                    {/* Sidebar */}
                    <aside className={`
                        fixed lg:sticky top-0 left-0 h-screen lg:h-fit
                        w-[280px] flex-shrink-0 bg-white z-50
                        transform transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                        lg:translate-x-0 lg:top-8 lg:shadow-none
                        overflow-y-auto overflow-x-hidden
                        lg:self-start
                    `}>
                        {/* Close button for mobile */}
                        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="p-4 lg:p-0">
                            <ShopSidebar
                                selectedCategory={urlCategory}
                                selectedCategories={selectedCategories}
                                onCategoryChange={setSelectedCategories}
                                priceRange={priceRange}
                                onPriceRangeChange={setPriceRange}
                                maxProductPrice={maxProductPrice}
                            />
                        </div>
                    </aside>

                    {/* Main Content Area - Product Grid */}
                    <div className="flex-1 min-w-0 w-full">
                        <ProductGrid
                            selectedCategories={selectedCategories}
                            onFilterClick={() => setIsSidebarOpen(true)}
                            priceRange={priceRange}
                        />
                    </div>
                </div>
            </div>

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />
        </div>
    );
}
