
import React, { useState } from 'react';
import { Upload, LayoutDashboard, FileText, ArrowRight, TrendingUp, AlertCircle, PieChart, Loader2, Trash2 } from 'lucide-react';
import { valuatePortfolio } from '../services/geminiService';
import { ValuationResult } from '../types';

const PortfolioPage: React.FC = () => {
  const [domainsText, setDomainsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<ValuationResult[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalysis = async () => {
    const list = domainsText.split(/[\n,]/).map(d => d.trim()).filter(d => d.length > 0);
    if (list.length === 0) return;

    setLoading(true);
    try {
      const results = await valuatePortfolio(list);
      setPortfolio(results);
      setAnalyzed(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = portfolio.reduce((acc, curr) => acc + curr.fairValue, 0);
  const avgValue = portfolio.length > 0 ? totalValue / portfolio.length : 0;
  const topAsset = portfolio.length > 0 ? portfolio.reduce((prev, current) => (prev.fairValue > current.fairValue) ? prev : current) : null;

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Portfolio Analysis</h1>
          <p className="text-charcoal/60">Upload multiple domains for bulk valuation and strategic grouping.</p>
        </div>
        {!analyzed && (
          <button 
            onClick={() => setAnalyzed(false)} 
            className="px-6 py-3 bg-white border border-charcoal/10 rounded-full text-sm font-bold flex items-center space-x-2 hover:bg-sand transition-colors"
          >
            <Upload size={18} />
            <span>Import CSV</span>
          </button>
        )}
      </div>

      {!analyzed ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 border border-charcoal/5 shadow-sm">
              <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/40 mb-4">Paste domains (One per line or comma separated)</label>
              <textarea
                value={domainsText}
                onChange={(e) => setDomainsText(e.target.value)}
                placeholder="domain1.com&#10;domain2.ai&#10;keyword.io"
                className="w-full h-80 px-6 py-4 rounded-2xl bg-sand/30 border-2 border-transparent focus:border-warning outline-none resize-none font-mono text-sm leading-relaxed"
              />
              <div className="mt-8 flex justify-between items-center">
                <span className="text-sm text-charcoal/40">{domainsText.split('\n').filter(l => l.trim()).length} domains detected</span>
                <button
                  onClick={handleAnalysis}
                  disabled={loading || !domainsText}
                  className="px-10 py-4 bg-charcoal text-white rounded-full font-bold hover:bg-charcoal/90 disabled:opacity-50 transition-all flex items-center space-x-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <TrendingUp size={20} />}
                  <span>{loading ? 'Analyzing Portfolio...' : 'Run Intelligence Scan'}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-accent/10 rounded-3xl p-8 border border-accent/20">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <AlertCircle size={18} className="text-warning" />
                <span>Bulk Analysis Limits</span>
              </h3>
              <ul className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
                <li>• Free users: Up to 5 domains</li>
                <li>• Pro users: Up to 500 domains</li>
                <li>• Broker users: Up to 2,000 domains</li>
              </ul>
              <button className="mt-8 text-warning font-bold flex items-center space-x-2 hover:underline">
                <span>View Plans</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Dashboard Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Estimated Value" value={`$${totalValue.toLocaleString()}`} icon={<PieChart className="text-warning" />} />
            <StatCard label="Average Asset Value" value={`$${avgValue.toLocaleString()}`} icon={<TrendingUp className="text-success" />} />
            <StatCard label="Total Assets" value={portfolio.length.toString()} icon={<LayoutDashboard className="text-charcoal/60" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Asset List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-charcoal/5 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-sand/30 border-b border-charcoal/5">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Domain</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Value (Fair)</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Action</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5">
                    {portfolio.map((item, idx) => (
                      <tr key={idx} className="hover:bg-sand/20 transition-colors cursor-pointer group">
                        <td className="px-6 py-4 font-medium">{item.domain}</td>
                        <td className="px-6 py-4 font-bold text-charcoal/80">${item.fairValue.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                            item.recommendation === 'HOLD' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          }`}>
                            {item.recommendation}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                             <div className="w-12 h-1.5 bg-sand rounded-full overflow-hidden">
                               <div className="h-full bg-warning" style={{ width: `${item.confidenceScore}%` }} />
                             </div>
                             <span className="text-[10px] font-bold text-charcoal/40">{item.confidenceScore}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-charcoal/5 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center space-x-2">
                  <FileText size={18} />
                  <span>Key Insights</span>
                </h3>
                {topAsset && (
                  <div className="mb-6">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase block mb-1">Top Performing Asset</label>
                    <div className="text-sm font-bold text-warning">{topAsset.domain}</div>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="p-4 bg-sand/50 rounded-2xl">
                    <p className="text-xs text-charcoal/60 italic leading-relaxed">
                      "Your portfolio is heavily weighted towards .com. High liquidity detected across top assets."
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setAnalyzed(false)}
                className="w-full py-4 bg-sand text-charcoal font-bold rounded-full flex items-center justify-center space-x-2 border border-charcoal/10 hover:bg-accent transition-all"
              >
                <Trash2 size={18} />
                <span>Reset Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm flex items-center space-x-4">
    <div className="p-3 bg-sand rounded-2xl">
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <div>
      <div className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-serif font-bold text-charcoal">{value}</div>
    </div>
  </div>
);

export default PortfolioPage;
