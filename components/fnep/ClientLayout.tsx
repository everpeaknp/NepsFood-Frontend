'use client';

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if seen in this session
    const hasSeen = sessionStorage.getItem('hasSeenLoading');
    if (hasSeen) {
      setShowContent(true);
      setIsFirstVisit(false);
    } else {
      setIsFirstVisit(true);
      // Content will be shown by LoadingScreen's completion
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isFirstVisit && !showContent && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={isFirstVisit ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ visibility: showContent ? "visible" : "hidden" }}
      >
        {children}
      </motion.div>
    </>
  );
}
