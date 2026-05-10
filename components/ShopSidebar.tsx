"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCategories } from "@/hooks/useCategories";

export default function ShopSidebar({
    selectedCategory,
    selectedCategories: externalSelectedCategories,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    maxProductPrice = 30
}: {
    selectedCategory: string | null;
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    priceRange: { min: number; max: number };
    onPriceRangeChange: (range: { min: number; max: number }) => void;
    maxProductPrice?: number;
}) {
    const { formatPrice, currency } = useCurrency();
    const { categories: apiCategories, loading: categoriesLoading } = useCategories();
    const USD_TO_NPR = 132;

    // Calculate min/max based on currency - max is highest product price + 10
    const minPrice = 0;
    const maxPrice = currency === 'USD'
        ? Math.ceil(maxProductPrice + 10)
        : Math.ceil((maxProductPrice + 10) * USD_TO_NPR);

    const [localPriceMin, setLocalPriceMin] = useState(priceRange.min);
    const [localPriceMax, setLocalPriceMax] = useState(priceRange.max);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Convert API categories to the format expected by the component
    const categories = Array.isArray(apiCategories) ? apiCategories.map(cat => ({
        name: cat.name,
        hasSubmenu: false,
        subcategories: []
    })) : [];

    // Debounced filter update function
    const debouncedFilterUpdate = useCallback((min: number, max: number) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const usdMin = currency === 'NPR' ? min / USD_TO_NPR : min;
            const usdMax = currency === 'NPR' ? max / USD_TO_NPR : max;
            onPriceRangeChange({ min: usdMin, max: usdMax });
        }, 300); // 300ms delay
    }, [currency, onPriceRangeChange, USD_TO_NPR]);

    // Update local prices when currency changes
    useEffect(() => {
        if (currency === 'NPR') {
            setLocalPriceMin(priceRange.min * USD_TO_NPR);
            setLocalPriceMax(priceRange.max * USD_TO_NPR);
        } else {
            setLocalPriceMin(priceRange.min);
            setLocalPriceMax(priceRange.max);
        }
    }, [currency, priceRange.min, priceRange.max]);

    // Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const handleMinSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const value = Math.round((percent / 100) * maxPrice);
        if (value < localPriceMax) {
            setLocalPriceMin(value);
            debouncedFilterUpdate(value, localPriceMax);
        }
    };

    const handleMaxSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const value = Math.round((percent / 100) * maxPrice);
        if (value > localPriceMin) {
            setLocalPriceMax(value);
            debouncedFilterUpdate(localPriceMin, value);
        }
    };

    const applyPriceFilter = () => {
        // Clear any pending debounced updates
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        // Immediately apply filter
        const usdMin = currency === 'NPR' ? localPriceMin / USD_TO_NPR : localPriceMin;
        const usdMax = currency === 'NPR' ? localPriceMax / USD_TO_NPR : localPriceMax;
        onPriceRangeChange({ min: usdMin, max: usdMax });
    };

    const handleMinInputChange = (value: number) => {
        const clampedValue = Math.max(minPrice, Math.min(value, localPriceMax - 1));
        setLocalPriceMin(clampedValue);
        debouncedFilterUpdate(clampedValue, localPriceMax);
    };

    const handleMaxInputChange = (value: number) => {
        const clampedValue = Math.max(localPriceMin + 1, Math.min(value, maxPrice));
        setLocalPriceMax(clampedValue);
        debouncedFilterUpdate(localPriceMin, clampedValue);
    };

    const toggleCategory = (categoryName: string) => {
        if (expandedCategories.includes(categoryName)) {
            setExpandedCategories(expandedCategories.filter(c => c !== categoryName));
        } else {
            setExpandedCategories([...expandedCategories, categoryName]);
        }
    };

    const toggleCategorySelection = (categoryName: string) => {
        let newCategories: string[];
        if (externalSelectedCategories.includes(categoryName)) {
            newCategories = externalSelectedCategories.filter(c => c !== categoryName);
        } else {
            newCategories = [...externalSelectedCategories, categoryName];
        }
        onCategoryChange(newCategories);
    };

    const toggleSubcategorySelection = (subcategoryName: string) => {
        if (selectedSubcategories.includes(subcategoryName)) {
            setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcategoryName));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategoryName]);
        }
    };

    return (
        <div className="w-full max-w-full overflow-x-hidden">
            {/* Product Categories */}
            <div className="mb-8">
                <h3 className="text-[#212529] text-[20px] font-semibold mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Product Categories
                </h3>
                {categoriesLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#064C50]"></div>
                    </div>
                ) : (
                    <div className="space-y-0">
                        {categories.map((category) => (
                        <div key={category.name}>
                            {/* Main Category */}
                            <div className="flex items-center justify-between py-2 group">
                                <label className="flex items-center gap-3 cursor-pointer flex-1">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={externalSelectedCategories.includes(category.name)}
                                            onChange={() => toggleCategorySelection(category.name)}
                                            className="w-4 h-4 border-2 border-gray-300 rounded-md appearance-none cursor-pointer checked:bg-[#064C50] checked:border-[#064C50] transition-all"
                                        />
                                        {externalSelectedCategories.includes(category.name) && (
                                            <Check className="w-3 h-3 text-white absolute pointer-events-none" strokeWidth={3} />
                                        )}
                                    </div>
                                    <span
                                        className="text-[14px] font-normal text-[#4B5563]"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {category.name}
                                    </span>
                                </label>
                                {category.hasSubmenu && (
                                    <button
                                        onClick={() => toggleCategory(category.name)}
                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    >
                                        {expandedCategories.includes(category.name) ? (
                                            <Minus className="w-3.5 h-3.5 text-[#6B7280]" />
                                        ) : (
                                            <Plus className="w-3.5 h-3.5 text-[#6B7280]" />
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Subcategories */}
                            {category.hasSubmenu && expandedCategories.includes(category.name) && category.subcategories.length > 0 && (
                                <div className="ml-7 space-y-0 mb-1">
                                    {category.subcategories.map((subcategory) => (
                                        <label key={subcategory} className="flex items-center gap-3 py-1.5 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => toggleSubcategorySelection(subcategory)}
                                                    className="w-4 h-4 border-2 border-gray-300 rounded-md appearance-none cursor-pointer checked:bg-[#064C50] checked:border-[#064C50] transition-all"
                                                />
                                                {selectedSubcategories.includes(subcategory) && (
                                                    <Check className="w-3 h-3 text-white absolute pointer-events-none" strokeWidth={3} />
                                                )}
                                            </div>
                                            <span
                                                className="text-[13px] font-normal text-[#6B7280]"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                {subcategory}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Widget Price Filter */}
            <div className="mb-8">
                <h3 className="text-[#212529] text-[20px] font-semibold mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Widget price filter
                </h3>

                {/* Range Slider */}
                <div className="relative mb-8" ref={sliderRef}>
                    <div className="h-[3px] bg-gray-200 rounded-full relative">
                        <div
                            className="h-[3px] bg-[#064C50] rounded-full absolute"
                            style={{
                                left: `${(localPriceMin / maxPrice) * 100}%`,
                                width: `${((localPriceMax - localPriceMin) / maxPrice) * 100}%`
                            }}
                        ></div>
                    </div>
                    <div
                        className="absolute -top-[5px] w-[13px] h-[13px] bg-[#064C50] rounded-full border-[3px] border-white shadow-lg cursor-pointer"
                        style={{ left: `calc(${(localPriceMin / maxPrice) * 100}% - 6.5px)` }}
                        onMouseDown={(e) => {
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                if (!sliderRef.current) return;
                                const rect = sliderRef.current.getBoundingClientRect();
                                const percent = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100));
                                const value = Math.round((percent / 100) * maxPrice);
                                if (value < localPriceMax) {
                                    setLocalPriceMin(value);
                                    debouncedFilterUpdate(value, localPriceMax);
                                }
                            };
                            const handleMouseUp = () => {
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                            };
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                        }}
                    ></div>
                    <div
                        className="absolute -top-[5px] w-[13px] h-[13px] bg-[#064C50] rounded-full border-[3px] border-white shadow-lg cursor-pointer"
                        style={{ left: `calc(${(localPriceMax / maxPrice) * 100}% - 6.5px)` }}
                        onMouseDown={(e) => {
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                if (!sliderRef.current) return;
                                const rect = sliderRef.current.getBoundingClientRect();
                                const percent = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100));
                                const value = Math.round((percent / 100) * maxPrice);
                                if (value > localPriceMin) {
                                    setLocalPriceMax(value);
                                    debouncedFilterUpdate(localPriceMin, value);
                                }
                            };
                            const handleMouseUp = () => {
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                            };
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                        }}
                    ></div>
                </div>

                {/* Price Inputs */}
                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="number"
                        value={Math.round(localPriceMin)}
                        onChange={(e) => handleMinInputChange(Number(e.target.value))}
                        placeholder="Min"
                        className="w-[140px] px-4 py-2.5 border border-gray-300 rounded-xl text-[15px] text-[#4B5563] focus:outline-none focus:border-[#064C50] transition-colors"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <span className="text-[#4B5563] text-[16px] font-normal">-</span>
                    <input
                        type="number"
                        value={Math.round(localPriceMax)}
                        onChange={(e) => handleMaxInputChange(Number(e.target.value))}
                        placeholder="Max"
                        className="w-[140px] px-4 py-2.5 border border-gray-300 rounded-xl text-[15px] text-[#4B5563] focus:outline-none focus:border-[#064C50] transition-colors"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                </div>

                {/* Price Display and Filter Button */}
                <div className="flex items-center justify-between">
                    <span className="text-[#4B5563] text-[16px] font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Price: {currency === 'USD' ? `$${localPriceMin.toFixed(2)}` : `NPR ${Math.round(localPriceMin)}`} — {currency === 'USD' ? `$${localPriceMax.toFixed(2)}` : `NPR ${Math.round(localPriceMax)}`}
                    </span>
                    <button
                        onClick={applyPriceFilter}
                        className="px-8 py-3 bg-[#064C50] text-white text-[16px] font-medium rounded-2xl hover:bg-[#053d41] transition-colors cursor-pointer"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Filter
                    </button>
                </div>
            </div>

        </div>
    );
}
