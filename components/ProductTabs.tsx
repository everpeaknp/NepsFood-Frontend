"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReviewsSection from "./ReviewsSection";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/hooks/useProducts";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import LoginModal from "./LoginModal";

interface ProductTabsProps {
    productSlug: string;
    reviewCount?: number;
    productDescription?: string;
}

export default function ProductTabs({ productSlug, reviewCount = 0, productDescription }: ProductTabsProps) {
    const { formatPrice } = useCurrency();
    const [activeTab, setActiveTab] = useState('description');

    // Fetch products from API for "More Products" tab
    const { products: moreProducts, loading, error } = useProducts();
    
    // Cart and Wishlist hooks
    const { addToCart, toggleWishlist, showLoginModal, setShowLoginModal } = useCartWishlist();
    
    // Local state for UI
    const [wishlistLoading, setWishlistLoading] = useState<{ [key: number]: boolean }>({});
    const [wishlistItems, setWishlistItems] = useState<{ [key: number]: boolean }>({});
    const [showWishlistModal, setShowWishlistModal] = useState(false);
    const [modalProduct, setModalProduct] = useState<{ id: number; name: string } | null>(null);
    const [cartLoading, setCartLoading] = useState<{ [key: number]: boolean }>({});
    const [showCartNotification, setShowCartNotification] = useState(false);
    const [cartNotificationProduct, setCartNotificationProduct] = useState<{ name: string; quantity: number } | null>(null);

    const handleWishlistClick = async (e: React.MouseEvent, productId: number, productName: string) => {
        e.preventDefault();
        e.stopPropagation();

        setWishlistLoading(prev => ({ ...prev, [productId]: true }));
        
        const result = await toggleWishlist(productId);
        
        setWishlistLoading(prev => ({ ...prev, [productId]: false }));

        if (result.success) {
            setWishlistItems(prev => ({ ...prev, [productId]: result.inWishlist || false }));
            
            if (result.inWishlist) {
                setModalProduct({ id: productId, name: productName });
                setShowWishlistModal(true);
            }
        }
    };

    const handleAddToCart = async (e: React.MouseEvent, productId: number, productName: string) => {
        e.preventDefault();
        e.stopPropagation();

        setCartLoading(prev => ({ ...prev, [productId]: true }));
        
        const result = await addToCart(productId, 1);
        
        setCartLoading(prev => ({ ...prev, [productId]: false }));

        if (result.success) {
            setCartNotificationProduct({ name: productName, quantity: 1 });
            setShowCartNotification(true);
            setTimeout(() => setShowCartNotification(false), 4000);
        } else if (result.error) {
            alert(result.error);
        }
    };

    const closeModal = () => {
        setShowWishlistModal(false);
        setModalProduct(null);
    };

    const closeCartNotification = () => {
        setShowCartNotification(false);
        setCartNotificationProduct(null);
    };

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'reviews', label: `Reviews (${reviewCount})` },
        { id: 'more-products', label: 'More Products' }
    ];

    // Display first 4 products for "More Products" tab
    const displayProducts = moreProducts.slice(0, 4);

    return (
        <section className="w-full">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="max-w-[1340px] mx-auto">
                    <div className="flex flex-col items-stretch w-full" style={{ gap: '0.01px' }}>
                        {/* Tab Navigation */}
                        <div className="flex flex-row items-stretch flex-wrap w-full border-b" style={{ gap: '18px', borderBottomColor: '#E5E7EB', borderBottomWidth: '1px' }}>
                            {tabs.map((tab) => (
                                <div key={tab.id} className="flex flex-col" style={{ alignSelf: 'stretch' }}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className="flex flex-row items-center hover:text-[#064C50] transition-colors cursor-pointer"
                                        style={{ paddingBottom: '10px' }}
                                    >
                                        <span className="font-light" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '15.6px', lineHeight: '1.641em', letterSpacing: '-2.564%', color: activeTab === tab.id ? '#064C50' : '#9CA3AF', textAlign: 'left' }}>
                                            {tab.label}
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex flex-col items-stretch w-full" style={{ gap: '15.39px', padding: '16px 0px 32px' }}>
                            {activeTab === 'description' && (
                                <div className="flex flex-col items-stretch w-full">
                                    {productDescription ? (
                                        <div 
                                            className="font-light prose prose-sm max-w-none" 
                                            style={{ 
                                                fontFamily: 'var(--font-inter), sans-serif', 
                                                fontSize: '15.6px', 
                                                lineHeight: '1.641em', 
                                                letterSpacing: '-2.564%', 
                                                color: '#212529' 
                                            }}
                                            dangerouslySetInnerHTML={{ __html: productDescription }}
                                        />
                                    ) : (
                                        <p className="font-light text-gray-500" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '15.6px', lineHeight: '1.641em' }}>
                                            No description available for this product.
                                        </p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <ReviewsSection productSlug={productSlug} />
                            )}

                            {activeTab === 'more-products' && (
                                <div className="flex flex-col items-stretch w-full">
                                    {loading ? (
                                        <div className="flex items-center justify-center min-h-[300px]">
                                            <div className="text-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50] mx-auto mb-4"></div>
                                                <p className="text-gray-600">Loading products...</p>
                                            </div>
                                        </div>
                                    ) : error || displayProducts.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600">No products available</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
                                            {displayProducts.map((product) => (
                                                <div key={product.id} className="w-full">
                                                    <Link href={`/product/${product.slug}`} className="block w-full">
                                                        <div className="w-full border border-[#E5E7EB] rounded-[12px] p-3 sm:p-4 group hover:shadow-lg transition-shadow duration-300">
                                                            <div className="pb-4 sm:pb-5 h-[200px] sm:h-[224.19px]">
                                                                <div className="w-full h-full relative">
                                                                    <div className="w-full h-[180px] sm:h-[204.19px] rounded-[10px] relative overflow-hidden">
                                                                        <Image
                                                                            src={product.images?.[0]?.image || '/placeholder.png'}
                                                                            alt={product.name}
                                                                            fill
                                                                            className="object-cover"
                                                                        />

                                                                        {product.stock < 10 && product.stock > 0 && (
                                                                            <div className="absolute top-2 left-2 flex items-center justify-center px-2 py-[6px] bg-[#F43F5E] rounded-[8px_20px_20px_8px]">
                                                                                <span className="text-[11px] sm:text-[12px] font-medium leading-[1.2em] tracking-[-2%] text-[#FFF1F2] uppercase text-center" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                                    {product.stock} LEFT
                                                                                </span>
                                                                            </div>
                                                                        )}

                                                                        <div className="absolute bottom-2 right-2">
                                                                            <button
                                                                                onClick={(e) => handleAddToCart(e, product.id, product.name)}
                                                                                disabled={cartLoading[product.id] || product.stock === 0}
                                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                                                                            >
                                                                                {cartLoading[product.id] ? (
                                                                                    <svg className="animate-spin h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                                                ) : (
                                                                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
                                                                                        <path d="M4.17 10H15.83M10 4.17V15.83" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                    </svg>
                                                                                )}
                                                                            </button>
                                                                        </div>

                                                                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                                            <button
                                                                                onClick={(e) => handleWishlistClick(e, product.id, product.name)}
                                                                                className={`w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${wishlistItems[product.id] ? 'bg-red-50 text-red-500' : 'hover:bg-red-50 hover:text-red-500'}`}
                                                                                disabled={wishlistLoading[product.id]}
                                                                            >
                                                                                {wishlistLoading[product.id] ? (
                                                                                    <svg className="animate-spin h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                                                ) : wishlistItems[product.id] ? (
                                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="sm:w-[18px] sm:h-[18px]">
                                                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                                                    </svg>
                                                                                ) : (
                                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-[18px] sm:h-[18px]">
                                                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                                                    </svg>
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col gap-2 sm:gap-3 h-auto sm:h-[175.95px]">
                                                                <div className="flex flex-col gap-2 sm:gap-[10px]">
                                                                    {product.review_count > 0 && (
                                                                        <div className="flex items-center">
                                                                            <div className="flex items-end gap-[6px]">
                                                                                <div className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px]">
                                                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="w-full h-full">
                                                                                        <path d="M6.5 0.32L8.02 4.18L12.18 4.18L8.83 6.82L10.35 10.68L6.5 8.04L2.65 10.68L4.17 6.82L0.82 4.18L4.98 4.18L6.5 0.32Z" fill="#EAB308" />
                                                                                    </svg>
                                                                                </div>
                                                                                <span className="text-[13px] sm:text-[14px] font-normal leading-[1.4em] tracking-[-1%] text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                                    ({product.rating_average?.toFixed(2)}/ {product.review_count})
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    <div className="w-full min-h-[40px] sm:h-[43.38px]">
                                                                        <h3 className="text-[14px] sm:text-[16px] font-medium leading-[1.4em] tracking-[-1%] text-[#212529] line-clamp-2 cursor-pointer hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                            {product.name}
                                                                        </h3>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full">
                                                                    <div className="flex items-baseline gap-[6px]">
                                                                        <span className="text-[18px] sm:text-[20px] font-bold leading-[1.3em] tracking-[-1%] text-[#15803D]" style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}>
                                                                            {formatPrice(parseFloat(product.price))}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {product.stock < 10 && product.stock > 0 && (
                                                                    <div className="w-full">
                                                                        <span className="text-[12px] sm:text-[13px] font-normal leading-[1.4em] tracking-[-1%] text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                            {product.stock} left in stock
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)}
                message="Please login to add items to your cart or wishlist"
            />

            {/* Wishlist Modal */}
            {showWishlistModal && modalProduct && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold mb-2">{modalProduct.name}</h3>
                        <p className="text-gray-600 mb-6">has been added to your wishlist</p>
                        <div className="flex gap-3">
                            <Link href="/wishlist" className="flex-1 bg-[#064C50] text-white py-2 px-4 rounded-lg text-center hover:bg-[#053d41]" onClick={closeModal}>
                                View Wishlist
                            </Link>
                            <button onClick={closeModal} className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Notification */}
            {showCartNotification && cartNotificationProduct && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="bg-green-600 text-white rounded-lg p-4 shadow-xl max-w-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium mb-1">Added to cart!</p>
                                <p className="text-sm">{cartNotificationProduct.name}</p>
                            </div>
                            <button onClick={closeCartNotification} className="text-white hover:text-gray-200">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 5L5 15M5 5L15 15" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
