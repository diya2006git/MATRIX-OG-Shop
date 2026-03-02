
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection?: string;
  currentView?: 'home' | 'collection';
  onNavigate: (view: 'home' | 'collection', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const updateCartCount = () => {
      const savedCart = localStorage.getItem('matrix_og_cart');
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          setCartCount(Array.isArray(items) ? items.length : 0);
        } catch (e) {
          setCartCount(0);
        }
      }
    };

    window.addEventListener('scroll', handleScrollState);
    window.addEventListener('cartUpdated', updateCartCount);
    
    updateCartCount();

    return () => {
      window.removeEventListener('scroll', handleScrollState);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string, href: string, id: string }) => {
    e.preventDefault();
    if (item.id === 'collection') {
      onNavigate('collection');
    } else {
      onNavigate('home', item.id);
    }
  };

  const navItems = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Collection', href: '#collection', id: 'collection' },
    { name: 'Why Us', href: '#whyus', id: 'whyus' },
    { name: 'Locate', href: '#locate', id: 'locate' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || currentView === 'collection' ? 'bg-black/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home', 'home')}
          className="font-display text-2xl tracking-tighter text-matrix neon-text hover:scale-105 transition-transform"
        >
          MATRIX OG
        </button>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest">
          {navItems.map(item => (
            <a 
              key={item.id} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item)}
              className={`nav-link hover:text-matrix transition-all duration-300 ${
                (currentView === 'collection' && item.id === 'collection') || (currentView === 'home' && activeSection === item.id) ? 'active' : ''
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('collection')}
            className="relative group p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white group-hover:text-matrix transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-matrix text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => onNavigate('home', 'locate')}
            className="hidden sm:block bg-matrix text-black px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all text-center"
          >
            Visit Store
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
