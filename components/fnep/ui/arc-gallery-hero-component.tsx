'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
  title?: string;
  subtitle?: string;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 260,
  cardSizeLg = 140,
  cardSizeMd = 110,
  cardSizeSm = 90,
  className = '',
  title = "Premium Commercial Range",
  subtitle = "Our products are engineered for consistency, flavor, and industrial-scale catering requirements.",
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative overflow-hidden bg-slate-50 text-slate-900 py-32 flex flex-col ${className}`}>
      {/* Background ring container */}
      <div
        className="relative mx-auto"
        style={{
          width: '100%',
          height: dimensions.radius * 1.1,
        }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            
            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize * 1.2,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  zIndex: i > count / 2 ? count - i : i,
                }}
              >
                <motion.div 
                  whileHover={{ y: -10, rotate: angle/10 }}
                  className="rounded-2xl shadow-2xl overflow-hidden border-2 border-white bg-white transition-all w-full h-full"
                >
                  <img
                    src={src}
                    alt={`Product ${i + 1}`}
                    className="block w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content strictly themed for Neps Foods */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 mt-20 md:mt-32">
        <div className="text-center max-w-3xl px-6 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-neps-blue text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-xl shadow-neps-blue/20 uppercase tracking-widest"
            >
              Explore Full Catalog <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, borderColor: '#ED1C24', color: '#ED1C24' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm md:text-base uppercase tracking-widest"
            >
              Request Samples
            </motion.button>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-neps-blue mb-6 uppercase">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translate(-50%, 60%); }
          to { opacity: 1; transform: translate(-50%, 50%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in {
          animation-name: fade-in;
          animation-duration: 1s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
};
