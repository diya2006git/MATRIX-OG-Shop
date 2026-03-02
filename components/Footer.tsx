
import React from 'react';

interface FooterProps {
  onNavigate: (view: 'home' | 'collection', sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#home') {
      onNavigate('home', 'home');
    }
  };

  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <button 
          onClick={() => onNavigate('home', 'home')}
          className="font-display text-4xl tracking-tighter text-matrix neon-text mb-6 inline-block"
        >
          MATRIX OG
        </button>
        <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] mb-10 text-xs">
          Redefining the code of street culture
        </p>
        
        <div className="flex justify-center gap-10 text-xs font-black uppercase tracking-widest text-zinc-400 mb-12">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-matrix transition-colors">Privacy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-matrix transition-colors">Shipping</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-matrix transition-colors">Terms</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-matrix transition-colors">Return Policy</a>
        </div>
        
        <p className="text-zinc-700 text-xs tracking-tighter uppercase">
          &copy; {new Date().getFullYear()} MATRIX OG CLOTHING CO. ALL RIGHTS RESERVED. ENCRYPTED FASHION SYSTEM V.2.1
        </p>
      </div>
    </footer>
  );
};

export default Footer;
