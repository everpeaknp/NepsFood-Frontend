"use client";

import { useState } from "react";
import { newsletterAPI } from "@/lib/api";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            setMessage({ type: 'error', text: 'Please enter your email address' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await newsletterAPI.subscribe(email);
            setMessage({ type: 'success', text: response.data.detail || 'Successfully subscribed!' });
            setEmail("");
        } catch (error: any) {
            const errorMsg = error.response?.data?.email?.[0] || 
                           error.response?.data?.detail || 
                           'Failed to subscribe. Please try again.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                {/* div.site-newsletter */}
                <div className="w-full bg-[#FFF1F2] rounded-[12px]">
                    {/* div.site-newsletter-inner */}
                    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4 sm:gap-5 md:gap-[24px] p-5 sm:p-6 md:p-[27px_28px]">
                        {/* div.newsletter-content */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-[18px] flex-1 w-full md:w-auto text-center sm:text-left">
                            {/* h4.entry-title */}
                            <div className="flex flex-col items-center sm:items-start">
                                <h4
                                    className="text-[16px] sm:text-[17px] md:text-[18px] font-bold leading-[1em] tracking-[-2%] text-[#F43F5E]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    NEWSLETTER
                                </h4>
                            </div>

                            {/* p */}
                            <div className="flex flex-col items-center sm:items-start">
                                <p
                                    className="text-[12px] sm:text-[13px] md:text-[14px] font-light leading-[1.2em] sm:leading-[1em] tracking-[-2%] text-[#F43F5E] m-0"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    Sign up to our mailing list to benefit from new discounts and campaigns.
                                </p>
                            </div>
                        </div>

                        {/* div.newsletter-form */}
                        <div className="w-full md:w-auto md:min-w-[320px] lg:min-w-[380px]">
                            {/* Newsletter form */}
                            <form onSubmit={handleSubmit}>
                                {/* div.mc4wp-form-fields */}
                                <div className="flex items-center bg-white border border-[#F43F5E] rounded-[12px] overflow-hidden">
                                    {/* input.subscribe-input */}
                                    <div className="flex-1 h-[44px] sm:h-[46px] md:h-[48px]">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            disabled={loading}
                                            className="w-full h-full px-[12px] sm:px-[13px] md:px-[14px] border-none outline-none bg-white text-[13px] sm:text-[13.5px] md:text-[14px] font-light leading-[1em] tracking-[-2%] text-[#212529] placeholder:text-[#9CA3AF] disabled:opacity-50"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        />
                                    </div>

                                    {/* button.btn */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex justify-center items-center h-[44px] sm:h-[46px] md:h-[48px] bg-[#F43F5E] px-[14px] sm:px-[16px] md:px-[18.26px] hover:bg-[#e11d48] transition-colors flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span
                                            className="text-[13px] sm:text-[13.5px] md:text-[14px] font-light leading-[1em] tracking-[-2%] text-white text-center whitespace-nowrap"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            {loading ? 'Subscribing...' : 'Subscribe'}
                                        </span>
                                    </button>
                                </div>
                                
                                {/* Success/Error Message */}
                                {message && (
                                    <div className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                        {message.text}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
