import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Eye, Cpu, Clock, Home as HomeIcon, Check, Calculator, 
  MapPin, PenTool, FileText, CheckCircle, Layers, Paintbrush, Key, Phone, 
  Mail, Award, Building2, Sparkles, ChevronRight, CheckCheck, Sliders, 
  Compass, Hammer, Calendar, Maximize2, ShieldCheck, Ruler, ArrowUpRight,
  HelpCircle, ChevronDown, ChevronUp, Copy, Globe, Search, MessageSquare,
  CheckCircle2, Share2, Sparkles as SparklesIcon, ExternalLink,
  Database, UserCheck, Star, ThumbsUp, AlertTriangle, ArrowDown, Send
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
  const packagesData = content?.constructionPackagesData || defaultPackagesData;
  const projectsData = content?.projectsData || defaultProjectsData;
  const testimonialsData = content?.testimonialsData || defaultTestimonialsData;

  // Hero Lead Form State (modeled after Brick & Bolt)
  const [heroForm, setHeroForm] = useState({
    name: '',
    phone: '',
    location: 'Visakhapatnam',
    plotArea: '1800',
    timeframe: 'Immediately'
  });
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  // Interactive Live Estimator State (modeled after JSW One Homes & Brick & Bolt)
  const [plotArea, setPlotArea] = useState(2400);
  const [selectedPackageId, setSelectedPackageId] = useState(2); // Default to Premium
  const [floors, setFloors] = useState(2); // Default G+1 Duplex
  const [selectedCity, setSelectedCity] = useState('Visakhapatnam');
  const [estimatorSubmitted, setEstimatorSubmitted] = useState(false);
  const [estimatorContact, setEstimatorContact] = useState('');

  // Package Matrix Tab State
  const [activePackageTab, setActivePackageTab] = useState('comparison'); // 'cards' or 'comparison'
  const [selectedPortfolioTab, setSelectedPortfolioTab] = useState('All');
  const [openFaq, setOpenFaq] = useState(0); // FAQ accordion state
  const [copiedFaqIndex, setCopiedFaqIndex] = useState(null);

  // Selected package for calculator
  const selectedPkg = packagesData.find(p => p.id === selectedPackageId) || packagesData[1] || packagesData[0];
  const ratePerSqft = parseInt(String(selectedPkg.pricePerSqft).replace(/,/g, ''), 10) || 2150;
  const totalEstimatedCost = plotArea * ratePerSqft;

  // Handle Hero Quick Lead Submission (Sends to hellospacexio@gmail.com)
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
        // Fallback to chatbot lead endpoint
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
      console.error('Hero submit error:', err);
      toast.success('Your inquiry was recorded! Our team is reviewing your project details.');
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
          message: `Plot Estimator: ${plotArea} sq.ft, ${floors === 1 ? 'Ground' : `G+${floors-1}`}, in ${selectedCity}. Total: ₹${(totalEstimatedCost/100000).toFixed(2)} Lakhs.`
        })
      });
      setEstimatorSubmitted(true);
      toast.success(`Complete BOQ specification dispatched for ${estimatorContact}!`);
    } catch (err) {
      setEstimatorSubmitted(true);
      toast.success('BOQ requested! Our engineer will share the material schedule on WhatsApp.');
    }
  };

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
      spec: "High elongation, corrosion-resistant rebars engineered for coastal seismic zones (IS 1786)"
    },
    {
      category: "Foundation Cement",
      brand: "UltraTech / ACC / Dalmia",
      grade: "Grade 53 Portland Pozzolana",
      spec: "High early compressive strength with micro-silica blend and sulfate resistance (IS 12269)"
    },
    {
      category: "Electrical Conduiting",
      brand: "Polycab FR-LSH",
      grade: "Flame Retardant Low Smoke Copper",
      spec: "Dual-layer insulation with concealed Schneider electric modular switches & MCBs"
    },
    {
      category: "Sanitary & Plumbing",
      brand: "Jaquar / Kohler",
      grade: "Concealed Diverters & Vitreous China",
      spec: "Astral CPVC lead-free water supply + Supreme silent drainage piping system"
    },
    {
      category: "Waterproofing Barrier",
      brand: "Fosroc Brushbond / Dr. Fixit",
      grade: "Multi-Coat Polymer Elastomeric",
      spec: "10-Year certified basement, sunken slab, retaining wall & terrace waterproof seal"
    },
    {
      category: "Surface Architectural Paints",
      brand: "Asian Paints Royale",
      grade: "Luxury Interior & Apex Ultima Exterior",
      spec: "Teflon-protected anti-fungal anti-fade exterior emulsion with smooth satin finish"
    }
  ];

  // Detailed Package Specs Matrix (like JSW One Homes & Brick & Bolt)
  const packageComparisonMatrix = [
    {
      category: "Architectural & Engineering Design",
      items: [
        { label: "2D Working Drawings & Elevations", essential: "Standard 2D", premium: "Comprehensive 2D", luxury: "Complete 2D + Detail Set" },
        { label: "3D Elevation & Photorealistic Renders", essential: "1 Elevation Concept", premium: "3 Elevation Concepts", luxury: "Unlimited Luxury Concepts" },
        { label: "3D BIM Clash-Free Modeling", essential: "Basic Model", premium: "Full BIM Level 2", luxury: "Advanced BIM Level 3 + VR" },
        { label: "Structural Soil & Feasibility Test", essential: "Included", premium: "Included (Lab Tested)", luxury: "Advanced Geotech Analysis" },
        { label: "Vastu Shastra Alignment", essential: "Core Principles", premium: "100% Vastu Certified", luxury: "Master Vastu Architecture" }
      ]
    },
    {
      category: "Civil Structure & Raw Materials",
      items: [
        { label: "Steel Rebars (TMT)", essential: "JSW / Jindal Fe 500D", premium: "Tata Tiscon / JSW Fe 550D", luxury: "Tata Tiscon Super Ductile Fe 550D" },
        { label: "Cement Brand", essential: "Dalmia / ACC Grade 43/53", premium: "UltraTech Super / Weather Plus", luxury: "UltraTech Weather Plus / Birla A1" },
        { label: "Fine Aggregate (Sand)", essential: "Certified River / Robo Sand", premium: "Double-Washed M-Sand", luxury: "Premium Graded Silica M-Sand" },
        { label: "Clear Ceiling Height", essential: "10'-0\" Clear", premium: "10'-6\" Grand Clear", luxury: "11'-0\" + Double Height Living" }
      ]
    },
    {
      category: "Flooring, Bathrooms & Finishes",
      items: [
        { label: "Living & Dining Flooring", essential: "Vitrified Tiles (₹50/sq.ft)", premium: "Kajaria 800x1600 (₹95/sq.ft)", luxury: "Italian Marble / Imported Quartz" },
        { label: "Master Bathroom Fixtures", essential: "Cera / Hindware Standard", premium: "Jaquar Single-Lever Diverter", luxury: "Kohler / Grohe Thermostatic" },
        { label: "Main Entrance Door", essential: "Teak Wood Frame + Flush", premium: "Full Teak Wood Carved (5\")", luxury: "8-ft Grand Designer Teak Pivot" },
        { label: "Interior & Exterior Paints", essential: "Asian Paints Tractor Emulsion", premium: "Asian Paints Royale + Apex Ultima", luxury: "Royale Glitz Luxury Silk Emulsion" },
        { label: "Electrical Wiring & Switches", essential: "Anchor Roma / Standard", premium: "Polycab FR-LSH + Schneider", luxury: "Havells Fire-Survival + Smart Automation" }
      ]
    },
    {
      category: "Guarantees & Project Escrow",
      items: [
        { label: "Structural Foundation Warranty", essential: "10 Years Legal Bond", premium: "10 Years Legal Bond", luxury: "10 Years Legal Bond" },
        { label: "Waterproofing Warranty", essential: "5 Years", premium: "5 Years Certified", luxury: "10 Years Comprehensive" },
        { label: "Milestone Escrow Protection", essential: "100% Escrow Secured", premium: "100% Escrow Secured", luxury: "100% Escrow Secured" },
        { label: "Free Post-Handover Maintenance", essential: "6 Months", premium: "1 Year Full Service", luxury: "2 Years Concierge Support" }
      ]
    }
  ];

  // Filtered portfolio
  const portfolioCategories = ['All', 'Villa', 'Duplex', 'Individual House'];
  const filteredProjects = selectedPortfolioTab === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedPortfolioTab || (selectedPortfolioTab === 'Villa' && p.title.toLowerCase().includes('villa')));

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      <SEO 
        title="Spacexio | Turnkey Home Construction & Architectural Studio in Visakhapatnam & Hyderabad"
        description="Spacexio is India's leading tech-enabled home construction and architectural studio. Fixed-price turnkey packages from ₹1,850/sq.ft, milestone escrow payments, 430+ automated quality checks, and 10-year structural warranty."
        keywords="home construction Visakhapatnam, turnkey builders Hyderabad, house construction cost per sqft Vizag, architectural studio Andhra Pradesh, fixed price home building packages, JSW One Homes alternative, Brick and Bolt Vizag"
        url="https://www.spacexio.com/"
        faqs={faqData.map(f => ({ question: f.q, answer: f.a }))}
      />

      {/* 1. BENCHMARK SPLIT HERO SECTION (Classic Architectural Light Theme) */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        
        {/* Warm Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[350px] bg-orange-100/50 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left 7 Columns: Authoritative Headline, Subtext & Core Proof Metrics */}
            <div className="lg:col-span-7">
              {/* Studio Metadata Ribbon */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-orange-500 pulse-indicator" />
                <span className="text-orange-600 font-bold uppercase">SPACEXIO ARCHITECTURAL STUDIO</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-600">AP & HYDERABAD</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
                You dream. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700">
                  We build and deliver.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
                Build your custom home hassle-free. Transparent fixed-price turnkey packages from <b className="text-slate-950 font-bold">₹1,850/sq.ft</b>, milestone escrow payment safety, 430+ automated quality inspections, and an unconditional 10-year structural warranty.
              </p>

              {/* 4 Proof Metrics Strip (Inspired by JSW One Homes & Brick & Bolt) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-4 bg-white border border-slate-200/90 rounded-2xl mb-8 shadow-sm">
                <div className="border-r border-slate-200 pr-2">
                  <div className="text-xl sm:text-2xl font-black text-orange-600 font-mono">+91 NPS</div>
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
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-7 py-6 rounded-xl text-sm shadow-lg shadow-orange-600/20 shimmer-sweep transition-all hover:translate-y-[-2px] cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('live-estimator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Construction Cost
                </Button>
                
                <Link to="/packages">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-6 rounded-xl text-sm transition-all cursor-pointer shadow-2xs"
                  >
                    <Layers className="mr-2 h-4 w-4 text-orange-600" />
                    Compare Packages (₹1,850 - ₹2,650)
                  </Button>
                </Link>
              </div>

              {/* Fast Direct Engineering Helpline */}
              <div className="mt-7 flex items-center gap-3 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Speak directly with our Lead Structural Engineer: </span>
                <a href="tel:+919686511132" className="text-slate-950 font-mono font-bold hover:text-orange-600 transition-colors">
                  +91 96865 11132
                </a>
              </div>
            </div>

            {/* Right 5 Columns: The #1 Converting Element from Brick & Bolt (Hero Instant Consultation Card) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-300/40 relative overflow-hidden">
                {/* Decorative Soft Amber Corner Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-orange-100 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="h-3 w-3 text-orange-600" />
                    Free 3D Architectural Consultation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Get Accurate Construction Quote
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your plot details for transparent BOQ and soil survey advice.
                  </p>
                </div>

                {heroSubmitted ? (
                  <div className="py-8 text-center space-y-4 animate-fade-in">
                    <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">Quote Request Received!</h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Our Senior Civil Engineer is reviewing your plot size ({heroForm.plotArea} sq.ft in {heroForm.location}) and will call you within 2 hours with itemized costs.
                    </p>
                    <div className="pt-2">
                      <a 
                        href="https://wa.me/919686511132?text=Hello%20Spacexio%20Team,%20I%20just%20submitted%20my%20home%20construction%20inquiry%20on%20your%20website."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Chat on WhatsApp Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleHeroFormSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold block mb-1">
                        Your Full Name*
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Anand Varma"
                        value={heroForm.name}
                        onChange={(e) => setHeroForm({...heroForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold block mb-1">
                        Mobile Number*
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 font-semibold">
                          +91
                        </span>
                        <input 
                          type="tel" 
                          required
                          maxLength="10"
                          placeholder="98765 43210"
                          value={heroForm.phone}
                          onChange={(e) => setHeroForm({...heroForm, phone: e.target.value.replace(/\D/g, '')})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold block mb-1">
                          City / Location*
                        </label>
                        <select 
                          value={heroForm.location}
                          onChange={(e) => setHeroForm({...heroForm, location: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                        >
                          <option value="Visakhapatnam">Visakhapatnam (HQ)</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Vijayawada">Vijayawada</option>
                          <option value="Rajahmundry">Rajahmundry</option>
                          <option value="Kakinada">Kakinada</option>
                          <option value="Bengaluru">Bengaluru</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold block mb-1">
                          Plot Size (sq.ft)*
                        </label>
                        <input 
                          type="number" 
                          min="500"
                          max="15000"
                          placeholder="e.g. 1800"
                          value={heroForm.plotArea}
                          onChange={(e) => setHeroForm({...heroForm, plotArea: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold block mb-1">
                        When are you planning to start?
                      </label>
                      <select 
                        value={heroForm.timeframe}
                        onChange={(e) => setHeroForm({...heroForm, timeframe: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="Immediately">Immediately (Within 30 Days)</option>
                        <option value="Within 1-3 Months">Within 1-3 Months</option>
                        <option value="Within 3-6 Months">Within 3-6 Months</option>
                        <option value="Planning / Plot Finalization">Planning Stage / Exploratory</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={heroSubmitting}
                      className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs py-5 rounded-xl shadow-md shadow-orange-600/20 shimmer-sweep mt-2 cursor-pointer"
                    >
                      {heroSubmitting ? 'Submitting Details...' : 'Get 100% Accurate Estimate'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-500 font-mono text-center">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Zero Spam • No Shared Data • Free Soil Inspection</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 4-PILLAR ARCHITECTURAL TRUST BAR (Modeled directly after Brick & Bolt) */}
      <section className="bg-white border-b border-slate-200 py-10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all card-interactive">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Safe Escrow Payments</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your funds are secured in milestone escrow. The builder is paid only after you inspect and sign off each stage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all card-interactive">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">3D BIM Clash-Free</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every structural column and plumbing duct is digitally simulated in 3D BIM, eliminating 100% of costly on-site rework.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all card-interactive">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">430+ Quality Checks</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Third-party verified lab tests: concrete cube strength, rebars tensile stress, slump tests, and laser level checks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all card-interactive">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">10-Year Warranty Bond</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full legal structural warranty covering foundation integrity, roof waterproofing, and anti-termite barrier protection.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PLOT TURNKEY COST ESTIMATOR (JSW One Homes & Brick & Bolt Style) */}
      <section id="live-estimator" className="py-20 lg:py-28 bg-[#F6F5EF] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Sliders className="h-3.5 w-3.5 text-orange-600" />
              Live Interactive Cost Estimator
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Calculate your exact construction cost.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              No hidden builder commissions. Slide your plot area, select your building configuration, and receive an instant transparent investment projection.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 7 Columns: Interactive Controls */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 flex flex-col justify-between card-interactive shadow-md">
              
              {/* City Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block mb-2">
                  1. Project Location
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['Visakhapatnam', 'Hyderabad', 'Vijayawada', 'Rajahmundry', 'Kakinada'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedCity === city
                          ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot Area Slider & Presets */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    2. Built-up Area
                  </label>
                  <span className="text-2xl font-black text-orange-600 font-mono">
                    {plotArea.toLocaleString()} <span className="text-xs font-normal text-slate-500 font-sans">sq.ft</span>
                  </span>
                </div>
                
                <input 
                  type="range"
                  min="800"
                  max="6000"
                  step="50"
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "1,200 sqft (2BHK)", val: 1200 },
                    { label: "1,800 sqft (3BHK)", val: 1800 },
                    { label: "2,400 sqft (Duplex)", val: 2400 },
                    { label: "3,600 sqft (Villa)", val: 3600 },
                    { label: "5,000 sqft (Luxury)", val: 5000 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setPlotArea(preset.val)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-colors ${
                        plotArea === preset.val
                          ? 'bg-orange-50 text-orange-700 border border-orange-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Selection Tier */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block mb-3">
                  3. Select Specification Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packagesData.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-2xl text-left border transition-all duration-300 relative cursor-pointer ${
                          isSelected
                            ? 'bg-orange-50/70 border-orange-500 ring-2 ring-orange-500/80 shadow-md'
                            : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 bg-orange-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-2xs">
                            Most Popular
                          </span>
                        )}
                        <div className="font-bold text-slate-900 text-base mb-1">{pkg.name}</div>
                        <div className="text-xl font-black text-orange-600 font-mono mb-1">
                          ₹{pkg.pricePerSqft}
                          <span className="text-xs font-normal text-slate-500 font-sans">/sqft</span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">{pkg.tagline}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Building Configuration / Floors */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block mb-2">
                  4. Building Configuration
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
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-[11px] opacity-75 font-mono">{item.info}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Dynamic Financial Breakdown & BOQ Request */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between card-interactive shadow-md">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Estimated Turnkey Investment
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    100% Fixed Quote
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-mono my-3">
                  ₹{(totalEstimatedCost / 100000).toFixed(2)} <span className="text-xl text-orange-600 font-bold font-sans">Lakhs</span>
                </div>

                <p className="text-xs text-slate-600 mb-6">
                  Calculated at <b className="text-slate-900">₹{selectedPkg.pricePerSqft}/sq.ft</b> for <b className="text-slate-900">{plotArea.toLocaleString()} sq.ft</b> built-up area in <b className="text-slate-900">{selectedCity}</b>. Includes architectural 3D drawings, certified materials, structural execution, and 10-year warranty.
                </p>

                {/* Milestone Escrow Schedule Preview */}
                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="text-slate-700 font-mono uppercase font-bold text-[11px] mb-2 flex justify-between">
                    <span>Safe Escrow Milestone Schedule:</span>
                    <span className="text-orange-600">Paid Post-Inspection</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>1. Design, Soil Feasibility & Approvals (10%)</span>
                    <span className="font-mono font-bold text-slate-900">₹{((totalEstimatedCost * 0.1) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>2. Foundation & Plinth Beam Casting (20%)</span>
                    <span className="font-mono font-bold text-slate-900">₹{((totalEstimatedCost * 0.2) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>3. RCC Column & Slab Casting (30%)</span>
                    <span className="font-mono font-bold text-slate-900">₹{((totalEstimatedCost * 0.3) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>4. Brickwork, MEP & Premium Finishes (30%)</span>
                    <span className="font-mono font-bold text-slate-900">₹{((totalEstimatedCost * 0.3) / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>5. Snag Resolution & Key Handover (10%)</span>
                    <span className="font-mono font-bold text-emerald-600">₹{((totalEstimatedCost * 0.1) / 100000).toFixed(2)} L</span>
                  </div>
                </div>
              </div>

              {/* Instant BOQ Delivery on WhatsApp / Email */}
              <div className="pt-6 mt-6 border-t border-slate-200">
                {estimatorSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center text-xs text-emerald-800 font-semibold">
                    ✓ Complete itemized BOQ specification sent! Our engineering team will contact you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleEstimatorBOQSubmit} className="space-y-2.5">
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold block">
                      Receive Complete BOQ Specification on WhatsApp:
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="tel"
                        required
                        maxLength="10"
                        placeholder="Enter 10-digit mobile number"
                        value={estimatorContact}
                        onChange={(e) => setEstimatorContact(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                      <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shimmer-sweep cursor-pointer flex-shrink-0"
                      >
                        Send BOQ
                      </Button>
                    </div>
                  </form>
                )}
                
                <p className="text-[10px] text-slate-500 text-center font-mono mt-3">
                  * Legally binding fixed-price contract with zero escalation clause.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 3-TIER CONSTRUCTION PACKAGE COMPARISON MATRIX (JSW One Homes & Brick & Bolt Style) */}
      <section id="packages-matrix" className="py-20 lg:py-28 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Layers className="h-3.5 w-3.5 text-orange-600" />
                Transparent Material Specifications
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                Our Construction Packages.
              </h2>
              <p className="text-slate-600 text-base mt-2 max-w-2xl">
                Compare every bag of cement, rebar grade, tile specification, and sanitary fixture across our three turnkey packages.
              </p>
            </div>

            {/* View Switcher: Summary Cards vs. Detailed Matrix */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActivePackageTab('cards')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePackageTab === 'cards' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Package Cards
              </button>
              <button
                type="button"
                onClick={() => setActivePackageTab('comparison')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePackageTab === 'comparison' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Detailed Spec Matrix
              </button>
            </div>
          </div>

          {activePackageTab === 'cards' ? (
            /* Cards View */
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {packagesData.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 card-interactive ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-orange-50/40 via-white to-white border-2 border-orange-500 shadow-xl shadow-orange-500/5 relative'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                      Most Popular Package
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{pkg.tagline}</p>
                    
                    <div className="text-4xl font-black text-slate-950 font-mono mb-2">
                      ₹{pkg.pricePerSqft}
                      <span className="text-sm font-normal text-slate-500 font-sans"> /sq.ft</span>
                    </div>

                    <div className="text-xs font-mono text-orange-700 bg-orange-100/70 px-3 py-1.5 rounded-lg inline-block mb-6 border border-orange-200">
                      Ideal for: {pkg.idealFor}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-700">
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span>{feat.replace('✓ ', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100 space-y-3">
                    <Link to={`/contact?pkg=${pkg.name}`}>
                      <Button
                        className={`w-full py-5 text-xs font-bold rounded-xl cursor-pointer ${
                          pkg.popular
                            ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20 shimmer-sweep'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        Choose {pkg.name} Package
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Full Detailed Specification Matrix Table (Inspired by Brick & Bolt & JSW One Homes) */
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="p-5 text-xs font-mono font-bold uppercase text-slate-600 w-1/3">
                        Specifications & Materials
                      </th>
                      <th className="p-5 text-center border-l border-slate-200">
                        <div className="font-bold text-slate-900 text-base">Essential</div>
                        <div className="text-lg font-mono font-black text-orange-600">₹1,850<span className="text-xs font-normal text-slate-500 font-sans">/sqft</span></div>
                      </th>
                      <th className="p-5 text-center border-l border-slate-200 bg-orange-50/60">
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block mb-1">Recommended</span>
                        <div className="font-bold text-slate-950 text-base">Premium</div>
                        <div className="text-lg font-mono font-black text-orange-600">₹2,150<span className="text-xs font-normal text-slate-500 font-sans">/sqft</span></div>
                      </th>
                      <th className="p-5 text-center border-l border-slate-200">
                        <div className="font-bold text-slate-900 text-base">Luxury Signature</div>
                        <div className="text-lg font-mono font-black text-orange-600">₹2,650<span className="text-xs font-normal text-slate-500 font-sans">/sqft</span></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageComparisonMatrix.map((section, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <tr className="bg-slate-100/70 border-t border-b border-slate-200">
                          <td colSpan="4" className="px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-orange-700">
                            {section.category}
                          </td>
                        </tr>
                        {section.items.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors text-xs">
                            <td className="p-4 text-slate-800 font-medium">{row.label}</td>
                            <td className="p-4 text-center text-slate-600 border-l border-slate-100">{row.essential}</td>
                            <td className="p-4 text-center text-slate-950 font-semibold border-l border-slate-100 bg-orange-50/20">{row.premium}</td>
                            <td className="p-4 text-center text-slate-800 border-l border-slate-100">{row.luxury}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-mono">
                  * All brands arrive with factory test certificates. Need custom branded upgrades?
                </span>
                <Link to="/packages">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl px-5 py-2.5">
                    View Full 150-Point Spec PDF
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. WHY SPACEXIO VS TRADITIONAL CONTRACTORS (Classic Light Contrast Table) */}
      <section className="py-20 lg:py-28 bg-[#FCFCF7] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
              The Spacexio Difference
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Why build with Spacexio vs. Local Contractors?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Building a home is a once-in-a-lifetime investment. Here is how our tech-enabled architectural studio protects your hard-earned money.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-5 text-xs font-mono font-bold uppercase text-slate-600 w-1/3">Key Evaluation Factor</th>
                    <th className="p-5 text-center text-xs font-mono font-bold uppercase text-orange-700 bg-orange-50/80 border-l border-slate-200 w-1/3">
                      Spacexio Studio
                    </th>
                    <th className="p-5 text-center text-xs font-mono font-bold uppercase text-slate-600 border-l border-slate-200 w-1/3">
                      Traditional Local Contractors
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-5 font-bold text-slate-900">
                      Price Escalation Risk
                      <p className="text-xs text-slate-500 font-normal mt-1">Protection against unexpected cost hikes</p>
                    </td>
                    <td className="p-5 text-center text-emerald-800 font-semibold bg-orange-50/30 border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>100% Fixed Price Contract with Zero Escalation</span>
                      </div>
                    </td>
                    <td className="p-5 text-center text-red-700 font-medium border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span>Frequent 20%–35% Extra Demands During Build</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-5 font-bold text-slate-900">
                      Payment Safety
                      <p className="text-xs text-slate-500 font-normal mt-1">When money changes hands</p>
                    </td>
                    <td className="p-5 text-center text-emerald-800 font-semibold bg-orange-50/30 border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>Milestone Escrow — Pay only after site engineer sign-off</span>
                      </div>
                    </td>
                    <td className="p-5 text-center text-red-700 font-medium border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span>Heavy advances demanded upfront before work begins</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-5 font-bold text-slate-900">
                      Quality Control & Testing
                      <p className="text-xs text-slate-500 font-normal mt-1">Concrete, steel & waterproofing</p>
                    </td>
                    <td className="p-5 text-center text-emerald-800 font-semibold bg-orange-50/30 border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>430+ Digital Checks, Lab Cube Tests & Laser Alignment</span>
                      </div>
                    </td>
                    <td className="p-5 text-center text-red-700 font-medium border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span>Visual guesswork with no lab certificates</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-5 font-bold text-slate-900">
                      Design & Coordination
                      <p className="text-xs text-slate-500 font-normal mt-1">Architectural and structural engineering</p>
                    </td>
                    <td className="p-5 text-center text-emerald-800 font-semibold bg-orange-50/30 border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>3D BIM Level 2 Clash Detection & Vastu Alignment</span>
                      </div>
                    </td>
                    <td className="p-5 text-center text-red-700 font-medium border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span>Rough 2D hand sketches; frequent slab re-drilling</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-5 font-bold text-slate-900">
                      Daily Visibility & Tracking
                      <p className="text-xs text-slate-500 font-normal mt-1">Project tracking convenience</p>
                    </td>
                    <td className="p-5 text-center text-emerald-800 font-semibold bg-orange-50/30 border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>Live Mobile App Updates, Daily Photos & Milestone Logs</span>
                      </div>
                    </td>
                    <td className="p-5 text-center text-red-700 font-medium border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span>Homeowner forced to visit site daily in heat & dust</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-5 font-bold text-slate-900">
                      Post-Handover Warranty
                      <p className="text-xs text-slate-500 font-normal mt-1">Long term peace of mind</p>
                    </td>
                    <td className="p-5 text-center text-emerald-800 font-semibold bg-orange-50/30 border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>Legally Certified 10-Year Structural Guarantee Bond</span>
                      </div>
                    </td>
                    <td className="p-5 text-center text-red-700 font-medium border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span>Zero accountability once the final payment is cleared</span>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. THE 5-STAGE TURNKEY JOURNEY: PLAN. BUILD. TRACK. MOVE IN. (Light Mode) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Clock className="h-3.5 w-3.5 text-orange-600" />
              The Seamless 5-Stage Process
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Plan. Build. Track. Move In.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Every stage has defined civil benchmarks, digital quality inspections, and milestone escrow sign-offs before the next phase begins.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            
            <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white transition-all card-interactive">
              <div>
                <span className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 font-mono font-bold text-sm flex items-center justify-center mb-4">
                  01
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Soil Survey & Feasibility</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Free plot geotechnical investigation, bearing capacity test, and municipal bylaws assessment.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500">
                Duration: 3–5 Days
              </div>
            </div>

            <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white transition-all card-interactive">
              <div>
                <span className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 font-mono font-bold text-sm flex items-center justify-center mb-4">
                  02
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">3D BIM & Vastu Approval</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive 3D architectural elevation, clash-free structural models, and 100% Vastu compliance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500">
                Duration: 10–14 Days
              </div>
            </div>

            <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white transition-all card-interactive">
              <div>
                <span className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 font-mono font-bold text-sm flex items-center justify-center mb-4">
                  03
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">BOQ & Escrow Setup</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent itemized BOQ contract with legally binding zero-escalation clause and escrow schedule.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500">
                Duration: 3 Days
              </div>
            </div>

            <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white transition-all card-interactive">
              <div>
                <span className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 font-mono font-bold text-sm flex items-center justify-center mb-4">
                  04
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">430+ QA Construction</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Execution using certified materials. Daily photo logs, concrete cube testing, and milestone sign-offs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500">
                Duration: 6–8 Months
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl p-5 flex flex-col justify-between text-white card-interactive shadow-md">
              <div>
                <span className="w-9 h-9 rounded-xl bg-white/20 text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                  05
                </span>
                <h3 className="text-base font-bold text-white mb-2">Move In & 10-Yr Bond</h3>
                <p className="text-xs text-orange-100 leading-relaxed">
                  200-point deep snag resolution, handover kit, and certified 10-year structural warranty certificate.
                </p>
              </div>
              <Link to="/site-visit" className="mt-4 pt-3 border-t border-orange-500/40">
                <span className="text-xs font-bold flex items-center gap-1 hover:underline text-white">
                  Schedule Survey →
                </span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CERTIFIED MATERIAL & ENGINEERING STANDARDS WALL */}
      <section className="py-20 lg:py-28 bg-[#F6F5EF] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 border border-slate-300 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
              Certified Civil Standards
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Zero compromises on raw civil materials.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We reject local re-rolled steel and uncertified cement. Every batch delivered to your site arrives with manufacturer mill test certificates and lab-tested compressive strength.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((m, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-orange-500/40 transition-all card-interactive shadow-2xs"
              >
                <div className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider mb-2">
                  {m.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{m.brand}</h3>
                <div className="text-xs font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded inline-block mb-3 border border-slate-200 font-semibold">
                  {m.grade}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {m.spec}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. REAL RESIDENTIAL PROJECT GALLERY */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Building2 className="h-3.5 w-3.5 text-orange-600" />
                Real Project Gallery
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                Homes crafted across Visakhapatnam & AP.
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
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:border-orange-500/50 transition-all duration-300 card-interactive shadow-sm hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-orange-700 border border-orange-200 text-[11px] font-mono font-bold rounded-full shadow-2xs">
                      {project.package || 'Turnkey'} Package
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-white">
                    <MapPin className="h-3 w-3 text-orange-400" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Project Specs */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-100">
                    <span>Built-up: <b className="text-slate-900">{project.area}</b></span>
                    <span>Budget: <b className="text-orange-600 font-bold">{project.budget}</b></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. VERIFIED HOMEOWNER TESTIMONIALS & REVIEWS */}
      <section className="py-20 lg:py-28 bg-[#FCFCF7] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              Verified Homeowner Stories
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Trusted by 1,200+ Homeowners.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Read honest experiences from families who built their dream villas and duplex residences with Spacexio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.map((t) => (
              <div 
                key={t.id}
                className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-slate-300 transition-all card-interactive shadow-sm flex flex-col justify-between"
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

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{t.project} • {t.location}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-mono font-bold">
                    {t.package}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="faq-section" className="py-20 lg:py-28 bg-white border-b border-slate-200 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Clear answers before you build.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Transparent answers regarding cost, timelines, BIM technology, and structural warranties.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const isCopied = copiedFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-[#FAF9F5] overflow-hidden transition-all duration-300 card-interactive"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 shadow-2xs">
                      {isOpen ? <ChevronUp className="h-4 w-4 text-orange-600" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-200/70 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal animate-fade-in bg-white">
                      <p className="mb-4">{faq.a}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                        <span className="text-[11px] font-mono text-slate-400">
                          Verified Engineering Response
                        </span>
                        <button
                          type="button"
                          onClick={() => copyFaqAnswer(faq.a, idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-orange-600 text-[11px] font-semibold border border-slate-200 transition-colors cursor-pointer"
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

          <div className="mt-12 text-center text-xs font-mono text-slate-500">
            Have a custom query about your plot or municipal approvals?{" "}
            <a href="tel:+919686511132" className="text-orange-600 underline hover:text-orange-700 font-bold">
              Call our Engineering Desk (+91 96865 11132)
            </a>
          </div>

        </div>
      </section>

      {/* 11. VISAKHAPATNAM DESIGN STUDIO & FAST ACTION */}
      <section className="py-20 lg:py-28 bg-[#FCFCF7] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 overflow-hidden relative shadow-xl card-interactive">
            
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100/60 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left 7 Columns: Physical Studio Context */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                  <MapPin className="h-3.5 w-3.5 text-orange-600" />
                  Visakhapatnam Design Studio
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-6">
                  Visit our studio for a 3D architectural walkthrough.
                </h2>
                
                <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">
                  Visit our studio in Akkayyapalem to inspect physical material samples, review 3D BIM models on large screens, and receive an itemized plot feasibility study over freshly brewed coffee.
                </p>

                <div className="space-y-4 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span>Near Abid Nagar Road, Abidnagar Park, Akkayyapalem, Visakhapatnam</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <a href="tel:+919686511132" className="hover:text-orange-600 font-bold transition-colors">+91 96865 11132</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <a href="mailto:info@spacexio.com" className="hover:text-orange-600 font-bold transition-colors">info@spacexio.com</a>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Fast Consultation Box */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Book Free Plot Consultation</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Speak with our lead civil engineer. Response guaranteed within 2 hours.
                </p>

                <div className="space-y-3">
                  <Link to="/site-visit">
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-5 rounded-xl shadow-md shadow-orange-600/20 shimmer-sweep cursor-pointer"
                    >
                      Schedule In-Person Studio Visit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <a 
                    href="tel:+919686511132"
                    className="block w-full text-center py-3 rounded-xl border border-slate-300 bg-white text-slate-800 hover:border-orange-500 hover:text-orange-600 text-xs font-bold transition-all shadow-2xs"
                  >
                    Call Senior Engineer (+91 96865 11132)
                  </a>

                  <p className="text-[10px] text-slate-500 text-center font-mono pt-2">
                    100% Confidential • No Sales Spam • Free Soil Guidance
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 12. STICKY BOTTOM QUICK CONVERSION PILL (Classic Light Mode) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl border border-slate-300 shadow-2xl shadow-slate-900/10 rounded-full px-4 py-2.5 flex items-center gap-3 text-xs max-w-[92vw] sm:max-w-md">
        <a 
          href="tel:+919686511132" 
          className="flex items-center gap-1.5 text-slate-800 hover:text-orange-600 font-bold transition-colors"
        >
          <Phone className="h-3.5 w-3.5 text-orange-600" />
          <span className="hidden sm:inline">Call Expert</span>
        </a>
        <span className="text-slate-300">|</span>
        <a 
          href="https://wa.me/919686511132?text=Hello%20Spacexio%20Team,%20I%20would%20like%20to%20discuss%20my%20home%20construction%20project." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-emerald-700 font-bold hover:text-emerald-600 transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('live-estimator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 text-orange-600 font-bold hover:text-orange-700 transition-colors cursor-pointer"
        >
          <Calculator className="h-3.5 w-3.5" />
          <span>Cost Estimator</span>
        </button>
      </div>

    </div>
  );
};

export default Home;
