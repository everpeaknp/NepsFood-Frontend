"use client";

import { useState, useEffect } from "react";
import AddReviewForm from "./AddReviewForm";
import { reviewsAPI } from "@/lib/api";

interface Review {
    id: number;
    user_name: string;
    user_full_name: string;
    rating: number;
    title: string;
    comment: string;
    is_verified_purchase: boolean;
    created_at: string;
}

interface ReviewsSectionProps {
    productSlug: string;
    onReviewAdded?: () => void;
}

export default function ReviewsSection({ productSlug, onReviewAdded }: ReviewsSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await reviewsAPI.getProductReviews(productSlug);
            // Handle both array and paginated response
            const reviewsData = Array.isArray(response.data) ? response.data : (response.data.results || []);
            setReviews(reviewsData);
        } catch (err: any) {
            console.error("Failed to fetch reviews:", err);
            setReviews([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productSlug]);

    const handleReviewAdded = () => {
        fetchReviews();
        if (onReviewAdded) {
            onReviewAdded();
        }
    };

    // Calculate rating breakdown
    const ratingBreakdown = [5, 4, 3, 2, 1].map(stars => {
        const count = reviews.filter(r => r.rating === stars).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { stars, count, percentage };
    });

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
        : "0.00";

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#064C50]"></div>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col items-stretch"
            style={{
                gap: '16px',
                alignSelf: 'stretch'
            }}
        >
            {/* Title */}
            <div className="flex flex-col items-stretch" style={{ alignSelf: 'stretch' }}>
                <h3
                    style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '1.4em',
                        letterSpacing: '-0.02em',
                        textAlign: 'left',
                        color: '#212529',
                        margin: 0,
                        width: '100%'
                    }}
                >
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </h3>
            </div>

            {/* Reviews Slot */}
            <div
                className="flex flex-row items-center flex-wrap"
                style={{
                    gap: '60px',
                    padding: '0px 0px 40px',
                    alignSelf: 'stretch',
                    borderBottom: '1px solid #E5E7EB'
                }}
            >
                {/* Reviews Rating */}
                <div
                    className="flex flex-row flex-wrap"
                    style={{
                        alignItems: 'flex-end',
                        gap: '20px'
                    }}
                >
                    {/* Review Count */}
                    <div className="flex flex-col" style={{ alignSelf: 'stretch' }}>
                        <span
                            className="font-light"
                            style={{
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontWeight: 700,
                                fontSize: '60px',
                                lineHeight: '1em',
                                letterSpacing: '-2.702702708145055%',
                                color: '#212529'
                            }}
                        >
                            {averageRating}
                        </span>
                    </div>

                    {/* Review Stars */}
                    <div
                        className="flex flex-col items-stretch"
                        style={{
                            padding: '5px 0px 30.2px',
                            height: '57.59px'
                        }}
                    >
                        <div className="flex flex-col" style={{ alignSelf: 'stretch' }}>
                            <span
                                className="font-light"
                                style={{
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontWeight: 300,
                                    fontSize: '14.8px',
                                    lineHeight: '1.6216216007229882em',
                                    letterSpacing: '-2.702702708145055%',
                                    color: '#212529',
                                    width: '100%'
                                }}
                            >
                                Average of {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Rating Breakdown */}
                <div
                    className="flex flex-col items-stretch"
                    style={{
                        gap: '10px',
                        flex: 1
                    }}
                >
                    {ratingBreakdown.map((item) => (
                        <div
                            key={item.stars}
                            className="flex flex-row items-center"
                            style={{
                                gap: '10px',
                                alignSelf: 'stretch'
                            }}
                        >
                            {/* Star Label */}
                            <div className="flex flex-col" style={{ flexShrink: 0 }}>
                                <span
                                    className="font-light"
                                    style={{
                                        fontFamily: 'var(--font-inter), sans-serif',
                                        fontWeight: 300,
                                        fontSize: '14.8px',
                                        lineHeight: '1.6216216007229882em',
                                        letterSpacing: '-2.702702708145055%',
                                        color: '#4F575E'
                                    }}
                                >
                                    {item.stars}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '119.31px',
                                    height: '6px',
                                    flexShrink: 0
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        width: '119.31px',
                                        height: '6px',
                                        backgroundColor: '#ECEEF0',
                                        borderRadius: '14px'
                                    }}
                                />
                                {item.percentage > 0 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            width: `${(119.31 * item.percentage) / 100}px`,
                                            height: '6px',
                                            backgroundColor: '#FCC419',
                                            borderRadius: '14px'
                                        }}
                                    />
                                )}
                            </div>

                            {/* Count */}
                            <div className="flex flex-col" style={{ flexShrink: 0 }}>
                                <span
                                    className="font-light"
                                    style={{
                                        fontFamily: 'var(--font-inter), sans-serif',
                                        fontWeight: 300,
                                        fontSize: '14.8px',
                                        lineHeight: '1.6216216007229882em',
                                        letterSpacing: '-2.702702708145055%',
                                        color: '#4F575E'
                                    }}
                                >
                                    {item.count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div
                className="flex flex-col items-stretch"
                style={{
                    gap: '25px',
                    padding: '34px 0px 0px',
                    alignSelf: 'stretch'
                }}
            >
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex flex-col items-stretch"
                        style={{
                            padding: '0px 0px 25px',
                            alignSelf: 'stretch',
                            borderBottom: '1px solid #E5E7EB'
                        }}
                    >
                        <div
                            className="flex flex-row flex-wrap"
                            style={{
                                alignSelf: 'stretch'
                            }}
                        >
                            {/* Avatar */}
                            <div
                                className="flex flex-col"
                                style={{
                                    padding: '0px 20px 0px 0px',
                                    width: '68px',
                                    height: '48px'
                                }}
                            >
                                <div
                                    className="flex items-center justify-center"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '24px',
                                        backgroundColor: '#E5E7EB'
                                    }}
                                >
                                    <svg 
                                        width="24" 
                                        height="24" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="#6B7280" 
                                        strokeWidth="2"
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            </div>

                            {/* Comment Text */}
                            <div
                                className="flex flex-col items-stretch"
                                style={{
                                    gap: '10px',
                                    padding: '25.59px 0px 16px',
                                    flex: 1
                                }}
                            >
                                {/* Meta */}
                                <div className="flex flex-col items-stretch" style={{ alignSelf: 'stretch' }}>
                                    <p
                                        className="font-light"
                                        style={{
                                            fontFamily: 'var(--font-inter), sans-serif',
                                            fontWeight: 300,
                                            fontSize: '14.8px',
                                            lineHeight: '1.6216216007229882em',
                                            letterSpacing: '-2.702702708145055%',
                                            textAlign: 'left',
                                            color: '#768088',
                                            opacity: 0.7,
                                            margin: 0,
                                            width: '100%'
                                        }}
                                    >
                                        {review.user_full_name || review.user_name} – {formatDate(review.created_at)}
                                        {review.is_verified_purchase && (
                                            <span style={{ color: '#064C50', marginLeft: '8px' }}>✓ Verified Purchase</span>
                                        )}
                                    </p>
                                </div>

                                {/* Rating Stars */}
                                <div className="flex flex-row" style={{ gap: '4px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            style={{
                                                color: star <= review.rating ? '#FCC419' : '#E5E7EB',
                                                fontSize: '16px'
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {/* Review Title */}
                                {review.title && (
                                    <div className="flex flex-col items-stretch" style={{ alignSelf: 'stretch' }}>
                                        <p
                                            className="font-semibold"
                                            style={{
                                                fontFamily: 'var(--font-inter), sans-serif',
                                                fontWeight: 600,
                                                fontSize: '14.8px',
                                                lineHeight: '1.6216216007229882em',
                                                textAlign: 'left',
                                                color: '#212529',
                                                margin: 0,
                                                width: '100%'
                                            }}
                                        >
                                            {review.title}
                                        </p>
                                    </div>
                                )}

                                {/* Review Text */}
                                <div className="flex flex-col items-stretch" style={{ alignSelf: 'stretch' }}>
                                    <p
                                        className="font-light"
                                        style={{
                                            fontFamily: 'var(--font-inter), sans-serif',
                                            fontWeight: 300,
                                            fontSize: '14.8px',
                                            lineHeight: '1.6216216007229882em',
                                            letterSpacing: '-2.702702708145055%',
                                            textAlign: 'left',
                                            color: '#212529',
                                            margin: 0,
                                            width: '100%'
                                        }}
                                    >
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Review Form */}
            <AddReviewForm productSlug={productSlug} onReviewAdded={handleReviewAdded} />
        </div>
    );
}
