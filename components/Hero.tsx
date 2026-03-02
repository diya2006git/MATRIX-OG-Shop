
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="reveal relative h-screen flex items-center justify-center overflow-hidden bg-black scroll-mt-20">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop" 
          alt="Streetwear background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="mb-8 inline-block">
          <span className="text-matrix font-display text-xs tracking-[0.5em] uppercase block mb-4">Next Drop Countdown</span>
          <div className="flex gap-4 md:gap-8 justify-center items-center">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hrs' },
              { val: timeLeft.mins, label: 'Min' },
              { val: timeLeft.secs, label: 'Sec' }
            ].map((unit, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-display text-white border-b-2 border-matrix/50 pb-1">{String(unit.val).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="font-display text-7xl md:text-9xl tracking-[-0.05em] mb-4 text-white leading-none">
          MATRIX <span className="text-matrix neon-text">OG</span>
        </h1>
        <p className="text-xl md:text-3xl font-bold uppercase tracking-widest text-white/90 mb-6 italic">
          “Redefining the code of street culture”
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={onExplore}
            className="w-full md:w-auto px-10 py-4 bg-matrix text-black font-black uppercase tracking-tighter hover:bg-white transition-colors text-center"
          >
            Explore Collection
          </button>
          <a 
            href="#locate" 
            onClick={(e) => handleScroll(e, '#locate')}
            className="w-full md:w-auto px-10 py-4 border-2 border-white/20 hover:border-matrix hover:text-matrix transition-all text-center uppercase font-black tracking-tighter"
          >
            Store Locator
          </a>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{backgroundImage: 'radial-gradient(#ff0000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px'}}>
      </div>
    </section>
  );
};

export default Hero;
