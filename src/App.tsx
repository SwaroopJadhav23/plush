import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Creations from './components/Creations';
import CustomerLove from './components/CustomerLove';
import FromTheGram from './components/FromTheGram';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-blush font-body text-charcoal">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Creations />
        <CustomerLove />
        <FromTheGram />
        <HowItWorks />
        <Contact />
      </main>
    </div>
  );
}

export default App;
