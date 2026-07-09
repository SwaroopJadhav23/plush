import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

type Category =
  | 'Florals & Bouquets'
  | 'Keychains'
  | 'Amigurumi & Dolls'
  | 'Scrunchies & Hair Accessories'
  | 'Phone Charms';

const categories: (Category | 'All')[] = [
  'All',
  'Florals & Bouquets',
  'Keychains',
  'Amigurumi & Dolls',
  'Scrunchies & Hair Accessories',
  'Phone Charms',
];

type Creation = {
  id: number;
  seed: string;
  w: number;
  h: number;
  category: Category;
  name: string;
};

const creations: Creation[] = [
  { id: 1, seed: 'crochet1', w: 400, h: 500, category: 'Florals & Bouquets', name: 'Rose Bouquet' },
  { id: 2, seed: 'crochet2', w: 400, h: 450, category: 'Keychains', name: 'Mini Heart Keychain' },
  { id: 3, seed: 'crochet3', w: 400, h: 550, category: 'Amigurumi & Dolls', name: 'Bunny Amigurumi' },
  { id: 4, seed: 'crochet4', w: 400, h: 480, category: 'Scrunchies & Hair Accessories', name: 'Puff Scrunchie' },
  { id: 5, seed: 'crochet5', w: 400, h: 520, category: 'Phone Charms', name: 'Strawberry Phone Charm' },
  { id: 6, seed: 'crochet6', w: 400, h: 460, category: 'Florals & Bouquets', name: 'Sunflower Bouquet' },
  { id: 7, seed: 'crochet7', w: 400, h: 540, category: 'Keychains', name: 'Strawberry Keychain' },
  { id: 8, seed: 'crochet8', w: 400, h: 500, category: 'Amigurumi & Dolls', name: 'Bear Amigurumi' },
  { id: 9, seed: 'crochet9', w: 400, h: 470, category: 'Scrunchies & Hair Accessories', name: 'Flower Hair Clip' },
  { id: 10, seed: 'crochet10', w: 400, h: 530, category: 'Phone Charms', name: 'Heart Phone Charm' },
  { id: 11, seed: 'crochet11', w: 400, h: 490, category: 'Florals & Bouquets', name: 'Tulip Bouquet' },
];

function CreationCard({ c }: { c: Creation }) {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-md bg-cream break-inside-avoid mb-4">
      {/* PLACEHOLDER IMAGE - swap with real product photo */}
      <img
        src={`https://picsum.photos/seed/${c.seed}/${c.w}/${c.h}`}
        alt={c.name}
        loading="lazy"
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
      />

      {/* Loose thread unravel — SVG path draw-on animation on hover */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="2" y1="98" x2="98" y2="2"
          stroke="#E0A93A"
          strokeWidth="0.8"
          strokeDasharray="3 2"
          fill="none"
          className="thread-line"
        />
      </svg>

      {/* Hover overlay with name + WhatsApp button */}
      <div className="absolute inset-0 bg-berry/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h3 className="font-script text-3xl text-cream mb-3 text-center">
          {c.name}
        </h3>
        <a
          href="https://instagram.com/thehalfcode__"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-cream text-berry font-semibold text-sm px-4 py-2 rounded-full hover:bg-mustard hover:text-cream transition-colors duration-200"
        >
          <MessageCircle size={16} />
          Shop on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function Creations() {
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const filtered =
    filter === 'All' ? creations : creations.filter((c) => c.category === filter);

  return (
    <section id="creations" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="font-script text-2xl text-mustard mb-1">our gallery</p>
          <h2 className="font-script text-4xl md:text-6xl text-berry font-bold mb-2">
            Our Creations
          </h2>
          <p className="text-sm text-charcoal/70">
            Pinteresty dreams, stitched into reality
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                filter === cat
                  ? 'bg-rose text-cream shadow-md'
                  : 'bg-blush text-berry hover:bg-rose/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry gallery */}
        <motion.div layout className="masonry">
          <AnimatePresence>
            {filtered.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CreationCard c={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
