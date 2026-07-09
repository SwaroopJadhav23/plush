import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Instagram, ChevronDown } from 'lucide-react';

// Decorative floating stitch-loop SVGs — each with independent motion
const FloatingLoop = ({
  className,
  size = 40,
  delay = 0,
  duration = 5,
  floatDist = 18,
}: {
  className?: string;
  size?: number;
  delay?: number;
  duration?: number;
  floatDist?: number;
}) => (
  <motion.svg
    className={`absolute pointer-events-none ${className}`}
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    animate={{ y: [0, -floatDist, 0], rotate: [0, 8, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatType: 'mirror',
      delay,
    }}
  >
    <circle cx="20" cy="20" r="14" stroke="#E8829E" strokeWidth="2.5" fill="none" opacity="0.3" />
    <circle cx="20" cy="20" r="9" stroke="#E0A93A" strokeWidth="2" fill="none" opacity="0.25" />
  </motion.svg>
);

export default function Hero() {
  // Mouse parallax — subtle 3D depth feel
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring for smooth parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform: 2-4px shift opposite to cursor
  const logoX = useTransform(springX, [-0.5, 0.5], [4, -4]);
  const logoY = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const headlineX = useTransform(springX, [-0.5, 0.5], [3, -3]);
  const headlineY = useTransform(springY, [-0.5, 0.5], [3, -3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -0.5..0.5 around center
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-blush overflow-hidden pt-20 pb-12"
    >
      {/* Floating decorative loops — independent durations so they don't sync */}
      <FloatingLoop className="top-24 left-[8%]" size={50} delay={0} duration={5} floatDist={18} />
      <FloatingLoop className="top-40 right-[12%]" size={35} delay={1.5} duration={4.5} floatDist={20} />
      <FloatingLoop className="bottom-32 left-[15%]" size={45} delay={0.8} duration={6} floatDist={15} />
      <FloatingLoop className="bottom-20 right-[8%]" size={30} delay={2.2} duration={4} floatDist={16} />
      <FloatingLoop className="top-1/2 left-[5%]" size={28} delay={3} duration={5.5} floatDist={19} />
      <FloatingLoop className="top-1/3 right-[5%]" size={55} delay={1} duration={6.5} floatDist={17} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        {/* Logo placeholder — fades/scales in first (0ms delay) */}
        {/* PLACEHOLDER: replace with logo1.jpg */}
        <motion.div
          style={{ x: logoX, y: logoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-6 w-28 h-28 rounded-full bg-gradient-to-br from-rose via-rose to-berry flex items-center justify-center shadow-xl ring-4 ring-cream"
        >
          <span className="font-script text-cream text-4xl leading-none">
            The
            <br />
            Half Code
          </span>
        </motion.div>

        {/* Sub-tagline — fades up at 150ms */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="font-script text-xl md:text-2xl text-mustard mb-2"
        >
          A corner for yarn • loops • hooks
        </motion.p>

        {/* Headline — fades up with slight scale at 300ms */}
        <motion.h1
          style={{ x: headlineX, y: headlineY }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="font-script text-6xl md:text-8xl text-berry font-bold leading-tight mb-4"
        >
          Selling Pinteresty Dreams
        </motion.h1>

        {/* Subhead — fades up at 450ms */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          className="text-lg md:text-xl text-charcoal max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Handmade crochet, one loop at a time — bouquets, keychains, dolls &
          more, made just for you in Jaipur
        </motion.p>

        {/* CTAs — fade up together at 600ms */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://instagram.com/thehalfcode__"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-rose text-cream font-semibold px-7 py-3 rounded-full hover:bg-berry transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Instagram size={20} />
            Shop on Instagram DM
          </a>
          <a
            href="#creations"
            className="flex items-center gap-2 bg-cream text-berry font-semibold px-7 py-3 rounded-full border-2 border-rose hover:bg-rose hover:text-cream transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            View Our Creations
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — continuous gentle bounce */}
      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-berry"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
