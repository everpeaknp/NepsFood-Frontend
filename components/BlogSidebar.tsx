"use client";

import Image from "next/image";

export default function BlogSidebar() {
    const sidebarPosts = [
        {
            id: 1,
            title: "Unlocking the Power of Product Reviews",
            date: "November 4, 2025",
            image: "/blog-post-1-sidebar-56586a.png"
        },
        {
            id: 2,
            title: "Understanding Customer Behavior in E-commerce",
            date: "November 4, 2025",
            image: "/blog-post-2-sidebar-56586a.png"
        },
        {
            id: 3,
            title: "Maximize Your Marketplace Success: Tips & Strategies",
            date: "November 4, 2025",
            image: "/blog-post-3-sidebar-56586a.png"
        }
    ];

    const socialLinks = [
        {
            name: "facebook",
            label: "FACEBOOK",
            value: "Follow",
            color: "#1877F2",
            bgColor: "rgba(24, 119, 242, 0.1)",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15.61 8C15.61 3.58 12.03 0 7.61 0S-0.39 3.58 -0.39 8c0 3.99 2.92 7.3 6.74 7.9v-5.59H4.36V8h2.98V6.24c0-2.94 1.75-4.56 4.43-4.56 1.28 0 2.62 0.23 2.62 0.23v2.88h-1.48c-1.45 0-1.9 0.9-1.9 1.83V8h3.24l-0.52 2.31h-2.72V15.9C12.69 15.3 15.61 12 15.61 8z" fill="#1877F2" />
                </svg>
            )
        },
        {
            name: "twitter",
            label: "TWITTER",
            value: "Follow",
            color: "#000000",
            bgColor: "rgba(0, 0, 0, 0.1)",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.46 2.6c-0.53 0.24-1.1 0.4-1.7 0.47 0.61-0.37 1.08-0.95 1.3-1.64-0.57 0.34-1.2 0.58-1.87 0.72-0.54-0.57-1.3-0.93-2.15-0.93-1.63 0-2.95 1.32-2.95 2.95 0 0.23 0.03 0.46 0.08 0.67C5.44 4.74 3.1 3.56 1.56 1.77c-0.25 0.43-0.4 0.93-0.4 1.46 0 1.02 0.52 1.93 1.31 2.46-0.48-0.02-0.94-0.15-1.33-0.37v0.04c0 1.43 1.02 2.62 2.37 2.89-0.25 0.07-0.51 0.1-0.78 0.1-0.19 0-0.38-0.02-0.56-0.05 0.38 1.18 1.48 2.04 2.78 2.07-1.02 0.8-2.3 1.27-3.69 1.27-0.24 0-0.48-0.01-0.71-0.04 1.32 0.85 2.88 1.34 4.56 1.34 5.47 0 8.46-4.53 8.46-8.46 0-0.13 0-0.26-0.01-0.39 0.58-0.42 1.08-0.94 1.48-1.54z" fill="#000000" />
                </svg>
            )
        },
        {
            name: "instagram",
            label: "INSTAGRAM",
            value: "Follow",
            color: "#E1306C",
            bgColor: "rgba(225, 48, 108, 0.1)",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.44c2.14 0 2.39 0.01 3.23 0.05 0.78 0.04 1.2 0.17 1.48 0.28 0.37 0.14 0.64 0.32 0.92 0.6 0.28 0.28 0.46 0.55 0.6 0.92 0.11 0.28 0.24 0.7 0.28 1.48 0.04 0.84 0.05 1.09 0.05 3.23s-0.01 2.39-0.05 3.23c-0.04 0.78-0.17 1.2-0.28 1.48-0.14 0.37-0.32 0.64-0.6 0.92-0.28 0.28-0.55 0.46-0.92 0.6-0.28 0.11-0.7 0.24-1.48 0.28-0.84 0.04-1.09 0.05-3.23 0.05s-2.39-0.01-3.23-0.05c-0.78-0.04-1.2-0.17-1.48-0.28-0.37-0.14-0.64-0.32-0.92-0.6-0.28-0.28-0.46-0.55-0.6-0.92-0.11-0.28-0.24-0.7-0.28-1.48C1.45 10.39 1.44 10.14 1.44 8s0.01-2.39 0.05-3.23c0.04-0.78 0.17-1.2 0.28-1.48 0.14-0.37 0.32-0.64 0.6-0.92 0.28-0.28 0.55-0.46 0.92-0.6 0.28-0.11 0.7-0.24 1.48-0.28C5.61 1.45 5.86 1.44 8 1.44M8 0C5.83 0 5.56 0.01 4.7 0.05 3.85 0.09 3.27 0.22 2.76 0.42 2.23 0.63 1.78 0.9 1.34 1.34 0.9 1.78 0.63 2.23 0.42 2.76 0.22 3.27 0.09 3.85 0.05 4.7 0.01 5.56 0 5.83 0 8s0.01 2.44 0.05 3.3c0.04 0.85 0.17 1.43 0.37 1.94 0.21 0.53 0.48 0.98 0.92 1.42 0.44 0.44 0.89 0.71 1.42 0.92 0.51 0.2 1.09 0.33 1.94 0.37C5.56 15.99 5.83 16 8 16s2.44-0.01 3.3-0.05c0.85-0.04 1.43-0.17 1.94-0.37 0.53-0.21 0.98-0.48 1.42-0.92 0.44-0.44 0.71-0.89 0.92-1.42 0.2-0.51 0.33-1.09 0.37-1.94C15.99 10.44 16 10.17 16 8s-0.01-2.44-0.05-3.3c-0.04-0.85-0.17-1.43-0.37-1.94-0.21-0.53-0.48-0.98-0.92-1.42C13.22 0.9 12.77 0.63 12.24 0.42 11.73 0.22 11.15 0.09 10.3 0.05 9.44 0.01 9.17 0 8 0z" fill="#E1306C" />
                    <path d="M8 3.89c-2.27 0-4.11 1.84-4.11 4.11S5.73 12.11 8 12.11s4.11-1.84 4.11-4.11S10.27 3.89 8 3.89zM8 10.67c-1.47 0-2.67-1.2-2.67-2.67S6.53 5.33 8 5.33s2.67 1.2 2.67 2.67S9.47 10.67 8 10.67z" fill="#E1306C" />
                    <circle cx="12.27" cy="3.73" r="0.96" fill="#E1306C" />
                </svg>
            )
        },
        {
            name: "youtube",
            label: "YOUTUBE",
            value: "Follow",
            color: "#FF0000",
            bgColor: "rgba(255, 0, 0, 0.1)",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15.68 4.26c-0.18-0.68-0.71-1.21-1.39-1.39C12.94 2.67 8 2.67 8 2.67s-4.94 0-6.29 0.2c-0.68 0.18-1.21 0.71-1.39 1.39C0.12 5.61 0.12 8.4 0.12 8.4s0 2.79 0.2 4.14c0.18 0.68 0.71 1.21 1.39 1.39C3.06 14.13 8 14.13 8 14.13s4.94 0 6.29-0.2c0.68-0.18 1.21-0.71 1.39-1.39 0.2-1.35 0.2-4.14 0.2-4.14s0-2.79-0.2-4.14zM6.4 10.8V6l4.17 2.4L6.4 10.8z" fill="#FF0000" />
                </svg>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-[40px]">
            {/* Post Widget */}
            <div className="flex flex-col gap-[20px]">
                {/* Widget Title */}
                <h4 className="text-[15px] font-bold leading-[1.5em] tracking-[-0.025em] text-[#212529]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    Post Widget
                </h4>

                {/* Widget Body */}
                <div className="flex flex-col gap-[30px]">
                    {sidebarPosts.map((post) => (
                        <div key={post.id} className="flex gap-[16px]">
                            {/* Post Thumbnail */}
                            <div className="w-[66px] h-[66px] flex-shrink-0">
                                <a href={`/blog/${post.id}`} className="block w-full h-full">
                                    <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-100">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>
                            </div>

                            {/* Post Content */}
                            <div className="flex flex-col gap-[9px] flex-1">
                                {/* Post Title */}
                                <a href={`/blog/${post.id}`} className="block">
                                    <h5 className="text-[15px] font-bold leading-[1.5em] tracking-[-0.025em] text-[#000000] hover:text-[#064C50] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                        {post.title}
                                    </h5>
                                </a>

                                {/* Post Meta */}
                                <div className="flex items-center">
                                    <span className="text-[15px] font-light leading-[1.5em] tracking-[-0.025em] text-[#757575]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Widget */}
            <div className="flex flex-col gap-[20px]">
                {/* Widget Title */}
                <h4 className="text-[15px] font-light leading-[1.5em] tracking-[-0.025em] text-[#212529]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    Social Widget
                </h4>

                {/* Social Links */}
                <div className="flex flex-col gap-[4px]">
                    {socialLinks.map((social, index) => (
                        <div key={social.name} className={index > 0 ? "pt-[8px]" : ""}>
                            <a
                                href="#"
                                className="flex items-center justify-between px-[18px] h-[40px] rounded-[12px] hover:opacity-80 transition-opacity"
                                style={{ backgroundColor: social.bgColor }}
                            >
                                {/* Icon */}
                                <div className="flex items-center justify-center py-[4px]">
                                    {social.icon}
                                </div>

                                {/* Social Label */}
                                <div className="flex-1 pl-[16px]">
                                    <span className="text-[10px] font-light leading-[1.6em] tracking-[-0.04em] uppercase" style={{ fontFamily: 'var(--font-inter), sans-serif', color: social.color }}>
                                        {social.label}
                                    </span>
                                </div>

                                {/* Social Value */}
                                <div>
                                    <span className="text-[10px] font-light leading-[1.6em] tracking-[-0.04em] uppercase" style={{ fontFamily: 'var(--font-inter), sans-serif', color: social.color }}>
                                        {social.value}
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}