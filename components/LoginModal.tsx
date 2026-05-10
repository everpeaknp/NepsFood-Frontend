"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginModal({ isOpen, onClose, message = "Please login to continue" }: LoginModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    router.push('/my-account');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-[#064C50] bg-opacity-10 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-[#064C50]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>

        {/* Content */}
        <h3 
          className="text-xl font-semibold text-gray-900 text-center mb-2"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Login Required
        </h3>
        <p 
          className="text-gray-600 text-center mb-6"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Cancel
          </button>
          <button
            onClick={handleLoginClick}
            className="flex-1 px-4 py-2 bg-[#064C50] text-white rounded-lg font-medium hover:bg-[#053d41] transition-colors"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
