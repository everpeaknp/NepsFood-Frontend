"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import LoginModal from "@/components/LoginModal";
import ClientPrice from "@/components/ClientPrice";
import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { wishlistAPI, cartAPI } from "@/lib/api";

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    images: Array<{ image: string }>;
    stock: number;
  };
  created_at: string;
}

export default function WishlistPage() {
    const { isAuthenticated } = useAuth();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [removeLoading, setRemoveLoading] = useState<{ [key: number]: boolean }>({});
    const [cartLoading, setCartLoading] = useState<{ [key: number]: boolean }>({});
    const [cartSuccess, setCartSuccess] = useState<{ [key: number]: boolean }>({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        
        // Check if token exists before fetching
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchWishlist();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const response = await wishlistAPI.getAll();
            const data = response.data;
            console.log('Wishlist API response:', data);
            console.log('Is array?', Array.isArray(data));
            
            // Ensure data is an array
            if (Array.isArray(data)) {
                setWishlist(data);
            } else if (data && Array.isArray(data.results)) {
                // Handle paginated response
                setWishlist(data.results);
            } else {
                console.error('Unexpected wishlist response format:', data);
                setWishlist([]);
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (wishlistId: number, productName: string) => {
        setRemoveLoading(prev => ({ ...prev, [wishlistId]: true }));
        try {
            await wishlistAPI.remove(wishlistId);
            setWishlist(prev => prev.filter(item => item.id !== wishlistId));
            showSuccess(`${productName} removed from wishlist`);
        } catch (error) {
            showError('Failed to remove item');
        } finally {
            setRemoveLoading(prev => ({ ...prev, [wishlistId]: false }));
        }
    };

    const addToCart = async (item: WishlistItem) => {
        setCartLoading(prev => ({ ...prev, [item.id]: true }));
        try {
            await cartAPI.addToCart(item.product.id, 1);
            setCartSuccess(prev => ({ ...prev, [item.id]: true }));
            showSuccess(`${item.product.name} added to cart`);
        } catch (error: any) {
            showError(error.response?.data?.error || 'Failed to add to cart');
        } finally {
            setCartLoading(prev => ({ ...prev, [item.id]: false }));
        }
    };

    const showSuccess = (message: string) => {
        setNotificationMessage(message);
        setNotificationType('success');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const showError = (message: string) => {
        setNotificationMessage(message);
        setNotificationType('error');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="w-full py-16">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                Please login to view your wishlist
                            </h3>
                            <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                You need to be logged in to access your wishlist
                            </p>
                            <a href="/my-account" className="inline-flex items-center px-6 py-3 bg-[#064C50] text-white rounded-lg font-medium hover:bg-[#053d41] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                Login / Register
                            </a>
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

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="w-full py-16">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50] mx-auto"></div>
                            <p className="mt-4 text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Loading wishlist...</p>
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

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

            <main className="w-full py-4">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex items-center space-x-2 text-xs sm:text-sm">
                            <li><a href="/" className="text-[#9CA3AF] hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Home</a></li>
                            <li className="text-[#9CA3AF]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>/</li>
                            <li className="text-[#212529] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Wishlist</li>
                        </ol>
                    </nav>

                    <div className="bg-white rounded-lg overflow-hidden">
                        {wishlist.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Your wishlist is empty</h3>
                                <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Add items to your wishlist to save them for later</p>
                                <a href="/shop" className="inline-flex items-center px-6 py-3 bg-[#064C50] text-white rounded-lg font-medium hover:bg-[#053d41] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Continue Shopping</a>
                            </div>
                        ) : (
                            <>
                                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                                    <div className="col-span-5"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Product</h3></div>
                                    <div className="col-span-2"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Price</h3></div>
                                    <div className="col-span-2"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Date Added</h3></div>
                                    <div className="col-span-1"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Stock</h3></div>
                                    <div className="col-span-1"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Add to cart</h3></div>
                                    <div className="col-span-1"></div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {wishlist.map((item) => (
                                        <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                                <div className="col-span-5 flex items-center space-x-4">
                                                    <div className="relative w-16 h-16 flex-shrink-0">
                                                        <Image src={item.product.images[0]?.image || '/placeholder.png'} alt={item.product.name} fill className="object-cover rounded-lg" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <a href={`/product/${item.product.id}`} className="block">
                                                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#064C50] transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{item.product.name}</h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-span-2">
                                                    <ClientPrice price={item.product.price} className="text-sm font-medium text-[#15803D]" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{formatDate(item.created_at)}</span>
                                                </div>
                                                <div className="col-span-1">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                        {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </div>
                                                <div className="col-span-1">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => addToCart(item)} disabled={cartLoading[item.id] || item.product.stock === 0} className="bg-[#064C50] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#053d41] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            {cartLoading[item.id] ? 'Adding...' : 'Add to cart'}
                                                        </button>
                                                        {cartSuccess[item.id] && (
                                                            <div className="w-8 h-8 bg-[#064C50] rounded-full flex items-center justify-center">
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                                    <polyline points="20,6 9,17 4,12"></polyline>
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-span-1 flex justify-end">
                                                    <button onClick={() => removeFromWishlist(item.id, item.product.name)} disabled={removeLoading[item.id]} className="text-red-500 hover:text-red-700 transition-colors cursor-pointer disabled:opacity-50">
                                                        {removeLoading[item.id] ? (
                                                            <svg className="animate-spin h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <X className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />

            {showNotification && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className={`${notificationType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white rounded-lg p-4 shadow-xl max-w-sm animate-slide-in-right`}>
                        <p className="text-white text-[14px]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{notificationMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
