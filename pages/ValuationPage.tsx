
import React, { useState } from 'react';
import { Search, Loader2, Info, AlertCircle, TrendingUp, DollarSign, BarChart2, Download, Share2 } from 'lucide-react';
import { valuateDomain } from '../services/geminiService';
import { ValuationResult, RecommendationAction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ValuationPage: React.FC = () => {
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValuate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!domainInput || loading) return;

    setLoading(true);
    setError(null);
    try {
      const formattedDomain = domainInput.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
      const valuation = await valuateDomain(formattedDomain);
      setResult(valuation);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? [
    { name: 'Low', value: result.lowValue },
    { name: 'Fair', value: result.fairValue },
    { name: 'Premium', value: result.premiumValue }
  ] : [];

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Domain Appraisal</h1>
        <p className="text-charcoal/60">Professional AI analysis for individual domain names.</p>
      </div>

      {/* Input Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <form onSubmit={handleValuate} className="relative group">
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="enterdomain.com"
            className="w-full px-8 py-6 rounded-full bg-white border-2 border-charcoal/5 focus:border-warning outline-none text-lg shadow-sm group-hover:shadow-md transition-all font-medium"
          />
          <button
            type="submit"
            disabled={loading || !domainInput}
            className="absolute right-2 top-2 bottom-2 px-8 bg-charcoal text-white rounded-full font-bold hover:bg-charcoal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-danger/5 text-danger border border-danger/10 rounded-2xl flex items-center space-x-3 text-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Appraisal Card */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-charcoal/5 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold font-serif text-charcoal mb-2">{result.domain}</h2>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      result.recommendation === RecommendationAction.HOLD ? 'bg-success/10 text-success' :
                      result.recommendation === RecommendationAction.SELL ? 'bg-warning/10 text-warning' :
                      result.recommendation === RecommendationAction.DROP ? 'bg-danger/10 text-danger' : 'bg-accent/20 text-charcoal/60'
                    }`}>
                      {result.recommendation.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-charcoal/40 font-medium">Confidence: {result.confidenceScore}%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-3 bg-sand rounded-full hover:bg-accent transition-colors"><Download size={18} /></button>
                  <button className="p-3 bg-sand rounded-full hover:bg-accent transition-colors"><Share2 size={18} /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
                <div>
                  <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block mb-4">Estimated Fair Value</label>
                  <div className="text-5xl font-serif font-bold text-charcoal">
                    ${result.fairValue.toLocaleString()}
                  </div>
                  <div className="mt-2 text-sm text-charcoal/60">
                    Range: ${result.lowValue.toLocaleString()} – ${result.premiumValue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block mb-4">Pricing Strategy</label>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Retail Price</span>
                      <span className="font-bold">${result.retailPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Wholesale Floor</span>
                      <span className="font-bold">${result.wholesalePrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} hide />
                    <Tooltip 
                      cursor={{fill: '#F5F2EA'}}
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#8A6E1E' : '#E6DCC3'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scores & Recs */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-charcoal/5 shadow-sm">
                <h3 className="font-bold mb-6 flex items-center space-x-2">
                  <BarChart2 size={18} />
                  <span>Market Scores</span>
                </h3>
                <div className="space-y-6">
                  <ScoreBar label="Liquidity" score={result.liquidityScore} />
                  <ScoreBar label="End-User Appeal" score={result.appealScore} />
                  <ScoreBar label="TLD Strength" score={result.analysis.tldStrength} />
                  <ScoreBar label="Brandability" score={result.analysis.brandability} />
                </div>
              </div>

              <div className="bg-sand rounded-3xl p-6 border border-charcoal/5">
                <h3 className="font-bold mb-4 flex items-center space-x-2">
                  <AlertCircle size={18} />
                  <span>Broker's Tip</span>
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed italic">
                  "{result.recommendationReason}"
                </p>
              </div>
            </div>
          </div>

          {/* Logic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-charcoal/5 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center space-x-2">
                <Info size={18} className="text-warning" />
                <span>Valuation Logic</span>
              </h3>
              <ul className="space-y-4">
                {result.logic.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm leading-relaxed text-charcoal/70">
                    <span className="text-warning font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-charcoal/5 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center space-x-2">
                <TrendingUp size={18} className="text-warning" />
                <span>Comparable Sales</span>
              </h3>
              <div className="space-y-4">
                {result.comparableSales.map((sale, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-charcoal/5 last:border-0">
                    <div className="text-sm font-medium">{sale.domain}</div>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="font-bold text-success">${sale.price.toLocaleString()}</span>
                      <span className="text-charcoal/40 text-xs">{sale.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder State */}
      {!result && !loading && (
        <div className="mt-24 text-center py-20 border-2 border-dashed border-charcoal/10 rounded-3xl">
          <div className="bg-sand w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-charcoal/20" size={32} />
          </div>
          <h3 className="font-bold text-xl mb-2">No domain analyzed yet</h3>
          <p className="text-charcoal/40 max-w-sm mx-auto">
            Enter a domain name above to get a professional, AI-powered valuation report.
          </p>
        </div>
      )}
    </div>
  );
};

const ScoreBar: React.FC<{ label: string; score: number }> = ({ label, score }) => (
  <div>
    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
      <span className="text-charcoal/40">{label}</span>
      <span className="text-charcoal">{score}/100</span>
    </div>
    <div className="h-2 bg-sand rounded-full overflow-hidden">
      <div 
        className="h-full bg-warning transition-all duration-1000 ease-out" 
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

export default ValuationPage;
