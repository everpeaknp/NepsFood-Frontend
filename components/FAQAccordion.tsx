"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSection {
    title: string;
    items: FAQItem[];
}

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<string>("shopping-0");

    const faqSections: FAQSection[] = [
        {
            title: "Shopping Information",
            items: [
                {
                    question: "Delivery charges for orders from the Online Shop?",
                    answer: "A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum. Tristique parturient nulla ullamcorper at ullamcorper non orci iaculis neque augue."
                },
                {
                    question: "How long will delivery take?",
                    answer: "A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum. Tristique parturient nulla ullamcorper at ullamcorper non orci iaculis neque augue."
                },
                {
                    question: "What exactly happens after ordering?",
                    answer: "A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum. Tristique parturient nulla ullamcorper at ullamcorper non orci iaculis neque augue."
                },
                {
                    question: "Do I receive an invoice for my order?",
                    answer: "A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum. Tristique parturient nulla ullamcorper at ullamcorper non orci iaculis neque augue."
                }
            ]
        },
        {
            title: "Payment Information",
            items: [
                {
                    question: "When the order payment is taken of my bank account?",
                    answer: "Payment is processed immediately upon order confirmation. The amount will be debited from your bank account or charged to your credit card within 24-48 hours depending on your bank's processing time. You will receive a payment confirmation email once the transaction is complete."
                },
                {
                    question: "What is wishlist?",
                    answer: "A wishlist is a personalized collection of products you're interested in but not ready to purchase yet. You can save items to your wishlist for future reference, share it with friends and family, or use it to track price changes and availability. Simply click the heart icon on any product to add it to your wishlist."
                },
                {
                    question: "What should I do if I receive a damaged or wrong product?",
                    answer: "If you receive a damaged or incorrect product, please contact our customer service team within 48 hours of delivery. Provide your order number and photos of the damaged item. We will arrange for a replacement or full refund at no additional cost to you. Our team will also coordinate the return pickup of the damaged or wrong item."
                },
                {
                    question: "Can I change or cancel my order?",
                    answer: "You can modify or cancel your order within 2 hours of placing it by contacting our customer service team or through your account dashboard. Once the order has been processed for shipping, cancellation may not be possible. However, you can still refuse delivery or initiate a return once you receive the product according to our return policy."
                },
                {
                    question: "What is \"package tracking\" in my orders?",
                    answer: "Package tracking allows you to monitor your order's journey from our warehouse to your doorstep in real-time. Once your order ships, you'll receive a tracking number via email and SMS. You can use this number to check the current location of your package, estimated delivery date, and delivery status updates through our website or the carrier's tracking portal."
                }
            ]
        }
    ];

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? "" : id);
    };

    return (
        <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10 bg-slate-50">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="max-w-[1340px]">
                    {faqSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={sectionIndex > 0 ? "mt-8 sm:mt-10 lg:mt-12" : ""}>
                            <h2
                                className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold uppercase tracking-tight mb-4 sm:mb-5 lg:mb-6"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                {section.title}
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                {section.items.map((item, itemIndex) => {
                                    const itemId = `${section.title.toLowerCase().replace(/\s+/g, '-')}-${itemIndex}`;
                                    return (
                                        <div
                                            key={itemId}
                                            className="bg-white border border-slate-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(itemId)}
                                                className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left hover:bg-slate-50 transition-colors gap-3 sm:gap-4"
                                            >
                                                <span
                                                    className="text-[15px] sm:text-[16px] lg:text-[18px] font-semibold leading-[1.4em]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                >
                                                    {item.question}
                                                </span>
                                                <svg
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform flex-shrink-0 ${openIndex === itemId ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            {openIndex === itemId && (
                                                <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                                                    <p
                                                        className="text-slate-500 leading-relaxed text-[13px] sm:text-[14px] lg:text-[15px]"
                                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                    >
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
