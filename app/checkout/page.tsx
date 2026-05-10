"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import { useCurrency } from "@/contexts/CurrencyContext";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { userAPI, orderAPI, settingsAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { formatPrice } = useCurrency();
    const router = useRouter();
    const { items: cartItems, getCartTotal, fetchCart } = useCartStore();
    
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [shippingCost, setShippingCost] = useState(100);
    const [freeShippingThreshold, setFreeShippingThreshold] = useState(5000);
    
    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "Nepal",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        email: "",
        notes: "",
        saveBillingInfo: false,
        agreeToTerms: false,
    });

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/my-account');
            return;
        }
        
        fetchCart();
        loadBillingAddress();
        loadShippingSettings();
    }, []);

    const loadBillingAddress = async () => {
        try {
            const response = await userAPI.getBillingAddress();
            const billing = response.data;
            
            if (billing.billing_first_name) {
                setFormData(prev => ({
                    ...prev,
                    firstName: billing.billing_first_name || "",
                    lastName: billing.billing_last_name || "",
                    address: billing.billing_address || "",
                    apartment: billing.billing_apartment || "",
                    city: billing.billing_city || "",
                    state: billing.billing_state || "",
                    zipCode: billing.billing_zip_code || "",
                    country: billing.billing_country || "Nepal",
                    phone: billing.billing_phone || "",
                    email: billing.billing_email || "",
                }));
            }
        } catch (error) {
            console.error('Error loading billing address:', error);
        }
    };

    const loadShippingSettings = async () => {
        try {
            const response = await settingsAPI.getShippingSettings();
            const settings = response.data;
            console.log('Shipping settings from API:', settings);
            console.log('Raw shipping_cost:', settings.shipping_cost, 'Type:', typeof settings.shipping_cost);
            console.log('Raw free_shipping_threshold:', settings.free_shipping_threshold, 'Type:', typeof settings.free_shipping_threshold);
            
            const cost = Number(settings.shipping_cost);
            const threshold = Number(settings.free_shipping_threshold);
            
            console.log('Parsed shipping cost:', cost, 'Type:', typeof cost);
            console.log('Parsed threshold:', threshold, 'Type:', typeof threshold);
            
            setShippingCost(isNaN(cost) ? 100 : cost);
            setFreeShippingThreshold(isNaN(threshold) ? 5000 : threshold);
        } catch (error) {
            console.error('Error loading shipping settings:', error);
            // Use defaults if API fails
            setShippingCost(100);
            setFreeShippingThreshold(5000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.agreeToTerms) {
            setError("Please agree to the terms and conditions");
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const checkoutData = {
                shipping_address: formData.address,
                shipping_city: formData.city,
                shipping_state: formData.state,
                shipping_zip_code: formData.zipCode,
                shipping_country: formData.country,
                customer_name: `${formData.firstName} ${formData.lastName}`,
                customer_email: formData.email,
                customer_phone: formData.phone,
                notes: formData.notes,
                save_billing_info: formData.saveBillingInfo,
            };

            const response = await orderAPI.checkout(checkoutData);
            
            setSuccess(true);
            setTimeout(() => {
                router.push(`/my-account?tab=orders`);
            }, 2000);
        } catch (error: any) {
            console.error('Checkout error:', error);
            setError(error.response?.data?.error || error.response?.data?.detail || "Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getCartTotal();
    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
    const total = Number(subtotal) + Number(shipping);
    
    console.log('Checkout calculations:', {
        subtotal,
        shippingCost,
        freeShippingThreshold,
        shipping,
        total,
        subtotalType: typeof subtotal,
        shippingType: typeof shipping,
        shippingCostType: typeof shippingCost,
        freeShippingThresholdType: typeof freeShippingThreshold
    });

    const nepalStates = [
        "Koshi Province", "Madhesh Province", "Bagmati Province", "Gandaki Province",
        "Lumbini Province", "Karnali Province", "Sudurpashchim Province"
    ];

    if (success) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                        <p className="text-gray-600 mb-4">Redirecting to your orders...</p>
                    </div>
                </div>
                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Secure Checkout - Complete Your Order | Supgoro</title>
                <meta name="description" content="Complete your secure checkout at Supgoro. Cash on delivery available. Fast and reliable shipping." />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="min-h-screen bg-white">
                <Header />

                <main className="w-full py-4 sm:py-6 lg:py-8">
                    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
                            <ol className="flex items-center space-x-2 text-xs sm:text-sm">
                                <li><a href="/" className="text-[#9CA3AF] hover:text-[#064C50] transition-colors">Home</a></li>
                                <li className="text-[#9CA3AF]">/</li>
                                <li><a href="/cart" className="text-[#9CA3AF] hover:text-[#064C50] transition-colors">Cart</a></li>
                                <li className="text-[#9CA3AF]">/</li>
                                <li className="text-[#212529] font-medium">Checkout</li>
                            </ol>
                        </nav>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                                {/* Checkout Form */}
                                <div className="xl:col-span-2">
                                    <div className="flex flex-col gap-5">
                                        <h2 className="text-lg font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                            Billing details
                                        </h2>

                                        <div className="space-y-4 sm:space-y-6">
                                            {/* Name Fields */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                        First name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                        style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                        Last name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                        style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Country */}
                                            <div className="flex flex-col gap-[6px]">
                                                <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                    Country / Region *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                    style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                />
                                            </div>

                                            {/* Street Address */}
                                            <div className="flex flex-col gap-[6px]">
                                                <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                    Street address *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    placeholder="House number and street name"
                                                    required
                                                    className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                    style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                />
                                            </div>

                                            {/* Apartment */}
                                            <div className="flex flex-col">
                                                <input
                                                    type="text"
                                                    name="apartment"
                                                    value={formData.apartment}
                                                    onChange={handleInputChange}
                                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                                    className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                    style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                />
                                            </div>

                                            {/* City and State */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                        Town / City *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                        style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                        State *
                                                    </label>
                                                    <select
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                        style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                    >
                                                        <option value="">Select State</option>
                                                        {nepalStates.map((state) => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* ZIP Code */}
                                            <div className="flex flex-col gap-[6px]">
                                                <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                    Postal Code *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                    style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                />
                                            </div>

                                            {/* Phone and Email */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                        Phone *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                        style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                                        Email address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-[42px] px-[14px] py-1 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] w-full"
                                                        style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Billing Info Checkbox */}
                                    <div className="flex items-center gap-3 mt-6">
                                        <input
                                            type="checkbox"
                                            name="saveBillingInfo"
                                            checked={formData.saveBillingInfo}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 rounded-[6px] border border-[#D1D5DB] focus:ring-2 focus:ring-[#064C50] cursor-pointer"
                                        />
                                        <span className="text-sm font-semibold leading-tight cursor-pointer" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                            Save billing information for next time
                                        </span>
                                    </div>

                                    {/* Order Notes */}
                                    <div className="flex flex-col gap-[6px] mt-6">
                                        <label className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: '#212529' }}>
                                            Order notes (optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="Notes about your order, e.g. special notes for delivery."
                                            className="h-[90px] px-[14px] py-2 bg-white border rounded-[12px] outline-none focus:ring-2 focus:ring-[#064C50] resize-none"
                                            style={{ borderColor: '#D1D5DB', borderWidth: '1px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}
                                        />
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="xl:col-span-1">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-4">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your order</h2>

                                        {mounted && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Subtotal</span>
                                                    <span className="text-sm font-medium text-gray-900">{formatPrice(subtotal)}</span>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm text-gray-600">Shipping</span>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {shipping === 0 ? (
                                                                <span className="text-green-600">FREE</span>
                                                            ) : (
                                                                formatPrice(shipping)
                                                            )}
                                                        </span>
                                                    </div>
                                                    {subtotal > 0 && subtotal < freeShippingThreshold && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Add {formatPrice(freeShippingThreshold - subtotal)} more for free shipping
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-base font-semibold text-gray-900">Total</span>
                                                        <span className="text-base font-semibold text-gray-900">{formatPrice(total)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Payment Method */}
                                        <div className="border-t border-gray-200 pt-6 mt-4">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-4 h-4 rounded-full border-2 border-[#064C50] bg-white flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-[#064C50]"></div>
                                                    </div>
                                                    <label className="text-sm font-medium text-gray-900">Cash On Delivery</label>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed ml-7">
                                                    Pay with cash upon delivery. Your order will be processed and shipped immediately.
                                                </p>
                                            </div>

                                            <div className="pt-4">
                                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                                    Your personal data will be used to process your order and support your experience throughout this website.
                                                </p>
                                            </div>

                                            {/* Terms Checkbox */}
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-4 h-4 mt-0.5 rounded-[6px] border border-[#D1D5DB] focus:ring-2 focus:ring-[#064C50] cursor-pointer"
                                                />
                                                <label className="text-sm text-gray-900 leading-relaxed cursor-pointer">
                                                    I have read and agree to the website terms and conditions *
                                                </label>
                                            </div>

                                            {/* Place Order Button */}
                                            <button
                                                type="submit"
                                                disabled={loading || cartItems.length === 0}
                                                className="w-full bg-[#064C50] hover:bg-[#053d41] text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                            >
                                                {loading ? 'Processing...' : 'Place Order'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>

                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        </>
    );
}
