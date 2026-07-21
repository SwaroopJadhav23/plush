import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

const reviews = [
  {
    quote: "Plush.Palz is literally a dream! I ordered the Snorlax plushie and it's the squishiest thing I own. Delivered in just 3 days! 💤",
    author: 'Rhea Sen',
    location: 'New Delhi',
    avatar: '🐰',
    avatarBg: 'bg-gradient-soft-pink',
    floatDelay: 0,
    mascotSrc: '/snorlax.png',
    mascotClass: 'w-16 h-16 sm:w-20 sm:h-20 -top-8 right-2 sm:-top-10 sm:-right-4',
  },
  {
    quote: "Oh my god, the strawberry Lotso bear actually smells like fresh strawberries! WhatsApp support was incredibly helpful and sweet! 🍓",
    author: 'Kabir Mehta',
    location: 'Mumbai',
    avatar: '🐻',
    avatarBg: 'bg-gradient-soft-yellow',
    floatDelay: 0.4,
    mascotSrc: '/lotso.png',
    mascotClass: 'w-16 h-16 sm:w-20 sm:h-20 -bottom-6 right-2 sm:-bottom-8 sm:-right-4',
  },
  {
    quote: "The Loopy plushie is viral for a reason, and it is so hard to find genuine ones in India. Thank you for importing these cute treasures! 💖",
    author: 'Anjali Nair',
    location: 'Bangalore',
    avatar: '🐱',
    avatarBg: 'bg-gradient-soft-blue',
    floatDelay: 0.2,
    mascotSrc: '/loopy.png',
    mascotClass: 'w-16 h-16 sm:w-22 sm:h-22 -top-8 left-2 sm:-top-12 sm:-left-4',
  },
  {
    quote: "Super premium quality and incredibly safe packaging. It arrived in a thick carton box with dust wrapping. 10/10 service!",
    author: 'Devansh Roy',
    location: 'Kolkata',
    avatar: '🐼',
    avatarBg: 'bg-gradient-soft-mint',
    floatDelay: 0.6,
    mascotSrc: '/bunny.png',
    mascotClass: 'w-16 h-16 sm:w-18 sm:h-18 -bottom-6 left-2 sm:-bottom-10 sm:-left-4',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: any = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function CustomerLove() {
  return (
    <section id="reviews" className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 lg:pb-28 bg-gradient-to-b from-[#FAF5FF] to-[#FFF0F6] px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden scroll-mt-28">
      
      {/* Sparkles decoration */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-30">
        <Sparkles className="absolute text-candy w-5 h-5 top-12 left-1/4 animate-pulse" />
        <Sparkles className="absolute text-sky w-5 h-5 bottom-12 right-1/4 animate-pulse delay-300" />
      </div>

      <div className="max-w-[1500px] mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-3 inline-block">
            Customer Stories
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-darkText font-extrabold mb-4 leading-tight select-none">
            Collector Reviews.
          </h2>
          <p className="font-body text-base text-darkText/70 max-w-xl mx-auto">
            See what our magical universe friends say about their adopted buddies. Mascots are peeking to read!
          </p>
        </div>

        {/* Grid List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative pt-6 pb-6"
            >
              {/* Mascot Peeking from Behind the Card */}
              <motion.img
                src={r.mascotSrc}
                alt="Peeking mascot"
                animate={{
                  y: [0, -6, 0],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: r.floatDelay,
                }}
                className={`absolute ${r.mascotClass} z-20 pointer-events-none object-contain filter drop-shadow-md`}
              />

              {/* Speech Bubble */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: r.floatDelay,
                }}
                className="bg-white rounded-[32px] p-8 shadow-[0_6px_25px_rgba(0,0,0,0.02)] border border-darkText/5 relative flex flex-col justify-between h-full group hover:shadow-[0_20px_45px_rgba(124,58,237,0.1)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* 5-Star Ratings Scale Animation */}
                <div className="flex gap-0.5 mb-5 text-sunny">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0.7 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + j * 0.05 }}
                    >
                      <Star
                        size={16}
                        className="fill-sunny text-sunny"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review text */}
                <p className="font-body text-sm text-darkText/80 leading-relaxed font-medium mb-6 italic relative z-10">
                  "{r.quote}"
                </p>

                {/* Author & Avatar */}
                <div className="flex items-center gap-3 border-t border-darkText/[0.04] pt-4 mt-auto relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm ${r.avatarBg}`}>
                    {r.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-darkText leading-none group-hover:text-primary transition-colors">
                      {r.author}
                    </h4>
                    <span className="text-[9px] text-darkText/40 font-bold block mt-1">
                      {r.location}
                    </span>
                  </div>
                </div>

                {/* Speech Bubble Pointer */}
                <div className="absolute bottom-[-6px] left-10 w-4 h-4 bg-white border-r border-b border-darkText/5 rotate-45 z-10" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
