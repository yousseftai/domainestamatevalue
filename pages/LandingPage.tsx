
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, ShieldCheck, Zap, ArrowRight, BarChart3, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-accent/20 px-3 py-1 rounded-full text-xs font-semibold text-charcoal/80 mb-8 border border-accent/30">
            <Zap size={14} className="text-warning" />
            <span>AI-Powered Domain Intelligence</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1]">
            Value Your Domains <br />
            <span className="text-warning">With Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Move beyond black-box appraisals. Get transparent, broker-grade valuation reports backed by data and keyword intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/valuation" className="w-full sm:w-auto px-8 py-4 bg-charcoal text-white rounded-full font-semibold hover:bg-charcoal/90 transition-all flex items-center justify-center space-x-2">
              <span>Appraise a Domain</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto px-8 py-4 bg-white border border-charcoal/10 rounded-full font-semibold hover:bg-sand transition-all">
              Manage Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-sand/50 border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
          <span className="font-serif text-2xl font-bold">ESTIBOT</span>
          <span className="font-serif text-2xl font-bold">GoDaddy</span>
          <span className="font-serif text-2xl font-bold">SED0</span>
          <span className="font-serif text-2xl font-bold">NameCheap</span>
          <span className="font-serif text-2xl font-bold">Dynadot</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Search className="text-warning" />}
              title="Transparent Analysis"
              description="We don't just give you a number. We explain the 'why'—from commercial intent to TLD strength and historical trends."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-warning" />}
              title="Portfolio Intelligence"
              description="Bulk upload up to 2,000 domains. Identify your best assets and cull the weak links with data-driven 'Hold' or 'Drop' signals."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-warning" />}
              title="Investor Ready"
              description="Generate clean, professional PDF reports that you can share with buyers or use for serious broker negotiations."
            />
          </div>
        </div>
      </section>

      {/* Sample Valuation Teaser */}
      <section className="py-24 px-4 bg-charcoal text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Professional Insights, <br />Instantly.</h2>
            <p className="text-white/60 mb-8 text-lg">
              Our AI thinks like a domain broker with 20 years of experience. We analyze patterns that automated scripts miss—like brandability and cultural relevance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
                <span>Wholesale vs Retail Price Estimates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
                <span>Comparable Sales History</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
                <span>Liquidity Score for Fast Exit Strategies</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white text-charcoal p-8 rounded-2xl shadow-2xl rotate-2">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold font-serif">AIVenture.com</span>
                <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">High Liquidity</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-charcoal/5">
                  <span className="text-charcoal/60">Estimated Value</span>
                  <span className="font-bold text-xl">$12,500 - $18,000</span>
                </div>
                <div className="flex justify-between py-3 border-b border-charcoal/5">
                  <span className="text-charcoal/60">Retail Price</span>
                  <span className="font-bold">$22,500</span>
                </div>
                <div className="flex justify-between py-3 border-b border-charcoal/5">
                  <span className="text-charcoal/60">Recommendation</span>
                  <span className="font-bold text-warning">PRICE HIGH / HOLD</span>
                </div>
              </div>
              <p className="mt-6 text-sm italic text-charcoal/50">
                "Strong keyword pairing with .com extension. Highly brandable for VC or tech startups."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="font-serif text-4xl mb-8">Ready to value your portfolio?</h2>
        <Link to="/valuation" className="px-10 py-5 bg-warning text-charcoal rounded-full font-bold text-lg hover:bg-warning/90 shadow-lg shadow-warning/20 transition-all">
          Start Free Appraisal
        </Link>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-3xl border border-charcoal/5 bg-white hover:border-warning/30 transition-all group">
    <div className="mb-6 p-4 bg-sand rounded-2xl w-fit group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement, { size: 32 })}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-charcoal/60 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
