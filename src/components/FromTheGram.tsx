import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Heart, Play, MessageCircle } from 'lucide-react';

const posts = [
  {
    id: 1,
    type: 'Reel',
    src: '/loopy.png',
    likes: '14.2k',
    comments: '432',
    caption: 'Loopy says hello! 🌸 Grab yours before they are gone forever.',
    bg: 'bg-gradient-soft-pink',
  },
  {
    id: 2,
    type: 'Post',
    src: '/lotso.png',
    likes: '9.8k',
    comments: '211',
    caption: 'Can you smell the sweet fresh strawberries? 🍓 Lotso bear has arrived!',
    bg: 'bg-gradient-soft-purple',
  },
  {
    id: 3,
    type: 'Reel',
    src: '/snorlax.png',
    likes: '22.5k',
    comments: '876',
    caption: 'Current mood for the rest of the year. Sleepy Snorlax represents us all 💤',
    bg: 'bg-gradient-soft-yellow',
  },
  {
    id: 4,
    type: 'Post',
    src: '/bunny.png',
    likes: '6.4k',
    comments: '188',
    caption: 'Soft, pastel, and absolutely dreamy. 🐰 The cutest bunny toy in India.',
    bg: 'bg-gradient-soft-mint',
  },
  {
    id: 5,
    type: 'Reel',
    src: '/bear.png',
    likes: '11.3k',
    comments: '344',
    caption: 'Cuddly brown bear wearing his signature hoodie! 🐻💛 Adopt him today.',
    bg: 'bg-gradient-soft-yellow',
  },
  {
    id: 6,
    type: 'Post',
    src: '/purple_long.png',
    likes: '15.7k',
    comments: '519',
    caption: 'Long purple cat hugging body pillow is back in stock! 🔮 Ideal for bedtime comfort.',
    bg: 'bg-gradient-soft-purple',
  },
];

export default function FromTheGram() {
  const [likedId, setLikedId] = useState<number | null>(null);

  const handleLike = (id: number) => {
    setLikedId(id);
    setTimeout(() => setLikedId(null), 1000);
  };

  return (
    <section id="instagram" className="relative w-full py-24 bg-[#FFF5F8] px-6 md:px-12 lg:px-20 border-b border-darkText/[0.01] overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-candy bg-candy/5 px-4 py-1.5 rounded-full mb-3 inline-block">
            Instagram Community
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-darkText font-extrabold mb-4">
            Explore Our Universe
          </h2>
          <p className="font-body text-sm md:text-base text-darkText/70 max-w-xl mx-auto">
            We share daily cuteness, new character arrivals, and catalog launches! Join the family on Instagram.
          </p>
        </div>

        {/* Grid of posts (6 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              onDoubleClick={() => handleLike(post.id)}
              className="bg-white border border-darkText/5 rounded-[28px] overflow-hidden shadow-sm relative group cursor-pointer flex flex-col justify-between"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Header info */}
              <div className="p-4 flex items-center justify-between border-b border-darkText/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-candy to-primary p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-darkText">
                      🌸
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-darkText leading-none">
                      plush.palz
                    </h4>
                    <span className="text-[8px] text-darkText/40 font-bold block mt-0.5">
                      India
                    </span>
                  </div>
                </div>
                <Instagram size={14} className="text-darkText/30 group-hover:text-candy transition-colors" />
              </div>

              {/* Post image/content */}
              <div className={`relative aspect-square flex items-center justify-center p-6 overflow-hidden ${post.bg}`}>
                <img
                  src={post.src}
                  alt="Instagram plush post"
                  loading="lazy"
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />

                {/* Instagram Hover Icons & Overlay */}
                <div className="absolute inset-0 bg-[#0A071E]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                  {post.type === 'Reel' ? (
                    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  ) : (
                    <Instagram size={24} className="text-white" />
                  )}

                  <span className="text-white font-heading font-bold text-xs uppercase tracking-wider">
                    {post.type === 'Reel' ? 'View Reel' : 'View Post'}
                  </span>

                  <div className="flex gap-4 text-white/90 text-xs font-bold mt-2">
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="fill-white text-white" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} className="fill-white text-white" /> {post.comments}
                    </span>
                  </div>
                </div>

                {/* Like heart animation overlay on double tap */}
                <AnimatePresence>
                  {likedId === post.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: [1, 1.4, 1] }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                    >
                      <Heart size={80} className="text-candy fill-candy drop-shadow-[0_0_20px_#FF6FB5]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Caption */}
              <div className="p-4 bg-white">
                <p className="font-body text-[11px] text-darkText/80 leading-relaxed line-clamp-2">
                  <span className="font-bold text-darkText mr-1">plush.palz</span>
                  {post.caption}
                </p>
                <a
                  href="https://instagram.com/plush.palz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-primary hover:underline mt-2 inline-block"
                >
                  View full thread on IG
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main follow button */}
        <div className="text-center">
          <motion.a
            href="https://instagram.com/plush.palz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-candy to-primary text-white font-heading font-bold px-8 py-3.5 rounded-full shadow-[0_4px_15px_rgba(255,111,181,0.3)] hover:shadow-[0_6px_20px_rgba(255,111,181,0.5)] transition-all duration-300"
          >
            <Instagram size={18} />
            <span>Follow @_plush.palz_</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
