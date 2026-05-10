"use client";

import Image from "next/image";
import { useFooterData } from "@/hooks/useFooterData";

export default function Footer2() {
    const { siteSettings, footerColumns, loading } = useFooterData();

    if (loading) {
        return (
            <section className="w-full bg-[#F9FAFB] py-6 lg:py-8">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    <div className="border-t border-[#E5E7EB] pt-6 lg:pt-8">
                        <p className="text-center text-gray-600">Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    const getImageUrl = (url: string | null) => {
        if (!url) return '/logo-footer-41ef32.png';
        return url.startsWith('http') ? url : `http://localhost:8000${url}`;
    };

    return (
        <section className="w-full bg-[#F9FAFB] py-6 lg:py-8">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="border-t border-[#E5E7EB] pt-6 lg:pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 w-full">
                        {/* Column 1 - Logo and Contact */}
                        <div className="flex flex-col items-start gap-5 w-full lg:w-auto lg:max-w-[220px]">
                            {/* Logo */}
                            <div className="relative" style={{ width: "167px", height: "30px" }}>
                                <Image
                                    src={getImageUrl(siteSettings?.site_logo_footer || null)}
                                    alt={siteSettings?.site_name || "Logo"}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-col gap-4 w-full">
                                <span
                                    className="text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-left text-[#6B7280]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {siteSettings?.address || '75 Hoel Trok Station Road, Cardiff, UK\nUnited Kingdom'}
                                </span>
                                <a
                                    href={`mailto:${siteSettings?.email || 'info@example.com'}`}
                                    className="text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-left text-[#064C50] hover:underline"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {siteSettings?.email || 'info@example.com'}
                                </a>
                            </div>
                        </div>

                        {/* Dynamic Footer Columns */}
                        {footerColumns.map((column) => (
                            <div key={column.id} className="flex flex-col items-start gap-3 w-full lg:w-auto">
                                <h4
                                    className="text-[16px] font-semibold leading-[1.4em] tracking-[-0.5%] text-left text-[#212529]"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    {column.title}
                                </h4>
                                <ul className="flex flex-col gap-2">
                                    {column.links.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={link.final_url}
                                                target={link.open_in_new_tab ? '_blank' : undefined}
                                                rel={link.open_in_new_tab ? 'noopener noreferrer' : undefined}
                                                className="text-[14px] font-normal leading-[1.6em] tracking-[-0.5%] text-left text-[#6B7280] hover:text-[#064C50] transition-colors"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}