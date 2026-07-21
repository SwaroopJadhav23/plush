import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight, Sparkles, Star } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface HeroProps {
  introStage?: 'playing' | 'revealing' | 'complete';
}

const floatingCharacters = [
  {
    name: 'Loopy',
    src: '/loopy.png',
    position: 'top-[12%] left-[4%] md:top-[15%] md:left-[6%]',
    size: 'w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40',
    floatDuration: 5,
    tiltDuration: 7,
    glowColor: 'rgba(255, 111, 181, 0.35)',
    tag: '🌸 Viral Pink Beaver',
  },
  {
    name: 'Lotso',
    src: '/lotso.png',
    position: 'bottom-[12%] left-[3%] md:bottom-[15%] md:left-[8%]',
    size: 'w-24 h-24 sm:w-30 sm:h-30 md:w-44 md:h-44',
    floatDuration: 6,
    tiltDuration: 8,
    glowColor: 'rgba(255, 111, 181, 0.45)',
    tag: '🍓 Strawberry Lotso Bear',
  },
  {
    name: 'Snorlax',
    src: '/snorlax.png',
    position: 'top-[10%] right-[4%] md:top-[16%] md:right-[6%]',
    size: 'w-26 h-26 sm:w-32 sm:h-32 md:w-48 md:h-48',
    floatDuration: 7,
    tiltDuration: 9,
    glowColor: 'rgba(102, 217, 255, 0.35)',
    tag: '💤 Lazy Sleepy Snorlax',
  },
  {
    name: 'Bunny',
    src: '/bunny.png',
    position: 'bottom-[12%] right-[3%] md:bottom-[18%] md:right-[8%]',
    size: 'w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40',
    floatDuration: 5.5,
    tiltDuration: 7.5,
    glowColor: 'rgba(255, 213, 79, 0.35)',
    tag: '🐰 Dreamy Bow Bunny',
  },
  {
    name: 'Purple Plush',
    src: '/purple_long.png',
    position: 'top-[42%] right-[2%] md:top-[45%] md:right-[3%] lg:right-[4%]',
    size: 'w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36',
    floatDuration: 6.5,
    tiltDuration: 8.5,
    glowColor: 'rgba(124, 58, 237, 0.35)',
    tag: '🔮 Purple Cat pillow',
  },
];

