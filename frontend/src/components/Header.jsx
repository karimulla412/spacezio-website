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
    { name: 'Projects', href: '/projects' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Contact', href: '/contact' }
  ];

  // Track scroll progress and depth
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setIsScrolled(window.scrollY > 30);
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
      {/* Scroll Progress Bar at the top */}
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
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-900/5' 
          : 'bg-[#FCFCF7]/95 backdrop-blur-md border-b border-slate-200/80'
      }`}>
        
        {/* Top Bar - Quick Trust & Direct Contact (Hidden on mobile for clean viewport) */}
        <div className="bg-[#F8F9FA] border-b border-slate-200/80 hidden sm:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-xs sm:text-[13px] font-medium text-slate-600">
              <div className="flex items-center gap-6">
                <a 
                  href="tel:+919686511132" 
                  className="flex items-center hover:text-[#F35A61] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 mr-1.5 text-[#F35A61]" />
                  <span>+91 96865 11132</span>
                </a>
                <a 
                  href="mailto:info@spacexio.com" 
                  className="flex items-center hover:text-[#F35A61] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5 text-[#F35A61]" />
                  <span>info@spacexio.com</span>
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                {/* City Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                    className="flex items-center gap-1.5 text-slate-800 hover:text-[#F35A61] font-semibold bg-white border border-slate-300 hover:border-[#F35A61]/60 px-2.5 py-1 rounded-full transition-all cursor-pointer shadow-2xs"
                  >
                    <MapPin className="h-3 w-3 text-[#01B3D1]" />
                    <span>{selectedCity}</span>
                    <ChevronDown className="h-3 w-3 text-slate-500" />
                  </button>
                  {cityDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-fade-in">
                      <div className="px-3 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
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
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                            selectedCity === city ? 'text-[#F35A61] font-bold bg-[#FDF2F3]' : 'text-slate-700'
                          }`}
                        >
                          <span>{city}</span>
                          {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#F35A61]"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-slate-300">•</span>
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  10-Yr Structural Warranty
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono hidden md:inline">430+ QA Checks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            
            {/* Brand Logo with Studio Badge */}
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0" aria-label="SPACEXIO - Architecture & Construction">
              <img 
                src="/logo-light-horizontal.png" 
                alt="SPACEXIO" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                width="214"
                height="36"
              />
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FDF2F3] text-[#F35A61] border border-[#FCA5A9]">
                Studio
              </span>
            </Link>

            {/* Desktop Navigation Links (Increased font size & enhanced readability) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3.5 xl:px-4 py-2 rounded-xl text-sm xl:text-[15px] font-semibold transition-all duration-200 ${
                      active
                        ? 'text-[#F35A61] bg-[#FDF2F3] border border-[#FCA5A9] font-bold shadow-2xs'
                        : 'text-slate-800 hover:text-[#F35A61] hover:bg-slate-100/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Marketing & Business Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5 lg:gap-3 flex-shrink-0">
              <Link to="/cost-calculator">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-300 bg-white text-slate-800 hover:border-[#01B3D1] hover:text-[#01B3D1] hover:bg-[#EFFBFC] font-bold text-xs lg:text-[13px] px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  <Calculator className="mr-1.5 h-3.5 w-3.5 text-[#01B3D1]" />
                  Estimate Cost
                </Button>
              </Link>
              <Link to="/site-visit">
                <Button
                  size="sm"
                  className="bg-[#F35A61] hover:bg-[#E04850] text-white font-bold text-xs lg:text-[13px] px-4 py-2.5 rounded-xl shadow-md shadow-[#F35A61]/25 transition-all cursor-pointer"
                >
                  Book Site Visit
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden text-slate-800 hover:text-slate-950 p-2.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-[#F35A61]" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200 bg-white animate-fade-in rounded-b-3xl shadow-2xl px-4 space-y-3">
              <div className="flex flex-col gap-1.5">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-4 py-3 rounded-xl transition-all font-semibold text-base flex items-center justify-between ${
                        active
                          ? 'text-[#F35A61] bg-[#FDF2F3] font-bold border border-[#FCA5A9]/50'
                          : 'text-slate-800 hover:text-[#F35A61] hover:bg-slate-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </Link>
                  );
                })}

                {/* City selection on mobile */}
                <div className="pt-2 pb-1 px-4 text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
                  City Hub: <span className="text-slate-900 font-bold">{selectedCity}</span>
                </div>

                {/* Mobile Call-To-Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 mt-1">
                  <Link 
                    to="/cost-calculator"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 bg-slate-50 text-slate-800 font-bold text-xs py-5 rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Calculator className="h-4 w-4 text-[#01B3D1]" />
                      Estimate Cost
                    </Button>
                  </Link>
                  <Link 
                    to="/site-visit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button
                      className="w-full bg-[#F35A61] hover:bg-[#E04850] text-white font-bold text-xs py-5 rounded-xl shadow-md shadow-[#F35A61]/25 flex items-center justify-center"
                    >
                      Book Site Visit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Bottom Floating Action Bar (Responsive Mobile Viewport) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl safe-area-pb">
        <a
          href="tel:+919686511132"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-[12px] font-bold active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#F35A61]" />
          <span>Call Desk</span>
        </a>
        <a
          href="https://wa.me/919686511132?text=Hello%20Spacexio,%20I%20would%20like%20to%20discuss%20my%20house%20construction%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold active:scale-95 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
        <Link
          to="/site-visit"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#F35A61] text-white text-[12px] font-bold shadow-md shadow-[#F35A61]/25 active:scale-95 transition-all text-center"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </Link>
      </div>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 sm:bottom-20 right-4 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white hover:bg-[#F35A61] border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
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
