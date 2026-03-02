
import React from 'react';

const features = [
  { title: "Premium Fabrics", desc: "Sourced from the best mills for maximum comfort and durability." },
  { title: "Unique Designs", desc: "Exclusively crafted glitch aesthetics that stand out from the crowd." },
  { title: "Affordable Pricing", desc: "Premium streetwear without the luxury markup." },
  { title: "Trend-Driven", desc: "Fast-moving collections that stay ahead of the fashion curve." },
  { title: "Street Identity", desc: "A brand that lives and breathes the culture it represents." }
];

const WhyUs: React.FC = () => {
  return (
    <section id="whyus" className="reveal py-24 bg-darker relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-black text-matrix uppercase tracking-[0.3em] mb-4 text-center">Protocol</h2>
          <h3 className="text-4xl md:text-5xl font-display mb-16 text-center">WHY JOIN THE MATRIX?</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="text-matrix font-display text-3xl opacity-30 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3 uppercase tracking-tighter text-white group-hover:text-matrix transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-zinc-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-1/4 h-full w-px bg-white/5"></div>
      <div className="absolute top-0 left-1/4 h-full w-px bg-white/5"></div>
    </section>
  );
};

export default WhyUs;
