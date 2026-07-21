import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, Star, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export type Universe = 'Pokémon' | 'Sanrio' | 'Anime' | 'Cute Animals' | 'Trending' | 'New Arrivals';

export interface Product {
  id: number;
  slug: string;
  name: string;
  universe: Universe;
  src: string;
  price: string;
  originalPrice?: number | null;
  isSpecialOffer?: boolean;
  discountPercentage?: number | null;
  description: string;
  badge?: string;
  floatingDecos: string[]; // Emojis or descriptions
}
// ... [rest of static products definitions can remain as is for fallbacks]


export const universesList: { name: Universe; bg: string; text: string; plush: string; decos: string[]; tag: string }[] = [
  { name: 'Pokémon', bg: 'bg-gradient-soft-yellow border-sunny/20', text: 'text-sunny', plush: '/snorlax.png', decos: ['⚡', '💤', '⭐'], tag: 'Gotta Catch Em All!' },
  { name: 'Sanrio', bg: 'bg-gradient-soft-pink border-candy/20', text: 'text-candy', plush: '/loopy.png', decos: ['🎀', '🌸', '💖'], tag: 'Cute & Magical' },
  { name: 'Anime', bg: 'bg-gradient-soft-purple border-primary/20', text: 'text-primary', plush: '/purple_long.png', decos: ['✨', '☁️', '🔮'], tag: 'Otaku Favorites' },
  { name: 'Cute Animals', bg: 'bg-gradient-soft-mint border-mint/20', text: 'text-mint', plush: '/bunny.png', decos: ['🐾', '🥕', '☘️'], tag: 'Fluffy Friends' },
  { name: 'Trending', bg: 'bg-gradient-soft-blue border-sky/20', text: 'text-sky', plush: '/lotso.png', decos: ['🔥', '👑', '💫'], tag: 'Viral Sensation' },
  { name: 'New Arrivals', bg: 'bg-gradient-soft-primary border-primary/10', text: 'text-primary', plush: '/bear.png', decos: ['🆕', '✨', '🎁'], tag: 'Just Landed!' },
];

export const products: Product[] = [
  {
    id: 1,
    slug: 'lotso-bear',
    name: 'Strawberry Lotso Bear',
    universe: 'Trending',
    src: '/lotso.png',
    price: '₹1,299',
    description: 'This premium imported Lotso bear is super fluffy and smells like sweet fresh strawberries! Features a big squishy nose and cuddly posture. Perfect for Toy Story fans.',
    badge: 'Best Seller',
    floatingDecos: ['🔥', '🍓'],
  },
  {
    id: 2,
    slug: 'snorlax',
    name: 'Lazy Sleepy Snorlax',
    universe: 'Pokémon',
    src: '/snorlax.png',
    price: '₹1,499',
    description: 'Snorlax is ready for a nap! Made with ultra-soft velocity fabric and premium squishy micro-fill. The ultimate cuddle companion for Pokemon masters.',
    badge: 'Cozy Pick',
    floatingDecos: ['💤', '⚡'],
  },
  {
    id: 3,
    slug: 'loopy',
    name: 'Cute Pink Loopy Beaver',
    universe: 'Sanrio',
    src: '/loopy.png',
    price: '₹1,199',
    description: 'The super viral pink beaver Loopy! Features extremely soft pink fur, adorable round cheeks, and her signature cute expression. Imported premium quality.',
    badge: 'Viral',
    floatingDecos: ['🎀', '🌸'],
  },
  {
    id: 4,
    slug: 'bow-bunny',
    name: 'Dreamy Bow Bunny',
    universe: 'Cute Animals',
    src: '/bunny.png',
    price: '₹999',
    description: 'A beautiful white bunny plush toy with soft pink inner ears and a tiny cute bow tie. Features standard LINE Japanese aesthetics and an incredibly soft touch.',
    badge: 'Cute',
    floatingDecos: ['🐰', '✨'],
  },
  {
    id: 5,
    slug: 'hoodie-bear',
    name: 'Hoodie Bear Plush',
    universe: 'Cute Animals',
    src: '/bear.png',
    price: '₹1,099',
    description: 'A cute chubby brown bear wearing a cozy removable sunny yellow hoodie. Crafted with premium velvet plush fabric. Makes an amazing gift.',
    badge: 'Popular',
    floatingDecos: ['🐻', '💛'],
  },
  {
    id: 6,
    slug: 'purple-long-cat',
    name: 'Purple Long Hugging Cat',
    universe: 'New Arrivals',
    src: '/purple_long.png',
    price: '₹1,599',
    description: 'An extra-long cylindrical purple cat body pillow plush. Ideal for sleeping, side-hugging, and relaxing. Made from high-elasticity fabric that holds its shape.',
    badge: 'New',
    floatingDecos: ['🆕', '🔮'],
  },
  {
    id: 7,
    slug: 'gengar',
    name: 'Kawaii Gengar Spooky',
    universe: 'Anime',
    src: '/purple_long.png', // Fallback reuse
    price: '₹1,299',
    description: 'A custom anime-inspired chubby purple shadow creature plush. Cute spooky vibes, soft texture, and premium double stitching.',
    badge: 'Spooky Cute',
    floatingDecos: ['😈', '✨'],
  },
  {
    id: 8,
    slug: 'bunny-mini',
    name: 'Blossom Bunny Mini',
    universe: 'Sanrio',
    src: '/bunny.png', // Fallback reuse
    price: '₹899',
    description: 'A mini version of our dreamy bunny, holding a small cherry blossom flower. Extremely soft and collectible.',
    badge: 'Limited',
    floatingDecos: ['🌸', '💝'],
  },
];

