import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, MessageCircle, ChevronLeft, Star, Sparkles, HelpCircle, ChevronDown, Play, Instagram } from 'lucide-react';
import { products, Product } from './Creations';
import { API_BASE_URL, WHATSAPP_NUMBER, validateCoupon, logProductClick } from '../config/api';

interface ProductDetailsProps {
  slug: string;
}

export default function ProductDetails({ slug }: ProductDetailsProps) {
  
  // Find product state
  const [product, setProduct] = useState<Product>(() => products.find((item) => item.slug === slug) || products[0]);

  // Load product dynamically from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/${slug}`)
      .then(res => res.json())
      .then((data) => {
        if (data) {
          const formatted = {
            ...data,
            price: typeof data.price === 'number' ? `₹${data.price.toLocaleString('en-IN')}` : data.price,
            src: data.src.startsWith('/') ? `${API_BASE_URL}${data.src}` : data.src
          };
          setProduct(formatted);
          // Log product click once loaded
          logProductClick(slug, formatted.name);
        }
      })
      .catch(err => {
        console.warn('API error fetching product details:', err);
        // Fallback tracking
        const fallback = products.find((item) => item.slug === slug) || products[0];
        logProductClick(slug, fallback.name);
      });
  }, [slug]);

  const p = product;

  // Gallery Active Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Hover magnifier zoom details
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  // Coupon entry states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponError, setCouponError] = useState('');

  // Local Wishlist and Share state
  const [wishlisted, setWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);

  // FAQ state
  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(null);

  // Magnifier coordinate tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Tracking "Recently Viewed" history in LocalStorage
  useEffect(() => {
    try {
      const recent = JSON.parse(localStorage.getItem('plush-recent') || '[]');
      const updated = [p.id, ...recent.filter((id: number) => id !== p.id)].slice(0, 5);
      localStorage.setItem('plush-recent', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    // Reset active gallery image index on product change
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [p.id]);

  // Read recently viewed plushies (filtering out active product)
  const [recentPlushies, setRecentPlushies] = useState<Product[]>([]);
  useEffect(() => {
    try {
      const recentIds: number[] = JSON.parse(localStorage.getItem('plush-recent') || '[]');
      const filtered = products.filter((item) => recentIds.includes(item.id) && item.id !== p.id);
      setRecentPlushies(filtered);
    } catch (e) {
      console.error(e);
    }
  }, [p.id]);

  // Get numeric values for calculation
  const originalPriceNum = typeof p.price === 'string' ? Number(p.price.replace(/[^0-9]/g, '')) : p.price;
  const discountedPrice = appliedCoupon ? originalPriceNum - appliedCoupon.discountAmount : originalPriceNum;

  // Coupon application handler
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponError('');
    try {
      const result = await validateCoupon(couponInput, originalPriceNum);
      if (result.valid) {
        setAppliedCoupon(result);
      } else {
        setAppliedCoupon(null);
        setCouponError(result.message || 'Invalid coupon code');
      }
    } catch (err: any) {
      setAppliedCoupon(null);
      setCouponError(err.message || 'Error validating coupon code');
    }
  };

  // Prefilled WhatsApp order trigger
  const handleOrder = () => {
    let message = `Hello Plush.Palz! 👋\n\nI'm looking to order this beautiful plush from your website!\n\n🌸 Product Name: *${p.name}*\n🌌 Collection: *${p.universe}*\n`;
    
    if (appliedCoupon) {
      message += `💰 Original Price: *₹${originalPriceNum.toLocaleString('en-IN')}*\n🎟️ Coupon Applied: *${appliedCoupon.code}* (-₹${appliedCoupon.discountAmount.toLocaleString('en-IN')})\n💸 Final Price: *₹${discountedPrice.toLocaleString('en-IN')}*\n`;
    } else {
      message += `💰 Price: *₹${originalPriceNum.toLocaleString('en-IN')}*\n`;
    }

    message += `\nPlease let me know if it's available.\n\nThank you! ✨`;
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // Copy product link to clipboard
  const handleShare = () => {
    const text = `Take a look at this cute ${p.name} on Plush.Palz! ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products (same universe)
  const relatedProducts = products.filter((item) => item.universe === p.universe && item.id !== p.id).slice(0, 4);

  // Mock multi-angle gallery photos (simulating original, close-up, and special edition hue-rotation)
  const galleryImages = [
    { id: 1, src: p.src, label: 'Standard Shot', style: {} },
    { id: 2, src: p.src, label: 'Detailed Zoom', style: { transform: 'scale(1.25)' } },
    { id: 3, src: p.src, label: 'Pastel Alternate', style: { filter: 'hue-rotate(45deg) saturate(1.15)' } },
  ];

  // Specific Mock Instagram Reels data
  const mockReel = {
    title: `Squeezing the super soft ${p.name}! ☁️✨`,
    likes: '18.4k',
    comments: '489',
    views: '240k views',
    caption: `Nothing beats cuddling up with the authentic imported ${p.name}. Tap link in bio to adopt! 🌸`,
  };

  // General FAQs
  const detailsFAQs = [
    {
      q: 'How do I complete my purchase?',
      a: 'Adopt your plush by clicking "Order on WhatsApp". It opens a direct chat with us carrying all product details. We accept pre-payments via UPI or credit/debit cards.',
    },
    {
      q: 'Are these authentic licensed items?',
      a: 'Yes, absolutely! We source all our character plushies directly from official stores and authorized distributors abroad (Japan, Korea, global outlets).',
    },
    {
      q: 'Do you offer returns or exchanges?',
      a: 'Due to custom import customs and handling, all catalog orders are final. However, if your item is damaged during transit, notify us with an unboxing video within 24 hours for a full replacement!',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 pt-28 relative">
      
      {/* 1. Breadcrumbs Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <nav className="text-xs md:text-sm font-body font-semibold text-darkText/50 flex items-center gap-2 select-none">
          <a href="#hero" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="#universe" className="hover:text-primary transition-colors">Collections</a>
          <span>/</span>
          <span className="text-darkText font-bold">{p.name}</span>
        </nav>

        <a
          href="#universe"
          className="text-xs font-bold text-darkText/70 hover:text-primary bg-white border border-darkText/5 shadow-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition-all hover:-translate-x-0.5"
        >
          <ChevronLeft size={14} />
          <span>Back to Collection</span>
        </a>
      </div>

      {/* 2. Premium Splitted Details Panel (55% Showcase / 45% Info) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 bg-white/50 backdrop-blur-xl border border-white/40 rounded-[32px] p-6 md:p-8 lg:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.02)] mb-16">
        
        {/* Left Column (55% Image Showcase) */}
        <div className="w-full lg:w-[55%] flex-shrink-0 flex flex-col gap-6">
          {/* Main Showcase Container */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            className="relative aspect-square w-full rounded-[28px] bg-gradient-to-tr from-sky/10 via-white to-candy/10 border border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_8px_35px_rgba(0,0,0,0.02)] flex items-center justify-center p-8 overflow-hidden group cursor-zoom-in"
          >
            {/* Visual sparkles & stars decoration */}
            <div className="absolute inset-0 pointer-events-none z-10 select-none">
              <Star className="absolute text-sunny fill-sunny w-6 h-6 top-8 right-10 animate-twinkle" />
              <Star className="absolute text-sky fill-sky w-5 h-5 bottom-12 left-10 animate-twinkle delay-500" />
              <Sparkles className="absolute text-candy w-6 h-6 top-16 left-12 animate-pulse" />
              
              {/* Universe label tag floating */}
              <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm border border-darkText/5 text-darkText px-3.5 py-1.5 rounded-full shadow-sm">
                🌌 {p.universe}
              </span>
            </div>

            {/* Magnifying Main Image */}
            <motion.img
              src={galleryImages[activeImageIndex].src}
              alt={p.name}
              style={{
                ...galleryImages[activeImageIndex].style,
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
              className={`w-[82%] h-[82%] object-contain filter drop-shadow-[0_15px_35px_rgba(45,45,45,0.07)] transition-all duration-300 ${
                isZooming ? 'scale-[2.3]' : 'scale-100'
              }`}
            />
          </div>

          {/* Thumbnail Gallery Row */}
          <div className="flex gap-4">
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(index)}
                className={`relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl border-2 flex items-center justify-center p-3 overflow-hidden cursor-pointer transition-all ${
                  activeImageIndex === index
                    ? 'border-primary shadow-md scale-105'
                    : 'border-darkText/5 hover:border-primary/30 hover:scale-102'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-sky/5 to-candy/5" />
                <img
                  src={img.src}
                  alt={`${p.name} thumbnail`}
                  style={img.style}
                  className="w-full h-full object-contain filter drop-shadow-sm relative z-10"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (45% Product Details) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between pt-4 lg:pt-0">
          <div>
            {/* Category Badges */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                ✨ {p.universe} Collection
              </span>
              {p.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-candy text-white px-3.5 py-1.5 rounded-full shadow-sm animate-pulse">
                  {p.badge}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="font-heading text-4xl sm:text-5xl text-darkText font-extrabold mb-3 tracking-tight leading-tight">
              {p.name}
            </h1>

            {/* Star ratings */}
            <div className="flex items-center gap-1 mb-5 text-sunny">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={18} className="fill-sunny text-sunny" />
              ))}
              <span className="text-sm text-darkText/50 font-bold ml-2 font-body">5.0 (48 Customer Reviews)</span>
            </div>

            {/* Price tag */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-heading font-extrabold text-primary shadow-sm">
                ₹{discountedPrice.toLocaleString('en-IN')}
              </span>
              {(p.originalPrice || appliedCoupon) && (
                <span className="text-sm font-heading font-semibold text-darkText/30 line-through">
                  ₹{(p.originalPrice || originalPriceNum).toLocaleString('en-IN')}
                </span>
              )}
              {p.isSpecialOffer && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-candy text-white px-2.5 py-1 rounded-full shadow-sm ml-2">
                  {p.discountPercentage ? `${p.discountPercentage}% Off` : 'Special Offer'}
                </span>
              )}
            </div>

            {/* Paragraph details description */}
            <p className="font-body text-base text-darkText/80 leading-relaxed mb-8">
              {p.description} Adorable collectible import crafted for premium hugging. Fits perfectly on desks, shelves, or as a cozy bedtime pillow. Snuggle in and collect the magic!
            </p>

            {/* Grid of Feature Pills */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5 mb-10">
              <div className="bg-[#FFF5F8] border border-candy/10 rounded-2xl px-4 py-3 text-xs md:text-sm font-bold text-darkText/80 flex items-center gap-2.5 shadow-sm">
                <span>🌸</span> Premium Imported
              </div>
              <div className="bg-[#F0F9FF] border border-sky/10 rounded-2xl px-4 py-3 text-xs md:text-sm font-bold text-darkText/80 flex items-center gap-2.5 shadow-sm">
                <span>☁️</span> Ultra Soft Micro-fill
              </div>
              <div className="bg-[#F0FDF4] border border-mint/10 rounded-2xl px-4 py-3 text-xs md:text-sm font-bold text-darkText/80 flex items-center gap-2.5 shadow-sm">
                <span>🇮🇳</span> Pan India Delivery
              </div>
              <div className="bg-[#FEFCE8] border border-sunny/10 rounded-2xl px-4 py-3 text-xs md:text-sm font-bold text-darkText/80 flex items-center gap-2.5 shadow-sm">
                <span>💬</span> WhatsApp Orders
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="bg-[#FAF5FF] border border-primary/10 p-5 rounded-3xl mb-8 flex flex-col gap-3 font-body">
              <span className="text-xs font-bold text-darkText/70 uppercase tracking-wider block">Have a Discount Coupon?</span>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="ENTER CODE (e.g. WELCOME10)" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-white border border-darkText/10 rounded-2xl px-4.5 py-3 text-xs font-bold uppercase tracking-wider focus:outline-none"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-primary hover:bg-primary/95 text-white font-heading font-bold text-xs px-5 py-3 rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] text-candy font-bold mt-1">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs mt-1 bg-mint/10 border border-mint/20 text-mint font-bold px-4 py-2.5 rounded-2xl">
                  <span>Code {appliedCoupon.code} Applied!</span>
                  <span>-₹{appliedCoupon.discountAmount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-4">
            {/* Primary Order Button */}
            <motion.button
              onClick={handleOrder}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-candy to-primary text-white font-heading font-bold py-4.5 px-8 rounded-full flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(255,111,181,0.35)] hover:shadow-[0_8px_30px_rgba(255,111,181,0.5)] transition-all cursor-pointer text-base md:text-lg"
            >
              <MessageCircle size={22} className="fill-white text-white" />
              <span>Order on WhatsApp</span>
            </motion.button>

            {/* Secondary wishlists & shares */}
            <div className="flex gap-4">
              <motion.button
                onClick={() => setWishlisted(!wishlisted)}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 border-2 py-3 px-6 rounded-full font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  wishlisted
                    ? 'border-candy bg-[#FFF5F8] text-candy shadow-[0_4px_12px_rgba(255,111,181,0.15)]'
                    : 'border-darkText/10 text-darkText/70 hover:border-candy hover:text-candy'
                }`}
              >
                <Heart size={18} className={wishlisted ? 'fill-candy text-candy' : ''} />
                <span>{wishlisted ? 'Wishlisted!' : 'Add to Wishlist'}</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-darkText/10 text-darkText/70 hover:bg-bgMain py-3 px-6 rounded-full font-heading font-semibold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 size={16} />
                <span>{copied ? 'Copied Link!' : 'Share Product'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Related Products Gallery */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h4 className="font-heading text-xl md:text-2xl text-darkText font-extrabold mb-6 flex items-center gap-2">
            <span>🌟</span> Related Plushies
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                onClick={() => {
                  window.location.hash = `#/products/${rp.slug}`;
                }}
                className="group rounded-3xl bg-white border border-darkText/5 p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-square bg-[#F8FAFF] rounded-2xl flex items-center justify-center p-4 mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky/5 to-candy/5 opacity-40 group-hover:opacity-75 transition-opacity" />
                  <img
                    src={rp.src}
                    alt={rp.name}
                    className="w-[85%] h-[85%] object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-darkText text-sm group-hover:text-primary transition-colors truncate">
                    {rp.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-heading font-extrabold text-primary">{rp.price}</span>
                    <span className="text-[10px] font-bold text-candy group-hover:underline">Meet ➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Custom Instagram Reel Player mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0A21] text-white rounded-[32px] p-8 md:p-12 overflow-hidden mb-16 relative shadow-xl">
        <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{ top: `${Math.random() * 90}%`, left: `${Math.random() * 95}%`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
        
        {/* Left text info */}
        <div className="lg:col-span-7 z-10">
          <div className="flex items-center gap-2 text-candy font-heading font-bold text-xs uppercase tracking-widest mb-3">
            <Instagram size={14} />
            <span>Trending Instagram Reel</span>
          </div>
          
          <h4 className="font-heading text-2xl md:text-4xl font-extrabold leading-tight mb-4 text-shadow-glow">
            {mockReel.title}
          </h4>
          <p className="text-xs md:text-sm text-white/70 font-body leading-relaxed mb-6 max-w-xl">
            {mockReel.caption} Our video features are blowing up on the feed! Join the plush collectors community.
          </p>

          {/* Social counts */}
          <div className="flex gap-6 text-sm font-bold text-white/90 bg-white/5 border border-white/10 px-5 py-3 rounded-full w-fit">
            <span className="flex items-center gap-1.5 text-candy">
              ❤️ {mockReel.likes} likes
            </span>
            <span className="flex items-center gap-1.5 text-sky">
              💬 {mockReel.comments} comments
            </span>
            <span className="text-white/60">
              ⚡ {mockReel.views}
            </span>
          </div>
        </div>

        {/* Right Phone Player mockup */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="w-56 h-[380px] bg-darkText border-[6px] border-white/10 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Camera notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-darkText rounded-full z-30" />
            
            {/* Background image preview */}
            <div className="absolute inset-0 bg-[#120F2B] z-10 flex items-center justify-center p-4">
              <img src={p.src} alt={p.name} className="w-[85%] h-[85%] object-contain filter drop-shadow-md animate-float-slow" />
              <div className="absolute inset-0 bg-gradient-to-t from-darkText/90 via-transparent to-transparent z-10" />
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-white">
                <Play size={20} className="fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Phone bottom info overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 text-[9px] text-white/90">
              <div className="flex items-center gap-1 mb-1 font-bold">
                <span className="w-4 h-4 rounded-full bg-candy flex items-center justify-center text-[7px]">🌸</span>
                <span>plush.palz</span>
              </div>
              <p className="line-clamp-2 text-[8px] opacity-75">
                Cuddles, squishiness, and joy! Grab the viral plushies today.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. Recently Viewed Plushies */}
      {recentPlushies.length > 0 && (
        <div className="mb-16 pt-8 border-t border-darkText/[0.04]">
          <h4 className="font-heading text-xl md:text-2xl text-darkText font-extrabold mb-6 flex items-center gap-2">
            <span>🕒</span> Recently Viewed
          </h4>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {recentPlushies.map((rp) => (
              <div
                key={rp.id}
                onClick={() => {
                  window.location.hash = `#/products/${rp.slug}`;
                }}
                className="flex items-center gap-4 p-4 bg-bgMain hover:bg-white border border-darkText/5 hover:border-primary/20 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(124,58,237,0.06)] transition-all cursor-pointer min-w-[240px] md:min-w-[260px] flex-1 snap-start"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2 border border-darkText/[0.03] flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky/5 to-candy/5 opacity-50" />
                  <img
                    src={rp.src}
                    alt={rp.name}
                    className="w-full h-full object-contain filter drop-shadow-sm relative z-10"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] font-bold text-darkText/40 uppercase block mb-0.5">
                    {rp.universe}
                  </span>
                  <h5 className="font-heading font-bold text-darkText text-xs truncate leading-tight">
                    {rp.name}
                  </h5>
                  <span className="text-xs font-heading font-extrabold text-primary block mt-1">
                    {rp.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Product FAQ Section */}
      <div className="mb-16 pt-8 border-t border-darkText/[0.04]">
        <h4 className="font-heading text-xl md:text-2xl text-darkText font-extrabold mb-6 flex items-center gap-2">
          <span>❔</span> Product FAQ
        </h4>
        <div className="flex flex-col gap-4 max-w-4xl">
          {detailsFAQs.map((faq, index) => {
            const isExpanded = expandedFAQIndex === index;
            return (
              <div
                key={index}
                onClick={() => setExpandedFAQIndex(isExpanded ? null : index)}
                className={`bg-white border border-darkText/5 rounded-[24px] p-5 cursor-pointer relative overflow-hidden transition-all duration-300 shadow-sm ${
                  isExpanded ? 'border-primary/20 shadow-md' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle size={15} className={isExpanded ? 'text-primary' : 'text-darkText/40'} />
                    <h5 className="font-heading font-bold text-darkText text-sm leading-tight">
                      {faq.q}
                    </h5>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-darkText/30" />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-xs md:text-sm text-darkText/70 leading-relaxed border-l-2 border-primary/20 pl-4 ml-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Mobile WhatsApp Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent border-t border-darkText/[0.03] lg:hidden z-40 flex items-center gap-3">
        <motion.button
          onClick={() => setWishlisted(!wishlisted)}
          whileTap={{ scale: 0.9 }}
          className={`w-12 h-12 rounded-full border border-darkText/10 flex items-center justify-center flex-shrink-0 transition-colors bg-white ${
            wishlisted ? 'border-candy text-candy bg-[#FFF5F8]' : 'text-darkText/60'
          }`}
        >
          <Heart size={20} className={wishlisted ? 'fill-candy text-candy' : ''} />
        </motion.button>

        <motion.button
          onClick={handleOrder}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-gradient-to-r from-candy to-primary text-white font-heading font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,111,181,0.25)] text-sm cursor-pointer"
        >
          <MessageCircle size={18} className="fill-white text-white" />
          <span>Order on WhatsApp</span>
        </motion.button>
      </div>
    </div>
  );
}
