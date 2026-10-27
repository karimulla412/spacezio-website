import React from 'react';
import { Check, X, ArrowRight, Info, Shield, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../context/ContentContext';
import { useInquiry } from '../context/InquiryContext';
import SEO from '../components/SEO';

const PackagesComparison = () => {
  const { content } = useContent();
  const { openInquiry } = useInquiry();
  const cmsPackages = content?.constructionPackagesData;

  const packages = [
    {
      name: 'Essential',
      price: cmsPackages?.find(p => p.id === 'essential')?.pricePerSqft || '1,850',
      tagline: cmsPackages?.find(p => p.id === 'essential')?.tagline || 'Budget-Friendly Quality',
      idealFor: cmsPackages?.find(p => p.id === 'essential')?.idealFor || 'Standard 2BHK/3BHK Homes',
      popular: false,
    },
    {
      name: 'Premium',
      price: cmsPackages?.find(p => p.id === 'premium')?.pricePerSqft || '2,150',
      tagline: cmsPackages?.find(p => p.id === 'premium')?.tagline || 'Most Popular Choice',
      idealFor: cmsPackages?.find(p => p.id === 'premium')?.idealFor || 'Duplex Villas & Modern Homes',
      popular: true,
    },
    {
      name: 'Luxury',
      price: cmsPackages?.find(p => p.id === 'luxury')?.pricePerSqft || '2,650',
      tagline: cmsPackages?.find(p => p.id === 'luxury')?.tagline || 'Ultra-Luxury Living',
      idealFor: cmsPackages?.find(p => p.id === 'luxury')?.idealFor || 'Custom Architect Villas',
      popular: false,
    }
  ];

  const comparisonData = {
    'Design & Architectural Planning': [
      { feature: '2D Floor Plans & Working Drawings', essential: true, premium: true, luxury: true },
      { feature: '3D Elevation Views', essential: true, premium: true, luxury: true },
      { feature: 'Full BIM 3D Structural Modeling', essential: false, premium: true, luxury: true },
      { feature: '3D Cinematic Walkthrough Video', essential: false, premium: true, luxury: true },
      { feature: 'VR Virtual Reality Tour', essential: false, premium: false, luxury: true },
      { feature: 'Vastu Consultation Included', essential: 'Basic', premium: true, luxury: true }
    ],
    'Structure & Civil Construction': [
      { feature: 'Soil Testing & Bearing Capacity', essential: true, premium: true, luxury: true },
      { feature: 'Structural Engineering Drawings', essential: true, premium: true, luxury: true },
      { feature: 'JSW Steel (Fe 500D Grade)', essential: 'Standard', premium: 'Premium', luxury: 'Premium' },
      { feature: 'Cement Brand', essential: 'JSW / UltraTech', premium: 'UltraTech Super', luxury: 'UltraTech Weather Plus' },
      { feature: 'Waterproofing System', essential: 'Dr. Fixit Standard', premium: 'Dr. Fixit 2K Polymer', luxury: 'Imported Membrane' }
    ],
    'Flooring & Surfaces': [
      { feature: 'Living & Dining Flooring', essential: 'Vitrified (₹50/sqft)', premium: 'Vitrified (₹90/sqft)', luxury: 'Italian Marble / Granite' },
      { feature: 'Bedrooms Flooring', essential: 'Vitrified (₹45/sqft)', premium: 'Vitrified (₹75/sqft)', luxury: 'Wooden / Large Slab' },
      { feature: 'Kitchen Flooring & Counter', essential: 'Granite (₹100/sqft)', premium: 'Granite (₹160/sqft)', luxury: 'Quartz / Premium Granite' },
      { feature: 'Anti-Skid Balcony Tiles', essential: true, premium: true, luxury: true }
    ],
    'Bathroom & Plumbing Fittings': [
      { feature: 'Sanitaryware Brands', essential: 'Cera / Hindware', premium: 'Jaquar / Kohler', luxury: 'Grohe / Toto' },
      { feature: 'CP Fitting Warranties', essential: '5 Years', premium: '10 Years', luxury: '12 Years' },
      { feature: 'Hot & Cold Water Diverters', essential: 'Standard', premium: 'Single Lever Jaquar', luxury: 'Thermostatic Grohe' },
      { feature: 'Solar Water Heater Piping', essential: false, premium: true, luxury: true }
    ],
    'Electrical & Smart Automation': [
      { feature: 'Concealed Wiring Brand', essential: 'Finolex / Polycab', premium: 'Polycab Flame Retardant', luxury: 'Havells Fire-Survival' },
      { feature: 'Modular Switches', essential: 'Anchor Roma', premium: 'Legrand Mylinc', luxury: 'Schneider Touch' },
      { feature: 'EV Charging Point Provision', essential: false, premium: true, luxury: true },
      { feature: 'Home Automation Integration', essential: false, premium: 'Lighting Automation', luxury: 'Full Smart Home System' }
    ],
    'Guarantees & Post-Handover': [
      { feature: 'Structural Warranty', essential: '10 Years', premium: '10 Years', luxury: '10 Years' },
      { feature: 'Waterproofing Warranty', essential: '5 Years', premium: '5 Years', luxury: '10 Years' },
      { feature: 'Post-Handover Free Maintenance', essential: '6 Months', premium: '1 Year', luxury: '2 Years' }
    ]
  };

  const renderValue = (value) => {
    if (value === true) return <Check className="h-5 w-5 text-emerald-600 mx-auto" />;
    if (value === false) return <X className="h-4 w-4 text-slate-300 mx-auto" />;
    if (typeof value === 'string') return <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">{value}</span>;
    return value;
  };

  const packageFaqs = [
    {
      question: "Which house construction package is best for a duplex home in Vizag?",
      answer: "The Premium Package (₹2,150/sq.ft) is our most popular choice, featuring full BIM 3D modeling, Jaquar bathroom fixtures, vitrified tiles up to ₹90/sqft, and complete architectural supervision."
    },
    {
      question: "Can I customize materials inside a package?",
      answer: "Yes, all Spacexio packages are fully customizable. You can upgrade individual components (such as flooring or sanitaryware) with transparent rate adjustments."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 pt-28 pb-20">
      <SEO 
        title="House Construction Packages Comparison - Essential, Premium, Luxury"
        description="Compare Spacexio house construction packages in Visakhapatnam. Starting at ₹1,850/sq.ft with 10-year structural warranty, JSW steel, UltraTech cement, and Jaquar fittings."
        keywords="house construction packages, construction cost per sqft Vizag, essential vs premium construction, home building comparison Visakhapatnam"
        url="https://spacexio.com/packages"
        faqs={packageFaqs}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-4 w-4" />
            Transparent Pricing Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Compare Construction Packages
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light">
            Review side-by-side specifications, materials, and warranty coverage for every budget.
          </p>
        </div>

        {/* Sticky Package Headers */}
        <div className="grid md:grid-cols-4 gap-4 mb-8 sticky top-20 z-20 bg-[#FCFCF7]/95 backdrop-blur-md py-4">
          <div className="hidden md:flex items-end pb-4">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Feature Inclusions</p>
          </div>
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`border transition-all duration-200 rounded-xl ${
                pkg.popular
                  ? 'border-2 border-[#F35A61] shadow-xl bg-[#FDF2F3]/40 text-slate-900 ring-2 ring-[#F35A61]/20'
                  : 'border-slate-200 bg-white text-slate-900 shadow-sm'
              }`}
            >
              <CardContent className="p-4 text-center">
                {pkg.popular && (
                  <span className="inline-block px-2.5 py-0.5 bg-[#F35A61] text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-2">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="text-3xl font-extrabold text-[#F35A61]">₹{pkg.price}</span>
                  <span className="text-xs text-slate-500">/sq.ft</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-3">{pkg.idealFor}</p>
                <button
                  type="button"
                  onClick={() => openInquiry({
                    title: `${pkg.name} Package (₹${pkg.price}/sq.ft)`,
                    category: 'Package Inquiry',
                    subtitle: `${pkg.tagline} • Ideal for ${pkg.idealFor}`,
                    defaultMessage: `Hi Spacexio, I am interested in the ${pkg.name} package at ₹${pkg.price}/sq.ft. Please share detailed specifications and a customized quotation for my plot.`
                  })}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-[#F35A61] hover:bg-[#E04850] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Inquire for {pkg.name} →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Tables */}
        <div className="space-y-6">
          {Object.entries(comparisonData).map(([category, features]) => (
            <Card key={category} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">{category}</h2>
                  <span className="text-xs font-medium text-slate-500">{features.length} Items Verified</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {features.map((item, idx) => (
                    <div key={idx} className="grid md:grid-cols-4 gap-4 p-4 items-center hover:bg-slate-50/80 transition-colors">
                      <div className="md:col-span-1">
                        <p className="text-slate-800 text-sm font-medium">{item.feature}</p>
                      </div>
                      <div className="text-center">
                        {renderValue(item.essential)}
                      </div>
                      <div className="text-center">
                        {renderValue(item.premium)}
                      </div>
                      <div className="text-center">
                        {renderValue(item.luxury)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inclusions Notes */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FDF2F3] rounded-xl text-[#F35A61] border border-[#FCA5A9]/50 flex-shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Every Package Includes:</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-600 mt-4 font-normal">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Soil Testing & Certified Structural Drawing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Full Architectural 2D Plans & 3D Elevations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>10-Year Comprehensive Structural Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Dedicated Project Manager On-Site</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>No Escalation Fixed-Price Agreement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Milestone-Based Transparent Invoicing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-4 tracking-tight">
            Ready to Choose or Customize Your Package?
          </h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto font-light">
            Book a site inspection with our senior engineer to get an exact quotation tailored to your plot dimensions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#F35A61] hover:bg-[#E04850] text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#F35A61]/25 transition-all hover:scale-105 cursor-pointer"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Free Site Visit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 text-slate-800 hover:border-[#F35A61] hover:text-[#F35A61] hover:bg-[#FDF2F3] px-8 py-6 text-base font-semibold rounded-lg transition-colors cursor-pointer"
              onClick={() => openInquiry({
                title: 'Custom Construction Package Inquiry',
                category: 'Package Customization',
                subtitle: 'Tailored BOQ for your custom specifications',
                defaultMessage: 'Hi Spacexio, I would like to discuss customizing a construction package for my plot dimensions and requirements.'
              })}
            >
              Inquire for Custom Package
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 text-slate-800 hover:border-[#01B3D1] hover:text-[#01B3D1] hover:bg-[#EFFBFC] px-8 py-6 text-base font-semibold rounded-lg transition-colors cursor-pointer"
              onClick={() => window.location.href = '/cost-calculator'}
            >
              Calculate Construction Cost
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesComparison;
