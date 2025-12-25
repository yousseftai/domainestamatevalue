
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, LayoutDashboard, CreditCard, Info, Search } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Globe },
    { path: '/valuation', label: 'Valuation', icon: Search },
    { path: '/portfolio', label: 'Portfolio', icon: LayoutDashboard },
    { path: '/pricing', label: 'Pricing', icon: CreditCard },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal selection:bg-accent">
      <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight">DomainWorth <span className="text-warning">AI</span></span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-warning ${
                  location.pathname === item.path ? 'text-charcoal' : 'text-charcoal/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/valuation" className="px-4 py-2 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-charcoal/90 transition-all">
              Try It Free
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-sand border-t border-charcoal/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="font-serif text-2xl font-bold">DomainWorth AI</span>
              <p className="mt-4 text-charcoal/60 max-w-sm leading-relaxed">
                Empowering domain investors with transparent, data-driven valuations. 
                Built by professionals, for professionals. No hype, just intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-charcoal/60">
                <li><Link to="/valuation" className="hover:text-warning">Domain Appraisal</Link></li>
                <li><Link to="/portfolio" className="hover:text-warning">Portfolio Analytics</Link></li>
                <li><Link to="/pricing" className="hover:text-warning">Pricing Plans</Link></li>
                <li><a href="#" className="hover:text-warning">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Trust</h4>
              <ul className="space-y-2 text-sm text-charcoal/60">
                <li><Link to="/about" className="hover:text-warning">Our Methodology</Link></li>
                <li><a href="#" className="hover:text-warning">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-warning">Terms of Service</a></li>
                <li><a href="#" className="hover:text-warning">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center text-xs text-charcoal/40">
            <p>© 2024 DomainWorth AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-charcoal">Twitter</a>
              <a href="#" className="hover:text-charcoal">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
