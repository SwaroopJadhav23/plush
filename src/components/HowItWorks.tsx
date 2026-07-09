import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Ordering is super easy! Simply browse our collections, find your favorite plushie, and click "Order on WhatsApp". It will instantly load a pre-filled template message. Send it to us, and we will share payment details to confirm your order!',
  },
  {
    question: 'What is the shipping timeline and delivery cost?',
    answer: 'We provide Pan India delivery! Most orders are processed within 24-48 hours. Express delivery takes about 3-5 business days. Shipping is nominal and calculated based on your delivery address.',
  },
  {
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'We do not offer COD. To keep our high-quality imported plushies affordable, we only accept secure online prepaid payments including UPI, Net Banking, and Debit/Credit cards.',
  },
  {
    question: 'Are these plush toys safe for kids and toddlers?',
    answer: 'Yes, 100%! All our collectible plushies are imported from verified premium manufacturers. They are made using hypoallergenic velvet fabrics and lock-stitched safety details, making them super safe and cuddly.',
  },
  {
    question: 'Can I request a character not listed in the store?',
    answer: 'Absolutely! We specialize in sourcing hard-to-find imported characters (Sanrio, Pokémon, Anime, LINE Friends). Slide into our Instagram DMs or message us on WhatsApp with a picture, and we will do our best to fetch it for you!',
  },
  {
    question: 'What is your refund or return policy?',
    answer: 'Since our plushies are imported collectibles, we do not accept general returns. However, in the rare event that your plush companion arrives damaged during transit, send us an unboxing video within 24 hours of delivery, and we will issue a direct replacement!',
  },
];

export default function HowItWorks() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-24 bg-[#F0F9FF] px-6 md:px-12 lg:px-20 border-b border-darkText/[0.01]">
      <div className="max-w-[1400px] mx-auto">
        {/* FAQ Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-3 inline-block">
            Have Questions?
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-darkText font-extrabold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-sm md:text-base text-darkText/70 max-w-xl mx-auto">
            Got doubts about delivery, payments, or custom sourcing? We have answers. Click a cloud below!
          </p>
        </div>

        {/* Cloud FAQ list layout */}
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div
                key={index}
                layout
                onClick={() => toggleExpand(index)}
                className={`bg-white border border-darkText/5 rounded-[32px] p-6 md:p-8 cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] ${
                  isExpanded
                    ? 'shadow-[0_10px_30px_rgba(124,58,237,0.06)] border-primary/20 ring-1 ring-primary/10'
                    : 'hover:shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:-translate-y-0.5'
                }`}
              >
                {/* Subtle cloud curve vector background inside the card */}
                <div className="absolute right-[-20px] bottom-[-20px] pointer-events-none opacity-[3%] text-primary select-none">
                  <svg className="w-40 h-40 fill-current" viewBox="0 0 100 100">
                    <path d="M 20,60 A 20,20 0 0,1 50,30 A 25,25 0 0,1 90,40 A 20,20 0 0,1 90,80 L 20,80 Z" />
                  </svg>
                </div>

                {/* Question summary row */}
                <div className="flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isExpanded ? 'bg-primary/10 text-primary' : 'bg-bgMain text-darkText/50'
                    }`}>
                      <HelpCircle size={16} />
                    </div>
                    <h3 className="font-heading font-bold text-darkText text-sm md:text-base leading-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-darkText/40 group-hover:text-darkText"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>

                {/* Expanding Details Answer Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden relative z-10"
                    >
                      <p className="font-body text-xs md:text-sm text-darkText/75 leading-relaxed pl-11 border-l-2 border-primary/20">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
