"use client";

import { Search, User, Heart, ArrowLeftRight, ShoppingCart, ChevronDown, Menu, X, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import SaleMegaMenu from "./SaleMegaMenu";
import ClientPrice from "./ClientPrice";
import { useAuth } from "@/contexts/AuthContext";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useCompareStore } from "@/stores/useCompareStore";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const { siteSettings, navigation, categories, megaMenuSettings, megaMenuCategories, loading: headerDataLoading } = useHeaderData();
    const { items: compareItems } = useCompareStore();
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Fetch cart and wishlist counts if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchCartCount();
            fetchWishlistCount();
        } else {
            setCartCount(0);
            setWishlistCount(0);
            setCartTotal(0);
        }
    }, [isAuthenticated]);

    // Listen for cart/wishlist updates
    useEffect(() => {
        const handleCartUpdate = () => {
            if (isAuthenticated) {
                fetchCartCount();
            }
        };

        const handleWishlistUpdate = () => {
            if (isAuthenticated) {
                fetchWishlistCount();
            }
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('wishlist-updated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('wishlist-updated', handleWishlistUpdate);
        };
    }, [isAuthenticated]);

    const fetchCartCount = async () => {
        if (!isAuthenticated) {
            setCartCount(0);
            setCartTotal(0);
            return;
        }
        
        // Double check token exists
        const token = localStorage.getItem('access_token');
        if (!token) {
            setCartCount(0);
            setCartTotal(0);
            return;
        }
        
        try {
            const { cartAPI } = await import('@/lib/api');
            const response = await cartAPI.getCart();
            const cart = response.data;
            setCartCount(cart.item_count || 0);
            setCartTotal(cart.subtotal || 0);
        } catch (error) {
            // Silently fail - user might not be authenticated
            setCartCount(0);
            setCartTotal(0);
        }
    };

    const fetchWishlistCount = async () => {
        if (!isAuthenticated) {
            setWishlistCount(0);
            return;
        }
        
        // Double check token exists
        const token = localStorage.getItem('access_token');
        if (!token) {
            setWishlistCount(0);
            return;
        }
        
        try {
            const { wishlistAPI } = await import('@/lib/api');
            const response = await wishlistAPI.getAll();
            const wishlist = response.data;
            setWishlistCount(Array.isArray(wishlist) ? wishlist.length : (wishlist.results?.length || 0));
        } catch (error) {
            // Silently fail - user might not be authenticated
            setWishlistCount(0);
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsUserMenuOpen(false);
    };

    // Close user menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isUserMenuOpen]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSaleOpen, setIsSaleOpen] = useState(false);
    const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
    const [saleCloseTimeout, setSaleCloseTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    // Set mounted state
    useEffect(() => {
        setMounted(true);
    }, []);

    // Use dynamic promo message or fallback to default
    const promoMessages = mounted && siteSettings?.top_banner_text 
        ? [siteSettings.top_banner_text]
        : [
            "FREE delivery & 40% Discount for next 3 orders! Place your 1st Order in",
            "Get 50% OFF on your first purchase! Limited time offer ends soon",
            "Buy 2 Get 1 FREE on selected items! Shop now and save more"
        ];

    const topBannerBgColor = mounted && siteSettings?.top_banner_bg_color ? siteSettings.top_banner_bg_color : "#9ACD32";
    const showTopBanner = !mounted || siteSettings?.show_top_banner !== false;

    // Helper function to get image URL
    const getImageUrl = (url: string | null | undefined, fallback: string) => {
        if (!url) return fallback;
        return url.startsWith('http') ? url : `http://localhost:8000${url}`;
    };

    const nextPromo = () => {
        if (currentPromoIndex < promoMessages.length - 1) {
            setCurrentPromoIndex((prev) => prev + 1);
        }
    };

    const prevPromo = () => {
        if (currentPromoIndex > 0) {
            setCurrentPromoIndex((prev) => prev - 1);
        }
    };

    // Use dynamic categories or fallback to static
    const displayCategories = categories.length > 0 ? categories : [
        { id: 1, name: "Bakery", slug: "bakery", image: "/categ1.png" },
        { id: 2, name: "Beverages", slug: "beverages", image: "/categ2.png" },
        { id: 3, name: "Dairy & Eggs", slug: "dairy-eggs", image: "/categ3.png" },
        { id: 4, name: "Deli", slug: "deli", image: "/categ4.png" },
        { id: 5, name: "Frozen Foods", slug: "frozen-foods", image: "/categ5.png" },
        { id: 6, name: "Fruits & Vegetables", slug: "fruits-vegetables", image: "/categ6.png" },
        { id: 7, name: "Healthcare", slug: "healthcare", image: "/categ7.png" },
        { id: 8, name: "Meat & Seafood", slug: "meat-seafood", image: "/categ8.png" },
        { id: 9, name: "Snacks", slug: "snacks", image: "/categ9.png" }
    ];

    // Use dynamic navigation or fallback to static
    const displayNavigation = navigation.length > 0 ? navigation : [
        { id: 1, title: "Home", final_url: "/", open_in_new_tab: false },
        { id: 2, title: "Shop", final_url: "/shop", open_in_new_tab: false },
        { id: 3, title: "Beverages", final_url: "/shop?category=Beverages", open_in_new_tab: false },
        { id: 4, title: "Bakery", final_url: "/shop?category=Bakery", open_in_new_tab: false },
        { id: 5, title: "Categories", final_url: "#", open_in_new_tab: false },
        { id: 6, title: "Blog", final_url: "/blog", open_in_new_tab: false },
        { id: 7, title: "Contact", final_url: "/contact", open_in_new_tab: false },
    ];

    const handleMouseEnter = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
        setIsCategoriesOpen(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setIsCategoriesOpen(false);
        }, 200); // 200ms delay before closing
        setCloseTimeout(timeout);
    };

    const handleSaleMouseEnter = () => {
        if (saleCloseTimeout) {
            clearTimeout(saleCloseTimeout);
            setSaleCloseTimeout(null);
        }
        setIsSaleOpen(true);
    };

    const handleSaleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setIsSaleOpen(false);
        }, 200); // 200ms delay before closing
        setSaleCloseTimeout(timeout);
    };

    // Close category dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        }

        if (isCategoryDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isCategoryDropdownOpen]);

    return (
        <header className="relative">
            {/* Top Promotional Banner */}
            {showTopBanner && (
                <div 
                    className="text-black py-2 px-4 text-center relative flex items-center justify-between overflow-hidden"
                    style={{ backgroundColor: topBannerBgColor }}
                >
                    <button
                        onClick={prevPromo}
                        disabled={currentPromoIndex === 0}
                        className={`text-[18px] p-1 transition-colors z-10 cursor-pointer ${currentPromoIndex === 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-black hover:text-gray-700'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
                        >
                            {promoMessages.map((message, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 text-[16px] font-medium leading-[1.4em] tracking-[-0.5%]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {message}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={nextPromo}
                        disabled={currentPromoIndex === promoMessages.length - 1}
                        className={`text-[18px] p-1 transition-colors z-10 cursor-pointer ${currentPromoIndex === promoMessages.length - 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-black hover:text-gray-700'
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Mobile Header - Only visible on mobile */}
            <div className="lg:hidden bg-white border-b border-gray-200 py-3 px-4">
                <div className="flex items-center justify-between">
                    {/* Burger Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-800" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>

                    {/* Logo - Center */}
                    <a href="/" className="relative w-[160px] h-[45px]">
                        <Image
                            src={getImageUrl(siteSettings?.site_logo, '/logoecommerce.png')}
                            alt={siteSettings?.site_name || "Logo"}
                            fill
                            className="object-contain"
                            priority
                        />
                    </a>

                    {/* Cart Button */}
                    <a href="/cart" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg relative">
                        <ShoppingCart className="w-6 h-6 text-gray-600" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </a>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
                    <div className="px-4 py-4 space-y-4">
                        {/* Search Bar */}
                        <div className="space-y-2">
                            <div className="relative" ref={categoryDropdownRef}>
                                <button
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    className="w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    <span className="text-gray-600 text-[14px] font-normal" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>All Categories</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </button>
                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-48 overflow-y-auto">
                                        <a
                                            href="/shop"
                                            onClick={() => {
                                                setIsCategoryDropdownOpen(false);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 transition-colors"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            All Categories
                                        </a>
                                        {displayCategories.map((category) => (
                                            <a
                                                key={category.id}
                                                href={`/shop?category=${encodeURIComponent(category.name)}`}
                                                onClick={() => {
                                                    setIsCategoryDropdownOpen(false);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 transition-colors"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                {category.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-[14px]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col space-y-3">
                            {displayNavigation.slice(0, 4).map((item) => (
                                <a 
                                    key={item.id}
                                    href={item.final_url} 
                                    target={item.open_in_new_tab ? '_blank' : undefined}
                                    rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                                    className="text-gray-800 hover:text-teal-600 text-[16px] font-medium py-2" 
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {item.title}
                                </a>
                            ))}

                            {/* Categories Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                                    className="flex items-center justify-between w-full text-gray-800 hover:text-teal-600 text-[16px] font-medium py-2"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    <span>Categories</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Categories Mega Menu Content */}
                                {isMobileCategoriesOpen && (
                                    <div className="mt-2 pl-4 space-y-2">
                                        {displayCategories.map((category) => (
                                            <a
                                                key={category.id}
                                                href={`/shop?category=${encodeURIComponent(category.name)}`}
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setIsMobileCategoriesOpen(false);
                                                }}
                                                className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                                            >
                                                <div className="w-12 h-12 bg-[#F3F4F6] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <div className="relative w-10 h-10">
                                                        <Image
                                                            src={getImageUrl(category.image, '/categ1.png')}
                                                            alt={category.name}
                                                            fill
                                                            className="object-cover rounded"
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-[14px] font-medium text-[#374151]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                    {category.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {displayNavigation.slice(5).map((item) => (
                                <a 
                                    key={item.id}
                                    href={item.final_url}
                                    target={item.open_in_new_tab ? '_blank' : undefined}
                                    rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                                    className="text-gray-800 hover:text-teal-600 text-[16px] font-medium py-2" 
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </nav>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-around pt-4 border-t border-gray-200">
                            <a href="/my-account" className="p-2 hover:bg-gray-100 rounded-full">
                                <User className="w-6 h-6 text-gray-600" />
                            </a>
                            <a href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full relative">
                                <Heart className="w-6 h-6 text-gray-600" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </a>
                            <a href="/compare" className="p-2 hover:bg-gray-100 rounded-full relative">
                                <ArrowLeftRight className="w-6 h-6 text-gray-600" />
                                {compareItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                        {compareItems.length}
                                    </span>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Secondary Navigation - Hidden on mobile */}
            <div className="hidden lg:block bg-gray-100 text-gray-600 py-2">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <a href="/about" className="text-[14px] font-normal hover:text-gray-800" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>About Us</a>
                        <a href="/faq" className="text-[14px] font-normal hover:text-gray-800" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>FAQ</a>
                        <a href="/my-account" className="text-[14px] font-normal hover:text-gray-800" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>My account</a>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-[12px] font-medium">+</span>
                            </div>
                            <span className="text-[14px] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Order now and get it within 15 mins !</span>
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <a href="/contact" className="text-[14px] font-normal hover:text-gray-800" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Contact</a>
                        {/* Currency switcher temporarily disabled to prevent hydration issues */}
                        <div className="relative">
                            <span className="text-[14px] font-normal" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>NPR</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Header - Hidden on mobile */}
            <div className="hidden lg:block bg-white border-b border-gray-200 py-4">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="relative w-[200px] h-[55px] block">
                            <Image
                                src={getImageUrl(siteSettings?.site_logo, '/logoecommerce.png')}
                                alt={siteSettings?.site_name || "Logo"}
                                fill
                                className="object-contain"
                                priority
                            />
                        </a>
                    </div>

                    {/* Search Section */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="flex">
                            <div className="relative" ref={categoryDropdownRef}>
                                <button
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    className="flex items-center bg-gray-100 px-4 py-2 rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    <span className="text-gray-600 text-[14px] font-normal" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>All Categories</span>
                                    <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
                                </button>
                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-64 overflow-y-auto">
                                        <a
                                            href="/shop"
                                            onClick={() => setIsCategoryDropdownOpen(false)}
                                            className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 transition-colors"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            All Categories
                                        </a>
                                        {displayCategories.map((category) => (
                                            <a
                                                key={category.id}
                                                href={`/shop?category=${encodeURIComponent(category.name)}`}
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                                className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 transition-colors"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                {category.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search popular products"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-[14px] font-normal"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-6">
                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <button 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2"
                            >
                                <User className="w-6 h-6 text-gray-600" />
                                {isAuthenticated && user && (
                                    <span className="text-sm font-medium text-gray-700 hidden xl:block" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                        {user.first_name || user.username}
                                    </span>
                                )}
                            </button>
                            
                            {/* User Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[100]">
                                    {isAuthenticated ? (
                                        <>
                                            <a
                                                href="/my-account"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                My Account
                                            </a>
                                            <a
                                                href="/my-account?tab=orders"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                My Orders
                                            </a>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <a
                                            href="/my-account"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            Login / Register
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <a href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full relative">
                            <Heart className="w-6 h-6 text-gray-600" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[12px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </a>
                        <a href="/compare" className="p-2 hover:bg-gray-100 rounded-full relative">
                            <ArrowLeftRight className="w-6 h-6 text-gray-600" />
                            {compareItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[12px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                    {compareItems.length}
                                </span>
                            )}
                        </a>
                        <a href="/cart" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg relative">
                            <ShoppingCart className="w-6 h-6 text-gray-600" />
                            <ClientPrice
                                price={cartTotal}
                                className="text-gray-800 font-medium text-[16px]"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[12px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </a>
                    </div>
                </div>
            </div>
            {/* Main Navigation - Hidden on mobile */}
            <nav className="hidden lg:block bg-white border-b border-gray-200 py-3 relative overflow-visible">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 flex items-center justify-between">
                    <div className="flex space-x-8">
                        {displayNavigation.map((item, index) => {
                            // Check if this is the Categories item (usually has # as URL)
                            if (item.title.toLowerCase() === 'categories' || item.final_url === '#') {
                                return (
                                    <div
                                        key={item.id}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <a href="#" className="flex items-center space-x-1 text-gray-800 hover:text-teal-600">
                                            <span className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{item.title}</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </a>
                                    </div>
                                );
                            }
                            return (
                                <a 
                                    key={item.id}
                                    href={item.final_url}
                                    target={item.open_in_new_tab ? '_blank' : undefined}
                                    rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                                    className="text-gray-800 hover:text-teal-600 text-[16px] font-medium" 
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {item.title}
                                </a>
                            );
                        })}
                    </div>

                    {/* Best Seller Badge - Dynamic */}
                    {megaMenuSettings && megaMenuSettings.show_sale_badge && (
                        <div
                            className="flex items-center space-x-2"
                            onMouseEnter={handleSaleMouseEnter}
                            onMouseLeave={handleSaleMouseLeave}
                        >
                            <div className="w-4 h-4 text-red-500">%</div>
                            <span className="text-gray-800 text-[16px] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                {megaMenuSettings.sale_badge_label}
                            </span>
                            <span className="bg-red-500 text-white text-[12px] font-bold px-2 py-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                {megaMenuSettings.sale_badge_text}
                            </span>
                        </div>
                    )}
                </div>
            </nav>

            {/* Categories Mega Menu - Full Width */}
            {isCategoriesOpen && (
                <div
                    className="absolute left-0 right-0 w-full z-[100]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CategoriesMegaMenu isOpen={isCategoriesOpen} />
                </div>
            )}

            {/* Sale Mega Menu - Full Width */}
            {isSaleOpen && (
                <div
                    className="absolute left-0 right-0 w-full z-[100]"
                    onMouseEnter={handleSaleMouseEnter}
                    onMouseLeave={handleSaleMouseLeave}
                >
                    <SaleMegaMenu isOpen={isSaleOpen} />
                </div>
            )}
        </header>
    );
}