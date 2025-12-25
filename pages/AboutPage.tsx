
import React from 'react';
import { ShieldCheck, Database, Zap, BookOpen } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-24 px-4 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="font-serif text-5xl mb-8">Transparency in Every Apprisal.</h1>
        <p className="text-xl text-charcoal/60 leading-relaxed">
          DomainWorth AI was born out of a frustration with "black-box" valuation tools. In the domain industry, trust is the primary currency. You shouldn't just be given a number; you should be given the logic that generated it.
        </p>
      </div>

      <div className="space-y-24">
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
            <BookOpen className="text-warning" />
            <span>Our Methodology</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold mb-4">Linguistic Patterns</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                We analyze semantic structure, keyword rarity, and phonetic memorability. A domain that is easy to say is inherently more valuable for branding.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Market Intent</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Using deep search data and commercial intent mapping, we estimate the likelihood of an end-user purchase vs. a wholesale investor acquisition.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">TLD Hierarchy</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                The world is changing, but extension strength remains hierarchical. We prioritize .com, but apply sophisticated weighting for emerging GTLDs like .ai and .io.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Historical Comparables</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Our model is trained on thousands of verified domain sales records, ensuring our price ranges are grounded in actual market transactions.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-charcoal text-white p-12 rounded-[2.5rem] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl mb-6 italic">"A domain is only worth what a buyer will pay. We help you understand who that buyer is and why they'll pay."</h2>
            <div className="flex items-center space-x-4">
              <img src="https://picsum.photos/seed/broker/100/100" className="w-12 h-12 rounded-full grayscale" alt="CEO" />
              <div>
                <div className="font-bold">Julian Sterling</div>
                <div className="text-white/40 text-xs uppercase tracking-widest">Founding Broker</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-12 -right-12 text-white/5 rotate-12">
            <ShieldCheck size={240} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
