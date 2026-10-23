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
    <div className="min-h-screen bg-black pt-28 pb-20 text-white">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="h-4 w-4" />
            Transparent Pricing Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Construction Cost Calculator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Plan your budget with clarity. Get an instant, reliable estimate for your residential project in Visakhapatnam.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Calculator Form */}
          <Card className="lg:col-span-7 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between pb-4 border-b border-gray-700">
                <span>1. Select Project Specifications</span>
                <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full">Step-by-step</span>
              </h2>

              <div className="space-y-6">
                {/* Home Type */}
                <div>
                  <Label htmlFor="homeType" className="text-gray-300 font-medium mb-2 block text-sm">
                    Type of Configuration *
                  </Label>
                  <Select value={formData.homeType} onValueChange={handleHomeTypeChange}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:ring-2 focus:ring-orange-500">
                      <SelectValue placeholder="Select home layout" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white shadow-xl">
                      {homeTypes.map(type => (
                        <SelectItem key={type.value} value={type.value} className="text-gray-200 hover:bg-gray-800 hover:text-white cursor-pointer">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Plot Size */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plotSize" className="text-gray-300 font-medium mb-2 block text-sm">
                      Built-up Area (sq.ft) *
                    </Label>
                    <Input
                      id="plotSize"
                      type="number"
                      value={formData.plotSize}
                      onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                      placeholder="e.g. 1500"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-12 rounded-lg focus:border-orange-500"
                      min="500"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">Typical range: 600 - 4000 sq.ft</p>
                  </div>

                  {/* Number of Floors */}
                  <div>
                    <Label htmlFor="floors" className="text-gray-300 font-medium mb-2 block text-sm">
                      Number of Floors *
                    </Label>
                    <Select value={formData.floors} onValueChange={(value) => setFormData({ ...formData, floors: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:ring-2 focus:ring-orange-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white shadow-xl">
                        <SelectItem value="1" className="hover:bg-gray-800">Single Floor (Ground)</SelectItem>
                        <SelectItem value="2" className="hover:bg-gray-800">Two Floors (G + 1)</SelectItem>
                        <SelectItem value="3" className="hover:bg-gray-800">Three Floors (G + 2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <Label className="text-gray-300 font-medium mb-3 block text-sm">
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
                            ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                            : 'border-gray-700 hover:border-gray-600 bg-gray-800/80'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                        <p className="text-white font-bold capitalize text-sm">{pkg.label}</p>
                        <p className="text-orange-400 font-extrabold text-base mt-1">{pkg.price}</p>
                        <p className="text-gray-400 text-xs mt-1">{pkg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={calculateEstimate}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-13 text-base font-semibold rounded-lg shadow-md shadow-orange-600/20 transition-all duration-200"
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
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-orange-500 shadow-2xl rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-3 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                    <span>Estimate Summary</span>
                    <span>10-Yr Warranty Included</span>
                  </div>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-2">Estimated Total Budget</p>
                      <p className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        {formatCurrency(estimate.totalCost)}
                      </p>
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-400 font-medium mt-3">
                        <span className="bg-gray-800 border border-gray-700 text-gray-200 px-2.5 py-1 rounded-md">{estimate.size} sq.ft</span>
                        <span>•</span>
                        <span className="bg-gray-800 border border-gray-700 text-gray-200 px-2.5 py-1 rounded-md">{estimate.packageName} Package</span>
                        <span>•</span>
                        <span className="bg-gray-800 border border-gray-700 text-gray-200 px-2.5 py-1 rounded-md">{estimate.floors} Floor{estimate.floors > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-700">
                      <div className="text-center p-3 bg-gray-800/80 border border-gray-700 rounded-xl">
                        <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
                          <Clock className="h-3.5 w-3.5 text-orange-400" />
                          <span>Timeline</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {estimate.timelineMonths} Months
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-800/80 border border-gray-700 rounded-xl">
                        <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
                          <Award className="h-3.5 w-3.5 text-orange-400" />
                          <span>Base Rate</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          ₹{estimate.rate}/sq.ft
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Breakdown */}
                {showBreakdown && (
                  <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-gray-700">
                        Detailed Itemized Breakdown
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center text-gray-300">
                          <span>Core Civil & Material Construction</span>
                          <span className="text-white font-semibold">{formatCurrency(estimate.constructionCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300">
                          <span>Architectural Design & Planning (10%)</span>
                          <span className="text-white font-semibold">{formatCurrency(estimate.designCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300">
                          <span>Government Approvals & Soil Testing</span>
                          <span className="text-white font-semibold">{formatCurrency(estimate.approvalsCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 pb-3 border-b border-gray-700">
                          <span>Contingency Buffer (5%)</span>
                          <span className="text-white font-semibold">{formatCurrency(estimate.contingency)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 text-base">
                          <span className="font-bold text-white">Total Net Investment</span>
                          <span className="font-extrabold text-orange-400">{formatCurrency(estimate.totalCost)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Site Visit Booking */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-500/30 rounded-2xl p-6 text-center shadow-lg">
                  <h4 className="text-base font-bold text-white mb-2">
                    Lock In This Estimate & Get a Site Survey
                  </h4>
                  <p className="text-xs text-gray-400 mb-4 font-light">
                    Our structural engineers will inspect your plot, evaluate soil, and deliver an exact BOQ quotation.
                  </p>
                  <Button
                    onClick={() => window.location.href = '/site-visit'}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
                  >
                    Book Free Site Visit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-dashed border-gray-700 shadow-xl rounded-2xl">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-orange-600/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Ready to Calculate?</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                    Choose your configuration, area in sq.ft, and preferred package on the left to view a complete breakdown.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quality Assurance Info Card */}
            <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-xl text-xs text-gray-400 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ShieldCheck className="h-4 w-4 text-orange-400" />
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
