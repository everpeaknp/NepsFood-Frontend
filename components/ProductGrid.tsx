"use client";

import { X, SlidersHorizontal, ChevronRight, ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import { useCompareStore } from "@/stores/useCompareStore";
import LoginModal from "./LoginModal";

interface ProductGridProps {
  selectedCategories: string[];
  onFilterClick: () => void;
  priceRange: { min: number; max: number };
}

export default function ProductGrid({ selectedCategories, onFilterClick, priceRange }: ProductGridProps) {
    const { formatPrice } = useCurrency();
    const [sortBy, setSortBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    // Fetch products from API
    const { products: allProducts, loading, error } = useProducts();
    
    // Cart and Wishlist hooks
    const { addToCart, toggleWishlist, showLoginModal, setShowLoginModal } = useCartWishlist();
    const { addToCompare, isInCompare } = useCompareStore();
    
    // Local state for UI
    const [wishlistLoading, setWishlistLoading] = useState<{ [key: number]: boolean }>({});
    const [wishlistItems, setWishlistItems] = useState<{ [key: number]: boolean }>({});
    const [showWishlistModal, setShowWishlistModal] = useState(false);
    const [modalProduct, setModalProduct] = useState<{ id: number; name: string } | null>(null);
    const [cartLoading, setCartLoading] = useState<{ [key: number]: boolean }>({});
    const [showCartNotification, setShowCartNotification] = useState(false);
    const [cartNotificationProduct, setCartNotificationProduct] = useState<{ name: string; quantity: number } | null>(null);

    // Filter and sort products
    const filteredProducts = allProducts.filter(product => {
        // Category filter
        if (selectedCategories.length > 0) {
            if (!selectedCategories.includes(product.category?.name)) {
                return false;
            }
        }
        
        // Price filter
        const price = parseFloat(product.price);
        if (price < priceRange.min || price > priceRange.max) {
            return false;
        }
        
        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseFloat(a.price) - parseFloat(b.price);
            case 'price-high':
                return parseFloat(b.price) - parseFloat(a.price);
            case 'name':
                return a.name.localeCompare(b.name);
            case 'newest':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default:
                return 0;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

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

    const handleAddToCompare = (e: React.MouseEvent, product: any) => {
        e.preventDefault();
        e.stopPropagation();
        addToCompare(product);
    };

    const closeModal = () => {
        setShowWishlistModal(false);
        setModalProduct(null);
    };

    const closeCartNotification = () => {
        setShowCartNotification(false);
        setCartNotificationProduct(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load products</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-[#064C50] text-white rounded-lg hover:bg-[#053d41]"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header with Filter Button and Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onFilterClick}
                        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                    <p className="text-gray-600">
                        Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} results
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600">Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064C50]"
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-600 text-lg mb-4">No products found</p>
                    <p className="text-gray-500">Try adjusting your filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {paginatedProducts.map((product) => (
                        <div key={product.id} className="group">
                            <Link href={`/product/${product.slug}`}>
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Product Image */}
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
                                            onClick={(e) => handleWishlistClick(e, product.id, product.name)}
                                            disabled={wishlistLoading[product.id]}
                                            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors z-10"
                                        >
                                            {wishlistLoading[product.id] ? (
                                                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : wishlistItems[product.id] ? (
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
                                            onClick={(e) => handleAddToCompare(e, product)}
                                            className={`absolute top-[52px] right-2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-colors z-10 ${
                                                isInCompare(product.id) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white hover:bg-blue-50'
                                            }`}
                                            title={isInCompare(product.id) ? 'Already in compare' : 'Add to compare'}
                                        >
                                            <ArrowLeftRight className={`w-4 h-4 ${isInCompare(product.id) ? 'text-white' : 'text-gray-600'}`} />
                                        </button>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={(e) => handleAddToCart(e, product.id, product.name)}
                                            disabled={cartLoading[product.id] || product.stock === 0}
                                            className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        >
                                            {cartLoading[product.id] ? (
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
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded-lg ${
                                currentPage === page
                                    ? 'bg-[#064C50] text-white border-[#064C50]'
                                    : 'border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}

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
                            <Link
                                href="/wishlist"
                                className="flex-1 bg-[#064C50] text-white py-2 px-4 rounded-lg text-center hover:bg-[#053d41]"
                                onClick={closeModal}
                            >
                                View Wishlist
                            </Link>
                            <button
                                onClick={closeModal}
                                className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
                            >
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
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
