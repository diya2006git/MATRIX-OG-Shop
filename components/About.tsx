
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="reveal py-24 bg-darker overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 border-l-4 border-t-4 border-matrix opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop" 
              alt="Streetwear model" 
              className="relative z-10 w-full rounded-none transition-all duration-700 neon-border"
            />
          </div>
          
          <div>
            <h2 className="text-sm font-black text-matrix uppercase tracking-[0.3em] mb-4">The Origin</h2>
            <h3 className="text-4xl md:text-5xl font-display mb-8">BREAKING THE SYSTEM</h3>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                <span className="text-white font-bold">MATRIX OG</span> is more than just a brand; it's a movement born in the heart of urban exploration. We focus on the raw essence of street culture, blending premium craftsmanship with a glitch-inspired aesthetic that rejects the mundane.
              </p>
              <p>
                Our philosophy centers on three core pillars: <span className="text-matrix">Originality</span>, <span className="text-matrix">Quality</span>, and <span className="text-matrix">Identity</span>. We believe that premium streetwear should be accessible to those who truly live the culture, offering high-end fabrics and experimental silhouettes at an affordable price point.
              </p>
              <p>
                Every piece in our collection is a coded message of rebellion and style, designed for the youth who refuse to be categorized by the standard societal hardware.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
