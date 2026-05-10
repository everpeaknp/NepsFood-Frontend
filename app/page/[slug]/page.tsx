"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cmsAPI } from "@/lib/api";
import { Page } from "@/types/page";
import WidgetRenderer from "@/components/WidgetRenderer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DynamicPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                const response = await cmsAPI.getPageBySlug(slug);
                console.log('Page data:', response.data);
                setPage(response.data);
            } catch (err: any) {
                console.error('Error fetching page:', err);
                setError(err.response?.status === 404 ? 'Page not found' : 'Failed to load page');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPage();
        }
    }, [slug]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading page...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !page) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                        <p className="text-gray-600 mb-8">{error || 'Page not found'}</p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-[#064C50] text-white rounded-lg hover:bg-[#053d41] transition-colors"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen">
                {/* Page Title - Hidden but good for SEO */}
                <h1 className="sr-only">{page.title}</h1>

                {/* Render all widgets */}
                <div className="w-full">
                    {page.widgets && page.widgets.length > 0 ? (
                        page.widgets.map((pageWidget) => (
                            <WidgetRenderer
                                key={pageWidget.id}
                                pageWidget={pageWidget}
                            />
                        ))
                    ) : (
                        <div className="container mx-auto px-4 py-16 text-center">
                            <p className="text-gray-600">This page has no content yet.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
