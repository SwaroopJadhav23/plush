import { motion } from 'framer-motion';
import { Heart, Sparkles, Truck, Gem } from 'lucide-react';
import SectionCard from './SectionCard';

const cards = [
  {
    icon: Sparkles,
    title: 'Custom Orders',
    desc: 'Made to your vibe — pick your colors, your style, your dream.',
  },
  {
    icon: Heart,
    title: 'Handmade with Love',
    desc: 'Every single stitch crafted by hand, no machines involved.',
  },
  {
    icon: Truck,
    title: 'Pan-India Shipping',
    desc: 'Delivered wherever you are, across the whole country.',
  },
  {
    icon: Gem,
    title: 'One-of-a-Kind Designs',
    desc: 'Never mass-produced — each piece is uniquely yours.',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35 },
  },
};

export default function WhyUs() {
  return (
    <SectionCard id="why">
      <div className="text-center mb-12">
        <p className="font-script text-2xl text-mustard mb-1">why choose us</p>
        <h2 className="font-script text-4xl md:text-6xl text-berry font-bold">
          Why The Half Code
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              variants={item}
              className="bg-cream rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transition-transform border border-charcoal/5"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose/15 flex items-center justify-center">
                <Icon size={30} className="text-rose" />
              </div>
              <h3 className="font-semibold text-lg text-berry mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-charcoal leading-relaxed">{c.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionCard>
  );
}