// Helper to resolve specific portal hover particles
const getPortalParticles = (universe: string) => {
  if (universe === 'Pokémon') return ['⚡', '⚡', '⭐', '💤', '⚡'];
  if (universe === 'Sanrio') return ['💖', '🎀', '🌸', '💝', '💖'];
  if (universe === 'Anime') return ['🌸', '✨', '🌸', '🔮', '🌸'];
  if (universe === 'Cute Animals') return ['🐾', '🥕', '🐾', '🐰', '🐾'];
  if (universe === 'Trending') return ['🔥', '✨', '👑', '💫', '✨'];
  return ['🎁', '🎉', '✨', '🎈', '🎉']; // New Arrivals / Confetti
};

// SECTION 3: Choose Your Universe category portals
interface UniversePortalsProps {
  selectedUniverse: Universe | 'All';
  onSelectUniverse: (u: Universe | 'All') => void;
}

export function UniversePortals({ selectedUniverse, onSelectUniverse }: UniversePortalsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="universe" className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-[#F0F4FF] to-[#FAF5FF] px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden scroll-mt-28">
      
      {/* Drifting Clouds background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-60 h-28 bg-white rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-[10%] left-[-10%] w-80 h-36 bg-white rounded-full blur-xl animate-float-slower" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-3 inline-block">
            Choose Your Universe
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-darkText font-extrabold mb-4 leading-tight select-none">
            Step Into The Portals.
          </h2>
          <p className="font-body text-base text-darkText/70 max-w-xl mx-auto">
            Click on a magical portal below to filter character collections dynamically. Watch them float and spark to life!
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {universesList.map((u) => {
            const isSelected = selectedUniverse === u.name;
            const isHovered = hoveredCard === u.name;
            return (
              <motion.div
                key={u.name}
                onClick={() => onSelectUniverse(isSelected ? 'All' : u.name)}
                onMouseEnter={() => setHoveredCard(u.name)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={shouldReduceMotion ? {} : { y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer rounded-[32px] p-4 sm:p-6 border-2 text-center relative overflow-hidden transition-all duration-300 group ${
                  isSelected
                    ? 'bg-white shadow-[0_15px_35px_rgba(124,58,237,0.18)] border-primary ring-2 ring-primary/10'
                    : 'bg-white/80 backdrop-blur-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] border-darkText/5'
                }`}
              >
                {/* Glowing portal background */}
                <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${u.bg}`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-glow blur-md pointer-events-none" />

                {/* Floating portal particles on hover */}
                {isHovered && !shouldReduceMotion && (
                  <>
                    {getPortalParticles(u.name).map((symbol, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.5, y: 15, x: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0.7, 1.3, 0.8],
                          y: [-25 - Math.random() * 45],
                          x: [Math.sin(idx) * 20],
                        }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: idx * 0.15,
                        }}
                        className="absolute text-[12px] pointer-events-none select-none z-30"
                        style={{
                          left: `${15 + idx * 16}%`,
                          top: '12%',
                        }}
                      >
                        {symbol}
                      </motion.span>
                    ))}
                  </>
                )}

                {/* Featured plush character bouncing inside card */}
                <div className="relative w-18 h-18 mx-auto mb-4 flex items-center justify-center">
                  <motion.img
                    src={u.plush}
                    alt={u.name}
                    animate={
                      isSelected || isHovered
                        ? { y: [0, -8, 0] }
                        : {}
                    }
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-115 transition-transform duration-300 z-10"
                  />
                </div>

                {/* Portal metadata */}
                <div className="relative z-10 mt-1">
                  <h3 className="font-heading font-bold text-darkText text-sm group-hover:text-primary transition-colors leading-tight">
                    {u.name}
                  </h3>
                  <span className="text-[9px] text-darkText/50 font-bold block truncate mt-1.5 uppercase tracking-wider">
                    {u.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// SECTION 5: Trending Plush Collection Products grid
interface TrendingCollectionProps {
  selectedUniverse: Universe | 'All';
  onSelectUniverse: (u: Universe | 'All') => void;
}

export function TrendingCollection({ selectedUniverse, onSelectUniverse }: TrendingCollectionProps) {
  const [productList, setProductList] = useState<Product[]>(products);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const formatted = data.map(p => ({
            ...p,
            price: typeof p.price === 'number' ? `₹${p.price.toLocaleString('en-IN')}` : p.price,
            src: p.src.startsWith('/') ? `${API_BASE_URL}${p.src}` : p.src
          }));
          setProductList(formatted);
        }
      })
      .catch(err => console.warn('Failed to load products from API:', err));
  }, []);

  const filteredProducts = selectedUniverse === 'All'
    ? productList
    : productList.filter(p => p.universe === selectedUniverse);

  return (
    <section id="trending" className="relative w-full py-12 md:py-20 lg:py-24 bg-white px-6 md:px-12 lg:px-20 border-t border-b border-darkText/[0.02] overflow-hidden">
      
      {/* Tiny drifting elements */}
      <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-candy/25 rounded-full animate-ping opacity-30 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-2.5 h-2.5 bg-sky/20 rounded-full animate-ping opacity-45 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-candy bg-candy/5 px-4 py-1.5 rounded-full mb-3 inline-block">
            Trending Collections
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-darkText font-extrabold mb-4 leading-tight select-none">
            Popular In The Universe
          </h2>
          <p className="font-body text-base text-darkText/75 max-w-lg mx-auto">
            Delight in our premium imported collectibles. Hover to see them spark, click to explore their magical stories!
          </p>
        </div>

        {/* Reset filters */}
        {selectedUniverse !== 'All' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center -mt-8 mb-12"
          >
            <button
              onClick={() => onSelectUniverse('All')}
              className="text-xs font-bold text-primary bg-primary/5 hover:bg-primary hover:text-white border border-primary/20 px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Reset filter to view all universes</span>
              <span>✕</span>
            </button>
          </motion.div>
        )}

        {/* Grid layout (Up to 5 columns on large screen monitors, gap: 32px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => {
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => {
                    window.location.hash = `#/products/${p.slug}`;
                  }}
                  className="relative group rounded-[32px] bg-white border border-darkText/5 shadow-[0_4px_22px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_45px_rgba(124,58,237,0.08)] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="w-full aspect-square bg-[#F8FAFF] overflow-hidden flex items-center justify-center p-8 relative">
                    {/* Glowing background representation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky/5 to-candy/5 opacity-50 group-hover:opacity-85 transition-opacity" />

                    <img
                      src={p.src}
                      alt={p.name}
                      loading="lazy"
                      className="w-[85%] h-[85%] object-contain transition-transform duration-500 ease-out group-hover:scale-108 filter drop-shadow-md relative z-10"
                    />

                    {/* Twinkling stars popping up on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15">
                      <Star className="absolute text-sunny fill-sunny w-4.5 h-4.5 top-4 left-4 animate-twinkle" />
                      <Star className="absolute text-sky fill-sky w-4 h-4 bottom-6 right-6 animate-twinkle delay-100" />
                      <Sparkles className="absolute text-candy w-4.5 h-4.5 top-6 right-8 animate-pulse" />
                    </div>

                    {/* Universe Badge */}
                    <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm border border-darkText/5 text-darkText px-3 py-1.5 rounded-full shadow-sm z-20">
                      {p.universe}
                    </span>

                    {/* Promotional tag badge */}
                    {p.badge && (
                      <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider bg-candy text-white px-3 py-1.5 rounded-full shadow-sm z-20 animate-pulse">
                        {p.badge}
                      </span>
                    )}

                    {/* Expanded order on WhatsApp tag badge on top-right */}
                    <div className="absolute top-4 right-4 z-25 order-pill text-white pointer-events-none select-none">
                      <MessageCircle size={15} className="text-white fill-white" />
                      <div className="order-pill-text text-[9px] font-heading font-bold uppercase tracking-wider leading-none">
                        <span>Order</span>
                        <span className="order-pill-extra">on WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  {/* Character descriptive info section */}
                  <div className="p-6 flex-1 flex flex-col justify-between border-t border-darkText/[0.03]">
                    <div>
                      <h4 className="font-heading font-bold text-darkText text-base mb-1.5 truncate group-hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-darkText/60 line-clamp-2 leading-relaxed font-medium">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex flex-col">
                        <span className="font-heading font-extrabold text-primary text-lg leading-tight">
                          {p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-[10px] text-darkText/30 line-through leading-none mt-1">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-candy flex items-center gap-1 group-hover:underline">
                        <span>Meet This Plush</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
