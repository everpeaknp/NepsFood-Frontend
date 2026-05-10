"use client";

import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/hooks/useProducts";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import LoginModal from "./LoginModal";

interface SaleMegaMenuProps {
    isOpen: boolean;
}

export default function SaleMegaMenu({ isOpen }: SaleMegaMenuProps) {
    const { formatPrice } = useCurrency();
    const { addToCart, addToWishlist, showLoginModal, setShowLoginModal } = useCartWishlist();
    
    // Fetch products - limit to 5 for the mega menu
    const { products: allProducts, loading } = useProducts();
    const products = allProducts.slice(0, 5);

    const handleAddToCart = async (productId: number) => {
        const result = await addToCart(productId, 1);
        if (result.success) {
            // Show success notification if needed
        }
    };

    const handleWishlistClick = async (productId: number) => {
        const result = await addToWishlist(productId);
        if (result.success) {
            // Show success notification if needed
        }
    };

    if (!isOpen) return null;

    if (loading) {
        return (
            <div className="w-full bg-white shadow-lg border-t border-gray-200">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-6">
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#064C50]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full bg-white shadow-lg border-t border-gray-200">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-6">
                    <div className="flex w-full gap-4">
                        {products.map((product) => {
                            const discount = product.price ? Math.round((1 - parseFloat(product.price) / (parseFloat(product.price) * 1.5)) * 100) : 0;
                            
                            return (
                                <div key={product.id} className="flex-1">
                                    <Link href={`/product/${product.slug}`} className="block w-full">
                                        <div className="w-full border border-[#E5E7EB] rounded-[12px] p-3 sm:p-4 group hover:shadow-lg transition-shadow duration-300">
                                            {/* Product Image */}
                                            <div className="pb-4 sm:pb-5 h-[180px] sm:h-[200px]">
                                                <div className="w-full h-full relative">
                                                    <div className="w-full h-[160px] sm:h-[180px] rounded-[10px] relative overflow-hidden">
                                                        <Image
                                                            src={product.images?.[0]?.image || '/placeholder.png'}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                        />

                                                        {/* Badge */}
                                                        {discount > 0 && (
                                                            <div className="absolute top-2 left-2 flex items-center justify-center px-2 py-[6px] bg-[#F43F5E] rounded-[8px_20px_20px_8px]">
                                                                <span
                                                                    className="text-[11px] sm:text-[12px] font-medium leading-[1.2em] tracking-[-2%] text-[#FFF1F2] uppercase text-center"
                                                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                                >
                                                                    {discount}%
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Add to Cart */}
                                                        <div className="absolute bottom-2 right-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleAddToCart(product.id);
                                                                }}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                            >
                                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
                                                                    <path d="M4.17 10H15.83M10 4.17V15.83" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        {/* Hover Action Buttons */}
                                                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                            {/* Wishlist Button */}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleWishlistClick(product.id);
                                                                }}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-[18px] sm:h-[18px]">
                                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex flex-col gap-2 sm:gap-3 h-auto sm:h-[160px]">
                                                {/* Header */}
                                                <div className="flex flex-col gap-2 sm:gap-[10px]">
                                                    {/* Rating */}
                                                    <div className="flex items-center">
                                                        <div className="flex items-end gap-[6px]">
                                                            <div className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px]">
                                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="w-full h-full">
                                                                    <path d="M6.5 0.32L8.02 4.18L12.18 4.18L8.83 6.82L10.35 10.68L6.5 8.04L2.65 10.68L4.17 6.82L0.82 4.18L4.98 4.18L6.5 0.32Z" fill="#EAB308" />
                                                                </svg>
                                                            </div>
                                                            <span
                                                                className="text-[13px] sm:text-[14px] font-normal leading-[1.4em] tracking-[-1%] text-[#757575]"
                                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                            >
                                                                ({product.rating_average?.toFixed(2) || '0.00'}/ {product.review_count || 0})
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <div className="w-full min-h-[40px] sm:h-[43.38px]">
                                                        <h3
                                                            className="text-[14px] sm:text-[16px] font-medium leading-[1.4em] tracking-[-1%] text-[#212529] line-clamp-2 cursor-pointer hover:text-[#064C50] transition-colors"
                                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                        >
                                                            {product.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="w-full">
                                                    <div className="flex items-baseline gap-[6px]">
                                                        <span
                                                            className="text-[18px] sm:text-[20px] font-bold leading-[1.3em] tracking-[-1%] text-[#15803D]"
                                                            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                                        >
                                                            {formatPrice(parseFloat(product.price))}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Footer */}
                                                <div className="w-full pt-2 sm:pt-3 border-t border-[#E5E7EB]">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex justify-between items-center w-full">
                                                            <span
                                                                className="text-[13px] sm:text-[14px] font-normal leading-[1.4em] tracking-[-1%] text-[#757575]"
                                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                            >
                                                                Quantity Left
                                                            </span>
                                                            <span
                                                                className="text-[13px] sm:text-[14px] font-medium leading-[1.4em] tracking-[-1%] text-[#F43F5E]"
                                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                            >
                                                                {product.stock}
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-[5px] bg-[#E5E7EB] rounded-[20px] overflow-hidden">
                                                            <div
                                                                className="h-full bg-[#F43F5E] rounded-[20px]"
                                                                style={{ width: `${Math.min(product.stock * 2, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Call to action text */}
                    <div className="text-center mt-4">
                        <p className="text-[14px] text-gray-500" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                            To see and take advantage of all discounted products. <Link href="/shop" className="text-[#064C50] hover:underline cursor-pointer">Click Here</Link>
                        </p>
                    </div>
                </div>
            </div>

            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    );
}
