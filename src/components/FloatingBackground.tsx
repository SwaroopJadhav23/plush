import React, { useEffect, useRef, useState } from 'react';

// Premium SVG background assets
const CloudSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" fill="currentColor" className={className}>
    <path d="M 20,40 A 15,15 0 0,1 35,20 A 20,20 0 0,1 65,20 A 15,15 0 0,1 80,40 A 10,10 0 0,1 80,45 L 20,45 A 10,10 0 0,1 20,40 Z" />
  </svg>
);

const StarSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
  </svg>
);

const SparkleSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

const HeartSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const PawSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="7" cy="7" r="2.5" />
    <circle cx="17" cy="7" r="2.5" />
    <circle cx="12" cy="5" r="2.5" />
    <path d="M12 9c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24L12 16.5l4.24 2.74C17.33 18.16 18 16.66 18 15c0-3.31-2.69-6-6-6z" />
  </svg>
);

const BowSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2c.4 0 .8-.1 1.1-.3l1.9 1.9c-.3.3-.3.8-.3 1.2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-2c0-.4-.1-.8-.3-1.2l1.9-1.9c.3.2.7.3 1.1.3h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-2c-.4 0-.8.1-1.1.3L12 8.2l-1.9-1.9c-.3-.2-.7-.3-1.1-.3H4zm2 2c0-.55.45-1 1-1h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V8zm10 0c0-.55.45-1 1-1h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1V8z" />
  </svg>
);

const AssetComponents = [
  CloudSVG,   // 0
  StarSVG,    // 1
  SparkleSVG, // 2
  HeartSVG,   // 3
  PawSVG,     // 4
  BowSVG,     // 5
];

// Predefined colors for background items to match our palette
const colors = [
  'text-candy',
  'text-sky',
  'text-sunny',
  'text-mint',
  'text-primary/40',
];

const SLOTS = [
  // Left Side Slots
  { x: 4, y: 5, type: 0, color: 1 },
  { x: 12, y: 15, type: 1, color: 2 },
  { x: 6, y: 28, type: 2, color: 0 },
  { x: 15, y: 38, type: 3, color: 3 },
  { x: 5, y: 50, type: 4, color: 4 },
  { x: 10, y: 62, type: 5, color: 0 },
  { x: 7, y: 75, type: 0, color: 2 },
  { x: 14, y: 88, type: 2, color: 1 },
  
  // Right Side Slots
  { x: 92, y: 8, type: 3, color: 0 },
  { x: 84, y: 18, type: 0, color: 1 },
  { x: 90, y: 30, type: 2, color: 2 },
  { x: 87, y: 42, type: 4, color: 3 },
  { x: 93, y: 55, type: 1, color: 4 },
  { x: 85, y: 68, type: 5, color: 0 },
  { x: 91, y: 80, type: 2, color: 1 },
  { x: 88, y: 92, type: 3, color: 2 },
];

interface FloatingItem {
  id: number;
  xPercent: number;
  yPercent: number;
  type: number;
  colorClass: string;
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

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = window.innerWidth;
    let count = SLOTS.length;
    if (width < 768) {
      count = 6; // mobile
    } else if (width < 1024) {
      count = 10; // tablet
    }

    const shuffled = [...SLOTS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const generated: FloatingItem[] = selected.map((slot, index) => {
      const isMobile = width < 768;
      const baseSize = isMobile ? 24 : 42;
      const sizeOffset = Math.random() * 15 - 5; // size variety

      return {
        id: index,
        xPercent: slot.x,
        yPercent: slot.y,
        type: slot.type,
        colorClass: colors[slot.color],
        size: baseSize + sizeOffset,
        floatSpeed: 0.5 + Math.random() * 0.8, // slow floats
        floatAmpY: 8 + Math.random() * 8,
        floatAmpX: 4 + Math.random() * 6,
        floatAmpRot: 4 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
        parallaxSpeed: (Math.random() * 0.06 - 0.03),
        currentPushX: 0,
        currentPushY: 0,
        currentRot: 0,
        currentScale: 1,
        ref: null,
      };
    });

    setItems(generated);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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

  useEffect(() => {
    if (items.length === 0 || !isActive) return;

    const tick = (timestamp: number) => {
      const timeSec = timestamp / 1000;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isReduced = reducedMotionRef.current;

      items.forEach((item) => {
        if (!item.ref) return;

        const container = containerRef.current;
        if (!container) return;

        const docHeight = container.scrollHeight || document.documentElement.scrollHeight;
        const docWidth = window.innerWidth;

        const pageX = (item.xPercent / 100) * docWidth;
        const pageY = (item.yPercent / 100) * docHeight;
        const clientX = pageX;
        const clientY = pageY - scrollRef.current;

        let targetPushX = 0;
        let targetPushY = 0;
        let targetRot = 0;
        let targetScale = 1;

        if (!isReduced) {
          if (!isTouch) {
            const dx = clientX - mouseRef.current.x;
            const dy = clientY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const threshold = 180; // slightly wider detection for soft feel

            if (dist < threshold) {
              const force = (threshold - dist) / threshold;
              const pushDist = force * 20; 
              const angle = Math.atan2(dy, dx);

              targetPushX = Math.cos(angle) * pushDist;
              targetPushY = Math.sin(angle) * pushDist;
              targetRot = force * 10 * (dx > 0 ? 1 : -1);
              targetScale = 1.1;
            }
          } else {
            targetPushY = scrollRef.current * item.parallaxSpeed;
          }
        }

        const easeFactor = 0.05; // softer interpolation
        item.currentPushX += (targetPushX - item.currentPushX) * easeFactor;
        item.currentPushY += (targetPushY - item.currentPushY) * easeFactor;
        item.currentRot += (targetRot - item.currentRot) * easeFactor;
        item.currentScale += (targetScale - item.currentScale) * easeFactor;

        let floatX = 0;
        let floatY = 0;
        let floatRot = 0;

        if (!isReduced) {
          const floatTime = timeSec * item.floatSpeed;
          floatY = Math.sin(floatTime + item.phase) * item.floatAmpY;
          floatX = Math.cos(floatTime * 0.4 + item.phase) * item.floatAmpX;
          floatRot = Math.sin(floatTime * 0.2 + item.phase) * item.floatAmpRot;
        }

        const totalX = floatX + item.currentPushX;
        const totalY = floatY + item.currentPushY;
        const totalRot = floatRot + item.currentRot;
        const scaleStr = isReduced ? '1' : item.currentScale.toFixed(4);

        item.ref.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) rotate(${totalRot.toFixed(2)}deg) scale(${scaleStr})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [items, isActive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[10] overflow-hidden bg-bgMain"
    >
      {/* Dynamic slow gradient background blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-candy/10 to-[#7C3AED]/5 filter blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-sky/15 to-mint/10 filter blur-[120px] animate-float-slower pointer-events-none" />
      <div className="absolute top-[60%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-sunny/10 to-candy/5 filter blur-[90px] animate-float-slowest pointer-events-none" />

      {/* Floating decorative elements */}
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
            className={`transition-opacity duration-300 opacity-[14%] hover:opacity-[40%] ${item.colorClass} drop-shadow-sm`}
          >
            <SVGComponent className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}
