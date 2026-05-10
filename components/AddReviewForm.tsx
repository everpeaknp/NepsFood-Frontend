"use client";

import { useState, useEffect } from "react";
import { reviewsAPI } from "@/lib/api";
import { getUser } from "@/lib/api";
import Link from "next/link";

interface AddReviewFormProps {
    productSlug: string;
    onReviewAdded?: () => void;
}

export default function AddReviewForm({ productSlug, onReviewAdded }: AddReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState<"success" | "error">("success");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const user = getUser();
        setIsLoggedIn(!!user);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isLoggedIn) {
            setNotificationMessage("Please login to submit a review");
            setNotificationType("error");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
            return;
        }
        
        if (rating === 0) {
            setNotificationMessage("Please select a rating");
            setNotificationType("error");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
            return;
        }
        
        if (!comment.trim()) {
            setNotificationMessage("Please enter your review");
            setNotificationType("error");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
            return;
        }

        setIsSubmitting(true);
        try {
            // Prepare review data
            const reviewData: any = {
                rating,
                comment: comment.trim()
            };
            
            // Only add title if it's not empty
            if (title.trim()) {
                reviewData.title = title.trim();
            }
            
            console.log("Submitting review data:", reviewData);
            
            // Call the API to submit review
            const response = await reviewsAPI.createReview(productSlug, reviewData);
            
            console.log("Review submitted successfully:", response.data);
            
            // Reset form
            setRating(0);
            setComment("");
            setTitle("");
            
            // Show success notification
            setNotificationMessage("Review submitted successfully!");
            setNotificationType("success");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
            
            // Trigger refresh of reviews list
            if (onReviewAdded) {
                onReviewAdded();
            }
        } catch (error: any) {
            console.error("Failed to submit review:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            console.error("Error headers:", error.response?.headers);
            console.error("Full error:", JSON.stringify(error.response, null, 2));
            
            // Check if response is HTML (server error)
            const contentType = error.response?.headers?.['content-type'];
            if (contentType && contentType.includes('text/html')) {
                setNotificationMessage("Server error occurred. Please check if the backend is running correctly.");
            } else {
                const errorMessage = error.response?.data?.detail || 
                                    error.response?.data?.message || 
                                    error.response?.data?.error || 
                                    (error.response?.data?.non_field_errors && error.response.data.non_field_errors[0]) ||
                                    (error.response?.data && typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : null) ||
                                    "Failed to submit review. Please try again.";
                setNotificationMessage(errorMessage);
            }
            setNotificationType("error");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    return (
        <div
            className="flex flex-col items-stretch"
            style={{
                gap: '10px',
                width: '800px',
                maxWidth: '100%'
            }}
        >
            {/* Title */}
            <div className="flex flex-col items-stretch" style={{ alignSelf: 'stretch' }}>
                <h4
                    style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '1.4em',
                        letterSpacing: '-0.02em',
                        textAlign: 'left',
                        color: '#212529',
                        margin: 0,
                        width: '100%'
                    }}
                >
                    Add a review
                </h4>
            </div>

            {!isLoggedIn ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
                    <p className="text-blue-800 mb-2">You must be logged in to submit a review.</p>
                    <Link href="/my-account" className="text-blue-600 hover:text-blue-800 underline">
                        Login or Register
                    </Link>
                </div>
            ) : (
                <form
                    className="flex flex-col items-stretch"
                    style={{
                        gap: '-1px',
                        alignSelf: 'stretch'
                    }}
                    onSubmit={handleSubmit}
                >
                {/* Rating Field */}
                <div
                    className="flex flex-col items-stretch"
                    style={{
                        gap: '5px',
                        alignSelf: 'stretch',
                        height: '68.39px'
                    }}
                >
                    {/* Label */}
                    <div
                        className="flex flex-col items-stretch"
                        style={{
                            padding: '0px 0px 0.8px',
                            alignSelf: 'stretch'
                        }}
                    >
                        <label
                            style={{
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '1.4em',
                                letterSpacing: '-0.01em',
                                textAlign: 'left',
                                color: '#212529',
                                width: '100%'
                            }}
                        >
                            Your rating *
                        </label>
                    </div>

                    {/* Stars Container */}
                    <div
                        style={{
                            height: '25.59px',
                            width: '100%'
                        }}
                    >
                        <div className="flex flex-row items-center" style={{ gap: '8px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="flex items-center justify-center"
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M8 0.5L9.8 5.7H15.4L11.1 8.8L12.9 14L8 10.9L3.1 14L4.9 8.8L0.6 5.7H6.2L8 0.5Z"
                                            fill={rating >= star ? '#FCC419' : '#E5E7EB'}
                                            stroke={rating >= star ? '#FCC419' : '#D1D5DB'}
                                            strokeWidth="0.5"
                                        />
                                    </svg>
                                    <span className="sr-only">{star} of 5 stars</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Title Field (Optional) */}
                <div
                    style={{
                        width: '100%',
                        height: '84.8px'
                    }}
                >
                    <div
                        className="flex flex-col items-stretch"
                        style={{
                            gap: '5px',
                            width: '800px',
                            maxWidth: '100%',
                            height: '68.8px',
                            position: 'relative',
                            top: '-1px'
                        }}
                    >
                        {/* Label */}
                        <div
                            className="flex flex-col items-stretch"
                            style={{
                                padding: '0px 0px 0.8px',
                                alignSelf: 'stretch'
                            }}
                        >
                            <label
                                style={{
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '1.4em',
                                    letterSpacing: '-0.01em',
                                    textAlign: 'left',
                                    color: '#212529',
                                    width: '100%'
                                }}
                            >
                                Review Title (Optional)
                            </label>
                        </div>

                        {/* Input */}
                        <div
                            className="flex flex-row items-center"
                            style={{
                                padding: '12px 14px',
                                alignSelf: 'stretch',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                borderRadius: '12px',
                                boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
                                height: '44px'
                            }}
                        >
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your review a title"
                                style={{
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontWeight: 300,
                                    fontSize: '14px',
                                    lineHeight: '1em',
                                    letterSpacing: '-2%',
                                    color: '#212529',
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Review Textarea */}
                <div
                    style={{
                        width: '100%',
                        height: '192.8px'
                    }}
                >
                    <div
                        className="flex flex-col items-stretch"
                        style={{
                            gap: '5px',
                            width: '800px',
                            maxWidth: '100%',
                            height: '176.8px',
                            position: 'relative',
                            top: '-1px'
                        }}
                    >
                        {/* Label */}
                        <div
                            className="flex flex-col items-stretch"
                            style={{
                                padding: '0px 0px 0.8px',
                                alignSelf: 'stretch'
                            }}
                        >
                            <label
                                style={{
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '1.4em',
                                    letterSpacing: '-0.01em',
                                    textAlign: 'left',
                                    color: '#212529',
                                    width: '100%'
                                }}
                            >
                                Your review *
                            </label>
                        </div>

                        {/* Textarea */}
                        <div
                            className="flex flex-row items-center"
                            style={{
                                padding: '8px 14px',
                                alignSelf: 'stretch',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                borderRadius: '12px',
                                boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
                                height: '150px'
                            }}
                        >
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                style={{
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontWeight: 300,
                                    fontSize: '14px',
                                    lineHeight: '1.4em',
                                    letterSpacing: '-2%',
                                    color: '#212529',
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                    resize: 'none'
                                }}
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div
                    className="flex flex-col justify-center items-stretch"
                    style={{
                        padding: '1px 0px 16px',
                        alignSelf: 'stretch',
                        height: '59px'
                    }}
                >
                    <div className="flex flex-col" style={{ alignSelf: 'stretch', flex: 1 }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex flex-row items-center"
                            style={{
                                justifyContent: 'center',
                                padding: '12px 24px',
                                height: '42px',
                                backgroundColor: isSubmitting ? '#9CA3AF' : '#064C50',
                                border: '1px solid rgba(0, 0, 0, 0)',
                                borderRadius: '12px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                width: 'fit-content',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontWeight: 300,
                                    fontSize: '14px',
                                    lineHeight: '1em',
                                    letterSpacing: '-2%',
                                    color: '#FFFFFF'
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
            )}

            {/* Notification */}
            {showNotification && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className={`${notificationType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white rounded-lg p-4 shadow-xl max-w-sm`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium mb-1">
                                    {notificationType === 'success' ? 'Success!' : 'Error'}
                                </p>
                                <p className="text-sm">{notificationMessage}</p>
                            </div>
                            <button onClick={closeNotification} className="text-white hover:text-gray-200">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 5L5 15M5 5L15 15" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}