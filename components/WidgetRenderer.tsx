"use client";

import { PageWidget } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { productsAPI } from "@/lib/api";
import ProductCard from "./ProductCard";
import ClientPrice from "./ClientPrice";

interface WidgetRendererProps {
    pageWidget: PageWidget;
}

export default function WidgetRenderer({ pageWidget }: WidgetRendererProps) {
    const { widget, config } = pageWidget;

    // Don't render inactive widgets
    if (!widget.is_active) {
        return null;
    }

    switch (widget.widget_type) {
        case 'dynamic_hero':
            return <DynamicHeroWidget pageWidget={pageWidget} />;
        case 'hero_banner':
            return <HeroBannerWidget pageWidget={pageWidget} />;
        case 'text_section':
            return <TextSectionWidget pageWidget={pageWidget} />;
        case 'text_with_stats':
            return <StatsWidget pageWidget={pageWidget} />;
        case 'faq_accordion':
            return <FAQWidget pageWidget={pageWidget} />;
        case 'html_content':
            return <HTMLContentWidget pageWidget={pageWidget} />;
        case 'product_section':
            return <ProductSectionWidget pageWidget={pageWidget} />;
        case 'features_grid':
            return <FeaturesGridWidget />;
        case 'testimonials_slider':
            return <TestimonialsWidget />;
        case 'spacer':
            return <SpacerWidget config={config} />;
        default:
            console.warn(`Unknown widget type: ${widget.widget_type}`);
            return null;
    }
}

