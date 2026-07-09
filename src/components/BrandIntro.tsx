import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CrochetFlower,
  CrochetHeart,
  CrochetStar,
  CrochetBow,
} from './CrochetAssets';

interface BrandIntroProps {
  onComplete: () => void;
}

export default function BrandIntro({ onComplete }: BrandIntroProps) {
  const shouldReduceMotion = useReducedMotion();

  // Accessibility: if reduced motion is enabled, skip the intro and complete immediately on mount
  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    // Standard timeline duration is ~2.3 seconds, trigger transition reveal
    const t = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => clearTimeout(t);
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 bg-[#f7d9e3] fabric-bg z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center max-w-lg w-full px-8 text-center select-none pointer-events-none">
        
        {/* Step 2: Embroidered stitched line (draws left to right) */}
        <svg className="w-64 h-12 mb-6 overflow-visible" viewBox="0 0 200 40" fill="none">
          <motion.path
            d="M 10 20 Q 50 16 100 20 T 190 20"
            stroke="#E0A93A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeInOut' }}
          />
        </svg>

        {/* Logo and blooming elements container */}
        <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
          {/* Step 3: The Half Code circular logo (scale + rotation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
            className="w-32 h-32 rounded-full bg-gradient-to-br from-rose via-rose to-berry flex items-center justify-center shadow-xl ring-4 ring-cream z-20"
          >
            <span className="font-script text-cream text-4xl leading-none">HC</span>
          </motion.div>

          {/* Step 4: Small crochet elements bloom one after another around the logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5, ease: 'easeOut' }}
            className="absolute top-0 left-0 w-9 h-9 z-30"
          >
            <CrochetFlower className="w-full h-full drop-shadow-[0_2px_4px_rgba(142,42,70,0.15)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 1.55, duration: 0.5, ease: 'easeOut' }}
            className="absolute top-0 right-0 w-9 h-9 z-30"
          >
            <CrochetHeart className="w-full h-full drop-shadow-[0_2px_4px_rgba(142,42,70,0.15)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.5, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 w-9 h-9 z-30"
          >
            <CrochetStar className="w-full h-full drop-shadow-[0_2px_4px_rgba(142,42,70,0.15)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 1.85, duration: 0.5, ease: 'easeOut' }}
            className="absolute bottom-0 right-0 w-9 h-9 z-30"
          >
            <CrochetBow className="w-full h-full drop-shadow-[0_2px_4px_rgba(142,42,70,0.15)]" />
          </motion.div>
        </div>

        {/* Step 5: Brand tagline & headline (fade up) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5, ease: 'easeOut' }}
          className="font-script text-2xl text-mustard mb-2"
        >
          A corner for yarn • loops • hooks
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5, ease: 'easeOut' }}
          className="font-script text-5xl md:text-6xl text-berry font-bold leading-tight"
        >
          Selling Pinteresty Dreams
        </motion.h2>
      </div>
    </motion.div>
  );
}
