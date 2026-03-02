
import React from 'react';

const events = [
  { year: '2019', title: 'THE GENESIS', desc: 'Matrix OG founded in a small basement in Sector 7, focused on raw urban aesthetics.' },
  { year: '2020', title: 'GLITCH DROP', desc: 'The first major collection featuring our signature distorted graphics goes viral in the underground scene.' },
  { year: '2022', title: 'CYBER CITY FLAGSHIP', desc: 'Opening our first physical infiltrate point, bridging the digital and physical street culture.' },
  { year: '2024', title: 'CODE-01 SERIES', desc: 'Revolutionizing technical streetwear with premium materials and utility-driven silhouettes.' }
];

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="reveal py-24 bg-darker overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-matrix uppercase tracking-[0.3em] mb-4">Legacy</h2>
            <h3 className="text-4xl font-display">THE MATRIX JOURNEY</h3>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-matrix/30 before:to-transparent">
            {events.map((event, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-matrix bg-black text-matrix font-display text-xs z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 bg-zinc-900/50 border border-white/5 hover:border-matrix/30 transition-all duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-matrix font-display text-2xl">{event.year}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tighter mb-2">{event.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
