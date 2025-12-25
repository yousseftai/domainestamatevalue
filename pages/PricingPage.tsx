
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check, ShieldCheck } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">Investment-Grade Intelligence, <br /><span className="text-warning italic">Flexible Plans.</span></h1>
        <p className="text-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you're holding your first domain or managing a massive portfolio, we have the tools you need to maximize ROI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {PRICING_PLANS.map((plan) => (
          <div 
            key={plan.id}
            className={`relative p-8 rounded-[2rem] border-2 transition-all flex flex-col ${
              plan.isPopular ? 'border-warning bg-white shadow-xl scale-105 z-10' : 'border-charcoal/5 bg-white/50 hover:bg-white hover:border-charcoal/10'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-warning text-charcoal px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Most Trusted
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-bold font-serif">{plan.price}</span>
                <span className="text-charcoal/40 text-sm">/month</span>
              </div>
            </div>
            <div className="space-y-4 mb-12 flex-grow">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm">
                  <div className="mt-1 bg-success/10 p-0.5 rounded-full">
                    <Check size={12} className="text-success" />
                  </div>
                  <span className="text-charcoal/70 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
            <button className={`w-full py-4 rounded-full font-bold transition-all ${
              plan.isPopular ? 'bg-warning text-charcoal hover:bg-warning/90' : 'bg-charcoal text-white hover:bg-charcoal/90'
            }`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-sand/50 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-charcoal/5">
        <div className="flex items-center space-x-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <ShieldCheck size={48} className="text-warning" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Enterprise & API Customization</h3>
            <p className="text-charcoal/60 text-sm max-w-md">
              Need custom volume or deep API integration for your registrar or brokerage? Let's build a dedicated solution.
            </p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white border border-charcoal/10 rounded-full font-bold hover:bg-sand transition-all">
          Talk to Experts
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
