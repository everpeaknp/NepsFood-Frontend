'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GooeyText } from '@/components/fnep/ui/gooey-text-morphing';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage to avoid redundant loading screens
    if (sessionStorage.getItem('hasSeenLoading')) {
      setIsLoading(false);
      onComplete?.();
      return;
    }

    // Set a cinematic duration for the first visit
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasSeenLoading', 'true');
      // Give a tiny extra delay for the exit animation before revealing content
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 4500); // Reduced from 6s to 4.5s for a snappier feel

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFF8F0]"
        >
          <div className="flex flex-col items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GooeyText
                texts={["NEPS", "FOODS", "QUALITY", "SCALE"]}
                morphTime={0.8}
                cooldownTime={0.2}
                className="font-black"
                textClassName="text-neps-blue"
              />
            </motion.div>
            
            {/* Elegant Progress Indicator */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === 0 ? 'bg-neps-gold' : i === 1 ? 'bg-neps-blue' : 'bg-neps-red'
                  }`}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
