
import React, { useState, useEffect } from 'react';

interface FloatingButtonsProps {
  onBackToHome: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onBackToHome }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScrollState = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollState);
    return () => window.removeEventListener('scroll', handleScrollState);
  }, []);

  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onBackToHome();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all float-shadow group"
        title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.542 1.441 5.535 1.442 5.34 0 9.69-4.35 9.693-9.691.002-2.589-1.007-5.023-2.843-6.859-1.837-1.837-4.271-2.846-6.859-2.846-5.34 0-9.69 4.351-9.693 9.691-.001 2.1.543 4.146 1.575 5.946l-1.02 3.723 3.812-1.006zm11.366-7.367c-.285-.141-1.682-.83-1.948-.927-.267-.096-.462-.146-.657.146-.196.291-.758.927-.929 1.121-.171.194-.341.219-.626.078-.285-.142-1.204-.444-2.292-1.415-.847-.756-1.418-1.688-1.585-1.971-.166-.282-.018-.435.125-.575.127-.126.285-.33.427-.496.143-.165.19-.283.285-.47.095-.189.047-.354-.024-.496-.071-.141-.657-1.582-.9-2.163-.235-.568-.475-.49-.657-.499-.17-.008-.364-.01-.559-.01-.194 0-.511.073-.778.363-.268.291-1.022.999-1.022 2.435 0 1.437 1.045 2.825 1.187 3.019.143.194 2.057 3.141 4.981 4.406.696.3 1.238.48 1.659.613.698.223 1.334.192 1.836.117.561-.083 1.682-.688 1.92-1.351.237-.663.237-1.231.166-1.351-.07-.12-.258-.19-.544-.33z"/>
        </svg>
      </a>

      {/* Back to Top Button */}
      <button 
        onClick={handleBackToTop}
        className={`w-14 h-14 bg-matrix text-black rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all float-shadow ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        title="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;
