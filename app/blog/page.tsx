"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import BlogSidebar from "@/components/BlogSidebar";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import { blogAPI } from "@/lib/api";
import { BlogPost, BlogListResponse } from "@/types/blog";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await blogAPI.getAllPosts({ page: currentPage });
            const data: BlogListResponse = response.data;
            
            setPosts(data.results);
            setTotalCount(data.count);
            // Assuming 10 posts per page (Django default)
            setTotalPages(Math.ceil(data.count / 10));
        } catch (err: any) {
            console.error("Error fetching blog posts:", err);
            setError("Failed to load blog posts");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    if (loading && posts.length === 0) {
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

    if (error && posts.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={fetchPosts}
                            className="px-6 py-2 bg-[#064C50] text-white rounded-lg hover:bg-[#053d41]"
                        >
                            Try Again
                        </button>
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
                <title>Blog | Supgoro - Latest E-commerce Insights</title>
                <meta name="description" content="Discover the latest insights on e-commerce, product reviews, customer behavior, and marketplace success strategies from Supgoro." />
                <meta name="keywords" content="e-commerce blog, product reviews, customer behavior, marketplace tips, online selling strategies" />
                <meta property="og:title" content="Blog | Supgoro - Latest E-commerce Insights" />
                <meta property="og:description" content="Discover the latest insights on e-commerce, product reviews, customer behavior, and marketplace success strategies." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="/blog" />
            </Head>
            <div className="min-h-screen bg-white">
                <Header />

                {/* Blog Hero Section */}
                <section className="w-full bg-white border-b border-gray-200 py-8 sm:py-10 lg:py-12">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                        <div className="text-center">
                            <h1
                                className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.2em] tracking-[-1%] text-black"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                Blog
                            </h1>
                            <p className="text-gray-600 mt-4">
                                {totalCount} {totalCount === 1 ? 'post' : 'posts'} found
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start py-4 lg:py-8">
                            {/* Main Content */}
                            <div className="flex-1 min-w-0 w-full">
                                {/* Blog Posts */}
                                <div className="flex flex-col" style={{ gap: 'var(--component-gap)' }}>
                                    {posts.map((post, index) => (
                                        <div key={post.id} className="w-full">
                                            {/* Structured Data for SEO - Only for first post on first page */}
                                            {currentPage === 1 && index === 0 && (
                                                <script
                                                    type="application/ld+json"
                                                    dangerouslySetInnerHTML={{
                                                        __html: JSON.stringify({
                                                            "@context": "https://schema.org",
                                                            "@type": "BlogPosting",
                                                            "headline": post.title,
                                                            "description": post.excerpt,
                                                            "image": post.featured_image_url,
                                                            "datePublished": post.published_at,
                                                            "dateModified": post.updated_at || post.published_at,
                                                            "author": {
                                                                "@type": "Person",
                                                                "name": post.author.first_name && post.author.last_name 
                                                                    ? `${post.author.first_name} ${post.author.last_name}`
                                                                    : post.author.username
                                                            },
                                                            "publisher": {
                                                                "@type": "Organization",
                                                                "name": "Supgoro",
                                                                "logo": {
                                                                    "@type": "ImageObject",
                                                                    "url": "/logoecommerce.png"
                                                                }
                                                            },
                                                            "mainEntityOfPage": {
                                                                "@type": "WebPage",
                                                                "@id": "/blog"
                                                            }
                                                        })
                                                    }}
                                                />
                                            )}

                                            <article className="flex flex-col pb-12 sm:pb-16 mb-6 sm:mb-8 border-b border-gray-100 last:border-b-0">
                                                {/* Post Image */}
                                                {post.featured_image_url && (
                                                    <div className="relative mb-4 sm:mb-6">
                                                        <a href={`/blog/${post.slug}`} className="block">
                                                            <div className="relative w-full aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                                                                <Image
                                                                    src={post.featured_image_url}
                                                                    alt={post.title}
                                                                    fill
                                                                    className="object-cover"
                                                                    priority={currentPage === 1 && index === 0}
                                                                />
                                                            </div>
                                                        </a>
                                                    </div>
                                                )}

                                                {/* Post Content */}
                                                <div className="flex flex-col" style={{ gap: 'var(--content-spacing)' }}>
                                                    {/* Title - SEO Optimized */}
                                                    {currentPage === 1 && index === 0 ? (
                                                        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3em] text-[#212529]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            <a href={`/blog/${post.slug}`} className="hover:text-[#064C50] transition-colors cursor-pointer">
                                                                {post.title}
                                                            </a>
                                                        </h1>
                                                    ) : (
                                                        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3em] text-[#212529]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            <a href={`/blog/${post.slug}`} className="hover:text-[#064C50] transition-colors cursor-pointer">
                                                                {post.title}
                                                            </a>
                                                        </h2>
                                                    )}

                                                    {/* Excerpt */}
                                                    <div>
                                                        <div 
                                                            className="text-[14px] sm:text-[16px] font-normal leading-[1.6em] text-[#6B7280] mb-4 sm:mb-6" 
                                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                                        />

                                                        {/* Read More Button */}
                                                        <a
                                                            href={`/blog/${post.slug}`}
                                                            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#000000] text-white rounded-lg hover:bg-gray-800 transition-colors"
                                                        >
                                                            <span className="text-[13px] sm:text-[14px] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                Read More
                                                            </span>
                                                        </a>
                                                    </div>

                                                    {/* Post Meta */}
                                                    <div className="flex items-center flex-wrap gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200" style={{ paddingBottom: 'var(--content-spacing)' }}>
                                                        {/* Date */}
                                                        <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            {formatDate(post.published_at)}
                                                        </span>

                                                        {/* Separator */}
                                                        <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            |
                                                        </span>

                                                        {/* Category */}
                                                        <a href={`/blog?category=${post.category.slug}`} className="text-[12px] sm:text-[14px] font-normal text-[#757575] hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            {post.category.name}
                                                        </a>

                                                        {/* Reading Time */}
                                                        <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            |
                                                        </span>
                                                        <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                            {post.reading_time} min read
                                                        </span>

                                                        {/* Tags */}
                                                        {post.tags.length > 0 && (
                                                            <>
                                                                <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                    |
                                                                </span>
                                                                <div className="flex items-center gap-1 sm:gap-2">
                                                                    {post.tags.map((tag, tagIndex) => (
                                                                        <span key={tag.id} className="flex items-center">
                                                                            <a href={`/blog?tag=${tag.slug}`} className="text-[12px] sm:text-[14px] font-normal text-[#757575] hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                                {tag.name}
                                                                            </a>
                                                                            {tagIndex < post.tags.length - 1 && (
                                                                                <span className="text-[12px] sm:text-[14px] font-normal text-[#757575] ml-1" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                                    ,
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    ))}

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="w-full">
                                            <div className="flex justify-start items-center gap-1 pt-4">
                                                {/* Previous Arrow */}
                                                {currentPage > 1 && (
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-[#212529] hover:text-[#064C50] transition-colors mr-2 cursor-pointer"
                                                    >
                                                        <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                            <path d="M15 18l-6-6 6-6" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Page Numbers */}
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[12px] sm:text-[14px] font-medium transition-colors cursor-pointer ${currentPage === page
                                                            ? 'bg-[#064C50] text-white'
                                                            : 'border border-gray-300 text-[#212529] hover:bg-gray-50'
                                                            }`}
                                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}

                                                {/* Next Arrow */}
                                                {currentPage < totalPages && (
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-[#212529] hover:text-[#064C50] transition-colors ml-2 cursor-pointer"
                                                    >
                                                        <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                            <path d="M9 18l6-6-6-6" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className="w-full lg:w-[300px] lg:sticky lg:top-8 lg:self-start flex-shrink-0">
                                <div className="lg:hidden mb-6">
                                    <BlogSidebar />
                                </div>
                                <div className="hidden lg:block">
                                    <BlogSidebar />
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        </>
    );
}
