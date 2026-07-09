import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';

const gramPosts = [
  { seed: 'gram1', w: 400, h: 400 },
  { seed: 'gram2', w: 400, h: 400 },
  { seed: 'gram3', w: 400, h: 400 },
  { seed: 'gram4', w: 400, h: 400 },
];

export default function FromTheGram() {
  return (
    <section id="gram" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="font-script text-2xl text-mustard mb-1">from the gram</p>
          <h2 className="font-script text-4xl md:text-6xl text-berry font-bold mb-2">
            Stitched with Love, Shared on Instagram
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {gramPosts.map((p, i) => (
            <motion.a
              key={p.seed}
              href="https://instagram.com/thehalfcode__"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-md bg-blush"
            >
              {/* PLACEHOLDER IMAGE - swap with real Instagram post photo */}
              <img
                src={`https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-auto block aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* IG-style overlay */}
              <div className="absolute inset-0 bg-berry/0 group-hover:bg-berry/60 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <Instagram size={28} className="text-cream" />
                  <span className="text-cream font-semibold text-xs md:text-sm">
                    View on Instagram
                  </span>
                </div>
              </div>
              {/* Fake IG like count */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-cream text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={12} className="fill-rose text-rose" />
                <span>2.4k</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="text-center">
          <a
            href="https://instagram.com/thehalfcode__"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose text-cream font-semibold px-6 py-3 rounded-full hover:bg-berry transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Instagram size={20} />
            Follow @thehalfcode__
          </a>
        </div>
      </div>
    </section>
  );
}
