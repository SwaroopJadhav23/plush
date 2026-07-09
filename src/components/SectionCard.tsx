import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionCardProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  animateOverride?: any;
  initialOverride?: any;
  transitionOverride?: any;
  viewportOverride?: any;
}

export default function SectionCard({
  children,
  id,
  className = '',
  animateOverride,
  initialOverride,
  transitionOverride,
  viewportOverride,
}: SectionCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Fade up entry animation (runs once)
  const initial = initialOverride !== undefined 
    ? initialOverride 
    : (shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 });

  const animate = animateOverride !== undefined 
    ? animateOverride 
    : { opacity: 1, y: 0 };

  const transition = transitionOverride !== undefined 
    ? transitionOverride 
    : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }; // easeOutExpo

  const viewport = viewportOverride !== undefined
    ? viewportOverride
    : { once: true, amount: 0.12 };

  // Hover lift and scale
  const hoverState = shouldReduceMotion
    ? {}
    : {
        y: -4,
        scale: 1.01,
      };

  return (
    <motion.section
      id={id}
      initial={initial}
      whileInView={animateOverride ? undefined : animate}
      animate={animateOverride ? animate : undefined}
      viewport={animateOverride ? undefined : viewport}
      transition={transition}
      whileHover={hoverState}
      className={`relative w-full max-w-6xl mx-auto my-12 md:my-20 p-8 sm:p-12 md:p-16 bg-[#FFFAF6] rounded-[28px] md:rounded-[36px] border border-charcoal/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_10px_40px_rgba(46,36,32,0.08)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_20px_50px_rgba(46,36,32,0.12)] transition-shadow duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </motion.section>
  );
}
