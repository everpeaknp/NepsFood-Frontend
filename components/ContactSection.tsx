"use client";

import { useState, useEffect } from "react";
import { cmsAPI } from "@/lib/api";
import type { Store } from "@/types/cms";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
}

export default function ContactSection() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [stores, setStores] = useState<Store[]>([]);
    const [loadingStores, setLoadingStores] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await cmsAPI.getStores();
                // Backend returns paginated response with results array
                setStores(response.data.results || response.data);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
            } finally {
                setLoadingStores(false);
            }
        };

        fetchStores();
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            await cmsAPI.submitContact(formData);

            setSubmitStatus("success");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus("idle");
            }, 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-white font-sans" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                {/* Main Content: Two Columns */}
                <div className="flex flex-col lg:flex-row justify-between gap-16">
                    {/* Left Side: Store Info */}
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">Our Stores</h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-10 max-w-lg">
                            On dekande mydurtad mora även om skurkstat. Semirade timaheten rena.
                            Radiogen pasam inte loba även om prerade i garanterad traditionell specialitet
                            till bebel. Ev is sönde. Tun gps-väst att epiligt. Diliga tresk dira. Ens biov dijevis.
                        </p>

                        {loadingStores ? (
                            <div className="text-gray-600">Loading stores...</div>
                        ) : stores.length === 0 ? (
                            <div className="text-gray-600">No store locations available.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {stores.map((store) => (
                                    <div key={store.id}>
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                                            {store.country}
                                        </span>
                                        <h4 className="text-xl font-medium text-gray-900 mb-3">{store.city}</h4>
                                        <address className="not-italic text-sm text-gray-800 leading-relaxed mb-4">
                                            {store.address.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    {i < store.address.split('\n').length - 1 && <br />}
                                                </span>
                                            ))}
                                        </address>
                                        <div className="flex flex-col gap-1">
                                            <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="text-sm text-black hover:underline">
                                                {store.phone}
                                            </a>
                                            <a href={`mailto:${store.email}`} className="text-sm text-black hover:underline">
                                                {store.email}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="lg:w-1/2">
                        <div className="bg-[#F3F4F6] p-8 md:p-12 rounded-3xl">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Write us...</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                On dekande mydurtad mora även om skurkstat. Semirade timaheten rena.
                                Radiogen pasam inte loba även om prerade i garanterad traditionell specialitet till bebel.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Your name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-[#064C50] outline-none transition-all`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && (
                                            <span className="text-xs text-red-500">{errors.name}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Your email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-[#064C50] outline-none transition-all`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-red-500">{errors.email}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                            } focus:ring-2 focus:ring-[#064C50] outline-none transition-all`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.subject && (
                                        <span className="text-xs text-red-500">{errors.subject}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Your message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#064C50] outline-none transition-all resize-none"
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                {submitStatus === "success" && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                                        Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#064C50] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#053d40] transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