export default function Hero({ introStage = 'complete' }: HeroProps) {
  const isPlaying = introStage === 'playing';
  const [characters, setCharacters] = useState(floatingCharacters);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/sections/hero`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const updated = floatingCharacters.map(char => {
            let key = '';
            if (char.name === 'Loopy') key = 'char_loopy';
            else if (char.name === 'Lotso') key = 'char_lotso';
            else if (char.name === 'Snorlax') key = 'char_snorlax';
            else if (char.name === 'Bunny') key = 'char_bunny';
            else if (char.name === 'Purple Plush') key = 'char_purple';

            const match = data.find(item => item.key === key);
            if (match) {
              const fullImgUrl = match.imageUrl.startsWith('/') 
                ? `${API_BASE_URL}${match.imageUrl}` 
                : match.imageUrl;
              return {
                ...char,
                src: fullImgUrl,
                tag: match.label || char.tag
              };
            }
            return char;
          });
          setCharacters(updated);
        }
      })
      .catch(err => console.warn('Failed to load hero section images:', err));
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[65vh] lg:min-h-[95vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 overflow-hidden bg-gradient-to-b from-[#F8FAFF] via-[#F2F6FF] to-[#FAF5FF]"
    >
      {/* 1. Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[35vh] bg-gradient-to-r from-candy/15 via-primary/5 to-sky/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Slowly Drifting Clouds (Visual Environment Transitions) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
        <motion.div
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[2%] opacity-20 text-sky"
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="currentColor">
            <path d="M 20,40 A 15,15 0 0,1 45,20 A 20,20 0 0,1 85,25 A 15,15 0 0,1 100,45 Z" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ x: [100, -100, 100] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[4%] opacity-25 text-candy"
        >
          <svg width="150" height="75" viewBox="0 0 150 75" fill="currentColor">
            <path d="M 30,50 A 20,20 0 0,1 60,25 A 25,25 0 0,1 110,30 A 20,20 0 0,1 130,55 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Twinkling Sparkles and Stars */}
      <div className="absolute inset-0 pointer-events-none z-15 select-none">
        <Star className="absolute text-sunny fill-sunny w-4 h-4 top-[20%] left-[20%] animate-twinkle" />
        <Star className="absolute text-candy fill-candy w-3 h-3 bottom-[30%] left-[30%] animate-twinkle delay-100" />
        <Sparkles className="absolute text-sky w-5 h-5 top-[30%] right-[32%] animate-pulse" />
        <Star className="absolute text-primary fill-primary w-4 h-4 bottom-[25%] right-[22%] animate-twinkle delay-500" />
      </div>

      {/* 2. Floating Characters */}
      {!isPlaying && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden lg:block">
          {characters.map((char, index) => (
            <motion.div
              key={char.name}
              className={`absolute ${char.position} pointer-events-auto`}
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3 + index * 0.15,
                type: 'spring',
                stiffness: 90,
                damping: 18,
              }}
            >
              {/* breathing tilt loops */}
              <motion.div
                animate={{
                  y: [-12, 12, -12],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  y: {
                    duration: char.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  rotate: {
                    duration: char.tiltDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                whileHover={{ scale: 1.07 }}
                className="relative group cursor-pointer"
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-90 scale-95 group-hover:scale-105"
                  style={{ backgroundColor: char.glowColor }}
                />

                {/* Main character image */}
                <img
                  src={char.src}
                  alt={char.name}
                  className="relative z-10 w-auto h-auto object-contain filter drop-shadow-[0_12px_28px_rgba(45,45,45,0.06)] group-hover:drop-shadow-[0_16px_36px_rgba(45,45,45,0.12)] transition-all duration-500 rounded-3xl"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '200px',
                  }}
                />

                {/* Peeking Easter Egg indicator occasionally */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-15 bg-white/10 rounded-3xl" />

                {/* Character tooltip metadata details */}
                <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 text-[10px] font-bold text-darkText shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-25">
                  {char.tag}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 3. Main Hero Content */}
      <div className="relative z-30 max-w-[1500px] mx-auto px-6 text-center flex flex-col items-center">
        {/* Glowing badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex items-center gap-2 bg-white border border-primary/10 px-4.5 py-2 rounded-full shadow-md z-30 font-heading font-bold text-[11px] sm:text-xs text-primary"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span><span>✨ Welcome to the Plush.Palz Universe ✨</span></span>
        </motion.div>

        {/* Large Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 80 }}
          className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-darkText font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl select-none"
        >
          Collect Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-candy via-primary to-sky text-shadow-glow">
            Favourite Characters.
          </span>
        </motion.h1>

        {/* Cinematic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-base md:text-2xl text-darkText/75 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold"
        >
          Premium Imported Plushies curated for collectors and cuddles. <br />
          <span className="text-primary font-bold">Sanrio • Pokémon • Anime • Disney • Cute Animals</span> <br />
          <span className="text-xs bg-white shadow-sm border border-white px-4 py-1.5 rounded-full mt-4 inline-block font-bold">
            🇮🇳 Express Pan India Delivery
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto"
        >
          <motion.a
            href="#universe"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 bg-gradient-to-r from-candy to-primary text-white font-heading font-bold px-10 py-5 rounded-full shadow-[0_6px_25px_rgba(255,111,181,0.4)] hover:shadow-[0_10px_35px_rgba(255,111,181,0.55)] transition-all duration-300 w-full sm:w-auto justify-center text-base hover:glow"
          >
            <span>Browse Collections</span>
            <ArrowRight size={20} />
          </motion.a>

          <motion.a
            href="https://instagram.com/plush.palz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 bg-white text-darkText font-heading font-bold px-10 py-5 rounded-full border border-darkText/15 shadow-[0_6px_20px_rgba(0,0,0,0.02)] hover:bg-[#FDFEFF] transition-all duration-300 w-full sm:w-auto justify-center text-base"
          >
            <Instagram size={20} className="text-candy" />
            <span>Shop on Instagram</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Drifting particles */}
      <div className="absolute top-[20%] left-[25%] w-4 h-4 bg-sunny rounded-full animate-ping opacity-25 pointer-events-none" />
      <div className="absolute bottom-[30%] right-[25%] w-3 h-3 bg-sky rounded-full animate-ping opacity-35 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[45%] w-2 h-2 bg-candy rounded-full animate-ping opacity-25 pointer-events-none" />
    </section>
  );
}
