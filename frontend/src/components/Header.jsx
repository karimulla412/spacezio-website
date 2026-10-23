import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, Calculator } from 'lucide-react';
import { Button } from '../components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-gray-800 transition-all duration-200">
      {/* Top Bar - Quick Trust & Direct Contact */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-xs font-medium">
            <div className="flex items-center gap-6">
              <a href="tel:+919686511132" className="flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                <Phone className="h-3.5 w-3.5 mr-1.5 text-orange-500" />
                +91 96865 11132
              </a>
              <a href="mailto:info@spacexio.com" className="flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                <Mail className="h-3.5 w-3.5 mr-1.5 text-orange-500" />
                info@spacexio.com
              </a>
            </div>
            <div className="text-gray-400 flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Visakhapatnam, Andhra Pradesh
              </span>
              <span>•</span>
              <span className="text-white font-semibold">10-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-white group-hover:text-orange-400 transition-colors">SPACE</span>
              <span className="text-orange-500">XIO</span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-500/30">
              Studio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-orange-400 bg-orange-500/10 border border-orange-500/20 shadow-sm'
                      : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800/60'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Marketing & Business Conversion Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 bg-transparent text-gray-300 hover:border-orange-500 hover:text-orange-500 hover:bg-gray-800/50 font-semibold text-xs px-3.5 py-2 rounded-lg"
              onClick={() => window.location.href = '/cost-calculator'}
            >
              <Calculator className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
              Estimate Cost
            </Button>
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md shadow-orange-600/30 transition-all duration-200"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Site Visit
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2.5 rounded-lg transition-colors font-semibold text-sm ${
                      active
                        ? 'text-orange-400 bg-orange-500/10 font-bold'
                        : 'text-gray-300 hover:text-orange-500 hover:bg-gray-800/60'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-800 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-gray-700 bg-transparent text-gray-300 hover:border-orange-500 hover:text-orange-500 font-semibold"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/cost-calculator';
                  }}
                >
                  <Calculator className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
                  Estimate Cost
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md shadow-orange-600/30"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/site-visit';
                  }}
                >
                  Site Visit
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
