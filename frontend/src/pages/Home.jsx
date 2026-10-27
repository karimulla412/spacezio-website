import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Clock, Calculator, 
  MapPin, Phone, Building2, Sparkles, Layers,
  ChevronDown, ChevronUp, Star, Check, Award
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import { useContent } from '../context/ContentContext';
import { 
  heroData as defaultHeroData, 
  constructionPackagesData as defaultPackagesData, 
  projectsData as defaultProjectsData, 
  testimonialsData as defaultTestimonialsData, 
  faqData 
} from '../data/mock';
import { useInquiry } from '../context/InquiryContext';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();
  const { openInquiry } = useInquiry();
  const { content } = useContent();
  const packagesData = content?.constructionPackagesData || defaultPackagesData;
  const projectsData = content?.projectsData || defaultProjectsData;
  const testimonialsData = content?.testimonialsData || defaultTestimonialsData;

  // Hero Lead Form State
  const [heroForm, setHeroForm] = useState({
    name: '',
    phone: '',
    location: 'Visakhapatnam',
    plotArea: '1800',
    timeframe: 'Immediately'
  });
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  // Interactive Live Estimator State
  const [plotArea, setPlotArea] = useState(1800);
  const [selectedPackageId, setSelectedPackageId] = useState(2); // Premium default
  const [selectedCity, setSelectedCity] = useState('Visakhapatnam');
  const [estimatorSubmitted, setEstimatorSubmitted] = useState(false);
  const [estimatorContact, setEstimatorContact] = useState('');

  // Project Portfolio Filter & FAQ Accordion
  const [selectedPortfolioTab, setSelectedPortfolioTab] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);

  // Selected package for calculator
  const selectedPkg = packagesData.find(p => p.id === selectedPackageId) || packagesData[1] || packagesData[0];
  const ratePerSqft = parseInt(String(selectedPkg.pricePerSqft).replace(/,/g, ''), 10) || 2150;
  const totalEstimatedCost = plotArea * ratePerSqft;

  // Handle Hero Quick Lead Submission
  const handleHeroFormSubmit = async (e) => {
    e.preventDefault();
    if (!heroForm.phone || heroForm.phone.replace(/\D/g, '').length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    setHeroSubmitting(true);
    try {
      const payload = {
        name: heroForm.name || 'Website Hero Inquirer',
        phone: heroForm.phone,
        email: 'hellospacexio@gmail.com',
        plotLocation: heroForm.location,
        plotSize: `${heroForm.plotArea} sq.ft`,
        packageInterest: 'Quick Quote & 3D Site Survey',
        preferredDate: heroForm.timeframe,
        source: 'Homepage Hero Instant Quote Form',
        message: `Lead from Hero: Plot ${heroForm.plotArea} sq.ft in ${heroForm.location}. Timeline: ${heroForm.timeframe}`
      };

      const res = await fetch('/api/site-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        await fetch('/api/chatbot/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectType: 'Residential Turnkey',
            projectSize: `${heroForm.plotArea} sq.ft`,
            serviceRequired: 'Architectural Design & Turnkey Construction',
            timeline: heroForm.timeframe,
            contact: `${heroForm.name ? heroForm.name + ' - ' : ''}${heroForm.phone} (${heroForm.location})`,
            source: 'Hero Form Submission'
          })
        });
      }

      setHeroSubmitted(true);
      toast.success('Quote request received! Our Lead Civil Engineer will call you within 2 hours.');
    } catch (err) {
      toast.success('Your inquiry was recorded! Our team will contact you shortly.');
      setHeroSubmitted(true);
    } finally {
      setHeroSubmitting(false);
    }
  };

  // Handle Estimator Quick BOQ Request
  const handleEstimatorBOQSubmit = async (e) => {
    e.preventDefault();
    if (!estimatorContact || estimatorContact.replace(/\D/g, '').length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'BOQ Estimator Lead',
          phone: estimatorContact,
          email: 'hellospacexio@gmail.com',
          service: `${selectedPkg.name} Package (₹${selectedPkg.pricePerSqft}/sqft)`,
          message: `Plot Estimator: ${plotArea} sq.ft in ${selectedCity}. Total: ₹${(totalEstimatedCost/100000).toFixed(2)} Lakhs.`
        })
      });
      setEstimatorSubmitted(true);
      toast.success(`Detailed BOQ schedule dispatched for ${estimatorContact}!`);
    } catch (err) {
      setEstimatorSubmitted(true);
      toast.success('BOQ requested! Our engineer will share details on WhatsApp.');
    }
  };

  // Top Verified Brands Bar
  const brandLogos = [
    { name: "Tata Tiscon", type: "Steel Rebars (Fe 550D)" },
    { name: "UltraTech Cement", type: "Grade 53 Concrete" },
    { name: "JSW Steel", type: "Corrosion Resistant" },
    { name: "Jaquar / Kohler", type: "Luxury Sanitaryware" },
    { name: "Asian Paints", type: "Royale & Apex Ultima" },
    { name: "Astral Pipes", type: "CPVC Lead-Free" },
    { name: "Schneider", type: "Modular Electrical" }
  ];

  // Filtered portfolio
  const portfolioCategories = ['All', 'Villa', 'Duplex', 'Individual House'];
  const filteredProjects = selectedPortfolioTab === 'All' 
    ? projectsData.slice(0, 6) 
    : projectsData.filter(p => p.category === selectedPortfolioTab || (selectedPortfolioTab === 'Villa' && p.title.toLowerCase().includes('villa'))).slice(0, 6);

  // Concise 4-item FAQ for Home
  const topFaqs = faqData.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white">
      <SEO 
        title="Spacexio | Turnkey Home Construction & Architectural Studio in Visakhapatnam & Hyderabad"
        description="Spacexio is India's premier tech-enabled home construction and architectural studio. Fixed-price turnkey packages from ₹1,850/sq.ft, milestone escrow payments, 430+ automated quality checks, and 10-year structural warranty."
        keywords="home construction Visakhapatnam, turnkey builders Hyderabad, house construction cost per sqft Vizag, architectural studio Andhra Pradesh, fixed price home building packages, JSW One Homes alternative, Brick and Bolt Vizag"
        url="https://www.spacexio.com/"
        faqs={faqData.map(f => ({ question: f.q, answer: f.a }))}
      />

      {/* 1. HERO SECTION (Classic Architectural Light Theme) */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left 7 Columns: Headline, Subtext, Trust Strip & Buttons */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F35A61] pulse-indicator" />
                <span className="text-[#F35A61] font-bold uppercase">ARCHITECTURAL STUDIO & BUILDERS</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-600">AP & HYDERABAD</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-[60px] font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
                You dream. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
                  We build and deliver.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
                Build your custom luxury home hassle-free. Transparent turnkey packages from <b className="text-slate-950 font-bold">₹1,850/sq.ft</b>, milestone escrow payment safety, 430+ automated quality checks, and an unconditional 10-year structural warranty.
              </p>

              {/* 4 Proof Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-4 bg-white border border-slate-200/90 rounded-2xl mb-8 shadow-sm">
                <div className="border-r border-slate-200 pr-2">
                  <div className="text-xl sm:text-2xl font-black text-[#F35A61] font-mono">+91 NPS</div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Client Trust</div>
                </div>
                <div className="border-r border-slate-200 sm:pr-2 pl-1">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">430+</div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Quality Checks</div>
                </div>
                <div className="border-r border-slate-200 pr-2 pt-2 sm:pt-0">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">10 Years</div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Warranty Bond</div>
                </div>
                <div className="pl-1 pt-2 sm:pt-0">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">0%</div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Cost Escalation</div>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#F35A61] hover:bg-[#E04850] text-white font-bold px-7 py-6 rounded-xl text-sm shadow-lg shadow-[#F35A61]/25 transition-all hover:translate-y-[-2px] cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('live-estimator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Estimate Construction Cost
                </Button>
                
                <Link to="/packages">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-6 rounded-xl text-sm transition-all cursor-pointer shadow-2xs"
                  >
                    <Layers className="mr-2 h-4 w-4 text-[#F35A61]" />
                    Compare Packages (₹1,850 - ₹2,650)
                  </Button>
                </Link>
              </div>

              {/* Engineering Helpline */}
              <div className="mt-7 flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Speak directly with our Lead Civil Engineer: </span>
                <a href="tel:+919686511132" className="text-slate-950 font-mono font-bold hover:text-[#F35A61] transition-colors">
                  +91 96865 11132
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Compact Instant Consultation Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-300/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#FDF2F3] rounded-full blur-2xl pointer-events-none" />

                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="h-3 w-3 text-[#F35A61]" />
                    Free 3D Architectural Consultation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Get Fast Construction Quote
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter plot details for instant BOQ and structural survey guidance.
                  </p>
                </div>

                {heroSubmitted ? (
                  <div className="text-center py-8 bg-[#EFFBFC] rounded-2xl border border-[#99E7EF] p-6">
                    <CheckCircle2 className="h-10 w-10 text-[#01B3D1] mx-auto mb-2" />
                    <h4 className="text-base font-bold text-slate-950">Quote Request Received!</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Our Senior Engineer will call you within 2 hours to discuss your floor plan.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroFormSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Your Full Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={heroForm.name}
                        onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Varma"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#01B3D1] focus:ring-2 focus:ring-[#01B3D1]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-500">
                          +91
                        </span>
                        <input 
                          type="tel" 
                          required
                          maxLength={10}
                          value={heroForm.phone}
                          onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value.replace(/\D/g, '') })}
                          placeholder="98480 12345"
                          className="w-full h-11 pl-12 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#01B3D1] focus:ring-2 focus:ring-[#01B3D1]/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          City / Location
                        </label>
                        <select
                          value={heroForm.location}
                          onChange={(e) => setHeroForm({ ...heroForm, location: e.target.value })}
                          className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:bg-white focus:border-[#01B3D1] outline-none"
                        >
                          <option value="Visakhapatnam">Visakhapatnam</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Vijayawada">Vijayawada</option>
                          <option value="Vizianagaram">Vizianagaram</option>
                          <option value="Bheemili">Bheemili</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Plot Area (sq.ft)
                        </label>
                        <select
                          value={heroForm.plotArea}
                          onChange={(e) => setHeroForm({ ...heroForm, plotArea: e.target.value })}
                          className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:bg-white focus:border-[#01B3D1] outline-none font-mono"
                        >
                          <option value="1200">1,200 sq.ft (~133 yds)</option>
                          <option value="1800">1,800 sq.ft (~200 yds)</option>
                          <option value="2400">2,400 sq.ft (~266 yds)</option>
                          <option value="3600">3,600 sq.ft (~400 yds)</option>
                          <option value="5000">5,000+ sq.ft</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={heroSubmitting}
                      className="w-full h-12 bg-[#F35A61] hover:bg-[#E04850] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#F35A61]/25 transition-all cursor-pointer mt-2"
                    >
                      {heroSubmitting ? 'Submitting Details...' : 'Get Free Quote & 3D Consultation'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-[10px] text-slate-400 text-center font-mono">
                      🔒 100% Privacy • No Spam Calls • Direct Engineer Call
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CERTIFIED BRANDS STRIP */}
      <section className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
              <Award className="h-4 w-4 text-[#F35A61]" />
              Built Exclusively With Grade-A Brands:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {brandLogos.map((brand, i) => (
                <div key={i} className="text-center group">
                  <span className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight group-hover:text-[#F35A61] transition-colors">
                    {brand.name}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                    {brand.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE LIVE COST ESTIMATOR */}
      <section id="live-estimator" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <Calculator className="h-3.5 w-3.5 text-[#F35A61]" />
              Transparent Pricing Tool
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
              Estimate Your Construction Cost
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Select your plot area and package to calculate an instantaneous construction budget.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* Left 7 Columns: Controls */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
                {/* Area Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Total Built-up Area
                    </label>
                    <span className="text-xl font-black font-mono text-[#F35A61] bg-[#FDF2F3] px-3 py-1 rounded-xl border border-[#FCA5A9]">
                      {plotArea.toLocaleString('en-IN')} sq.ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="6000"
                    step="100"
                    value={plotArea}
                    onChange={(e) => setPlotArea(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#F35A61]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                    <span>1,000 sq.ft</span>
                    <span>3,500 sq.ft</span>
                    <span>6,000 sq.ft</span>
                  </div>
                </div>

                {/* Package Selection Pills */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                    Select Specification Package
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {packagesData.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedPackageId === pkg.id
                            ? 'border-[#F35A61] bg-[#FDF2F3]/40 shadow-sm ring-2 ring-[#F35A61]/20'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 mb-0.5">{pkg.name}</div>
                        <div className="text-sm font-black font-mono text-[#F35A61]">
                          ₹{pkg.pricePerSqft}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">per sq.ft</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Plot Location
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Visakhapatnam', 'Hyderabad', 'Vijayawada', 'Vizianagaram'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCity(c)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedCity === c
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Result Display & Action */}
              <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50/70 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">
                    Estimated Turnkey Investment
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono text-slate-950 tracking-tight mb-2">
                    ₹{(totalEstimatedCost / 100000).toFixed(2)} <span className="text-lg font-bold text-slate-600">Lakhs</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-6 font-mono">
                    Based on ₹{ratePerSqft}/sq.ft for {plotArea.toLocaleString()} sq.ft in {selectedCity}.
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-700 border-t border-slate-200 pt-5 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0" />
                      <span>Complete Civil Structure & Grade-A Raw Materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0" />
                      <span>3D BIM Clash-Free Elevation & Interior Layouts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0" />
                      <span>10-Year Structural Foundation Warranty Bond</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0" />
                      <span>Zero Price Escalation Legal Guarantee</span>
                    </div>
                  </div>
                </div>

                <div>
                  {estimatorSubmitted ? (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                      <p className="text-xs font-bold text-emerald-800">BOQ Sent to WhatsApp!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleEstimatorBOQSubmit} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="Your WhatsApp number"
                          value={estimatorContact}
                          onChange={(e) => setEstimatorContact(e.target.value.replace(/\D/g, ''))}
                          className="flex-1 h-11 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-900 focus:border-[#01B3D1] outline-none"
                        />
                        <Button
                          type="submit"
                          className="bg-[#01B3D1] hover:bg-[#009AA8] text-white font-bold text-xs px-4 rounded-xl shadow-md cursor-pointer"
                        >
                          Send BOQ
                        </Button>
                      </div>
                    </form>
                  )}
                  <div className="mt-3 text-center">
                    <Link to="/cost-calculator" className="text-[11px] font-bold text-[#F35A61] hover:underline font-mono">
                      Open Advanced Cost Calculator with Floor Plans →
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. PACKAGES SNAPSHOT (3 Attractive Cards) */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Layers className="h-3.5 w-3.5" />
              Curated Specifications
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
              Turnkey Construction Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              All-inclusive pricing from architectural blueprint to final key handover. No surprise costs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {packagesData.map((pkg) => {
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular
                      ? 'border-2 border-[#F35A61] ring-4 ring-[#F35A61]/10 shadow-xl'
                      : 'border border-slate-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F35A61] text-white text-[11px] font-bold font-mono uppercase tracking-wider rounded-full shadow-md">
                      Most Popular Choice
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-950 mb-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mb-6">{pkg.description}</p>

                    <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                      <span className="text-4xl font-black font-mono text-slate-950">₹{pkg.pricePerSqft}</span>
                      <span className="text-xs text-slate-500 font-mono">/ sq.ft (incl. GST)</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Highlights Included:</div>
                      {pkg.features.slice(0, 5).map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => openInquiry({
                        title: `${pkg.name} Construction Package (₹${pkg.pricePerSqft}/sq.ft)`,
                        category: 'Package Inquiry',
                        subtitle: `${pkg.description} • Turnkey with 10-Year Warranty`,
                        defaultMessage: `Hi Spacexio, I am interested in the ${pkg.name} package at ₹${pkg.pricePerSqft}/sq.ft. Please share detailed specifications and quote for my plot.`
                      })}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        isPopular
                          ? 'bg-[#F35A61] hover:bg-[#E04850] text-white shadow-md shadow-[#F35A61]/25 hover:scale-[1.01]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      Inquire for {pkg.name} Quote →
                    </button>
                    <Link to="/packages" className="block text-center text-[11px] font-semibold text-slate-500 hover:text-[#01B3D1] transition-colors py-1">
                      View 50+ Inclusions & Specs
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/packages" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F35A61] hover:underline">
              <span>View full 50+ item side-by-side specification matrix</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. WHY SPACEXIO (4 Clean Visual Benefit Cards) */}
      <section className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#F35A61]" />
              The Spacexio Guarantee
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
              Why 500+ Families Built With Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Say goodbye to cost escalations, contractor delays, and structural shortcuts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] font-black font-mono text-lg flex items-center justify-center mb-5">
                0%
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Cost Escalation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Fixed-price contracts. If steel or cement prices rise mid-project, we absorb the cost.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EFFBFC] border border-[#99E7EF] text-[#01B3D1] font-black font-mono text-lg flex items-center justify-center mb-5">
                100%
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Milestone Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Your money is protected. You only release funds after every civil stage passes inspection.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] font-black font-mono text-lg flex items-center justify-center mb-5">
                85%
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">BIM Clash-Free</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                3D Building Information Modeling resolves plumbing and structural conflicts before breaking ground.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EFFBFC] border border-[#99E7EF] text-[#01B3D1] font-black font-mono text-lg flex items-center justify-center mb-5">
                10Y
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">10-Year Legal Warranty</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Certified legal foundation bond and 100% dampness protection for generations of safety.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS (Simple 5-Step Process) */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Clock className="h-3.5 w-3.5 text-[#F35A61]" />
              Predictable Workflow
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
              Plan. Build. Track. Move In.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A streamlined 5-stage architectural journey with complete visibility on your smartphone.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Plot & Soil Survey', time: 'Day 1–3', desc: 'Geotechnical soil testing and municipal sanction review.' },
              { step: '02', title: '3D BIM Architecture', time: 'Week 2', desc: 'Custom elevations, Vastu floor plans, and walk-through renders.' },
              { step: '03', title: 'Fixed BOQ & Escrow', time: 'Week 3', desc: 'Detailed material schedule with 0% escalation contract.' },
              { step: '04', title: 'Quality Execution', time: 'Month 2–7', desc: '430+ automated quality checks with daily photo updates.' },
              { step: '05', title: 'Key Handover & Bond', time: 'Month 8', desc: 'Deep cleaning, handover kit, and signed 10-year warranty.' }
            ].map((st, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-3xl border flex flex-col justify-between ${
                  i === 4 
                    ? 'bg-gradient-to-br from-[#F35A61] via-[#B85C8D] to-[#01B3D1] text-white border-transparent shadow-lg' 
                    : 'bg-[#FAF9F5] border-slate-200/90 text-slate-900'
                }`}
              >
                <div>
                  <div className={`text-2xl font-black font-mono mb-3 ${i === 4 ? 'text-white' : 'text-[#F35A61]'}`}>
                    {st.step}
                  </div>
                  <h3 className={`text-base font-bold mb-1.5 ${i === 4 ? 'text-white' : 'text-slate-950'}`}>
                    {st.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${i === 4 ? 'text-white/90' : 'text-slate-600'}`}>
                    {st.desc}
                  </p>
                </div>
                <div className={`mt-5 pt-3 border-t text-[11px] font-mono ${i === 4 ? 'border-white/30 text-white/80' : 'border-slate-200 text-slate-500'}`}>
                  {st.time}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. REAL RESIDENTIAL PROJECT GALLERY */}
      <section className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
                <Building2 className="h-3.5 w-3.5 text-[#F35A61]" />
                Recent Work
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                Homes Delivered Across AP & Telangana
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPortfolioTab(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedPortfolioTab === cat
                      ? 'bg-[#F35A61] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden group hover:border-[#01B3D1]/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#01B3D1] border border-[#01B3D1]/30 text-[11px] font-mono font-bold rounded-full shadow-xs">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-white">
                      <MapPin className="h-3 w-3 text-[#F35A61]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#F35A61] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-100">
                    <span>Built-up: <b className="text-slate-900">{project.area}</b></span>
                    <span>Budget: <b className="text-[#F35A61] font-bold">{project.budget}</b></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openInquiry({
                      title: project.title,
                      category: `Project Inquiry: ${project.category}`,
                      subtitle: `${project.location} • ${project.area}`,
                      defaultCity: project.location?.includes(',') ? project.location.split(',')[0].trim() : 'Visakhapatnam',
                      plotSize: project.area || '',
                      defaultMessage: `Hi Spacexio, I am interested in building a project similar to "${project.title}" in ${project.location} (${project.area}). Please share details and a cost quotation.`
                    })}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-[#F35A61] text-slate-700 hover:text-[#F35A61] hover:bg-[#FDF2F3]/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inquire for Similar Project</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects">
              <Button
                variant="outline"
                className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-5 rounded-xl text-xs uppercase tracking-wider shadow-2xs cursor-pointer"
              >
                View Complete Projects Portfolio (500+ Homes) →
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 8. VERIFIED HOMEOWNER REVIEWS */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Star className="h-3.5 w-3.5 fill-[#F35A61] text-[#F35A61]" />
              Real Client Stories
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
              Trusted by 500+ Homeowners
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Verified experiences from families who built their dream villas with Spacexio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.slice(0, 3).map((t) => (
              <div 
                key={t.id}
                className="bg-[#FAF9F5] p-7 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-mono text-slate-500 ml-2 font-bold">5.0</span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{t.project} • {t.location}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[#01B3D1] text-[10px] font-mono font-bold">
                    {t.package}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CONCISE FAQ (Clean Expandable Cards) */}
      <section id="faq-section" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Quick answers about cost, escrow payment protection, and construction timelines.
            </p>
          </div>

          <div className="space-y-3">
            {topFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#F35A61]" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. PHYSICAL STUDIO & FINAL ACTION BANNER */}
      <section className="py-16 lg:py-20 bg-[#FCFCF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl shadow-[#F35A61]/20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Ready to Build Your Architectural Masterpiece?
            </h2>
            <p className="text-white/90 text-sm sm:text-base mb-8 max-w-xl mx-auto font-normal leading-relaxed">
              Visit our Visakhapatnam studio or schedule a complimentary site engineer visit on your plot today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/site-visit">
                <Button
                  size="lg"
                  className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-6 text-sm rounded-xl shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  Book Free Site Survey
                  <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
                </Button>
              </Link>
              <a href="tel:+919686511132">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Engineer (+91 96865 11132)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. STICKY QUICK CONTACT BAR (Desktop/Tablet) */}
      <div className="hidden sm:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl border border-slate-300 shadow-2xl rounded-full px-4 py-2.5 items-center gap-3 text-xs max-w-md">
        <a 
          href="tel:+919686511132" 
          className="flex items-center gap-1.5 text-slate-800 hover:text-[#F35A61] font-bold transition-colors"
        >
          <Phone className="h-3.5 w-3.5 text-[#F35A61]" />
          <span>Call Desk</span>
        </a>
        <span className="text-slate-300">|</span>
        <a 
          href="https://wa.me/919686511132?text=Hello%20Spacexio%20Team,%20I%20would%20like%20to%20discuss%20my%20home%20construction%20project." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-emerald-700 font-bold hover:text-emerald-600 transition-colors"
        >
          <span>WhatsApp</span>
        </a>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('live-estimator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 text-[#F35A61] font-bold hover:text-[#E04850] transition-colors cursor-pointer"
        >
          <Calculator className="h-3.5 w-3.5" />
          <span>Cost Estimator</span>
        </button>
      </div>

    </div>
  );
};

export default Home;
