import { motion } from 'framer-motion';
import { Mail, Instagram, MapPin } from 'lucide-react';
import SectionCard from './SectionCard';

const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@thehalfcode.in',
    href: 'mailto:contact@thehalfcode.in',
  },
  {
    icon: Instagram,
    label: 'Instagram DM',
    value: '@thehalfcode__',
    href: 'https://instagram.com/thehalfcode__',
  },
];

export default function Contact() {
  return (
    <>
      <SectionCard id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <p className="font-script text-2xl text-mustard mb-1">get in touch</p>
            <h2 className="font-script text-4xl md:text-6xl text-berry font-bold">
              Let's Get Knotty (In a Good Way)
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            {contactCards.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-blush rounded-2xl px-6 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 min-w-[220px] justify-center border border-charcoal/5"
                >
                  <div className="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center">
                    <Icon size={20} className="text-rose" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-charcoal/60">{c.label}</p>
                    <p className="font-semibold text-sm text-berry">{c.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm text-charcoal/70 max-w-md mx-auto bg-mustard/10 rounded-full px-5 py-3 font-semibold"
          >
            All our pieces are handmade — please allow 2-5 days before shipping.
            Good things take time 🧶
          </motion.p>
        </div>
      </SectionCard>

      {/* Footer */}
      <footer className="bg-berry text-cream py-12 rounded-t-[32px] mt-12 md:mt-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Logo mark */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose to-mustard flex items-center justify-center shadow-lg">
              <span className="font-script text-cream text-xl leading-none">
                HC
              </span>
            </div>
            <div>
              <p className="font-script text-2xl text-cream">The Half Code</p>
              <p className="text-sm text-cream/70 mt-1">
                Selling Pinteresty Dreams
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-cream/80">
              <MapPin size={14} />
              <span>Jaipur, Rajasthan • Ships Pan-India</span>
            </div>

            {/* Maker credit */}
            <p className="font-script text-lg text-mustard">
              Crocheted with love by Tanya
            </p>

            {/* Divider */}
            <div className="w-24 h-px bg-cream/20 my-2" />

            <p className="text-xs text-cream/50">
              © 2026 The Half Code. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
