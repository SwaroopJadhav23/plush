import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Collections', href: '#universe' },
  { label: 'Trending', href: '#trending' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
        scrolled
          ? 'bg-white/75 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Plush.Palz */}
        <a href="#hero" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-candy to-primary flex items-center justify-center shadow-[0_4px_12px_rgba(255,111,181,0.3)]"
          >
            <span className="font-heading text-white text-base font-bold">P.P</span>
          </motion.div>
          <span className="font-heading text-2xl tracking-tight text-darkText font-bold select-none">
            Plush<span className="text-candy">.Palz</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="text-sm font-semibold text-darkText/80 hover:text-primary transition-colors duration-200 relative group py-1"
            >
              {l.label}
              {/* Soft glow underline on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-candy rounded-full transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#FF6FB5]" />
            </motion.a>
          ))}
          
          <motion.a
            href="https://instagram.com/plush.palz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs uppercase tracking-wider font-heading font-bold bg-gradient-to-r from-candy to-primary text-white px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(255,111,181,0.35)] hover:shadow-[0_6px_20px_rgba(255,111,181,0.5)] transition-all duration-300"
          >
            Shop on Instagram
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-darkText focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-white/50"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold text-darkText hover:text-primary transition-colors py-1 block"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://instagram.com/plush.palz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-sm font-heading font-bold bg-gradient-to-r from-candy to-primary text-white px-6 py-3 rounded-full text-center shadow-md hover:shadow-lg transition-all"
              >
                Shop on Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
