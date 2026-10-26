import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, Calculator, ArrowUp, MessageCircle, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Visakhapatnam (HQ)');

  const cities = [
    'Visakhapatnam (HQ)',
    'Hyderabad',
    'Vijayawada',
    'Rajahmundry',
    'Kakinada',
    'Bengaluru'
  ];

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages' },
    { name: 'How It Works', href: '/process' },
    { name: 'Cost Estimator', href: '/cost-calculator' },
    { name: 'Projects', href: '/projects' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Contact', href: '/contact' }
  ];

  // Track scroll progress and depth for SXO & transitions
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setIsScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Scroll Progress Bar at the very top (SXO Engagement Signal) */}
      <div 
        className="scroll-progress-line"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl shadow-black/80' 
          : 'bg-black/80 backdrop-blur-md border-b border-zinc-800/60'
      }`}>
        
        {/* Top Bar - Quick Trust & Direct Contact */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-b border-zinc-800/80 hidden sm:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-xs font-medium">
              <div className="flex items-center gap-6">
                <a 
                  href="tel:+919686511132" 
                  className="flex items-center text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 mr-1.5 text-orange-500" />
                  +91 96865 11132
                </a>
                <a 
                  href="mailto:info@spacexio.com" 
                  className="flex items-center text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5 text-orange-500" />
                  info@spacexio.com
                </a>
              </div>
              <div className="text-zinc-400 flex items-center gap-4">
                {/* City Selector (Inspired by JSW One Homes & Brick & Bolt) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                    className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/40 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                  >
                    <MapPin className="h-3 w-3 text-orange-500" />
                    <span>{selectedCity}</span>
                    <ChevronDown className="h-3 w-3 text-zinc-400" />
                  </button>
                  {cityDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl py-1 z-50 animate-fade-in">
                      <div className="px-3 py-1 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        Operational Hubs
                      </div>
                      {cities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setSelectedCity(city);
                            setCityDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-zinc-900 transition-colors ${
                            selectedCity === city ? 'text-orange-400 font-bold bg-orange-500/10' : 'text-zinc-300'
                          }`}
                        >
                          <span>{city}</span>
                          {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span>•</span>
                <span className="text-zinc-200 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  10-Year Structural Warranty
                </span>
                <span>•</span>
                <span className="text-zinc-400 font-mono hidden md:inline">430+ QA Checks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-3.5">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="SPACEXIO - Architecture & Construction">
              <img 
                src="/logo-horizontal.png" 
                alt="SPACEXIO" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                width="214"
                height="36"
              />
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-600/10 text-orange-400 border border-orange-500/30">
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'text-orange-400 bg-orange-500/10 border border-orange-500/30 shadow-sm'
                        : 'text-zinc-300 hover:text-orange-400 hover:bg-zinc-800/60'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Marketing & Business Conversion Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/cost-calculator">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:border-orange-500 hover:text-orange-400 hover:bg-zinc-900 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                >
                  <Calculator className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
                  Estimate Cost
                </Button>
              </Link>
              <Link to="/site-visit">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-orange-600/30 shimmer-sweep transition-all cursor-pointer"
                >
                  Book Site Visit
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden text-zinc-300 hover:text-white p-2 rounded-xl hover:bg-zinc-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-zinc-800 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-4 py-3 rounded-xl transition-colors font-bold text-sm ${
                        active
                          ? 'text-orange-400 bg-orange-500/10 font-bold'
                          : 'text-zinc-300 hover:text-orange-500 hover:bg-zinc-800/60'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800 mt-2">
                  <Link 
                    to="/cost-calculator"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-zinc-800 bg-transparent text-zinc-300 hover:border-orange-500 hover:text-orange-500 font-bold text-xs rounded-xl"
                    >
                      <Calculator className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
                      Estimate
                    </Button>
                  </Link>
                  <Link 
                    to="/site-visit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/30"
                    >
                      Site Visit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* SXO Mobile Sticky Action Bar (Floats on mobile screens for immediate user engagement) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:+919686511132"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-bold active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-orange-500" />
          <span>Call Desk</span>
        </a>
        <a
          href="https://wa.me/919686511132?text=Hello%20Spacexio,%20I%20would%20like%20to%20discuss%20my%20house%20construction%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold active:scale-95 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>
        <Link
          to="/site-visit"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-bold shadow-md shadow-orange-600/30 active:scale-95 transition-all text-center"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </Link>
      </div>

      {/* Floating Back-to-Top Button (SXO Ease of Navigation) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-zinc-900/90 hover:bg-orange-600 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </>
  );
};

export default Header;
