"use client";

import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import BlogSidebar from "@/components/BlogSidebar";
import Image from "next/image";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { blogAPI } from "@/lib/api";
import { BlogPost } from "@/types/blog";

export default function SingleBlogPage() {
    const params = useParams();
    const slug = params.id as string;
    
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await blogAPI.getPostBySlug(slug);
            setPost(response.data);
        } catch (err: any) {
            console.error("Error fetching blog post:", err);
            setError("Blog post not found");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

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

    if (error || !post) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <a href="/blog" className="px-6 py-2 bg-[#064C50] text-white rounded-lg hover:bg-[#053d41]">
                            Back to Blog
                        </a>
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
                <title>{post.title} | Supgoro Blog</title>
                <meta name="description" content={post.meta_description || post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.meta_description || post.excerpt} />
                {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
                <meta property="og:type" content="article" />
            </Head>

            <div className="min-h-screen bg-white">
                <Header />

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start py-4 lg:py-8">
                            {/* Main Content */}
                            <div className="flex-1 min-w-0 w-full">
                                <article className="flex flex-col pb-12 sm:pb-16 mb-6 sm:mb-8">
                                    <div className="flex flex-col" style={{ gap: 'var(--content-spacing)' }}>
                                        {/* Title */}
                                        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3em] text-[#212529]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                            {post.title}
                                        </h1>

                                        {/* Post Meta */}
                                        <div className="flex items-center flex-wrap gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200 pb-4">
                                            <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {formatDate(post.published_at)}
                                            </span>
                                            <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]">|</span>
                                            <a href={`/blog?category=${post.category.slug}`} className="text-[12px] sm:text-[14px] font-normal text-[#757575] hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {post.category.name}
                                            </a>
                                            <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]">|</span>
                                            <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {post.reading_time} min read
                                            </span>
                                            {post.tags.length > 0 && (
                                                <>
                                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#757575]">|</span>
                                                    <div className="flex items-center gap-1 sm:gap-2">
                                                        {post.tags.map((tag, tagIndex) => (
                                                            <span key={tag.id} className="flex items-center">
                                                                <a href={`/blog?tag=${tag.slug}`} className="text-[12px] sm:text-[14px] font-normal text-[#757575] hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                                    {tag.name}
                                                                </a>
                                                                {tagIndex < post.tags.length - 1 && <span className="text-[12px] sm:text-[14px] font-normal text-[#757575] ml-1">,</span>}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Featured Image */}
                                        {post.featured_image_url && (
                                            <div className="relative mb-4 sm:mb-6">
                                                <div className="relative w-full aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={post.featured_image_url}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Post Content */}
                                        <div 
                                            className="prose prose-lg max-w-none text-[14px] sm:text-[16px] font-normal leading-[1.6em] text-[#6B7280]" 
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                                        />

                                        {/* Author Info */}
                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-gray-600">
                                                        {post.author.first_name?.[0] || post.author.username[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {post.author.first_name && post.author.last_name 
                                                            ? `${post.author.first_name} ${post.author.last_name}`
                                                            : post.author.username}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{post.view_count} views</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            {/* Sidebar */}
                            <aside className="w-full lg:w-[300px] lg:sticky lg:top-8 lg:self-start flex-shrink-0">
                                <BlogSidebar />
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
