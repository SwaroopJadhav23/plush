import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Instagram, ChevronDown } from 'lucide-react';
import SectionCard from './SectionCard';

interface HeroProps {
  introStage?: 'playing' | 'revealing' | 'complete';
}

export default function Hero({ introStage = 'complete' }: HeroProps) {
  // Mouse parallax — subtle 3D depth feel
  const heroRef = useRef<HTMLDivElement>(null);
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

  // Determine intro reveal state checks
  const isPlaying = introStage === 'playing';
  const isRevealing = introStage === 'revealing';
  const isComplete = introStage === 'complete';
  const startTrigger = !isPlaying;

  // Custom overrides for SectionCard unfolding
  const cardInitial = isPlaying ? { opacity: 0, scale: 0.97, y: 20 } : undefined;
  const cardAnimate = isPlaying 
    ? { opacity: 0, scale: 0.97, y: 20 } 
    : (isRevealing ? { opacity: 1, scale: 1, y: 0 } : undefined);
  const cardTransition = isRevealing ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : undefined;

  return (
    <SectionCard 
      id="hero" 
      className="min-h-[85vh] flex items-center justify-center pt-24 pb-16"
      initialOverride={cardInitial}
      animateOverride={cardAnimate}
      transitionOverride={cardTransition}
    >
      <div 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full relative z-10 max-w-4xl mx-auto text-center flex flex-col justify-center"
      >
        {/* Logo placeholder — fades/scales in first */}
        <motion.div
          style={{ x: logoX, y: logoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={startTrigger ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut', 
            delay: isRevealing ? 0.1 : 0.0 
          }}
          className="mx-auto mb-6 w-28 h-28 rounded-full bg-gradient-to-br from-rose via-rose to-berry flex items-center justify-center shadow-xl ring-4 ring-cream select-none pointer-events-none"
        >
          <span className="font-script text-cream text-4xl leading-none">
            The
            <br />
            Half Code
          </span>
        </motion.div>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut', 
            delay: isRevealing ? 0.25 : 0.15 
          }}
          className="font-script text-xl md:text-2xl text-mustard mb-2"
        >
          A corner for yarn • loops • hooks
        </motion.p>

        {/* Headline */}
        <motion.h1
          style={{ x: headlineX, y: headlineY }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={startTrigger ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut', 
            delay: isRevealing ? 0.4 : 0.3 
          }}
          className="font-script text-6xl md:text-8xl text-berry font-bold leading-tight mb-4"
        >
          Selling Pinteresty Dreams
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut', 
            delay: isRevealing ? 0.55 : 0.45 
          }}
          className="text-lg md:text-xl text-charcoal max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
        >
          Handmade crochet, one loop at a time — bouquets, keychains, dolls &
          more, made just for you in Jaipur
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut', 
            delay: isRevealing ? 0.7 : 0.6 
          }}
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
    </SectionCard>
  );
}

