import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import SectionCard from './SectionCard';

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
  // Future ready attributes
  price?: string;
  productId?: string;
  description?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  customNotes?: string;
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

function CreationCard({ c, onSelect }: { c: Creation; onSelect: (c: Creation) => void }) {
  return (
    <div
      onClick={() => onSelect(c)}
      tabIndex={0}
      role="button"
      aria-label={`Order ${c.name} on WhatsApp`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(c);
          e.preventDefault();
        }
      }}
      className="relative group rounded-2xl overflow-hidden bg-cream break-inside-avoid mb-4 border border-charcoal/5 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-rose focus-visible:outline-none"
    >
      {/* Product Image */}
      <img
        src={`/${(c.id - 1) % 10 + 1}.jpeg`}
        alt={c.name}
        loading="lazy"
        className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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

      {/* Pinterest-Style Order Pill */}
      <div
        className="absolute top-3 right-3 z-30 order-pill text-cream pointer-events-none select-none opacity-95"
        aria-hidden="true"
      >
        <span className="text-xs leading-none">💬</span>
        <div className="order-pill-text text-[11px] font-bold uppercase tracking-wider leading-none">
          <span>Order</span>
          <span className="order-pill-extra leading-none">on WhatsApp</span>
        </div>
      </div>

      {/* Product Name overlay (subtle bottom strip on hover) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4 pt-12 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <h4 className="text-xs font-bold text-cream truncate">
          {c.name}
        </h4>
      </div>
    </div>
  );
}

function OrderModal({ c, onClose }: { c: Creation; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus trap handler
  useEffect(() => {
    const originalFocus = document.activeElement as HTMLElement;

    // Focus the modal card or first button inside
    const focusable = modalRef.current?.querySelectorAll('button, a');
    if (focusable && focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!modalRef.current) return;

      const elements = modalRef.current.querySelectorAll(
        'button, a, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => {
      window.removeEventListener('keydown', handleTab);
      if (originalFocus && typeof originalFocus.focus === 'function') {
        originalFocus.focus();
      }
    };
  }, []);

  const handleContinue = () => {
    const productName = c.name || 'Selected Crochet Creation';
    const currentURL = window.location.href;
    const message = `Hello 👋\n\nI'm interested in ordering this crochet creation from The Half Code.\n\nProduct:\n${productName}\n\nProduct URL:\n${currentURL}\n\nPlease share the price and ordering details.\n\nThank you ❤️`;
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/918530595740?text=${encoded}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[9500] flex items-center justify-center p-4"
    >
      <motion.div
        ref={modalRef}
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-[#FFFAF6] border-2 border-rose rounded-[24px] shadow-2xl max-w-sm w-full p-6 relative overflow-hidden flex flex-col"
      >
        {/* Product Image preview inside modal */}
        <div className="w-full h-44 overflow-hidden rounded-xl mb-4 border border-charcoal/5">
          <img
            src={`/${(c.id - 1) % 10 + 1}.jpeg`}
            alt={c.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Modal Header */}
        <h3 id="modal-title" className="font-script text-3xl text-berry text-center mb-1 font-bold">
          Order this Crochet Creation?
        </h3>
        <p className="text-xs text-charcoal/70 text-center mb-4 leading-relaxed px-1">
          You're about to order this handmade crochet creation through WhatsApp. Would you like to continue?
        </p>

        {/* Product Detail Selection Section */}
        <div className="bg-cream border border-charcoal/5 rounded-xl px-4 py-2.5 mb-5 flex flex-col justify-center">
          <span className="text-[9px] text-charcoal/50 uppercase tracking-wider font-bold">Product</span>
          <span className="text-sm font-bold text-berry truncate">{c.name || 'Selected Crochet Creation'}</span>
        </div>

        {/* Future Ready Slots (Prices, quantity, options ready for expansion) */}
        {/*
          c.price && <div className="text-xs font-semibold text-berry">Price: {c.price}</div>
          c.productId && <div className="text-[10px] text-charcoal/40">ID: {c.productId}</div>
          c.sizes && <div className="text-xs">Sizes: {c.sizes.join(', ')}</div>
          c.colors && <div className="text-xs">Colors: {c.colors.join(', ')}</div>
        */}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleContinue}
            className="w-full bg-rose text-cream font-semibold py-3 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-berry hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <span className="text-base leading-none">💬</span>
            <span className="leading-none">Continue on WhatsApp</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full border-2 border-rose/30 text-rose font-semibold py-2.5 px-5 rounded-full hover:border-rose hover:text-berry transition-all duration-300 cursor-pointer"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Creations() {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Creation | null>(null);

  const filtered =
    filter === 'All' ? creations : creations.filter((c) => c.category === filter);

  return (
    <SectionCard id="creations">
      <div className="text-center mb-10">
        <p className="font-script text-2xl text-mustard mb-1">our gallery</p>
        <h2 className="font-script text-4xl md:text-6xl text-berry font-bold mb-2">
          Our Creations
        </h2>
        <p className="text-sm text-charcoal/70">
          Pinteresty dreams, stitched into reality
        </p>
      </div>

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
              <CreationCard c={c} onSelect={setSelectedProduct} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Confirmation Order Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <OrderModal c={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </SectionCard>
  );
}
