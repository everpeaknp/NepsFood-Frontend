"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import RelatedProducts from "@/components/RelatedProducts";
import ProductTabs from "@/components/ProductTabs";
import LoginModal from "@/components/LoginModal";
import Image from "next/image";
import Link from "next/link";
import { Leaf, FlaskConical, CreditCard, Headphones, Facebook, Twitter, Share2, MessageCircle } from "lucide-react";
import { useState, use } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProduct } from "@/hooks/useProducts";
import { useCartWishlist } from "@/hooks/useCartWishlist";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap the params Promise - id is actually the slug
    const { id: slug } = use(params);
    const { formatPrice } = useCurrency();
    
    // Fetch product data from API using slug
    const { product: apiProduct, loading, error } = useProduct(slug);
    const { addToCart, addToWishlist, showLoginModal, setShowLoginModal } = useCartWishlist();

    // State for selected image
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // State for cart functionality
    const [quantity, setQuantity] = useState(1);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [showCartNotification, setShowCartNotification] = useState(false);

    // Handler functions
    const handleWishlistClick = async () => {
        if (!apiProduct) return;
        const result = await addToWishlist(apiProduct.id);
        if (result.success) {
            // Show success notification if needed
            console.log('Added to wishlist successfully');
        } else if (result.error) {
            console.error('Wishlist error:', result.error);
            alert(result.error);
        }
    };

    const closeCartNotification = () => {
        setShowCartNotification(false);
    };

    const handleAddToCart = async () => {
        if (!apiProduct) return;
        setIsCartLoading(true);
        const result = await addToCart(apiProduct.id, quantity);
        setIsCartLoading(false);
        if (result.success) {
            setShowCartNotification(true);
            setTimeout(() => setShowCartNotification(false), 4000);
        } else if (result.error) {
            console.error('Cart error:', result.error);
            alert(result.error);
        }
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50]"></div>
                </div>
                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        );
    }

    // Error state
    if (error || !apiProduct) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
                        <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                        <Link href="/shop" className="text-[#064C50] hover:underline">
                            Back to Shop
                        </Link>
                    </div>
                </div>
                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        );
    }

    // Product data
    const product = apiProduct;
    const productImages = product.images?.length > 0 
        ? product.images.map(img => img.image)
        : ['/placeholder.png'];
    const discount = product.price ? Math.round((1 - parseFloat(product.price) / (parseFloat(product.price) * 1.5)) * 100) : 0;

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Product Detail Section */}
            <section className="w-full py-4 sm:py-6 lg:py-8 xl:py-10">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="max-w-[1340px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Left Column - Product Image */}
                            <div className="w-full">
                                <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                    <Image
                                        src={productImages[selectedImageIndex]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Badge */}
                                    {discount > 0 && (
                                        <div className="absolute top-4 left-4 bg-[#F43F5E] text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                                            {discount}%
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Gallery */}
                                {productImages.length > 1 && (
                                    <div className="mt-4">
                                        <div className="flex gap-[5px]">
                                            {productImages.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImageIndex(index)}
                                                    className={`relative w-[75px] h-[75px] rounded-[10px] overflow-hidden border cursor-pointer ${selectedImageIndex === index
                                                        ? 'border-[#000000]'
                                                        : 'border-[#D4D4D8]'
                                                        } hover:border-[#000000] transition-colors`}
                                                >
                                                    <Image
                                                        src={image}
                                                        alt={`${product.name} - Image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Product Info */}
                            <div className="w-full space-y-6">
                                {/* Title - H1 for SEO */}
                                <h1
                                    className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.2em] tracking-[-1%] text-[#212529] cursor-pointer hover:text-[#064C50] transition-colors"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {product.name}
                                </h1>

                                {/* Rating and SKU */}
                                <div className="flex items-center gap-6 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                            <path d="M6.5 0.32L8.02 4.18L12.18 4.18L8.83 6.82L10.35 10.68L6.5 8.04L2.65 10.68L4.17 6.82L0.82 4.18L4.98 4.18L6.5 0.32Z" fill="#EAB308" />
                                        </svg>
                                        <span
                                            className="text-[13px] sm:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#757575]"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            ({product.rating_average?.toFixed(2) || '0.00'}/ {product.review_count || 0})
                                        </span>
                                    </div>
                                    <span
                                        className="text-[13px] sm:text-[14px] font-normal leading-[1.5em] tracking-[-0.5%] text-[#757575]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        SKU: {product.slug.toUpperCase()}
                                    </span>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[1.6em] tracking-[-0.5%] text-[#757575]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-baseline gap-2">
                                    <span
                                        className="text-[28px] sm:text-[32px] font-semibold text-[#15803D]"
                                        style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif' }}
                                    >
                                        {formatPrice(parseFloat(product.price))}
                                    </span>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-[14px] font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* Add to Cart Section */}
                                <div className="flex items-center gap-4 pt-4">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center border border-[#D1D5DB] rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="px-4 py-3 hover:bg-gray-50 text-[15px] sm:text-[16px] font-medium cursor-pointer"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            -
                                        </button>
                                        <div
                                            className="px-6 py-3 border-x border-[#D1D5DB] text-[15px] sm:text-[16px] font-medium"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="px-4 py-3 hover:bg-gray-50 text-[15px] sm:text-[16px] font-medium cursor-pointer"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isCartLoading}
                                        className="flex-1 bg-[#064C50] text-white px-8 py-3 rounded-xl hover:bg-[#053d41] transition-colors text-[15px] sm:text-[16px] font-semibold cursor-pointer disabled:opacity-50"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        {isCartLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Adding...
                                            </div>
                                        ) : (
                                            'Add to cart'
                                        )}
                                    </button>
                                </div>

                                {/* Wishlist */}
                                <div className="flex items-center pt-2">
                                    <button
                                        onClick={handleWishlistClick}
                                        className="flex items-center gap-2 text-[13px] sm:text-[14px] font-normal text-[#212529] hover:text-[#064C50] transition-colors cursor-pointer"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        Add to wishlist
                                    </button>
                                </div>

                                {/* Nutritional Facts - H2 for SEO */}
                                <div className="pt-4">
                                    <h2
                                        className="text-[22px] sm:text-[24px] lg:text-[28px] font-semibold leading-[1.3em] tracking-[-1%] text-[#111827] mb-4"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Nutritional Facts
                                    </h2>
                                    <div
                                        className="flex flex-col gap-[15px] p-[30px] sm:p-[39px_30px_30px] rounded-xl"
                                        style={{ backgroundColor: 'rgba(6, 76, 80, 0.05)' }}
                                    >
                                        {/* Protein */}
                                        <div className="flex flex-col gap-[6px]">
                                            <div className="flex justify-between items-center">
                                                <p
                                                    className="text-[13px] font-light leading-[1.6em] text-[#212529]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                                >
                                                    Protein 23gr
                                                </p>
                                                <span
                                                    className="text-[13px] font-light leading-[1.6em] text-[#212529]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                                >
                                                    33%
                                                </span>
                                            </div>
                                            <div className="w-full h-[5px] bg-white rounded-xl overflow-hidden">
                                                <div
                                                    className="h-full bg-[#064C50] rounded-xl"
                                                    style={{ width: '33%' }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Carbohydrates */}
                                        <div className="flex flex-col gap-[6px]">
                                            <div className="flex justify-between items-center">
                                                <p
                                                    className="text-[13px] font-light leading-[1.6em] text-[#212529]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                                >
                                                    Carbohydrates 30gr
                                                </p>
                                                <span
                                                    className="text-[13px] font-light leading-[1.6em] text-[#212529]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                                >
                                                    48%
                                                </span>
                                            </div>
                                            <div className="w-full h-[5px] bg-white rounded-xl overflow-hidden">
                                                <div
                                                    className="h-full bg-[#064C50] rounded-xl"
                                                    style={{ width: '48%' }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Fats */}
                                        <div className="flex flex-col gap-[6px]">
                                            <div className="flex justify-between items-center">
                                                <p
                                                    className="text-[13px] font-light leading-[1.6em] text-[#212529]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                                >
                                                    Fats 31gr
                                                </p>
                                                <span
                                                    className="text-[13px] font-light leading-[1.6em] text-[#212529]"
                                                    style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                                >
                                                    45%
                                                </span>
                                            </div>
                                            <div className="w-full h-[5px] bg-white rounded-xl overflow-hidden">
                                                <div
                                                    className="h-full bg-[#064C50] rounded-xl"
                                                    style={{ width: '45%' }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Disclaimer */}
                                        <p
                                            className="text-[13px] font-light leading-[1.6em] text-[#212529] mt-2"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.08%' }}
                                        >
                                            Percent Daily Values are based on a 2,000 calorie diet. Your Daily Values may be higher or lower depending on your calorie needs.
                                        </p>
                                    </div>
                                </div>

                                {/* Product Features Icons - H2 for SEO */}
                                <div className="pt-4">
                                    <h2
                                        className="text-[22px] sm:text-[24px] lg:text-[28px] font-semibold leading-[1.3em] tracking-[-1%] text-[#111827] mb-4"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Product Features
                                    </h2>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
                                        {/* 100% Natural */}
                                        <div
                                            className="flex flex-col justify-center items-center border border-[#D1D5DB] rounded-xl py-6 px-4"
                                            style={{ borderStyle: 'dashed', borderWidth: '1px' }}
                                        >
                                            <div className="w-[32px] h-[32px] mb-[10px] flex items-center justify-center">
                                                <Leaf className="w-[32px] h-[32px]" strokeWidth={1.5} />
                                            </div>
                                            <h3
                                                className="text-[15px] sm:text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-center text-[#212529]"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                100% Natural
                                            </h3>
                                        </div>

                                        {/* No chemicals */}
                                        <div
                                            className="flex flex-col justify-center items-center border border-[#D1D5DB] rounded-xl py-6 px-4"
                                            style={{ borderStyle: 'dashed', borderWidth: '1px' }}
                                        >
                                            <div className="w-[32px] h-[32px] mb-[10px] flex items-center justify-center">
                                                <FlaskConical className="w-[32px] h-[32px]" strokeWidth={1.5} />
                                            </div>
                                            <h3
                                                className="text-[15px] sm:text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-center text-[#212529]"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                No chemicals
                                            </h3>
                                        </div>

                                        {/* Secure payment */}
                                        <div
                                            className="flex flex-col justify-center items-center border border-[#D1D5DB] rounded-xl py-6 px-4"
                                            style={{ borderStyle: 'dashed', borderWidth: '1px' }}
                                        >
                                            <div className="w-[32px] h-[32px] mb-[10px] flex items-center justify-center">
                                                <CreditCard className="w-[32px] h-[32px]" strokeWidth={1.5} />
                                            </div>
                                            <h3
                                                className="text-[15px] sm:text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-center text-[#212529]"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                Secure payment
                                            </h3>
                                        </div>

                                        {/* 24/7 support */}
                                        <div
                                            className="flex flex-col justify-center items-center border border-[#D1D5DB] rounded-xl py-6 px-4"
                                            style={{ borderStyle: 'dashed', borderWidth: '1px' }}
                                        >
                                            <div className="w-[32px] h-[32px] mb-[10px] flex items-center justify-center">
                                                <Headphones className="w-[32px] h-[32px]" strokeWidth={1.5} />
                                            </div>
                                            <h3
                                                className="text-[15px] sm:text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-center text-[#212529]"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                24/7 support
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="pt-6 border-t border-[#DEE2E6]">
                                    <span
                                        className="text-[13px] sm:text-[14px] font-normal text-[#868E96]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        Category:{" "}
                                    </span>
                                    <Link
                                        href={`/shop?category=${encodeURIComponent(product.category.name)}`}
                                        className="text-[13px] sm:text-[14px] font-normal text-[#4E4C4C] hover:text-[#064C50] transition-colors"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        {product.category.name}
                                    </Link>
                                </div>

                                {/* Tags */}
                                <div className="pt-[6px]">
                                    <div className="flex items-center flex-wrap gap-[6px]">
                                        <span
                                            className="text-[12px] font-light leading-[1.6em] text-[#868E96]"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.33%' }}
                                        >
                                            Tags:
                                        </span>
                                        <button
                                            className="px-[10px] pt-[4px] pb-[5.19px] border border-[#DEE2E6] rounded-[6px] bg-transparent text-[12px] font-semibold leading-[1.6em] text-[#4E4C4C] hover:bg-gray-50 transition-colors cursor-pointer"
                                            style={{
                                                fontFamily: 'var(--font-inter), sans-serif',
                                                letterSpacing: '-3.33%',
                                                boxShadow: '0px 1px 2px 0px rgba(33, 37, 41, 0.05)'
                                            }}
                                        >
                                            klbtheme
                                        </button>
                                        <span
                                            className="text-[12px] font-light leading-[1.6em] text-[#868E96]"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.33%' }}
                                        >
                                            ,
                                        </span>
                                        <button
                                            className="px-[10px] pt-[4px] pb-[5.19px] border border-[#DEE2E6] rounded-[6px] bg-transparent text-[12px] font-semibold leading-[1.6em] text-[#4E4C4C] hover:bg-gray-50 transition-colors cursor-pointer"
                                            style={{
                                                fontFamily: 'var(--font-inter), sans-serif',
                                                letterSpacing: '-3.33%',
                                                boxShadow: '0px 1px 2px 0px rgba(33, 37, 41, 0.05)'
                                            }}
                                        >
                                            themeforest
                                        </button>
                                    </div>
                                </div>

                                {/* Share */}
                                <div className="flex items-center flex-wrap gap-[10px] pt-[6px]">
                                    <span
                                        className="text-[12px] font-semibold leading-[1.6em] text-[#212529]"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-3.33%' }}
                                    >
                                        Share:
                                    </span>
                                    <div className="flex items-center gap-[4px]">
                                        {/* Facebook */}
                                        <button
                                            className="w-[36px] h-[36px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                            aria-label="Share on Facebook"
                                        >
                                            <Facebook className="w-[18px] h-[18px] text-[#1877F2]" strokeWidth={1.5} />
                                        </button>

                                        {/* Twitter/X */}
                                        <button
                                            className="w-[36px] h-[36px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                            aria-label="Share on Twitter"
                                        >
                                            <Twitter className="w-[18px] h-[18px] text-[#000000]" strokeWidth={1.5} />
                                        </button>

                                        {/* Pinterest */}
                                        <button
                                            className="w-[36px] h-[36px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                            aria-label="Share on Pinterest"
                                        >
                                            <Share2 className="w-[18px] h-[18px] text-[#BD081C]" strokeWidth={1.5} />
                                        </button>

                                        {/* WhatsApp */}
                                        <button
                                            className="w-[36px] h-[36px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                            aria-label="Share on WhatsApp"
                                        >
                                            <MessageCircle className="w-[18px] h-[18px] text-[#25D366]" strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Tabs Section */}
            <ProductTabs 
                productSlug={apiProduct.slug} 
                reviewCount={apiProduct.review_count || 0}
                productDescription={apiProduct.description}
            />

            {/* Related Products Section */}
            <RelatedProducts 
                categoryId={product.category.id} 
                categoryName={product.category.name}
                currentProductId={product.id} 
            />

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />

            {/* Login Modal */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

            {/* Cart Notification */}
            {showCartNotification && (
                <div className="fixed bottom-4 right-4 z-[9999]">
                    <div className="bg-green-600 text-white rounded-lg p-4 shadow-xl max-w-sm animate-slide-in-right">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Link href="/cart" className="text-white font-medium text-[16px] underline cursor-pointer hover:no-underline" style={{ fontFamily: 'var(--font-inter), sans-serif' }} onClick={closeCartNotification}>
                                        View cart
                                    </Link>
                                </div>
                                <p className="text-white text-[14px] mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                    {quantity} × {product.name}
                                </p>
                                <p className="text-white text-[14px] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                    Cart Updated
                                </p>
                            </div>
                            <button onClick={closeCartNotification} className="text-white hover:text-gray-200 transition-colors ml-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
