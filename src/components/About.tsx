import { motion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative w-full py-28 bg-gradient-to-b from-[#FAF5FF] to-[#F0F4FF] px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Sparkles background layer */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40">
        <Star className="absolute text-sunny fill-sunny w-4 h-4 top-[15%] left-[10%] animate-twinkle" />
        <Star className="absolute text-sky fill-sky w-5 h-5 bottom-[20%] right-[15%] animate-twinkle delay-300" />
        <Sparkles className="absolute text-candy w-5 h-5 top-[40%] right-[8%] animate-pulse" />
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Mascot Group Illustration Mockup with Floating stars */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="relative w-full max-w-[480px] aspect-square rounded-[36px] bg-gradient-to-tr from-candy/10 via-white to-sky/10 border border-white/60 p-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_8px_30px_rgba(0,0,0,0.01)] flex items-center justify-center overflow-hidden">
            
            {/* Twinkling stars floating */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <Star className="absolute text-sunny fill-sunny w-6 h-6 top-8 left-10 animate-bounce-soft" />
              <Star className="absolute text-sky fill-sky w-5 h-5 bottom-12 right-12 animate-twinkle" />
              <Heart className="absolute text-candy fill-candy w-4 h-4 bottom-8 left-16 animate-float-slow" />
              <Sparkles className="absolute text-primary w-5 h-5 top-12 right-16 animate-pulse" />
            </div>

            {/* Mascot Group Stack */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Snorlax center back */}
              <motion.img
                src="/snorlax.png"
                alt="Snorlax back mascot"
                animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-[60%] h-[60%] object-contain filter drop-shadow-md z-10 bottom-12"
              />

              {/* Loopy bottom left front */}
              <motion.img
                src="/loopy.png"
                alt="Loopy front left mascot"
                animate={{ y: [4, -4, 4], rotate: [-3, 2, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute w-[45%] h-[45%] object-contain filter drop-shadow-md z-20 bottom-2 left-2"
              />

              {/* Lotso bottom right front */}
              <motion.img
                src="/lotso.png"
                alt="Lotso front right mascot"
                animate={{ y: [-3, 3, -3], rotate: [2, -2, 2] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute w-[48%] h-[48%] object-contain filter drop-shadow-md z-20 bottom-2 right-2"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Universe Storytelling Content */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/5 px-4.5 py-2 rounded-full mb-4 border border-primary/10 w-fit">
            MEET THE PLUSH UNIVERSE
          </span>
          
          <h2 className="font-heading text-4xl md:text-5xl text-darkText font-extrabold mb-6 leading-tight select-none">
            Where Characters <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-candy to-primary">
              Come Alive.
            </span>
          </h2>
          
          <div className="font-body text-base md:text-lg text-darkText/75 leading-relaxed mb-8 flex flex-col gap-5 font-medium">
            <p>
              Plush.Palz is not just an online store — it is a magical gateway to your favorite character universes. Inspired by Pokémon Center, LINE Friends, and Sanrio, we believe that every plush toy is a friend that has its own unique personality.
            </p>
            <p>
              We source only **premium imported plushies** made with ultra-soft velocity fabric and bouncy micro-elastic cotton fill. They are double-stitched for durability, hypoallergenic, and smell like sweet happiness.
            </p>
            <p>
              Whether you are an avid collector decorating your cozy workspace, or searching for the ultimate hugging companion for bedtime comfort, we curate each character with Apple-level care and deliver them straight to you across India.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/plush.palz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading font-bold text-sm text-candy hover:text-primary transition-colors underline decoration-2 underline-offset-4"
            >
              <span>Explore @_plush.palz_ on Instagram</span>
              <span>🌸</span>
            </a>
          </div>
        </div>

      </div>

      {/* Cloud separation vector at bottom */}
      <svg
        className="absolute bottom-[-5px] left-0 w-full pointer-events-none opacity-10 text-white"
        height="40"
        viewBox="0 0 1200 40"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,20 Q300,5 600,20 T1200,20 L1200,40 L0,40 Z" />
      </svg>
    </section>
  );
}
