import { motion } from 'framer-motion';
import { Mail, Instagram, MessageCircle, MapPin, Star } from 'lucide-react';

const contactCards = [
  {
    icon: Instagram,
    label: 'Instagram DM',
    value: '@plush.palz',
    href: 'https://instagram.com/plush.palz',
    color: 'hover:border-candy/30 hover:text-candy',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Orders',
    value: '+91 85305 95740',
    href: 'https://wa.me/918530595740',
    color: 'hover:border-[#25D366]/30 hover:text-[#25D366]',
  },
  {
    icon: Mail,
    label: 'Email Support',
    value: 'hello@plushpalz.in',
    href: 'mailto:hello@plushpalz.in',
    color: 'hover:border-primary/30 hover:text-primary',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative mt-12 md:mt-24">
      {/* Self-contained CSS styles for the shooting star */}
      <style>{`
        @keyframes shooting-star-anim {
          0% {
            transform: translate(0, 0) rotate(-40deg) scale(0);
            opacity: 0;
          }
          1% {
            transform: translate(-40px, 40px) rotate(-40deg) scale(1);
            opacity: 1;
          }
          5% {
            transform: translate(-300px, 300px) rotate(-40deg) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-300px, 300px) rotate(-40deg) scale(0);
            opacity: 0;
          }
        }
        .shooting-star-element {
          animation: shooting-star-anim 20s linear infinite;
        }
      `}</style>

      {/* Rebranded Section: Adopt Your New Buddy */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-10 md:mb-20">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/5 px-4.5 py-2 rounded-full mb-4 border border-primary/10 inline-block">
          Adopt Your New Buddy
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-darkText font-extrabold mb-4 leading-tight select-none">
          Ready to adopt your next plush companion?
        </h2>
        <p className="font-body text-base text-darkText/70 max-w-lg mx-auto mb-10">
          Have queries, bulk orders, or looking to custom-source a character? Tap on a portal to chat with us directly!
        </p>

        {/* Adopt CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {contactCards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                className={`flex items-center gap-3 bg-white rounded-3xl px-6 py-4 border border-darkText/5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 min-w-[220px] justify-center ${c.color}`}
              >
                <div className="w-9 h-9 rounded-xl bg-bgMain flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-darkText/40 font-bold uppercase tracking-wider">{c.label}</p>
                  <p className="font-heading font-bold text-xs md:text-sm">{c.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Magical Night Sky Footer */}
      <footer className="relative bg-[#0A071E] text-white py-20 px-6 rounded-t-[48px] md:rounded-t-[64px] overflow-hidden z-20">
        
        {/* Shooting Star Easter Egg */}
        <div className="absolute top-[15%] right-[-100px] w-[180px] h-[2px] bg-gradient-to-l from-white to-transparent shooting-star-element pointer-events-none z-10" />

        {/* Night Sky Background Stars */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 95}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <Star
              key={i}
              size={6}
              className="absolute text-sunny fill-sunny animate-pulse"
              style={{
                top: `${Math.random() * 40}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Crescent Moon */}
        <div className="absolute top-12 right-12 md:right-24 pointer-events-none select-none z-10 animate-float-slower">
          <svg className="w-16 h-16 text-[#FFF5C2] fill-[#FFF5C2] drop-shadow-[0_0_20px_rgba(255,245,194,0.5)]" viewBox="0 0 100 100">
            <path d="M 50,10 A 40,40 0 1,0 90,50 A 30,30 0 1,1 50,10" />
          </svg>
        </div>

        {/* Night Clouds */}
        <div className="absolute bottom-[-10px] left-0 w-full opacity-10 pointer-events-none select-none flex justify-between z-10">
          <svg className="w-80 h-32 fill-white animate-drift-slow" viewBox="0 0 100 50">
            <path d="M 10,40 A 10,10 0 0,1 25,25 A 15,15 0 0,1 50,25 A 10,10 0 0,1 60,40 Z" />
          </svg>
          <svg className="w-96 h-32 fill-white animate-drift-slower" viewBox="0 0 100 50">
            <path d="M 10,40 A 10,10 0 0,1 25,25 A 15,15 0 0,1 50,25 A 10,10 0 0,1 60,40 Z" />
          </svg>
        </div>

        {/* Footer Content */}
        <div className="max-w-6xl mx-auto relative z-20 flex flex-col items-center text-center">
          
          {/* Sleeping Mascot: Snorlax 💤 */}
          <div className="relative mb-8 flex flex-col items-center">
            {/* Zzz floating animations */}
            <div className="absolute top-[-25px] right-[-20px] flex flex-col text-sunny text-xs font-bold font-heading select-none pointer-events-none">
              <motion.span
                animate={{ y: [-5, -25], x: [0, 10], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0 }}
                className="absolute text-sm"
              >
                Z
              </motion.span>
              <motion.span
                animate={{ y: [-5, -20], x: [0, -8], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                className="absolute text-xs"
              >
                z
              </motion.span>
              <motion.span
                animate={{ y: [-5, -15], x: [0, 5], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 2 }}
                className="absolute text-[8px]"
              >
                z
              </motion.span>
            </div>

            {/* Cloud representation under Snorlax */}
            <div className="relative w-32 h-20 flex items-center justify-center">
              <svg className="absolute bottom-0 w-full h-12 text-white/10 fill-current" viewBox="0 0 100 50">
                <path d="M 10,40 A 12,12 0 0,1 30,20 A 15,15 0 0,1 70,20 A 12,12 0 0,1 90,40 Z" />
              </svg>
              <motion.img
                src="/snorlax.png"
                alt="Sleeping Snorlax"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 object-contain relative z-10 filter drop-shadow-md"
              />
            </div>
            <span className="text-[10px] text-white/40 tracking-wider font-bold mt-1">Snorlax is sleeping... Shh! 🤫</span>
          </div>

          {/* Logo brand wordmark */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/logo.jpeg"
              alt="Plush.Palz Logo"
              className="w-8 h-8 rounded-full object-cover shadow-md"
            />
            <span className="font-heading text-xl font-bold tracking-tight">
              Plush<span className="text-candy">.Palz</span>
            </span>
          </div>
          
          <p className="text-xs text-white/50 max-w-sm mb-6 leading-relaxed">
            Premium Imported Collectible Plushies.<br />
            Sanrio • Pokémon • Anime • Disney Store.
          </p>

          {/* Logistics summary */}
          <div className="flex items-center gap-1.5 text-xs text-white/70 bg-white/5 border border-white/10 px-4.5 py-2.5 rounded-full mb-8">
            <MapPin size={12} className="text-candy" />
            <span>Delivering Pan-India • Ships in premium carton packaging 🇮🇳</span>
          </div>

          <div className="w-24 h-px bg-white/10 my-4" />

          {/* Copyright */}
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
            © 2026 Plush.Palz. All rights reserved. Designed for character collectors.
          </p>
        </div>
      </footer>
    </section>
  );
}
