'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GooeyText } from '@/components/fnep/ui/gooey-text-morphing';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user has already seen the loading screen in this session
    if (sessionStorage.getItem('hasSeenLoading')) {
      setIsLoading(false);
    } else {
      // Mark as seen immediately
      sessionStorage.setItem('hasSeenLoading', 'true');
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  // During the first frame (hydration) or if already seen, don't show anything
  if (isLoading === null || isLoading === false) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFF8F0]"
        >
          <div className="flex flex-col items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <GooeyText
                texts={["NEPS", "FOODS", "QUALITY", "SCALE"]}
                morphTime={0.8}
                cooldownTime={0.2}
                className="font-black"
                textClassName="text-neps-blue"
              />
            </motion.div>
            
            {/* Loading dots */}
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.div
                className="w-3 h-3 bg-neps-gold rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-3 h-3 bg-neps-blue rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-3 h-3 bg-neps-red rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
