import React, { useState } from 'react';
import { Calculator, Home, ArrowRight, Check, Info, ShieldCheck, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import SEO from '../components/SEO';

const CostCalculator = () => {
  const [formData, setFormData] = useState({
    homeType: '',
    plotSize: '',
    package: 'premium',
    floors: '1'
  });

  const [estimate, setEstimate] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const packageRates = {
    essential: 1850,
    premium: 2150,
    luxury: 2650
  };

  const homeTypes = [
    { value: '1bhk', label: '1 BHK (600-800 sq.ft)', avgSize: 700 },
    { value: '2bhk', label: '2 BHK (900-1200 sq.ft)', avgSize: 1050 },
    { value: '3bhk', label: '3 BHK (1300-1800 sq.ft)', avgSize: 1550 },
    { value: '4bhk', label: '4 BHK (1900-2500 sq.ft)', avgSize: 2200 },
    { value: 'villa', label: 'Villa (2500-3500 sq.ft)', avgSize: 3000 },
    { value: 'duplex', label: 'Duplex (3000-4000 sq.ft)', avgSize: 3500 },
    { value: 'custom', label: 'Custom Size', avgSize: 0 }
  ];

  const calculateEstimate = () => {
    if (!formData.homeType || !formData.plotSize || !formData.package) return;

    const size = parseInt(formData.plotSize);
    const rate = packageRates[formData.package];
    const floors = parseInt(formData.floors);

    const constructionCost = size * rate;
    const designCost = Math.round(constructionCost * 0.1); // 10% for design
    const approvalsCost = 50000; // Flat fee for approvals
    const contingency = Math.round(constructionCost * 0.05); // 5% contingency
    const totalCost = constructionCost + designCost + approvalsCost + contingency;

    // Timeline estimation: ~6-8 months for typical homes
    const timelineMonths = Math.max(6, Math.min(14, 5 + (size / 500) + (floors * 0.5)));

    setEstimate({
      size,
      rate,
      constructionCost,
      designCost,
      approvalsCost,
      contingency,
      totalCost,
      timelineMonths: Math.round(timelineMonths),
      packageName: formData.package.charAt(0).toUpperCase() + formData.package.slice(1),
      floors
    });

    setShowBreakdown(true);
  };

  const handleHomeTypeChange = (value) => {
    const selectedHome = homeTypes.find(h => h.value === value);
    setFormData({
      ...formData,
      homeType: value,
      plotSize: value !== 'custom' ? selectedHome.avgSize.toString() : ''
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculatorFaqs = [
    {
      question: "How is the construction cost calculated per sq.ft in Visakhapatnam?",
      answer: "Construction cost is calculated based on built-up area multiplied by the package rate (Essential ₹1,850, Premium ₹2,150, or Luxury ₹2,650), plus approvals, architectural design, and contingency buffer."
    },
    {
      question: "Are there any hidden costs in Spacexio's estimates?",
      answer: "No. Spacexio provides 100% transparent pricing with detailed itemized BOQ (Bill of Quantities) before project kick-off, eliminating surprise expenses."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFCF7] pt-28 pb-20 text-slate-900">
      <SEO 
        title="Construction Cost Calculator - Instant Home Building Estimate"
        description="Estimate house construction costs in Visakhapatnam instantly. Transparent per sq.ft packages starting from ₹1,850/sq.ft. Get detailed material breakdown and project timeline."
        keywords="house construction cost calculator, construction cost Visakhapatnam, cost per sq ft Vizag, home building estimate, villa cost calculator Andhra Pradesh"
        url="https://spacexio.com/cost-calculator"
        faqs={calculatorFaqs}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="h-4 w-4" />
            Transparent Pricing Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Construction Cost Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Plan your budget with clarity. Get an instant, reliable estimate for your residential project in Visakhapatnam.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Calculator Form */}
          <Card className="lg:col-span-7 bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between pb-4 border-b border-slate-100">
                <span>1. Select Project Specifications</span>
                <span className="text-xs text-[#01B3D1] font-semibold bg-[#EFFBFC] border border-[#99E7EF] px-2.5 py-1 rounded-full">Step-by-step</span>
              </h2>

              <div className="space-y-6">
                {/* Home Type */}
                <div>
                  <Label htmlFor="homeType" className="text-slate-700 font-medium mb-2 block text-sm">
                    Type of Configuration *
                  </Label>
                  <Select value={formData.homeType} onValueChange={handleHomeTypeChange}>
                    <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900 h-12 rounded-lg focus:ring-2 focus:ring-[#F35A61]/20 focus:bg-white">
                      <SelectValue placeholder="Select home layout" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl">
                      {homeTypes.map(type => (
                        <SelectItem key={type.value} value={type.value} className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Plot Size */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plotSize" className="text-slate-700 font-medium mb-2 block text-sm">
                      Built-up Area (sq.ft) *
                    </Label>
                    <Input
                      id="plotSize"
                      type="number"
                      value={formData.plotSize}
                      onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                      placeholder="e.g. 1500"
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 h-12 rounded-lg focus:border-[#F35A61] focus:bg-white"
                      min="500"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">Typical range: 600 - 4000 sq.ft</p>
                  </div>

                  {/* Number of Floors */}
                  <div>
                    <Label htmlFor="floors" className="text-slate-700 font-medium mb-2 block text-sm">
                      Number of Floors *
                    </Label>
                    <Select value={formData.floors} onValueChange={(value) => setFormData({ ...formData, floors: value })}>
                      <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900 h-12 rounded-lg focus:ring-2 focus:ring-[#F35A61]/20 focus:bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl">
                        <SelectItem value="1" className="hover:bg-slate-100">Single Floor (Ground)</SelectItem>
                        <SelectItem value="2" className="hover:bg-slate-100">Two Floors (G + 1)</SelectItem>
                        <SelectItem value="3" className="hover:bg-slate-100">Three Floors (G + 2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <Label className="text-slate-700 font-medium mb-3 block text-sm">
                    Select Material Specification Package *
                  </Label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: 'essential', label: 'Essential', price: '₹1,850/sq.ft', desc: 'JSW Steel + UltraTech' },
                      { id: 'premium', label: 'Premium', price: '₹2,150/sq.ft', desc: 'BIM + Teak Wood Door', popular: true },
                      { id: 'luxury', label: 'Luxury', price: '₹2,650/sq.ft', desc: 'Full Italian + Smart Home' }
                    ].map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setFormData({ ...formData, package: pkg.id })}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                          formData.package === pkg.id
                            ? 'border-[#F35A61] bg-[#FDF2F3]/60 shadow-md ring-1 ring-[#F35A61]/30'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-[#F35A61] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                        <p className="text-slate-900 font-bold capitalize text-sm">{pkg.label}</p>
                        <p className="text-[#F35A61] font-extrabold text-base mt-1">{pkg.price}</p>
                        <p className="text-slate-500 text-xs mt-1">{pkg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={calculateEstimate}
                  className="w-full bg-[#F35A61] hover:bg-[#E04850] text-white h-13 text-base font-semibold rounded-lg shadow-lg shadow-[#F35A61]/25 transition-all duration-200 hover:scale-[1.01]"
                  disabled={!formData.homeType || !formData.plotSize}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Construction Estimate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estimate Results */}
          <div className="lg:col-span-5 space-y-6">
            {estimate ? (
              <>
                {/* Total Cost Card */}
                <Card className="bg-white border-2 border-[#F35A61] shadow-xl rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] px-6 py-3 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                    <span>Estimate Summary</span>
                    <span>10-Yr Warranty Included</span>
                  </div>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <p className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-2">Estimated Total Budget</p>
                      <p className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        {formatCurrency(estimate.totalCost)}
                      </p>
                      <div className="flex items-center justify-center gap-3 text-xs text-slate-600 font-medium mt-3">
                        <span className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-md">{estimate.size} sq.ft</span>
                        <span>•</span>
                        <span className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-md">{estimate.packageName} Package</span>
                        <span>•</span>
                        <span className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-md">{estimate.floors} Floor{estimate.floors > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100">
                      <div className="text-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-1">
                          <Clock className="h-3.5 w-3.5 text-[#01B3D1]" />
                          <span>Timeline</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          {estimate.timelineMonths} Months
                        </p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-1">
                          <Award className="h-3.5 w-3.5 text-[#F35A61]" />
                          <span>Base Rate</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          ₹{estimate.rate}/sq.ft
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Breakdown */}
                {showBreakdown && (
                  <Card className="bg-white border border-slate-200 shadow-md rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                        Detailed Itemized Breakdown
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Core Civil & Material Construction</span>
                          <span className="text-slate-900 font-semibold">{formatCurrency(estimate.constructionCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Architectural Design & Planning (10%)</span>
                          <span className="text-slate-900 font-semibold">{formatCurrency(estimate.designCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Government Approvals & Soil Testing</span>
                          <span className="text-slate-900 font-semibold">{formatCurrency(estimate.approvalsCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 pb-3 border-b border-slate-100">
                          <span>Contingency Buffer (5%)</span>
                          <span className="text-slate-900 font-semibold">{formatCurrency(estimate.contingency)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 text-base">
                          <span className="font-bold text-slate-900">Total Net Investment</span>
                          <span className="font-extrabold text-[#F35A61]">{formatCurrency(estimate.totalCost)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Site Visit Booking */}
                <div className="bg-white border border-[#99E7EF] rounded-2xl p-6 text-center shadow-md">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Lock In This Estimate & Get a Site Survey
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 font-light">
                    Our structural engineers will inspect your plot, evaluate soil, and deliver an exact BOQ quotation.
                  </p>
                  <Button
                    onClick={() => window.location.href = '/site-visit'}
                    className="w-full bg-[#01B3D1] hover:bg-[#009AA8] text-white font-semibold py-3 rounded-lg shadow-lg shadow-[#01B3D1]/25 transition-all hover:scale-[1.01]"
                  >
                    Book Free Site Visit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Card className="bg-white border border-dashed border-slate-300 shadow-sm rounded-2xl">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-[#FDF2F3] border border-[#FCA5A9]/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-[#F35A61]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Calculate?</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed max-w-xs mx-auto">
                    Choose your configuration, area in sq.ft, and preferred package on the left to view a complete breakdown.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quality Assurance Info Card */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <ShieldCheck className="h-4 w-4 text-[#01B3D1]" />
                <span>The Spacexio Price Guarantee</span>
              </div>
              <p>• Milestone-based payments: You only pay as construction progress is certified.</p>
              <p>• Zero hidden escalation: Locked-in material rates protect against market surges.</p>
              <p>• Guaranteed 10-year warranty certificate handed over at house completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