// Dynamic Hero Banner Widget (Full Homepage Hero Style)
function DynamicHeroWidget({ pageWidget }: { pageWidget: PageWidget }) {
    const config = pageWidget.config || {};
    
    return (
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[740px] overflow-hidden">
            {/* Background Image or Gradient */}
            {config.background_image ? (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={config.background_image}
                        alt={config.title || 'Hero'}
                        fill
                        className="object-cover"
                        priority
                    />
                    {config.overlay_opacity > 0 && (
                        <div 
                            className="absolute inset-0 bg-black"
                            style={{ opacity: config.overlay_opacity / 100 }}
                        />
                    )}
                </div>
            ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#064C50] to-[#0a6b70]" />
            )}

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 h-full flex items-center">
                    <div className="w-full lg:w-[670px] space-y-3 sm:space-y-4 lg:space-y-5">
                        {/* Discount Badge */}
                        {config.show_discount_badge && (
                            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4 lg:mb-5">
                                <div
                                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: 'linear-gradient(-40deg, rgba(255, 201, 201, 1) 0%, rgba(255, 201, 201, 0) 50%)'
                                    }}
                                >
                                    <div className="flex items-end gap-[2px] pr-[2px]">
                                        <span
                                            className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold leading-[1.1em] tracking-[-2%] text-[#C70036]"
                                            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                        >
                                            -{config.discount_percentage}
                                        </span>
                                        <span
                                            className="text-[22px] sm:text-[27px] lg:text-[31.4px] font-bold leading-[1.398em] tracking-[-1.27%] text-[#C70036]"
                                            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                        >
                                            %
                                        </span>
                                    </div>
                                </div>
                                {config.discount_text && (
                                    <div className="text-center sm:text-left">
                                        <div
                                            className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%]"
                                            style={{ 
                                                fontFamily: 'var(--font-inter), sans-serif',
                                                color: config.text_color || '#064C50'
                                            }}
                                            dangerouslySetInnerHTML={{ __html: config.discount_text }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Main Content */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-[19.3px] pb-2 sm:pb-3 lg:pb-4">
                            <h1 className="w-full">
                                <span
                                    className="text-[28px] sm:text-[40px] lg:text-[56px] font-bold leading-[1.2em] tracking-[-1%] block transition-all duration-500"
                                    style={{ 
                                        fontFamily: 'var(--font-inter), sans-serif',
                                        color: config.text_color || '#064C50'
                                    }}
                                >
                                    {config.title}
                                </span>
                            </h1>

                            {config.description && (
                                <div className="w-full sm:w-[450px] lg:w-[528px]">
                                    <div
                                        className="text-[13px] sm:text-[14px] lg:text-[16px] font-normal leading-[1.6em] tracking-[-0.5%] transition-all duration-500"
                                        style={{ 
                                            fontFamily: 'var(--font-inter), sans-serif',
                                            color: config.text_color || '#064C50'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: config.description }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 lg:gap-8 w-full">
                            {/* Button */}
                            {config.show_button && (
                                <Link href={config.button_link || '/shop'}>
                                    <button
                                        className="flex items-center justify-center px-6 sm:px-7 lg:px-8 h-10 sm:h-11 lg:h-12 bg-[#064C50] text-white rounded-full border border-transparent hover:bg-[#053d41] transition-colors w-full sm:w-auto cursor-pointer"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.4em] tracking-[-0.5%]">
                                            {config.button_text || 'Shop Now'}
                                        </span>
                                    </button>
                                </Link>
                            )}

                            {/* Price Section */}
                            {config.show_price && (
                                <div className="relative w-full sm:w-auto flex items-center justify-center sm:justify-start">
                                    <div className="flex items-end gap-2">
                                        <ClientPrice
                                            price={parseFloat(config.price || 0)}
                                            className="text-[32px] sm:text-[36px] lg:text-[40px] font-semibold leading-[1.1em] tracking-[-2%] text-[#15803D]"
                                            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                        />
                                        {config.price_text && (
                                            <div className="opacity-60 pb-1">
                                                <p
                                                    className="text-[11px] sm:text-[12px] lg:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] whitespace-nowrap"
                                                    style={{ 
                                                        fontFamily: 'var(--font-inter), sans-serif',
                                                        color: config.text_color || '#064C50'
                                                    }}
                                                >
                                                    {config.price_text}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Product Section Widget
function ProductSectionWidget({ pageWidget }: { pageWidget: PageWidget }) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const config = pageWidget.config || {};

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('ProductSection config:', config);
                console.log('Product IDs:', config.product_ids);
                
                // If product IDs are in config, fetch those specific products
                if (config.product_ids && Array.isArray(config.product_ids) && config.product_ids.length > 0) {
                    console.log(`Fetching ${config.product_ids.length} products...`);
                    
                    const productPromises = config.product_ids.map((id: number) => {
                        console.log(`Fetching product ${id}...`);
                        return productsAPI.getById(id)
                            .then(response => {
                                console.log(`Product ${id} fetched:`, response.data);
                                return response;
                            })
                            .catch(err => {
                                console.error(`Error fetching product ${id}:`, err);
                                return null;
                            });
                    });
                    
                    const results = await Promise.all(productPromises);
                    const validProducts = results.filter(p => p !== null).map(r => r.data);
                    console.log('Valid products:', validProducts.length);
                    setProducts(validProducts);
                } else {
                    console.log('No product IDs found in config');
                }
            } catch (error) {
                console.error('Error in fetchProducts:', error);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [config.product_ids]);

    if (loading) {
        return (
            <section className="w-full py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-red-600">{error}</div>
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        console.log('No products to display');
        return (
            <section className="w-full py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-600">No products available</div>
                </div>
            </section>
        );
    }

    console.log('Rendering products:', products.length);

    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                {config.section_title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-[#064C50] mb-8 text-center">
                        {config.section_title}
                    </h2>
                )}

                {/* Products Grid - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Simple Hero Banner Widget
function HeroBannerWidget({ pageWidget }: { pageWidget: PageWidget }) {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#064C50] to-[#0a6b70]">
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            {pageWidget.widget.name}
                        </h1>
                        <p className="text-lg md:text-xl opacity-90">
                            Welcome to our page
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Text Section Widget
function TextSectionWidget({ pageWidget }: { pageWidget: PageWidget }) {
    const config = pageWidget.config || {};
    
    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose prose-lg max-w-none">
                    {config.heading && (
                        <h2 className="text-3xl md:text-4xl font-bold text-[#064C50] mb-6">
                            {config.heading}
                        </h2>
                    )}
                    {config.content && (
                        <div 
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: config.content }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

// Statistics Widget
function StatsWidget({ pageWidget }: { pageWidget: PageWidget }) {
    const stats = [
        { number: '50,000+', label: 'Happy Customers' },
        { number: '500+', label: 'Trusted Vendors' },
        { number: '10,000+', label: 'Products' },
        { number: '99%', label: 'Satisfaction' },
    ];

    return (
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#064C50] mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 text-sm md:text-base">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// FAQ Widget
function FAQWidget({ pageWidget }: { pageWidget: PageWidget }) {
    const faqs = [
        {
            question: 'How do you select your vendors?',
            answer: 'We have a rigorous vetting process that includes quality checks and customer feedback analysis.',
        },
        {
            question: 'What makes your marketplace different?',
            answer: 'We focus on quality over quantity. Every product is curated and every vendor is vetted.',
        },
    ];

    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[#064C50] mb-8 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            <summary className="font-semibold text-lg text-gray-800 cursor-pointer">
                                {faq.question}
                            </summary>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

// HTML Content Widget
function HTMLContentWidget({ pageWidget }: { pageWidget: PageWidget }) {
    return (
        <section className="w-full py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="custom-html-content"
                    dangerouslySetInnerHTML={{
                        __html: pageWidget.config?.html_content || '<p>Custom HTML content</p>'
                    }}
                />
            </div>
        </section>
    );
}

// Features Grid Widget
function FeaturesGridWidget() {
    return (
        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#064C50] mb-12 text-center">
                    Our Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <p className="col-span-full text-center text-gray-600">
                        Features will be displayed here
                    </p>
                </div>
            </div>
        </section>
    );
}

// Testimonials Widget
function TestimonialsWidget() {
    return (
        <section className="w-full py-12 md:py-16 lg:py-20 bg-[#FFF7ED]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#064C50] mb-12 text-center">
                    What Our Customers Say
                </h2>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-gray-600">Testimonials will be displayed here</p>
                </div>
            </div>
        </section>
    );
}

// Spacer Widget
function SpacerWidget({ config }: { config: Record<string, any> }) {
    const height = config?.height || '40px';
    return <div style={{ height }} />;
}
