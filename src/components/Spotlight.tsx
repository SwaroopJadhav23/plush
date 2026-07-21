import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { API_BASE_URL, WHATSAPP_NUMBER } from '../config/api';

interface Slide {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  src: string;
  price: string;
  bg: string;
  glow: string;
  textColor: string;
  emojis: string[];
}

const spotlightSlides: Slide[] = [
  {
    id: 1,
    slug: 'loopy',
    name: 'Cute Pink Loopy Beaver',
    tagline: 'The Viral Cuteness Sensation 🌸',
    desc: 'Meet Loopy, the sweetest little companion for cozy evenings and happy collectors! Made with premium peach-fuzz velvet fabrics and a squishy round tummy. Authentic Japanese layout imports.',
    src: '/loopy.png',
    price: '₹1,199',
    bg: 'from-[#FFF0F5] via-[#FFE3EC] to-[#FFD1E0]',
    glow: 'rgba(255, 111, 181, 0.25)',
    textColor: 'text-candy',
    emojis: ['🌸', '🎀', '✨'],
  },
  {
    id: 2,
    slug: 'snorlax',
    name: 'Lazy Sleepy Snorlax',
    tagline: 'Your Sleepy Nap Buddy 💤',
    desc: 'Snorlax is ready for nap time! Stuffed with extra soft down cotton and covered in premium velocity fabric. Ideal as a side-hugging body pillow or desk support buddy.',
    src: '/snorlax.png',
    price: '₹1,499',
    bg: 'from-[#E6F8FF] via-[#CCEFFF] to-[#B3E6FF]',
    glow: 'rgba(102, 217, 255, 0.25)',
    textColor: 'text-sky',
    emojis: ['💤', '⚡', '⭐'],
  },
  {
    id: 3,
    slug: 'lotso-bear',
    name: 'Strawberry Lotso Bear',
    tagline: 'Smells Like Sweet Strawberries! 🍓',
    desc: 'The viral Toy Story strawberry bear Lotso! Features extremely fluffy magenta fur, a big squishy nose, and cuddly posture. Imported direct premium catalog edition.',
    src: '/lotso.png',
    price: '₹1,299',
    bg: 'from-[#FFF0F2] via-[#FFD6DC] to-[#FFA8B6]',
    glow: 'rgba(255, 111, 181, 0.3)',
    textColor: 'text-candy',
    emojis: ['🍓', '🐻', '🔥'],
  },
  {
    id: 4,
    slug: 'bow-bunny',
    name: 'Dreamy Bow Bunny',
    tagline: 'Fluffy Pastel Friend 🐰',
    desc: 'A gorgeous white bunny plush featuring soft pink inner ears, a pink bow tie, and an incredibly soft touch. Adorable pastel LINE style aesthetics.',
    src: '/bunny.png',
    price: '₹999',
    bg: 'from-[#FFFDF0] via-[#FFF5D6] to-[#FFE6A3]',
    glow: 'rgba(255, 213, 79, 0.25)',
    textColor: 'text-sunny',
    emojis: ['🐰', '✨', '🐾'],
  },
  {
    id: 5,
    slug: 'purple-long-cat',
    name: 'Purple Long Hugging Cat',
    tagline: 'The Ultimate Body Pillow 🔮',
    desc: 'An extra-long cylindrical plush kitty designed for comfortable side-sleeping and lounging. High-elasticity fabric holds shape perfectly over time.',
    src: '/purple_long.png',
    price: '₹1,599',
    bg: 'from-[#F3E8FF] via-[#E9D5FF] to-[#D8B4FE]',
    glow: 'rgba(124, 58, 237, 0.25)',
    textColor: 'text-primary',
    emojis: ['🔮', '🆕', '🐱'],
  },
];

