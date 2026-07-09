import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Ordered a custom bouquet and it\'s honestly better than real flowers 😭',
    author: 'Aanya',
    location: 'Mumbai',
  },
  {
    quote: 'The keychain is SO cute, exactly like the pic',
    author: 'Sneha',
    location: 'Delhi',
  },
  {
    quote: 'Fast shipping, packaging was so pretty too',
    author: 'Priya',
    location: 'Bangalore',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function CustomerLove() {
  return (
    <section id="love" className="py-20 md:py-28 bg-blush">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="font-script text-2xl text-mustard mb-1">customer love</p>
          <h2 className="font-script text-4xl md:text-6xl text-berry font-bold">
            Love From You Guys
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-cream rounded-3xl p-7 shadow-md relative"
            >
              <Quote
                size={36}
                className="text-rose/20 absolute top-4 right-4"
              />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={18}
                    className="text-mustard fill-mustard"
                  />
                ))}
              </div>
              <p className="text-charcoal leading-relaxed mb-5 text-sm md:text-base">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center font-script text-xl text-berry">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-berry">{t.author}</p>
                  <p className="text-xs text-charcoal/60">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
