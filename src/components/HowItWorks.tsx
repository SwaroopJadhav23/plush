import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, Heart, Package } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: MessageSquare,
    title: 'DM us your idea',
    desc: 'Slide into our DMs with your dream crochet piece.',
  },
  {
    num: 2,
    icon: CheckCircle,
    title: 'We confirm design & price',
    desc: 'We lock in the details and quote you a fair price.',
  },
  {
    num: 3,
    icon: Heart,
    title: 'Made with love',
    desc: 'Tanya handcrafts your piece — 2-5 days of stitching.',
  },
  {
    num: 4,
    icon: Package,
    title: 'Shipped to your door',
    desc: 'We pack it pretty and ship it pan-India to you.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HowItWorks() {
  return (
    <section id="process" className="py-20 md:py-28 bg-blush relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="font-script text-2xl text-mustard mb-1">how it works</p>
          <h2 className="font-script text-4xl md:text-6xl text-berry font-bold">
            How Custom Orders Work
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4"
        >
          {/* Dashed connecting thread line — desktop only */}
          <svg
            className="hidden md:block absolute top-12 left-0 w-full pointer-events-none"
            height="4"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
          >
            <line
              x1="0" y1="2" x2="1000" y2="2"
              stroke="#E0A93A"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity="0.5"
            />
          </svg>

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                variants={item}
                className="relative flex flex-col items-center text-center"
              >
                {/* Numbered circle */}
                <div className="relative w-24 h-24 rounded-full bg-cream shadow-lg flex items-center justify-center mb-4 z-10">
                  <Icon size={32} className="text-rose" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-berry text-cream text-sm font-bold flex items-center justify-center">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-berry mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed max-w-[200px]">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
