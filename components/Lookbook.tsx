
import React, { useState, useEffect } from 'react';

const outfits = [
  { img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200", name: "URBAN NOMAD V1" },
  { img: "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=1200", name: "SECTOR 7 STEALTH" },
  { img: "https://skream.in/cdn/shop/articles/how-to-create-a-bollywood-inspired-look-with-oversized-t-shirts-6.jpg?v=1708869976", name: "NEON PROTOCOL" },
];

const Lookbook: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % outfits.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % outfits.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + outfits.length) % outfits.length);

  return (
    <section id="lookbook" className="reveal py-24 bg-black overflow-hidden border-y border-white/5 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-md">
            <h2 className="text-sm font-black text-matrix uppercase tracking-[0.3em] mb-4">Editorial</h2>
            <h3 className="text-4xl font-display mb-6">THE 2024 LOOKBOOK</h3>
            <p className="text-zinc-500 leading-relaxed">
              Explore the fusion of digital decay and high-end street hardware. Each outfit is a statement of identity in the cyberpunk era.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-matrix hover:border-matrix hover:text-black transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={next} className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-matrix hover:border-matrix hover:text-black transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden aspect-video md:aspect-[21/9] neon-border">
          <div 
            className="flex transition-transform duration-1000 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {outfits.map((outfit, i) => (
              <div key={i} className="min-w-full h-full relative">
                <img src={outfit.img} className="w-full h-full object-cover" alt={outfit.name} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-12">
                  <div className="max-w-lg">
                    <span className="text-matrix font-display text-xs tracking-widest uppercase mb-4 block">Look {String(i + 1).padStart(2, '0')}</span>
                    <h4 className="text-5xl md:text-7xl font-display text-white mb-6 leading-none">{outfit.name}</h4>
                    <button className="px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-matrix transition-colors">Shop The Look</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
