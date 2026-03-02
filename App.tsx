
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Lookbook from './components/Lookbook';
import Collection from './components/Collection';
import WhyUs from './components/WhyUs';
import Locate from './components/Locate';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CollectionPage from './components/CollectionPage';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState<'home' | 'collection'>('home');

  useEffect(() => {
    if (currentView === 'home') {
      // Reveal Observer - Finds elements with .reveal and makes them visible
      const revealCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      };

      const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
      });

      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

      // Active Section Observer - Updates Navbar active state
      const sectionCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const sectionObserver = new IntersectionObserver(sectionCallback, {
        threshold: 0.5
      });

      document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));

      return () => {
        revealObserver.disconnect();
        sectionObserver.disconnect();
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentView]);

  const handleNavigate = (view: 'home' | 'collection', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'home' && sectionId) {
      // Small timeout to allow the DOM to render the home view before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen selection:bg-matrix selection:text-black">
      <Navbar 
        activeSection={activeSection} 
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      
      {currentView === 'home' ? (
        <main>
          <Hero onExplore={() => setCurrentView('collection')} />
          <Collection onFullCollection={() => setCurrentView('collection')} />
          <Lookbook />
          <WhyUs />
          <Timeline />
          <About />
          <Locate />
          <Footer onNavigate={handleNavigate} />
        </main>
      ) : (
        <CollectionPage />
      )}
      
      <FloatingButtons onBackToHome={() => handleNavigate('home', 'home')} />
    </div>
  );
};

export default App;