export default function Spotlight() {
  const [slides, setSlides] = useState<Slide[]>(spotlightSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const shouldReduceMotion = useReducedMotion();

  // Load from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const offers = data.filter(p => p.isSpecialOffer);
          const displayData = offers.length > 0 ? offers : data;

          const formatted = displayData.map((p, index) => {
            const colors = [
              { bg: 'from-[#FFF0F5] via-[#FFE3EC] to-[#FFD1E0]', glow: 'rgba(255, 111, 181, 0.25)', textColor: 'text-candy' },
              { bg: 'from-[#E6F8FF] via-[#CCEFFF] to-[#B3E6FF]', glow: 'rgba(102, 217, 255, 0.25)', textColor: 'text-sky' },
              { bg: 'from-[#FFFDF0] via-[#FFF5D6] to-[#FFE6A3]', glow: 'rgba(255, 213, 79, 0.25)', textColor: 'text-sunny' },
              { bg: 'from-[#F3E8FF] via-[#E9D5FF] to-[#D8B4FE]', glow: 'rgba(124, 58, 237, 0.25)', textColor: 'text-primary' },
            ];
            const colorScheme = colors[index % colors.length];
            return {
              id: p.id,
              slug: p.slug,
              name: p.name,
              tagline: p.badge ? `${p.badge} ✨` : 'Special Pick 🌸',
              desc: p.description,
              src: p.src.startsWith('/') ? `${API_BASE_URL}${p.src}` : p.src,
              price: `₹${p.price}`,
              bg: colorScheme.bg,
              glow: colorScheme.glow,
              textColor: colorScheme.textColor,
              emojis: p.floatingDecos || ['✨']
            };
          });
          setSlides(formatted);
        }
      })
      .catch(err => console.warn('Failed to load spotlight slides from API:', err));
  }, []);

  // Slide auto-rotator
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex, slides.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[activeIndex] || spotlightSlides[0];

  // Prefilled WhatsApp order
  const handleOrder = () => {
    const fullImageUrl = current.src.startsWith('http') 
      ? current.src 
      : `${window.location.origin}${current.src.startsWith('/') ? '' : '/'}${current.src}`;

    const lines = [
      'Hello Plush.Palz!',
      '',
      'I want to order this featured spotlight plush from your website:',
      '',
      `Product Name: *${current.name}*`,
      `Price: *${current.price}*`,
      `Product Image: ${fullImageUrl}`,
      '',
      'Please confirm availability!',
      '',
      'Thank you!'
    ];
    const message = lines.join('\n');
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // Nav page trigger
  const handleMeet = () => {
    window.location.hash = `#/products/${current.slug}`;
  };

  // Variants for slide deck animations
  const slideVariants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' },
    }),
  };

  return (
    <section id="spotlight" className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 lg:pb-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-white overflow-hidden border-b border-darkText/[0.02] scroll-mt-28">
      
      {/* Decorative floating clouds at the margins */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-30">
        <div className="absolute top-[10%] left-[5%] w-48 h-20 bg-[#F0F4FF] rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-60 h-24 bg-[#FFF5F8] rounded-full blur-xl animate-float-slower" />
      </div>

      <div className="max-w-[1500px] mx-auto relative z-20">
        
        {/* Spotlight title heading */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-candy bg-candy/5 px-4.5 py-2 rounded-full mb-3 inline-block">
            Featured Spotlight
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-darkText font-extrabold mb-4 leading-tight select-none">
            Meet Our Character Spotlight.
          </h2>
          <p className="font-body text-sm sm:text-base text-darkText/70 max-w-xl mx-auto">
            Take a close look at our featured star collectors of the week. Swipe or sit back as they rotate!
          </p>
        </div>

        {/* Slide deck showcase */}
        <div className={`relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-tr ${current.bg} border border-white/60 p-5 sm:p-8 md:p-12 lg:p-16 shadow-xl transition-colors duration-700 min-h-0 flex items-center`}>
          
          {/* Glowing back-orb for the plush */}
          <div
            className="absolute inset-0 rounded-[32px] sm:rounded-[40px] blur-3xl opacity-20 transition-all duration-700"
            style={{ backgroundColor: current.glow }}
          />

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center relative z-10 px-0"
            >
              {/* Image box (Left 55% on desktop layout) */}
              <div className="lg:col-span-6 flex justify-center relative">
                
                {/* Particle sparkles overlaying image */}
                {!shouldReduceMotion && (
                  <div className="absolute inset-0 pointer-events-none select-none">
                    <Star className="absolute text-sunny fill-sunny w-6 h-6 top-4 left-6 animate-twinkle" />
                    <Star className="absolute text-sky fill-sky w-5 h-5 bottom-8 right-8 animate-twinkle delay-300" />
                    <Sparkles className="absolute text-candy w-6 h-6 top-10 right-10 animate-pulse" />
                    
                    {/* Emojis floating around character */}
                    <span className="absolute text-xl top-1/2 left-2 animate-bounce-soft">{current.emojis[0]}</span>
                    <span className="absolute text-xl bottom-1/2 right-2 animate-float-slow">{current.emojis[1]}</span>
                  </div>
                )}

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, rotate: 1.5 }}
                  className="w-full max-w-[450px] aspect-square flex items-center justify-center relative overflow-hidden"
                >
                  <img
                    src={current.src}
                    alt={current.name}
                    className="w-[85%] h-[85%] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-500 animate-float-slow"
                  />
                </motion.div>
              </div>

              {/* Text content details (Right 45% on desktop layout) */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                
                {/* Slide index category */}
                <span className={`text-xs font-bold uppercase tracking-[0.15em] mb-3 inline-block ${current.textColor}`}>
                  {current.tagline}
                </span>

                <h3 className="font-heading text-2xl xs:text-3xl sm:text-5xl text-darkText font-extrabold mb-5 tracking-tight leading-tight">
                  {current.name}
                </h3>

                {/* Ratings */}
                <div className="flex items-center gap-1 mb-5 text-sunny">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-sunny text-sunny" />
                  ))}
                  <span className="text-xs text-darkText/50 font-bold ml-2">5.0 (Spotlight Star)</span>
                </div>

                <p className="font-body text-sm sm:text-base text-darkText/75 leading-relaxed mb-8">
                  {current.desc} Adopt Loopy or Snorlax today and join thousands of character collectors across India!
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {/* WhatsApp CTA */}
                  <motion.button
                    onClick={handleOrder}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-[#25D366] via-[#20BD5A] to-[#128C7E] text-white font-heading font-extrabold px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition-all text-sm sm:text-base cursor-pointer group"
                  >
                    <img 
                      src="/whatsapp.png" 
                      alt="WhatsApp" 
                      className="w-6 h-6 object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span>Adopt via WhatsApp — {current.price}</span>
                  </motion.button>

                  {/* Details page link */}
                  <motion.button
                    onClick={handleMeet}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="border-2 border-darkText/10 text-darkText/80 hover:bg-white hover:border-primary/30 py-3.5 px-6 rounded-full font-heading font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Meet This Plush</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Left & Right arrow buttons (Desktop Overlay) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 lg:left-6 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-darkText/5 items-center justify-center text-darkText/60 hover:text-primary transition-all hover:scale-105 active:scale-95 shadow-sm z-30 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 lg:right-6 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-darkText/5 items-center justify-center text-darkText/60 hover:text-primary transition-all hover:scale-105 active:scale-95 shadow-sm z-30 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile & Desktop Carousel Control Bar */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Mobile Prev Button */}
          <button
            onClick={handlePrev}
            className="sm:hidden w-9 h-9 rounded-full bg-white border border-darkText/10 flex items-center justify-center text-darkText/70 active:scale-95 shadow-sm cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-primary' : 'w-2.5 bg-darkText/15 hover:bg-darkText/35'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={handleNext}
            className="sm:hidden w-9 h-9 rounded-full bg-white border border-darkText/10 flex items-center justify-center text-darkText/70 active:scale-95 shadow-sm cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
