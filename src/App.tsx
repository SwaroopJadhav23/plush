import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import FloatingBackground from './components/FloatingBackground';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import { UniversePortals, TrendingCollection, Universe } from './components/Creations';
import Spotlight from './components/Spotlight';
import CustomerLove from './components/CustomerLove';
import FromTheGram from './components/FromTheGram';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import BrandIntro from './components/BrandIntro';
import ProductDetails from './components/ProductDetails';
import { CloudDivider, CurveDivider } from './components/Transitions';

function App() {
  const [introStage, setIntroStage] = useState<'playing' | 'revealing' | 'complete'>(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('plush-visited');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (visited || prefersReduced) {
        return 'complete';
      }
    }
    return 'playing';
  });

  // Shared category selection state
  const [selectedUniverse, setSelectedUniverse] = useState<Universe | 'All'>('All');

  // Simple SPA hash router state
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#/products/')) {
        return { type: 'product', slug: hash.replace('#/products/', '') };
      }
    }
    return { type: 'home' };
  });

  // Track hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/products/')) {
        setRoute({ type: 'product', slug: hash.replace('#/products/', '') });
      } else {
        setRoute({ type: 'home' });
      }
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
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

  // Custom sparkle particle cursor effect (extremely lightweight, DOM-based to avoid React render delay)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Control emission rate
      if (Math.random() > 0.18) return;

      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';

      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;

      // Assign candy pink or sunny yellow randomly
      const colors = ['#FF6FB5', '#FFD54F', '#66D9FF'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = chosenColor;
      particle.style.boxShadow = `0 0 10px ${chosenColor}`;

      document.body.appendChild(particle);

      // Clean up DOM after animation completes
      setTimeout(() => {
        particle.remove();
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleIntroComplete = () => {
    setIntroStage('revealing');
    setTimeout(() => {
      setIntroStage('complete');
      sessionStorage.setItem('plush-visited', 'true');
    }, 600); // 600ms transition to complete stage
  };

  return (
    <div className="min-h-screen bg-bgMain font-body text-darkText relative overflow-x-hidden">
      {/* Decorative Interactive Background Objects */}
      <FloatingBackground isActive={introStage === 'complete'} />

      {/* Sticky Top Header Nav — fades in after intro */}
      <div className={introStage === 'playing' ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-[800ms] delay-[300ms]'}>
        <Navbar />
      </div>

      <main className="relative z-20">
        {route.type === 'home' ? (
          <>
            {/* Section 1: Cinematic Magical Hero */}
            <Hero introStage={introStage} />

            {/* Section transition divider */}
            <CurveDivider topColor="#FAF5FF" bottomColor="#FAF5FF" />

            {/* Section 2: Meet The Plush Universe (storytelling brand intro) */}
            <About />

            {/* Section transition divider */}
            <CloudDivider topColor="#F0F4FF" bottomColor="#F0F4FF" />

            {/* Section 3: Choose Your Universe portals list */}
            <UniversePortals selectedUniverse={selectedUniverse} onSelectUniverse={setSelectedUniverse} />

            {/* Section 4: Featured Character Spotlight centerpiece */}
            <Spotlight />

            {/* Section 5: Trending Plush Collection Products grid */}
            <TrendingCollection selectedUniverse={selectedUniverse} onSelectUniverse={setSelectedUniverse} />

            {/* Section transition divider */}
            <CloudDivider topColor="#ffffff" bottomColor="#ffffff" />

            {/* Section 6: Why Everyone Loves Plush.Palz features */}
            <WhyUs />

            {/* Section 7: Instagram Universe */}
            <FromTheGram />

            {/* Section 8: Collector Reviews */}
            <CustomerLove />

            {/* Section 9: FAQ */}
            <HowItWorks />

            {/* Section 10: Adopt Your New Buddy + Starry Night sky footer */}
            <Contact />
          </>
        ) : (
          <>
            <ProductDetails slug={route.slug} />
            <Contact />
          </>
        )}
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
