"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { settingsAPI } from "@/lib/api";
import Link from "next/link";

export default function CartContent() {
    const { formatPrice } = useCurrency();
    const { items: cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, fetchCart, loading } = useCartStore();
    const [couponCode, setCouponCode] = useState("");
    const [removeLoading, setRemoveLoading] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [shippingCost, setShippingCost] = useState(100);
    const [freeShippingThreshold, setFreeShippingThreshold] = useState(5000);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchCart();
            loadShippingSettings();
        }
    }, [fetchCart]);

    const loadShippingSettings = async () => {
        try {
            const response = await settingsAPI.getShippingSettings();
            const settings = response.data;
            const cost = Number(settings.shipping_cost);
            const threshold = Number(settings.free_shipping_threshold);
            setShippingCost(isNaN(cost) ? 100 : cost);
            setFreeShippingThreshold(isNaN(threshold) ? 5000 : threshold);
        } catch (error) {
            console.error('Error loading shipping settings:', error);
            // Use defaults if API fails
            setShippingCost(100);
            setFreeShippingThreshold(5000);
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        setRemoveLoading(itemId);
        try {
            await removeFromCart(itemId);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
        setRemoveLoading(null);
    };

    const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await updateQuantity(itemId, newQuantity);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    if (!mounted) {
        return null;
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? (subtotal >= freeShippingThreshold ? 0 : shippingCost) : 0;
    const total = Number(subtotal) + Number(shipping);

    if (cartItems.length === 0) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-[30px]" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
                <div className="max-w-[1340px] mx-auto">
                    <div className="text-center" style={{ paddingTop: 'var(--component-gap)', paddingBottom: 'var(--component-gap)' }}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">Add some products to get started!</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#064C50] text-white rounded-full hover:bg-[#053d41] transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-4 sm:px-6 lg:px-[30px]" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
            <div className="max-w-[1340px] mx-auto">
                <div className="flex flex-col lg:flex-row" style={{ gap: 'var(--card-spacing)' }}>
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg border border-gray-200">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Shopping Cart ({cartItems.length})</h2>
                                <button
                                    onClick={handleClearCart}
                                    className="text-sm text-red-600 hover:text-red-700 transition-colors"
                                    disabled={loading}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Cart Items List */}
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-4">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                                {item.product_image ? (
                                                    <Image
                                                        src={item.product_image.startsWith('http') ? item.product_image : `http://localhost:8000${item.product_image}`}
                                                        alt={item.product_name}
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-base font-medium text-gray-800 line-clamp-2">
                                                            {item.product_name}
                                                        </h3>
                                                        <div className="mt-1">
                                                            {item.discount_price && parseFloat(item.discount_price) < parseFloat(item.original_price) ? (
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-sm text-gray-400 line-through">
                                                                        {formatPrice(parseFloat(item.original_price))}
                                                                    </p>
                                                                    <p className="text-sm font-semibold text-[#15803D]">
                                                                        {formatPrice(parseFloat(item.discount_price))}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-500">
                                                                    {formatPrice(parseFloat(item.original_price))}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {item.stock_available < 10 && (
                                                            <p className="text-xs text-orange-600 mt-1">
                                                                Only {item.stock_available} left in stock
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        disabled={removeLoading === item.id || loading}
                                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-4 mt-3">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1 || loading}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-12 text-center text-sm font-medium text-gray-800">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= item.stock_available || loading}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Item Total */}
                                                    <div className="ml-auto">
                                                        <p className="text-lg font-semibold text-[#15803D]">
                                                            {formatPrice(parseFloat(item.subtotal))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Continue Shopping Button */}
                        <div className="mt-4">
                            <Link
                                href="/shop"
                                className="inline-flex items-center text-[#064C50] hover:text-[#053d41] transition-colors"
                            >
                                <span className="text-sm font-medium">← Continue Shopping</span>
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-[380px]">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

                            {/* Coupon Code */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Coupon Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent"
                                    />
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-800">
                                        {shipping === 0 && subtotal > 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                {subtotal > 0 && subtotal < freeShippingThreshold && (
                                    <p className="text-xs text-gray-500">
                                        Add {formatPrice(freeShippingThreshold - subtotal)} more for free shipping
                                    </p>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-semibold text-gray-800">Total</span>
                                <span className="text-2xl font-bold text-[#15803D]">{formatPrice(total)}</span>
                            </div>

                            {/* Checkout Button */}
                            <Link
                                href="/checkout"
                                className="w-full flex items-center justify-center px-6 py-3 bg-[#064C50] text-white rounded-full hover:bg-[#053d41] transition-colors font-medium"
                            >
                                Proceed to Checkout
                            </Link>

                            {/* Security Badge */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">
                                    🔒 Secure Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
