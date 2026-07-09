import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'why', label: 'Why Choose Us' },
  { id: 'creations', label: 'Creations' },
  { id: 'love', label: 'Customer Love' },
  { id: 'gram', label: 'From the Gram' },
  { id: 'process', label: 'Custom Orders' },
  { id: 'contact', label: 'Contact Us' },
];

const DOT_Y_COORDS = [20, 70, 120, 170, 220, 270, 320, 370];
const PATH_LENGTH = 350; // Distance between first and last dot

export default function StitchedNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [headerHoveredId, setHeaderHoveredId] = useState<string | null>(null);
  const [threadProgress, setThreadProgress] = useState(0); // Y position of active stitching clip
  const sectionOffsets = useRef<number[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Scroll handler to track section offsets and calculate precise scroll progress down the thread
  useEffect(() => {
    const calculateOffsets = () => {
      sectionOffsets.current = SECTIONS.map((sec) => {
        const el = document.getElementById(sec.id);
        return el ? el.offsetTop : 0;
      });
    };

    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);
    // Recalculate slightly later to allow elements to settle
    const t = setTimeout(calculateOffsets, 1000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewTrigger = scrollY + window.innerHeight * 0.35; // Trigger at 35% viewport height
      const offsets = sectionOffsets.current;

      // Find active index
      let activeIdx = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (viewTrigger >= offsets[i]) {
          activeIdx = i;
        }
      }
      setActiveIndex(activeIdx);

      // Calculate thread growth height in SVG coordinate space
      if (offsets.length < 2) return;

      const firstOffset = offsets[0];
      const lastOffset = offsets[offsets.length - 1];
      const maxScroll = lastOffset - firstOffset;

      if (maxScroll <= 0) return;

      // Current scroll position mapped to a 0-1 range across the page
      const currentScroll = Math.max(0, Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1));
      
      // Calculate progress Y: starts at first dot (20) and ends at last dot (370)
      const targetY = 20 + currentScroll * PATH_LENGTH;
      setThreadProgress(targetY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Listen for custom hover events from the main Navbar links
    const handleNavbarHover = (e: any) => {
      const targetId = e.detail;
      setHeaderHoveredId(targetId);
    };
    window.addEventListener('hover-section', handleNavbarHover);

    return () => {
      window.removeEventListener('resize', calculateOffsets);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hover-section', handleNavbarHover);
      clearTimeout(t);
    };
  }, []);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[8000] hidden lg:flex items-center pointer-events-none">
      <div className="relative flex items-center pointer-events-auto">
        {/* Vertical SVG Stitch Board */}
        <svg width="60" height="400" viewBox="0 0 60 400" fill="none" className="overflow-visible select-none">
          <defs>
            {/* Thread ClipPath for progressive stitching animation */}
            <clipPath id="thread-clip">
              <rect x="0" y="0" width="60" height={shouldReduceMotion ? 400 : threadProgress} />
            </clipPath>
          </defs>

          {/* 1. Background Thread (Light upcoming embroidery) */}
          <path
            d="M 30 20 Q 32 45 30 70 Q 28 95 30 120 Q 32 145 30 170 Q 28 195 30 220 Q 32 245 30 270 Q 28 295 30 320 Q 32 345 30 370"
            stroke="#E8829E"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="opacity-30"
          />

          {/* 2. Completed Active Thread (Dark stitching drawn on scroll, masked by ClipPath) */}
          <path
            d="M 30 20 Q 32 45 30 70 Q 28 95 30 120 Q 32 145 30 170 Q 28 195 30 220 Q 32 245 30 270 Q 28 295 30 320 Q 32 345 30 370"
            stroke="#8E2A46"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5, 3" /* Stitched Thread dash style */
            fill="none"
            clipPath="url(#thread-clip)"
          />

          {/* 3. Section Indicator Nodes (Dots) */}
          {SECTIONS.map((sec, i) => {
            const y = DOT_Y_COORDS[i];
            const isActive = activeIndex === i;
            const isCompleted = activeIndex > i;
            const isHovered = hoveredIndex === i || headerHoveredId === sec.id;

            return (
              <g
                key={sec.id}
                className="cursor-pointer group"
                onClick={() => handleDotClick(sec.id)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow Filter / Glow ring when hovered or active */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.circle
                      cx="30"
                      cy={y}
                      r="12"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 0.25 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      fill="#E8829E"
                      style={{ filter: 'blur(1px)' }}
                    />
                  )}
                </AnimatePresence>

                {/* Pulse Ring for active node */}
                {isActive && !shouldReduceMotion && (
                  <motion.circle
                    cx="30"
                    cy={y}
                    r="9"
                    stroke="#8E2A46"
                    strokeWidth="1"
                    fill="none"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx="30"
                  cy={y}
                  r={isActive ? 6.5 : 4.5}
                  fill={isActive || isCompleted ? '#8E2A46' : '#FFF8F3'}
                  stroke="#8E2A46"
                  strokeWidth="2"
                  className="transition-all duration-300 ease-out"
                />

                {/* Inner dot highlight */}
                {(isActive || isCompleted) && (
                  <circle cx="30" cy={y} r="2" fill="#E0A93A" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Labels Display (Hover trigger on either dot or label list) */}
        <div className="absolute left-10 flex flex-col justify-between h-[356px] py-[10px] pointer-events-none select-none">
          {SECTIONS.map((sec, i) => {
            const isHovered = hoveredIndex === i || headerHoveredId === sec.id;
            return (
              <div key={sec.id} className="h-6 flex items-center">
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="bg-[#FFF8F3] px-3 py-1 rounded-lg border border-charcoal/10 shadow-sm text-xs font-semibold text-berry whitespace-nowrap"
                    >
                      {sec.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
