import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import FloatingBackground from './components/FloatingBackground';
import StitchedNav from './components/StitchedNav';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Creations from './components/Creations';
import CustomerLove from './components/CustomerLove';
import FromTheGram from './components/FromTheGram';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import BrandIntro from './components/BrandIntro';

function App() {
  const [introStage, setIntroStage] = useState<'playing' | 'revealing' | 'complete'>(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('thc-visited');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (visited || prefersReduced) {
        return 'complete';
      }
    }
    return 'playing';
  });

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleIntroComplete = () => {
    setIntroStage('revealing');
    setTimeout(() => {
      setIntroStage('complete');
      sessionStorage.setItem('thc-visited', 'true');
    }, 600); // 600ms transition to complete stage
  };

  return (
    <div className="min-h-screen bg-[#f7d9e3] fabric-bg font-body text-charcoal relative overflow-x-hidden">
      {/* Decorative Interactive Background Objects — start moving only after intro plays */}
      <FloatingBackground isActive={introStage === 'complete'} />

      {/* Stitched Scroll Progress dot navigation (Desktop left sidebar) */}
      <StitchedNav />

      {/* Sticky Top Header Nav — fades in separately after intro */}
      <div className={introStage === 'playing' ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-[800ms] delay-[300ms]'}>
        <Navbar />
      </div>

      <main className="relative z-20 px-4 sm:px-6 md:px-12 pt-24">
        <Hero introStage={introStage} />
        <About />
        <WhyUs />
        <Creations />
        <CustomerLove />
        <FromTheGram />
        <HowItWorks />
        <Contact />
      </main>

      {/* Premium Brand Intro Screen Overlay */}
      <AnimatePresence>
        {introStage === 'playing' && (
          <BrandIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

