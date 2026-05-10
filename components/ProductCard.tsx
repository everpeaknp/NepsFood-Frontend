"use client";

import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import { useCompareStore } from "@/stores/useCompareStore";
import { ArrowLeftRight } from "lucide-react";

interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    images: { image: string }[];
    category?: { name: string };
    stock: number;
    rating_average?: number;
    review_count: number;
    short_description?: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { formatPrice } = useCurrency();
    const { addToCart, toggleWishlist } = useCartWishlist();
    const { addToCompare, isInCompare } = useCompareStore();
    
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [wishlistActive, setWishlistActive] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setWishlistLoading(true);
        const result = await toggleWishlist(product.id);
        setWishlistLoading(false);

        if (result.success) {
            setWishlistActive(result.inWishlist || false);
        }
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setCartLoading(true);
        await addToCart(product.id, 1);
        setCartLoading(false);
    };

    const handleAddToCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCompare(product);
    };

    const inCompare = isInCompare(product.id);

    return (
        <Link href={`/product/${product.slug}`} className="group block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                        src={product.images?.[0]?.image || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Stock Badge */}
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                            Only {product.stock} left
                        </div>
                    )}
                    
                    {product.stock === 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Out of Stock
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistClick}
                        disabled={wishlistLoading}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                        {wishlistLoading ? (
                            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : wishlistActive ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" className="text-red-500">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        )}
                    </button>

                    {/* Compare Button */}
                    <button
                        onClick={handleAddToCompare}
                        className={`absolute top-[52px] right-2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-colors z-10 ${
                            inCompare ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white hover:bg-blue-50'
                        }`}
                        title={inCompare ? 'Already in compare' : 'Add to compare'}
                    >
                        <ArrowLeftRight className={`w-4 h-4 ${inCompare ? 'text-white' : 'text-gray-600'}`} />
                    </button>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={cartLoading || product.stock === 0}
                        className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        {cartLoading ? (
                            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{product.category?.name}</p>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-[#064C50] transition-colors">
                        {product.name}
                    </h3>
                    
                    {/* Rating */}
                    {product.review_count > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-gray-600">
                                {product.rating_average?.toFixed(1)} ({product.review_count})
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#15803D]">
                            {formatPrice(parseFloat(product.price))}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
