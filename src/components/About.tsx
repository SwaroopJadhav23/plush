import SectionCard from './SectionCard';

export default function About() {
  return (
    <SectionCard id="about">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-script text-2xl text-mustard mb-2">our little story</p>
        <h2 className="font-script text-4xl md:text-6xl text-berry font-bold mb-6 leading-tight">
          Handmade with Heart, Loop by Loop
        </h2>
        <p className="text-base md:text-lg text-charcoal leading-relaxed mb-6 max-w-3xl mx-auto font-medium">
          The Half Code started as a small corner for yarn, loops, and hooks —
          now it's a growing home for custom crochet pieces made with
          intention. Every bouquet, keychain, and little amigurumi friend is
          handcrafted by Tanya, right here in Jaipur, Rajasthan. No two pieces
          are ever quite the same — and that's the whole point.
        </p>
        <a
          href="https://instagram.com/_tanyaa.aaaaa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-script text-2xl text-rose hover:text-berry transition-colors"
        >
          Crocheted by @_tanyaa.aaaaa
        </a>
      </div>

      {/* Decorative thread line */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none opacity-20"
        height="40"
        viewBox="0 0 1200 40"
        fill="none"
      >
        <path
          d="M0 20 Q300 5 600 20 T1200 20"
          stroke="#E0A93A"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />
      </svg>
    </SectionCard>
  );
}
