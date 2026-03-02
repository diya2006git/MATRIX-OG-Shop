
import React, { useState, useEffect } from 'react';

const Locate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= 10 && hour <= 20); // Open from 10 AM to 8 PM
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const storeAddress = "TOWER 1, SONA, NO.7,8, M/S. DINDUGAL FASHION POINT, Palani Rd, New Agraharam, Dindigul, Tamil Nadu 624001";
  const encodedAddress = encodeURIComponent(storeAddress);
  // Using a standard embed URL for the specific address
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <section id="locate" className="reveal py-24 bg-black scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-black text-matrix uppercase tracking-[0.3em] mb-4">Location</h2>
                <h3 className="text-4xl font-display mb-4">INFILTRATE OUR HQ</h3>
              </div>
              <div className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${isOpen ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-red-500 text-red-500 bg-red-500/10'}`}>
                {isOpen ? '● Open Now' : '○ Closed'}
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start group cursor-pointer">
                <div className="w-12 h-12 mt-1 flex items-center justify-center bg-zinc-900 border border-matrix/30 rounded-full group-hover:bg-matrix group-hover:border-matrix transition-all duration-300 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-matrix group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Address</h4>
                  <p className="text-xl group-hover:text-matrix transition-colors leading-relaxed">
                    TOWER 1, SONA, NO.7,8,<br />
                    M/S. DINDUGAL FASHION POINT,<br />
                    Palani Rd, New Agraharam,<br />
                    Dindigul, Tamil Nadu 624001
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-center group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-matrix/30 rounded-full group-hover:bg-matrix group-hover:border-matrix transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-matrix group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Direct Line</h4>
                  <p className="text-xl group-hover:text-matrix transition-colors">+00 011 0101 1010</p>
                </div>
              </div>

              <a href="https://instagram.com/matrix.og.official" target="_blank" rel="noopener noreferrer" className="flex gap-6 items-center group">
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-matrix/30 rounded-full group-hover:bg-matrix group-hover:border-matrix transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-matrix group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Instagram</h4>
                  <p className="text-xl group-hover:text-matrix transition-colors">@matrix.og.official</p>
                </div>
              </a>

              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 px-10 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-matrix transition-all text-xs"
              >
                Get Directions
              </a>
            </div>
          </div>
          
          <div className="relative h-[450px] bg-zinc-900 overflow-hidden neon-border">
            <iframe 
              src={mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(1) opacity(0.8)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Matrix OG Shop Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locate;
