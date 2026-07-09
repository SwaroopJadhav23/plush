import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface BrandIntroProps {
  onComplete: () => void;
}

export default function BrandIntro({ onComplete }: BrandIntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    // Sequence timeline:
    // 0ms: Dark screen, stars fade in
    // 400ms: Clouds start drifting in
    // 800ms: Sparkles appear
    // 1200ms: Logo fades in with soft glow
    // 1600ms: Cute character emojis peek from behind clouds
    // 2000ms: Headline fades in
    // 2600ms: Clouds slide open (left and right), revealing homepage
    // 3200ms: Animation complete

    const timer1 = setTimeout(() => setStep(1), 400); // clouds
    const timer2 = setTimeout(() => setStep(2), 800); // sparkles
    const timer3 = setTimeout(() => setStep(3), 1200); // logo
    const timer4 = setTimeout(() => setStep(4), 1600); // characters peek
    const timer5 = setTimeout(() => setStep(5), 2000); // headline
    const timer6 = setTimeout(() => setStep(6), 2600); // clouds open / fade out
    const timer7 = setTimeout(() => onComplete(), 3200); // finish

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  // Sparkles coordinate helper
  const sparkles = [
    { top: '20%', left: '15%', size: 16, delay: 0.1 },
    { top: '35%', left: '80%', size: 24, delay: 0.3 },
    { top: '75%', left: '25%', size: 20, delay: 0.2 },
    { top: '65%', left: '70%', size: 18, delay: 0.4 },
    { top: '15%', left: '60%', size: 14, delay: 0.5 },
  ];

  // Twinkling stars coordinate helper
  const stars = [
    { top: '10%', left: '30%', size: 4 },
    { top: '25%', left: '10%', size: 6 },
    { top: '45%', left: '85%', size: 5 },
    { top: '80%', left: '40%', size: 7 },
    { top: '70%', left: '90%', size: 4 },
    { top: '90%', left: '15%', size: 5 },
    { top: '30%', left: '50%', size: 6 },
  ];

  return (
    <AnimatePresence>
      {step < 6 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#0A071E] z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* STEP 1: Twinkling Stars */}
          {stars.map((star, idx) => (
            <motion.div
              key={`star-${idx}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.2,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                boxShadow: '0 0 10px #FFFFFF',
              }}
            />
          ))}

          {/* STEP 3: Sparkles (fading in and glowing) */}
          {step >= 2 &&
            sparkles.map((sparkle, idx) => (
              <motion.svg
                key={`sparkle-${idx}`}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: sparkle.delay }}
                className="absolute text-sunny fill-current"
                style={{
                  top: sparkle.top,
                  left: sparkle.left,
                  width: sparkle.size,
                  height: sparkle.size,
                }}
                viewBox="0 0 24 24"
              >
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </motion.svg>
            ))}

          {/* STEP 2 & 6: Clouds layer that covers and then opens */}
          {/* Left Cloud */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: step >= 6 ? '-100%' : '0%', opacity: 0.95 }}
            transition={{
              x: { duration: step >= 6 ? 0.7 : 0.8, ease: 'easeInOut' },
              opacity: { duration: 0.4 },
            }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple/50 via-[#7C3AED]/20 to-transparent flex items-center justify-end pointer-events-none"
          >
            {/* Left Cloud Graphic */}
            <svg
              className="w-96 h-96 opacity-30 text-[#FF6FB5] fill-current translate-x-32"
              viewBox="0 0 200 200"
            >
              <path d="M 40,80 A 30,30 0 0,1 90,60 A 40,40 0 0,1 150,80 A 30,30 0 0,1 180,120 A 40,40 0 0,1 140,160 L 40,160 A 30,30 0 0,1 40,80 Z" />
            </svg>
          </motion.div>

          {/* Right Cloud */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: step >= 6 ? '100%' : '0%', opacity: 0.95 }}
            transition={{
              x: { duration: step >= 6 ? 0.7 : 0.8, ease: 'easeInOut' },
              opacity: { duration: 0.4 },
            }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple/50 via-[#7C3AED]/20 to-transparent flex items-center justify-start pointer-events-none"
          >
            {/* Right Cloud Graphic */}
            <svg
              className="w-96 h-96 opacity-30 text-[#66D9FF] fill-current -translate-x-32"
              viewBox="0 0 200 200"
            >
              <path d="M 40,80 A 30,30 0 0,1 90,60 A 40,40 0 0,1 150,80 A 30,30 0 0,1 180,120 A 40,40 0 0,1 140,160 L 40,160 A 30,30 0 0,1 40,80 Z" />
            </svg>
          </motion.div>

          {/* STEP 5: Characters Peeking from behind Logo area / Cloud borders */}
          {step >= 4 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Loopy 🌸 peeking from top-left */}
              <motion.div
                initial={{ y: 50, x: -50, scale: 0, opacity: 0 }}
                animate={{ y: -70, x: -70, scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                className="absolute text-5xl"
              >
                🌸
              </motion.div>
              {/* Lotso 🐻 peeking from top-right */}
              <motion.div
                initial={{ y: 50, x: 50, scale: 0, opacity: 0 }}
                animate={{ y: -70, x: 70, scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120, delay: 0.1 }}
                className="absolute text-5xl"
              >
                🐻
              </motion.div>
              {/* Snorlax 💤 peeking from bottom-left */}
              <motion.div
                initial={{ y: 50, x: -50, scale: 0, opacity: 0 }}
                animate={{ y: 70, x: -70, scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120, delay: 0.2 }}
                className="absolute text-5xl"
              >
                💤
              </motion.div>
              {/* Bunny 🐰 peeking from bottom-right */}
              <motion.div
                initial={{ y: 50, x: 50, scale: 0, opacity: 0 }}
                animate={{ y: 70, x: 70, scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120, delay: 0.3 }}
                className="absolute text-5xl"
              >
                🐰
              </motion.div>
            </div>
          )}

          {/* STEP 4: Logo Fades in */}
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-50 text-center select-none"
            >
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-candy via-[#7C3AED] to-sky p-1.5 shadow-[0_0_50px_rgba(255,111,181,0.6)] animate-float-slow">
                <div className="w-full h-full rounded-full bg-[#0A071E] flex flex-col items-center justify-center">
                  <span className="font-heading text-white text-3xl font-bold tracking-tight">Plush</span>
                  <span className="font-heading text-candy text-2xl font-bold -mt-1">.Palz</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xs mt-1"
                  >
                    ✨✨
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Headline Fades in */}
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-24 z-50 text-center px-6"
            >
              <h2 className="font-heading text-2xl md:text-3xl text-white font-semibold tracking-wide text-shadow-glow">
                Collect Your Favourite Characters
              </h2>
              <p className="text-sky text-sm md:text-base mt-2 font-body tracking-wider">
                Premium Imported Plushies
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
