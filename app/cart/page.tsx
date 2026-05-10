"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import LoginModal from "@/components/LoginModal";
import ClientPrice from "@/components/ClientPrice";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cartAPI } from "@/lib/api";

interface CartItem {
  id: number;
  product: number;  // Just the product ID
  product_name: string;
  product_slug: string;
  product_image: string | null;
  quantity: number;
  unit_price: string;
  subtotal: string;
  stock_available: number;
}

interface Cart {
  items: CartItem[];
  subtotal: string;
  item_count: number;
  total_quantity: number;
}

export default function CartPage() {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [removeLoading, setRemoveLoading] = useState<{ [key: number]: boolean }>({});
    const [updateLoading, setUpdateLoading] = useState<{ [key: number]: boolean }>({});
    const [clearAllLoading, setClearAllLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        
        // Check if token exists before fetching
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchCart();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await cartAPI.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setUpdateLoading(prev => ({ ...prev, [itemId]: true }));
        try {
            const response = await cartAPI.updateItem(itemId, newQuantity);
            setCart(response.data.cart);
        } catch (error: any) {
            showError(error.response?.data?.error || 'Failed to update quantity');
        } finally {
            setUpdateLoading(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const removeItem = async (itemId: number, productName: string) => {
        setRemoveLoading(prev => ({ ...prev, [itemId]: true }));
        try {
            const response = await cartAPI.removeItem(itemId);
            setCart(response.data.cart);
            showSuccess(`${productName} removed from cart`);
        } catch (error) {
            showError('Failed to remove item');
        } finally {
            setRemoveLoading(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const clearCart = async () => {
        setClearAllLoading(true);
        try {
            await cartAPI.clearCart();
            setCart({ items: [], subtotal: '0.00', item_count: 0, total_quantity: 0 });
            showSuccess('Cart cleared');
        } catch (error) {
            showError('Failed to clear cart');
        } finally {
            setClearAllLoading(false);
        }
    };

    const showSuccess = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const showError = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
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
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                Please login to view your cart
                            </h3>
                            <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                You need to be logged in to access your shopping cart
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
                            <p className="mt-4 text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Loading cart...</p>
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
                            <li className="text-[#212529] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Cart</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg overflow-hidden">
                                {!cart || cart.items.length === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Your cart is empty</h3>
                                        <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Add items to your cart to continue shopping</p>
                                        <a href="/shop" className="inline-flex items-center px-6 py-3 bg-[#064C50] text-white rounded-lg font-medium hover:bg-[#053d41] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Continue Shopping</a>
                                    </div>
                                ) : (
                                    <>
                                        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                                            <div className="col-span-6"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Product</h3></div>
                                            <div className="col-span-2"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Price</h3></div>
                                            <div className="col-span-2"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Quantity</h3></div>
                                            <div className="col-span-2"><h3 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Subtotal</h3></div>
                                        </div>

                                        <div className="divide-y divide-gray-200">
                                            {cart.items.map((item) => (
                                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                                        <div className="col-span-6 flex items-center space-x-4">
                                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                                <Image 
                                                                    src={item.product_image || '/placeholder.png'} 
                                                                    alt={item.product_name || 'Product image'} 
                                                                    fill 
                                                                    className="object-cover rounded-lg" 
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <a href={`/product/${item.product_slug}`} className="block">
                                                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 hover:text-[#064C50] transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{item.product_name}</h4>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <ClientPrice price={parseFloat(item.unit_price)} className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <div className="flex items-center space-x-2">
                                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={updateLoading[item.id]} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50">
                                                                    <Minus className="w-3 h-3 text-gray-600" />
                                                                </button>
                                                                <span className="w-8 text-center text-sm font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={updateLoading[item.id] || item.quantity >= item.stock_available} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50">
                                                                    <Plus className="w-3 h-3 text-gray-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-2 flex items-center justify-between">
                                                            <ClientPrice price={parseFloat(item.subtotal)} className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                                                            <button onClick={() => removeItem(item.id, item.product_name)} disabled={removeLoading[item.id]} className="text-gray-400 hover:text-red-500 transition-colors ml-4 cursor-pointer disabled:opacity-50">
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

                                        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                                            <div className="flex items-center space-x-4">
                                                <input type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064C50] text-sm" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                                                <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Apply coupon</button>
                                            </div>
                                            <button onClick={clearCart} disabled={clearAllLoading} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {clearAllLoading ? 'Clearing...' : 'Clear All'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Cart totals</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Subtotal</span>
                                        <ClientPrice price={parseFloat(cart?.subtotal || '0')} className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base font-semibold text-gray-900" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Total</span>
                                            <ClientPrice price={parseFloat(cart?.subtotal || '0')} className="text-base font-semibold text-gray-900" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                                        </div>
                                    </div>
                                    <a href="/checkout" className="w-full bg-[#064C50] text-white py-3 rounded-lg font-medium hover:bg-[#053d41] transition-colors mt-6 block text-center" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Proceed to checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />

            {showNotification && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="bg-green-600 text-white rounded-lg p-4 shadow-xl max-w-sm animate-slide-in-right">
                        <p className="text-white text-[14px]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{notificationMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
