import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why' },
  { label: 'Creations', href: '#creations' },
  { label: 'Love', href: '#love' },
  { label: 'Gram', href: '#gram' },
  { label: 'Custom Orders', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dispatchHover = (secId: string | null) => {
    window.dispatchEvent(new CustomEvent('hover-section', { detail: secId }));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
        scrolled
          ? 'bg-blush/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo wordmark */}
        <a
          href="#hero"
          className="flex items-center gap-2"
          onMouseEnter={() => dispatchHover('hero')}
          onMouseLeave={() => dispatchHover(null)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-berry flex items-center justify-center shadow-md">
            <span className="font-script text-cream text-lg leading-none">HC</span>
          </div>
          <span className="font-script text-2xl text-berry font-bold">
            The Half Code
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => dispatchHover(l.href.substring(1))}
              onMouseLeave={() => dispatchHover(null)}
              className="text-sm font-medium text-charcoal hover:text-rose transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/thehalfcode__"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-rose text-cream px-4 py-2 rounded-full hover:bg-berry transition-colors duration-200"
          >
            Shop on IG
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-berry"
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
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-blush/95 backdrop-blur-md"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-charcoal hover:text-rose transition-colors py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://instagram.com/thehalfcode__"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold bg-rose text-cream px-4 py-2 rounded-full text-center hover:bg-berry transition-colors"
              >
                Shop on Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile / Tablet Horizontal Stitched Progress Thread (sticky at top below sticky nav) */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] lg:hidden pointer-events-none bg-rose/10">
        <div
          className="h-full bg-transparent overflow-hidden"
          style={{ width: `${scrollProgress * 100}%` }}
        >
          <div className="w-[100vw] h-full">
            <svg className="w-full h-full" fill="none">
              <line
                x1="0"
                y1="1.5"
                x2="2000"
                y2="1.5"
                stroke="#8E2A46"
                strokeWidth="3"
                strokeDasharray="5, 3"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
