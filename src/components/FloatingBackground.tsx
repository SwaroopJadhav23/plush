import React, { useEffect, useRef, useState } from 'react';
import {
  CrochetFlower,
  CrochetHeart,
  CrochetTeddy,
  CrochetStar,
  CrochetBow,
  CrochetButterfly,
  CrochetDaisy,
  CrochetYarnBall,
} from './CrochetAssets';

const AssetComponents = [
  CrochetFlower,
  CrochetHeart,
  CrochetTeddy,
  CrochetStar,
  CrochetBow,
  CrochetButterfly,
  CrochetDaisy,
  CrochetYarnBall,
];

// Predefined slots to ensure a balanced, handcrafted feel and prevent overlapping center content
const SLOTS = [
  // Left column (X: 3% - 15%)
  { x: 5, y: 4, type: 0 },
  { x: 12, y: 14, type: 1 },
  { x: 4, y: 24, type: 2 },
  { x: 10, y: 34, type: 3 },
  { x: 6, y: 46, type: 4 },
  { x: 14, y: 56, type: 5 },
  { x: 5, y: 66, type: 6 },
  { x: 11, y: 76, type: 7 },
  { x: 3, y: 86, type: 0 },
  { x: 9, y: 94, type: 1 },

  // Right column (X: 85% - 97%)
  { x: 92, y: 6, type: 2 },
  { x: 86, y: 16, type: 3 },
  { x: 94, y: 28, type: 4 },
  { x: 88, y: 38, type: 5 },
  { x: 91, y: 50, type: 6 },
  { x: 85, y: 60, type: 7 },
  { x: 93, y: 70, type: 0 },
  { x: 87, y: 80, type: 1 },
  { x: 95, y: 90, type: 2 },
  { x: 89, y: 96, type: 3 },
];

interface FloatingItem {
  id: number;
  xPercent: number;
  yPercent: number;
  type: number;
  size: number;
  floatSpeed: number;
  floatAmpY: number;
  floatAmpX: number;
  floatAmpRot: number;
  phase: number;
  parallaxSpeed: number;
  currentPushX: number;
  currentPushY: number;
  currentRot: number;
  currentScale: number;
  ref: HTMLDivElement | null;
}

export default function FloatingBackground({ isActive = true }: { isActive?: boolean }) {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  // Initialize slots and dimensions based on device size
  useEffect(() => {
    // Check user accessibility preference
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = window.innerWidth;
    let count = 15; // default desktop
    if (width < 768) {
      count = 5; // mobile
    } else if (width < 1024) {
      count = 9; // tablet
    }

    // Shuffle slots and select count
    const shuffled = [...SLOTS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const generated: FloatingItem[] = selected.map((slot, index) => {
      const isMobile = width < 768;
      const baseSize = isMobile ? 35 : 55;
      const sizeOffset = Math.random() * 20 - 10; // +/-10px

      return {
        id: index,
        xPercent: slot.x,
        yPercent: slot.y,
        type: slot.type,
        size: baseSize + sizeOffset,
        floatSpeed: 0.8 + Math.random() * 1.2, // speed multiplier
        floatAmpY: 6 + Math.random() * 6,     // 6px to 12px
        floatAmpX: 2 + Math.random() * 3,     // 2px to 5px
        floatAmpRot: 2 + Math.random() * 2,   // 2 to 4 degrees
        phase: Math.random() * Math.PI * 2,
        parallaxSpeed: (Math.random() * 0.08 - 0.04), // subtle mobile parallax scroll multiplier (-0.04 to 0.04)
        currentPushX: 0,
        currentPushY: 0,
        currentRot: 0,
        currentScale: 1,
        ref: null,
      };
    });

    setItems(generated);

    // Keep track of scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Keep track of mouse (only on hover/fine pointers)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // requestAnimationFrame loop for animating items
  useEffect(() => {
    if (items.length === 0 || !isActive) return;

    const tick = (timestamp: number) => {
      const timeSec = timestamp / 1000;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isReduced = reducedMotionRef.current;

      items.forEach((item) => {
        if (!item.ref) return;

        // Calculate absolute position on page
        const container = containerRef.current;
        if (!container) return;

        const docHeight = container.scrollHeight || document.documentElement.scrollHeight;
        const docWidth = window.innerWidth;

        // Position in page space
        const pageX = (item.xPercent / 100) * docWidth;
        const pageY = (item.yPercent / 100) * docHeight;

        // Convert to client (viewport) space
        const clientX = pageX;
        const clientY = pageY - scrollRef.current;

        let targetPushX = 0;
        let targetPushY = 0;
        let targetRot = 0;
        let targetScale = 1;

        if (!isReduced) {
          if (!isTouch) {
            // Desktop Cursor Proximity Interaction
            const dx = clientX - mouseRef.current.x;
            const dy = clientY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const threshold = 120; // 120px radius

            if (dist < threshold) {
              const force = (threshold - dist) / threshold; // 0 at edge, 1 at cursor center
              const pushDist = force * (10 + Math.random() * 8); // 10-18px push
              const angle = Math.atan2(dy, dx);

              targetPushX = Math.cos(angle) * pushDist;
              targetPushY = Math.sin(angle) * pushDist;
              targetRot = force * 6 * (dx > 0 ? 1 : -1); // rotate slightly away
              targetScale = 1.05;
            }
          } else {
            // Mobile Scroll Parallax Interaction
            // Subtly shifts absolute positioning based on scroll percentage
            targetPushY = scrollRef.current * item.parallaxSpeed;
          }
        }

        // Apply smooth interpolation (easing)
        const easeFactor = 0.08; // smooth decay/increase
        item.currentPushX += (targetPushX - item.currentPushX) * easeFactor;
        item.currentPushY += (targetPushY - item.currentPushY) * easeFactor;
        item.currentRot += (targetRot - item.currentRot) * easeFactor;
        item.currentScale += (targetScale - item.currentScale) * easeFactor;

        // Float Cycles (Sine/Cosine Waves) - disabled if prefers-reduced-motion
        let floatX = 0;
        let floatY = 0;
        let floatRot = 0;

        if (!isReduced) {
          const floatTime = timeSec * item.floatSpeed;
          floatY = Math.sin(floatTime + item.phase) * item.floatAmpY;
          floatX = Math.cos(floatTime * 0.5 + item.phase) * item.floatAmpX;
          floatRot = Math.sin(floatTime * 0.3 + item.phase) * item.floatAmpRot;
        }

        // Combine base position + float + proximity displacement
        const totalX = floatX + item.currentPushX;
        const totalY = floatY + item.currentPushY;
        const totalRot = floatRot + item.currentRot;
        const scaleStr = isReduced ? '1' : item.currentScale.toFixed(4);

        // Apply styles directly for extreme performance (triggers GPU layers)
        item.ref.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) rotate(${totalRot.toFixed(2)}deg) scale(${scaleStr})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 right-0 bottom-0 w-full h-full pointer-events-none z-[10] overflow-hidden"
    >
      {items.map((item) => {
        const SVGComponent = AssetComponents[item.type];
        return (
          <div
            key={item.id}
            ref={(el) => (item.ref = el)}
            style={{
              position: 'absolute',
              left: `${item.xPercent}%`,
              top: `${item.yPercent}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              willChange: 'transform',
            }}
            className="transition-opacity duration-300 opacity-[18%] md:opacity-[22%] max-md:opacity-[12%]"
          >
            <SVGComponent className="w-full h-full drop-shadow-[0_2px_5px_rgba(142,42,70,0.15)]" />
          </div>
        );
      })}
    </div>
  );
}
