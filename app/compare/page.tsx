"use client";

import { useCompareStore } from "@/stores/useCompareStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import { X } from "lucide-react";

export default function ComparePage() {
    const { items, removeFromCompare, clearCompare } = useCompareStore();
    const { formatPrice } = useCurrency();

    const getImageUrl = (url: string) => {
        if (!url) return '/placeholder.png';
        return url.startsWith('http') ? url : `http://localhost:8000${url}`;
    };

    if (items.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-12">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center space-x-2 text-sm">
                                <li>
                                    <Link href="/" className="text-gray-500 hover:text-[#064C50]">
                                        Home
                                    </Link>
                                </li>
                                <li className="text-gray-500">/</li>
                                <li className="text-gray-900 font-medium">Compare Products</li>
                            </ol>
                        </nav>

                        {/* Empty State */}
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="mb-6">
                                    <svg
                                        className="mx-auto h-24 w-24 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Products to Compare
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    You haven't added any products to compare yet. Add products from the shop to compare their features.
                                </p>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center px-6 py-3 bg-[#064C50] text-white rounded-full hover:bg-[#053d41] transition-colors"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-12">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-500 hover:text-[#064C50]">
                                    Home
                                </Link>
                            </li>
                            <li className="text-gray-500">/</li>
                            <li className="text-gray-900 font-medium">Compare Products</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
                            <p className="text-gray-600 mt-1">
                                Comparing {items.length} {items.length === 1 ? 'product' : 'products'}
                            </p>
                        </div>
                        {items.length > 0 && (
                            <button
                                onClick={clearCompare}
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                        <table className="w-full">
                            <tbody>
                                {/* Product Images & Names */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50 w-48">
                                        Product
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center relative">
                                            <button
                                                onClick={() => removeFromCompare(product.id)}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <Link href={`/product/${product.slug}`}>
                                                <div className="relative w-32 h-32 mx-auto mb-3 bg-gray-100 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={getImageUrl(product.images?.[0]?.image)}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <h3 className="font-medium text-gray-900 hover:text-[#064C50] line-clamp-2">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </td>
                                    ))}
                                </tr>

                                {/* Price */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                                        Price
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            <span className="text-xl font-bold text-[#15803D]">
                                                {formatPrice(parseFloat(product.price))}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Category */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                                        Category
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-gray-600">
                                            {product.category?.name || 'N/A'}
                                        </td>
                                    ))}
                                </tr>

                                {/* Stock Status */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                                        Availability
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            {product.stock > 0 ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    In Stock ({product.stock})
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rating */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                                        Rating
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            {product.review_count > 0 ? (
                                                <div className="flex items-center justify-center gap-1">
                                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">
                                                        {product.rating_average?.toFixed(1)} ({product.review_count})
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">No reviews</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Description */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                                        Description
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm text-gray-600">
                                            {product.short_description || 'No description available'}
                                        </td>
                                    ))}
                                </tr>

                                {/* Actions */}
                                <tr>
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                                        Actions
                                    </td>
                                    {items.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    className="px-4 py-2 bg-[#064C50] text-white rounded-lg hover:bg-[#053d41] transition-colors text-sm"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => removeFromCompare(product.id)}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Info */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            💡 You can compare up to 4 products at a time. Add more products from the shop to compare.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
