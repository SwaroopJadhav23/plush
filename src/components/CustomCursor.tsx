import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StitchLoop = {
  id: number;
  x: number;
  y: number;
};

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

const MAX_LOOPS = 15;
const SPAWN_DIST = 50;

// Yarn ball anchor position (bottom-left corner, fixed)
const BALL_SIZE = 55;
const BALL_OFFSET = 40;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [loops, setLoops] = useState<StitchLoop[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for rAF-based tracking (no React state per mousemove)
  const hookRef = useRef<SVGSVGElement>(null);
  const stringRef = useRef<SVGPathElement>(null);

  // Single source of truth for raw mouse position — updated on every mousemove, no throttle
  const rawMouseRef = useRef({ x: -100, y: -100 });
  const prevPosRef = useRef({ x: -100, y: -100 });
  const angleRef = useRef(0);

  // Spring-smoothed control point for the string's sag (NOT the endpoint)
  const springSagRef = useRef({ x: -100, y: -100 });

  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null);
  const loopIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const hoverRef = useRef(false);
  const hoverTargetRef = useRef<DOMRect | null>(null);

  const spawnLoop = useCallback((px: number, py: number) => {
    const id = loopIdRef.current++;
    setLoops((prev) => {
      const next = [...prev, { id, x: px, y: py }];
      return next.length > MAX_LOOPS ? next.slice(next.length - MAX_LOOPS) : next;
    });
    setTimeout(() => {
      setLoops((prev) => prev.filter((l) => l.id !== id));
    }, 1050);
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      // Raw mouse position — single source of truth, no throttle, no state
      rawMouseRef.current = { x: e.clientX, y: e.clientY };

      // Throttle stitch loop spawning
      const last = lastSpawnRef.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= SPAWN_DIST) {
          spawnLoop(e.clientX, e.clientY);
          lastSpawnRef.current = { x: e.clientX, y: e.clientY };
        }
      } else {
        lastSpawnRef.current = { x: e.clientX, y: e.clientY };
      }

      // Detect hover over buttons / product cards for "catch" effect
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, .group');
      if (interactive) {
        hoverRef.current = true;
        hoverTargetRef.current = interactive.getBoundingClientRect();
      } else {
        hoverRef.current = false;
        hoverTargetRef.current = null;
      }
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // rAF loop — single source of truth, both hook and string read rawMouseRef once per frame
    const tick = () => {
      // Read raw mouse position ONCE — this exact value drives both hook and string endpoint
      const { x, y } = rawMouseRef.current;
      const prev = prevPosRef.current;

      // Calculate angle from velocity (delta between frames) for hook rotation
      const dx = x - prev.x;
      const dy = y - prev.y;
      if (dx !== 0 || dy !== 0) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        let diff = targetAngle - angleRef.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        angleRef.current += diff * 0.25;
      }

      // Add extra rotation when hovering ("catch" effect)
      const catchBoost = hoverRef.current ? 15 : 0;
      const displayAngle = angleRef.current + catchBoost;

      // Position the hook SVG — uses the SAME x,y as the string endpoint
      if (hookRef.current) {
        hookRef.current.style.transform = `translate(${x - 15}px, ${y - 15}px) rotate(${displayAngle}deg)`;
      }

      // --- Build the ball-to-cursor string path ---
      // Ball center is fixed in viewport space
      const ballX = BALL_OFFSET + BALL_SIZE / 2;
      const ballY = window.innerHeight - BALL_OFFSET - BALL_SIZE / 2;

      // String endpoint is PINNED to the raw cursor position — zero lag, no spring
      // This guarantees the string never detaches from the hook
      const endX = x;
      const endY = y;

      // Distance between ball and cursor
      const strDx = endX - ballX;
      const strDy = endY - ballY;
      const dist = Math.sqrt(strDx * strDx + strDy * strDy);

      // Speed of cursor movement — drives extra sag/whip during fast motion
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Target sag control point: midpoint pushed downward, proportional to distance + speed
      // Longer distance = more sag. Faster movement = more dramatic whip/sag.
      const sagAmount = Math.min(dist * 0.15, 60) + Math.min(speed * 0.4, 30);
      const targetMidX = (ballX + endX) / 2;
      const targetMidY = (ballY + endY) / 2 + sagAmount;

      // Apply spring physics ONLY to the sag control point — never to the endpoint
      // This gives the string a natural lagging droop that whips dramatically on fast moves
      // while the tip stays perfectly pinned to the hook
      const stiffness = 0.15;
      const damping = 0.7;
      const sag = springSagRef.current;
      const sagVx = (targetMidX - sag.x) * stiffness;
      const sagVy = (targetMidY - sag.y) * stiffness;
      sag.x += sagVx * damping + sagVx * (1 - damping);
      sag.y += sagVy * damping + sagVy * (1 - damping);

      // Redraw the path EVERY frame unconditionally — never skip
      if (stringRef.current) {
        if (hoverRef.current && hoverTargetRef.current) {
          const rect = hoverTargetRef.current;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          // Taut arc toward hovered element — endpoint still pinned to cursor
          const tautMidX = (ballX + cx) / 2;
          const tautMidY = (ballY + cy) / 2 - 15;
          stringRef.current.setAttribute(
            'd',
            `M ${ballX} ${ballY} Q ${tautMidX} ${tautMidY} ${endX} ${endY}`,
          );
        } else {
          // Natural hanging sag curve — endpoint pinned to raw cursor, control point spring-smoothed
          stringRef.current.setAttribute(
            'd',
            `M ${ballX} ${ballY} Q ${sag.x} ${sag.y} ${endX} ${endY}`,
          );
        }
      }

      prevPosRef.current = { x, y };
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spawnLoop]);

  return (
    <>
      {/* Custom crochet hook cursor + yarn ball string — desktop only */}
      {enabled && (
        <>
          {/* Yarn string from ball to cursor — renders behind content but above section bg */}
          <svg
            className="pointer-events-none fixed top-0 left-0 z-[9998] w-full h-full"
            style={{ overflow: 'visible', opacity: 0.88 }}
          >
            <path
              ref={stringRef}
              stroke="#E8829E"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(142, 42, 70, 0.2))',
              }}
            />
          </svg>

          {/* Crochet hook SVG — actual hook shape */}
          <svg
            ref={hookRef}
            className="pointer-events-none fixed top-0 left-0 z-[9999]"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            style={{ willChange: 'transform' }}
          >
            {/* Thin curved rod with hook curl at the end */}
            <path
              d="M4 4 L18 18 Q22 22 22 25 Q22 28 19 28 Q16 28 16 25"
              stroke="#8E2A46"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Mustard gold outline for shine */}
            <path
              d="M4 4 L18 18 Q22 22 22 25 Q22 28 19 28 Q16 28 16 25"
              stroke="#E0A93A"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* Small ball at the handle end */}
            <circle cx="4" cy="4" r="2.5" fill="#8E2A46" />
            <circle cx="4" cy="4" r="2.5" stroke="#E0A93A" strokeWidth="0.5" fill="none" opacity="0.6" />
          </svg>

          {/* Yarn ball anchor — fixed bottom-left corner */}
          <motion.div
            className="pointer-events-none fixed z-[9998]"
            style={{ left: `${BALL_OFFSET}px`, bottom: `${BALL_OFFSET}px` }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              width={BALL_SIZE}
              height={BALL_SIZE}
              viewBox="0 0 60 60"
              fill="none"
              style={{
                filter: 'drop-shadow(0 3px 6px rgba(142, 42, 70, 0.3))',
              }}
            >
              {/* Base sphere */}
              <circle cx="30" cy="30" r="26" fill="#E8829E" />
              <circle cx="30" cy="30" r="26" fill="#8E2A46" opacity="0.15" />

              {/* Wound yarn texture — overlapping curved arcs */}
              <path
                d="M6 30 Q18 16 30 30 Q42 44 54 30"
                stroke="#8E2A46"
                strokeWidth="1.8"
                fill="none"
                opacity="0.55"
                strokeLinecap="round"
              />
              <path
                d="M6 30 Q18 44 30 30 Q42 16 54 30"
                stroke="#8E2A46"
                strokeWidth="1.8"
                fill="none"
                opacity="0.55"
                strokeLinecap="round"
              />
              <path
                d="M30 4 Q16 18 30 30 Q44 42 30 56"
                stroke="#8E2A46"
                strokeWidth="1.8"
                fill="none"
                opacity="0.45"
                strokeLinecap="round"
              />
              <path
                d="M30 4 Q44 18 30 30 Q16 42 30 56"
                stroke="#8E2A46"
                strokeWidth="1.8"
                fill="none"
                opacity="0.45"
                strokeLinecap="round"
              />
              {/* Diagonal wrap */}
              <path
                d="M12 12 Q24 24 36 36 Q42 42 48 48"
                stroke="#8E2A46"
                strokeWidth="1.5"
                fill="none"
                opacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M48 12 Q36 24 24 36 Q18 42 12 48"
                stroke="#8E2A46"
                strokeWidth="1.5"
                fill="none"
                opacity="0.35"
                strokeLinecap="round"
              />

              {/* Highlight for 3D feel */}
              <ellipse cx="22" cy="20" rx="8" ry="5" fill="#FFF8F3" opacity="0.25" />
            </svg>
          </motion.div>

          {/* Stitch loops — wobbly hand-drawn looking rings along the string */}
          <AnimatePresence>
            {loops.map((loop) => (
              <motion.svg
                key={loop.id}
                className="pointer-events-none fixed top-0 left-0 z-[9998]"
                style={{ x: loop.x - 7, y: loop.y - 7 }}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                exit={{ scale: 0.2, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
                transition={{
                  scale: { duration: 0.15, ease: 'easeOut' },
                  opacity: { duration: 0.15 },
                }}
              >
                {/* Wobbly irregular ring — not a perfect circle */}
                <path
                  d="M7 1.5 C 9.5 1.2 12.5 3 12.2 6 C 12.8 8.5 10 12.2 7 11.8 C 4 12.5 1.2 9.5 1.8 7 C 1.2 4 4.5 1.2 7 1.5 Z"
                  stroke="#E0A93A"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            ))}
          </AnimatePresence>
        </>
      )}

      {/* Scroll progress yarn thread — always visible (mobile too) */}
      <div className="fixed right-3 top-0 z-[9997] h-screen flex flex-col items-center pointer-events-none">
        {/* Yarn ball icon at top */}
        <div className="mt-4 mb-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="11" fill="#E0A93A" />
            <path
              d="M5 14 Q9 8 14 14 Q19 20 23 14"
              stroke="#8E2A46"
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M5 14 Q9 20 14 14 Q19 8 23 14"
              stroke="#8E2A46"
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M14 3 Q8 9 14 14 Q20 19 14 25"
              stroke="#8E2A46"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
        {/* Thread track */}
        <div className="relative w-[3px] flex-1 rounded-full bg-rose/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              height: `${scrollProgress * 100}%`,
              background: 'linear-gradient(to bottom, #E0A93A, #E8829E)',
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </>
  );
}
