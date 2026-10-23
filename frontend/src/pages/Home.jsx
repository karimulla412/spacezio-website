import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Eye, Cpu, Clock, Home as HomeIcon, Check, Calculator, 
  MapPin, PenTool, FileText, CheckCircle, Layers, Paintbrush, Key, Phone, 
  Mail, Award, Building2, Sparkles, ChevronRight, CheckCheck, Sliders, 
  Compass, Hammer, Calendar, Maximize2, ShieldCheck, Ruler, ArrowUpRight,
  HelpCircle, ChevronDown, ChevronUp, Copy, Globe, Search, MessageSquare,
  CheckCircle2, Share2, Sparkles as SparklesIcon, ExternalLink,
  Database, UserCheck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import { useContent } from '../context/ContentContext';
import { 
  heroData as defaultHeroData, 
  statsData as defaultStatsData, 
  constructionPackagesData as defaultPackagesData, 
  constructionProcessData, 
  projectsData as defaultProjectsData, 
  testimonialsData as defaultTestimonialsData, 
  guaranteeData,
  locationsData,
  faqData 
} from '../data/mock';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();
  const { content } = useContent();
  const heroData = content?.heroData || defaultHeroData;
  const statsData = content?.statsData || defaultStatsData;
  const packagesData = content?.constructionPackagesData || defaultPackagesData;
  const projectsData = content?.projectsData || defaultProjectsData;
  const testimonialsData = content?.testimonialsData || defaultTestimonialsData;

  // Interactive Live Estimator State
  const [plotArea, setPlotArea] = useState(2400);
  const [selectedPackageId, setSelectedPackageId] = useState(2); // Default to Premium
  const [floors, setFloors] = useState(2); // Default G+1
  const [selectedPortfolioTab, setSelectedPortfolioTab] = useState('All');
  const [openFaq, setOpenFaq] = useState(0); // FAQ accordion state
  const [copiedFaqIndex, setCopiedFaqIndex] = useState(null);

  // Selected package for calculator
  const selectedPkg = packagesData.find(p => p.id === selectedPackageId) || packagesData[1] || packagesData[0];
  const ratePerSqft = parseInt(String(selectedPkg.pricePerSqft).replace(/,/g, ''), 10) || 2150;
  const totalEstimatedCost = plotArea * ratePerSqft;

  // Copy AEO direct answer to clipboard
  const copyFaqAnswer = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedFaqIndex(index);
    toast.success('Direct Answer snippet copied to clipboard!');
    setTimeout(() => setCopiedFaqIndex(null), 2500);
  };

  // Material Brands Wall (GEO Evidence)
  const materials = [
    {
      category: "Structural Steel",
      brand: "Tata Tiscon / JSW Neosteel",
      grade: "Fe 550D Super Ductile TMT",
      spec: "Corrosion-resistant rebars engineered for coastal seismic zones (IS 1786)"
    },
    {
      category: "Foundation Cement",
      brand: "UltraTech / Dalmia",
      grade: "Grade 53 Portland Pozzolana",
      spec: "High early compressive strength with micro-silica blend (IS 12269)"
    },
    {
      category: "Electrical Conduiting",
      brand: "Polycab FR-LSH",
      grade: "Flame Retardant Low Smoke Copper",
      spec: "Dual-layer insulation with concealed Schneider switches"
    },
    {
      category: "Sanitary & Plumbing",
      brand: "Jaquar / Kohler",
      grade: "Concealed Diverters & Vitreous China",
      spec: "Astral CPVC water supply + Supreme silent drainage pipes"
    },
    {
      category: "Waterproofing Barrier",
      brand: "Fosroc Brushbond",
      grade: "Multi-Coat Polymer Elastomeric",
      spec: "10-Year certified basement, sunken slab & terrace seal"
    },
    {
      category: "Surface Architectural Paints",
      brand: "Asian Paints Royale",
      grade: "Luxury Interior & Apex Ultima Exterior",
      spec: "Teflon-protected anti-fungal anti-fade exterior emulsion"
    }
  ];

  // Filtered portfolio
  const portfolioCategories = ['All', 'Villa', 'Duplex', 'Individual House'];
  const filteredProjects = selectedPortfolioTab === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedPortfolioTab || (selectedPortfolioTab === 'Villa' && p.title.toLowerCase().includes('villa')));



  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-orange-500 selection:text-black">
      <SEO 
        title="Spacexio | Architectural Studio & Turnkey Construction in Visakhapatnam"
        description="Spacexio is Visakhapatnam's premier architectural studio & turnkey home builder. Fixed-price packages from ₹1,850/sq.ft, 3D BIM clash-free engineering, milestone escrow payments & 10-year structural warranty."
        keywords="home construction Visakhapatnam, architects in Vizag, turnkey house builders Andhra Pradesh, fixed price home packages, modern villa construction Madhurawada MVP Colony, house cost per sqft Vizag"
        url="https://www.spacexio.com/"
        faqs={faqData.map(f => ({ question: f.q, answer: f.a }))}
      />

      {/* 1. ARCHITECTURAL HERO SECTION - EDITORIAL STUDIO CRAFT */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 bg-black border-b border-zinc-800 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:28px_28px] opacity-40 blueprint-grid-animated pointer-events-none" />
        
        {/* Subtle Warm Amber Studio Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left 7 Columns: Editorial Headline & Value Authority */}
            <div className="lg:col-span-7">
              {/* Studio Metadata Ribbon */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono tracking-wider text-zinc-300 mb-6 animate-float-slow shadow-lg shadow-black/40">
                <span className="w-2 h-2 rounded-full bg-orange-500 pulse-indicator" />
                <span className="text-orange-400 font-semibold uppercase">SPACEXIO STUDIO</span>
                <span className="text-zinc-600">•</span>
                <span>VISAKHAPATNAM, AP</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Architectural design. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 animate-gradient-flow">
                  Fixed-price execution.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mb-8 hero-description">
                {heroData.description || "From raw plot soil investigation to turnkey keys in 6–8 months. Fixed-price contracts starting at ₹1,850/sq.ft, 3D BIM clash-free engineering, and a legally binding 10-year structural warranty."}
              </p>

              {/* Architectural Highlights Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-zinc-800/80 mb-8 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span>3D BIM Level 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span>Zero Cost Escalations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span>Milestone Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span>10-Yr Structural Bond</span>
                </div>
              </div>

              {/* High-Intent Conversion CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-orange-600/30 shimmer-sweep transition-all hover:translate-y-[-2px] cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('live-estimator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.href = '/cost-calculator';
                  }}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Estimate Your Project Cost
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-600 text-white font-semibold px-8 py-6 rounded-xl text-base transition-all cursor-pointer"
                  onClick={() => window.location.href = '/site-visit'}
                >
                  <Compass className="mr-2 h-5 w-5 text-orange-400" />
                  Book Site Soil Survey
                </Button>
              </div>

              {/* Direct Engineering Desk Touch */}
              <div className="mt-8 flex items-center gap-3 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Need immediate architectural feasibility? Call our studio: </span>
                <a href="tel:+919686511132" className="text-white font-mono font-semibold hover:text-orange-400 transition-colors">
                  +91 96865 11132
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Human Curated Architectural Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group card-interactive">
                <img
                  src={heroData.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"}
                  alt="Modern architectural villa construction in Visakhapatnam"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Floating Architectural Spec Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700/80">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                        FEATURED RESIDENCE // VIZAG
                      </span>
                      <h4 className="text-base font-bold text-white">Villa Horizon • Madhurawada</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                      G+2 • 3,400 sq.ft
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                    <div>
                      <span className="text-zinc-500 block">Package:</span>
                      <span className="text-zinc-200 font-semibold">Luxury Turnkey</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Duration:</span>
                      <span className="text-zinc-200 font-semibold">7.2 Months</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">BIM Level:</span>
                      <span className="text-emerald-400 font-semibold">Zero Rework</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL METRIC RIBBON */}
      <section className="bg-zinc-950 border-b border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className={`reveal-on-scroll delay-${(index + 1) * 100} p-3 rounded-xl hover-lift-pro transition-all flex flex-col justify-center ${index > 0 ? 'lg:pl-8' : ''} ${index > 1 ? 'pt-6 lg:pt-0' : ''}`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-baseline gap-1 mb-1">
                  <span>{stat.value}</span>
                  {stat.value.includes('1850') && <span className="text-sm font-normal text-zinc-400 font-mono">/sq.ft</span>}
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PLOT COST ESTIMATOR SLIDER (SXO REAL-TIME ENGAGEMENT) */}
      <section id="live-estimator" className="py-20 lg:py-28 bg-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 animate-float-slow">
              <Sliders className="h-3.5 w-3.5" />
              SXO Interactive Live Cost Tool
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Instant plot construction estimator.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              No hidden contractor percentages. Slide your plot area to calculate honest construction investment across our 3 architectural packages.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 7 Columns: Controls */}
            <div className="lg:col-span-7 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-8 flex flex-col justify-between card-interactive hover-lift-pro reveal-on-scroll delay-100">
              
              {/* Plot Area Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Built-up Area
                  </label>
                  <span className="text-2xl font-black text-orange-400 font-mono">
                    {plotArea.toLocaleString()} <span className="text-xs font-normal text-zinc-400 font-sans">sq.ft</span>
                  </span>
                </div>
                
                <input 
                  type="range"
                  min="800"
                  max="6000"
                  step="50"
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
                  <span>800 sq.ft (Compact)</span>
                  <span>2,400 sq.ft (Standard 3BHK)</span>
                  <span>4,500 sq.ft+ (Luxury Villa)</span>
                </div>
              </div>

              {/* Package Selection Matrix */}
              <div>
                <label className="text-sm font-bold text-white uppercase tracking-wider font-mono block mb-3">
                  Select Architectural Package Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packagesData.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-xl text-left border transition-all duration-300 relative cursor-pointer ${
                          isSelected
                            ? 'bg-orange-600/10 border-orange-500 ring-1 ring-orange-500 active-package-glow'
                            : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:scale-[1.02]'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 bg-orange-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                        <div className="font-bold text-white text-base mb-1">{pkg.name}</div>
                        <div className="text-xl font-black text-orange-400 font-mono mb-1">
                          ₹{pkg.pricePerSqft}
                          <span className="text-xs font-normal text-zinc-500 font-sans">/sqft</span>
                        </div>
                        <div className="text-xs text-zinc-400 line-clamp-1">{pkg.tagline}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Floors Toggle */}
              <div>
                <label className="text-sm font-bold text-white uppercase tracking-wider font-mono block mb-3">
                  Building Configuration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Ground Only", floors: 1, info: "Single Story" },
                    { label: "G + 1 Floor", floors: 2, info: "Duplex Villa" },
                    { label: "G + 2 Floors", floors: 3, info: "Multi-Unit Residence" }
                  ].map((item) => (
                    <button
                      key={item.floors}
                      type="button"
                      onClick={() => setFloors(item.floors)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        floors === item.floors 
                          ? 'bg-zinc-800 border-zinc-600 text-white' 
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{item.info}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Live Financial Breakdown */}
            <div className="lg:col-span-5 bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between card-interactive hover-lift-pro reveal-on-scroll delay-200">
              <div>
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Estimated Turnkey Investment
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono my-3">
                  ₹{(totalEstimatedCost / 100000).toFixed(2)} <span className="text-xl text-orange-400 font-bold font-sans">Lakhs</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">
                  Based on ₹{selectedPkg.pricePerSqft}/sq.ft for {plotArea.toLocaleString()} sq.ft built-up area. Includes complete architectural design, structural engineering, branded materials, and turnkey labor.
                </p>

                {/* Stage-wise Payment Allocation Preview */}
                <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
                  <div className="text-zinc-400 font-mono uppercase font-bold text-[11px] mb-2">
                    Milestone Escrow Allocation:
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>1. Design, Soil Test & Approvals (10%)</span>
                    <span className="font-mono font-bold">₹{((totalEstimatedCost * 0.1) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>2. Foundation & Plinth Beam (20%)</span>
                    <span className="font-mono font-bold">₹{((totalEstimatedCost * 0.2) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>3. RCC Column & Slab Casting (30%)</span>
                    <span className="font-mono font-bold">₹{((totalEstimatedCost * 0.3) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>4. Brickwork, MEP & Finishes (30%)</span>
                    <span className="font-mono font-bold">₹{((totalEstimatedCost * 0.3) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>5. Snag Resolution & Handover (10%)</span>
                    <span className="font-mono font-bold text-emerald-400">₹{((totalEstimatedCost * 0.1) / 100000).toFixed(2)} L</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800 space-y-3">
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-6 text-sm rounded-xl shadow-lg shadow-orange-600/30 shimmer-sweep cursor-pointer"
                  onClick={() => window.location.href = `/contact?area=${plotArea}&pkg=${selectedPkg.name}`}
                >
                  Request Full BOQ & Material Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-[11px] text-zinc-500 text-center font-mono">
                  * Legally binding fixed-price contract with zero escalation clause.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. REAL RESIDENTIAL PORTFOLIO */}
      <section className="py-20 lg:py-28 bg-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal-on-scroll">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4 animate-float-slow">
                <Building2 className="h-3.5 w-3.5 text-orange-500" />
                Ground Reality Showcase
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Homes designed & built across Visakhapatnam.
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPortfolioTab(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedPortfolioTab === cat
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, pIdx) => (
              <div 
                key={project.id}
                className={`bg-zinc-950 rounded-2xl border border-zinc-800/90 overflow-hidden group hover:border-orange-500/50 transition-all duration-300 card-interactive hover-lift-pro reveal-on-scroll delay-${(pIdx % 3 + 1) * 100}`}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-orange-400 border border-orange-500/30 text-[11px] font-mono font-bold rounded-full">
                      {project.package || 'Turnkey'} Package
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-zinc-300">
                    <MapPin className="h-3 w-3 text-orange-500" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Project Specs */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-3 border-t border-zinc-900">
                    <span>Built-up: <b className="text-zinc-300">{project.area}</b></span>
                    <span>Timeline: <b className="text-zinc-300">{project.duration}</b></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MATERIAL & ENGINEERING SPECIFICATION WALL (GEO EVIDENCE) */}
      <section className="py-20 lg:py-28 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4 animate-float-slow">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
              GEO Evidence & Verified Civil Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Zero compromises on raw civil materials.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              We reject local re-rolled steel and uncertified cement. Every batch delivered to your site arrives with manufacturer mill test certificates and lab-tested compressive strength.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((m, idx) => (
              <div 
                key={idx}
                className={`bg-black/90 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all card-interactive hover-lift-pro reveal-on-scroll delay-${(idx % 3 + 1) * 100}`}
              >
                <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-2">
                  {m.category}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{m.brand}</h3>
                <div className="text-xs font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded inline-block mb-3 border border-zinc-800">
                  {m.grade}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {m.spec}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 7. 7-STAGE ARCHITECTURAL TIMELINE */}
      <section className="py-20 lg:py-28 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4 animate-float-slow">
              <Clock className="h-3.5 w-3.5 text-orange-500" />
              Structured Milestone Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              From raw soil to key handover in 7 clear stages.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Every stage has defined civil benchmarks, digital quality inspections, and milestone escrow sign-offs before the next phase begins.
            </p>
          </div>

          {/* Sequential 7-Stage Timeline Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {constructionProcessData.map((step) => {
              return (
                <div 
                  key={step.step}
                  className={`bg-black/90 rounded-2xl border border-zinc-800/90 p-6 flex flex-col justify-between hover:border-orange-500/40 transition-all group card-interactive hover-lift-pro reveal-on-scroll delay-${(step.step % 4 + 1) * 100}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/30 text-orange-400 font-mono font-bold text-sm flex items-center justify-center">
                        0{step.step}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded">
                        {step.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Verified Milestone Output</span>
                  </div>
                </div>
              );
            })}

            {/* Stage 8 / Complete Handover Assurance Card */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 flex flex-col justify-between text-white shadow-xl card-interactive">
              <div>
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                  ★
                </div>
                <h3 className="text-lg font-bold text-white mb-2">10-Year Warranty Bond</h3>
                <p className="text-orange-100 text-xs leading-relaxed">
                  Upon 200+ point snag list resolution, you receive legal warranty documentation covering structural beams, roof waterproofing, and termite protection.
                </p>
              </div>
              <Button
                size="sm"
                className="mt-6 bg-white hover:bg-zinc-100 text-orange-600 font-bold text-xs rounded-xl py-5 shadow-lg"
                onClick={() => window.location.href = '/site-visit'}
              >
                Schedule Site Visit
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. DIRECT ANSWERS & PROJECT FEASIBILITY (AEO / GEO / VOICE SEARCH KNOWLEDGE BASE) */}
      <section id="aeo-quick-facts" className="py-20 lg:py-28 bg-black border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 animate-float-slow">
              <HelpCircle className="h-3.5 w-3.5" />
              Layer 02 AEO Direct Q&A Snippets
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Frequently asked construction questions.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed aeo-speakable">
              Concise, verified 45-word answers engineered for Google Featured Snippets and AI Answer Engines (Perplexity, ChatGPT, Gemini). Click copy to reference any snippet.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const isCopied = copiedFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden transition-all duration-300 card-interactive hover-lift-pro reveal-on-scroll delay-${(idx % 4 + 1) * 100}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-zinc-900/50 transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-400">
                      {isOpen ? <ChevronUp className="h-4 w-4 text-orange-500" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-zinc-900 text-zinc-300 text-sm sm:text-base leading-relaxed aeo-speakable font-light animate-fade-in">
                      <p className="mb-4">{faq.a}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-900/80 text-xs">
                        <span className="text-[11px] font-mono text-zinc-500">
                          Structured Answer • Schema FAQPage Validated
                        </span>
                        <button
                          type="button"
                          onClick={() => copyFaqAnswer(faq.a, idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-orange-400 text-[11px] font-semibold border border-zinc-800 transition-colors cursor-pointer"
                          title="Copy direct answer snippet"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isCopied ? 'Copied!' : 'Copy Answer'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center text-xs font-mono text-zinc-500">
            Have a specific soil, municipal approval, or architectural design query?{" "}
            <a href="tel:+919686511132" className="text-orange-400 underline hover:text-orange-300 font-semibold">
              Speak with our Lead Civil Engineer (+91 96865 11132)
            </a>
          </div>

          {/* Contextual Internal Linking Cluster (SEO Site Architecture & Topical Depth) */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80">
            <div className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-4">
              Topical Discovery & Specialized Civil Resources
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <Link to="/cost-calculator" className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <span className="font-bold">Cost Calculator</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">Live Plot Estimator →</span>
              </Link>
              <Link to="/packages" className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <span className="font-bold">Packages & BOQ</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">₹1,850 - ₹2,650 →</span>
              </Link>
              <Link to="/process" className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <span className="font-bold">3D BIM Process</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">7-Stage Timeline →</span>
              </Link>
              <Link to="/why-us" className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <span className="font-bold">Civil Standards</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">IS 456 & 10-Yr Bond →</span>
              </Link>
              <Link to="/projects" className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <span className="font-bold">Villa Portfolio</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">Vizag Residences →</span>
              </Link>
              <Link to="/site-visit" className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <span className="font-bold">Book Site Survey</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">Free Soil Feasibility →</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 9. STUDIO CONSULTATION DESK & FINAL ACTION */}
      <section className="py-20 lg:py-28 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-8 sm:p-14 overflow-hidden relative shadow-2xl card-interactive hover-lift-pro reveal-on-scroll">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left 7 Columns: Physical Studio Context */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  Visakhapatnam Design Studio
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                  Meet our Principal Architects & Civil Engineers.
                </h2>
                
                <p className="text-zinc-300 text-base leading-relaxed mb-8 max-w-xl">
                  Visit our studio in Akkayyapalem to inspect physical material samples, review 3D BIM walkthroughs, and receive an itemized plot feasibility study over freshly brewed coffee.
                </p>

                <div className="space-y-4 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span>Near Abid Nagar Road, Abidnagar Park, Akkayyapalem, Visakhapatnam</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <a href="tel:+919686511132" className="hover:text-orange-400 transition-colors">+91 96865 11132</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <a href="mailto:info@spacexio.com" className="hover:text-orange-400 transition-colors">info@spacexio.com</a>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Fast Consultation Box */}
              <div className="lg:col-span-5 bg-zinc-950/90 rounded-2xl border border-zinc-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-2">Book Free Plot Consultation</h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Speak with our lead civil engineer. Response guaranteed within 2 hours.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh Varma"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Plot Location / Area in Vizag</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 250 sq.yds in Madhurawada"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-5 rounded-lg shadow-md shadow-orange-600/30 shimmer-sweep mt-4 cursor-pointer"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Confirm Consultation Booking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-[10px] text-zinc-500 text-center font-mono pt-1">
                    100% Confidential • No Sales Spam • Free Soil Guidance
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
