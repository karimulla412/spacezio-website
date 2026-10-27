import React from 'react';
import { Zap, Target, DollarSign, Eye, Heart, TrendingUp, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useInquiry } from '../context/InquiryContext';
import SEO from '../components/SEO';

const WhyUs = () => {
  const { openInquiry } = useInquiry();
  const features = [
    {
      icon: <Zap className="h-9 w-9 text-[#F35A61]" />,
      title: "Tech-Driven BIM Approach",
      description: "Advanced BIM (Building Information Modeling) for clash detection before breaking ground. Digital-first architectural blueprints eliminate 85% of structural site revisions."
    },
    {
      icon: <Target className="h-9 w-9 text-[#01B3D1]" />,
      title: "Faster & Predictable Execution",
      description: "Automated schedule tracking with live daily site logs. Complete your luxury villa 30% faster than traditional contractors with legally binding milestone timelines."
    },
    {
      icon: <DollarSign className="h-9 w-9 text-[#F35A61]" />,
      title: "Zero Cost Escalation Guarantee",
      description: "Transparent fixed-price packages starting from ₹1,850/sq.ft. Every rupee is itemized in an exhaustive BOQ with 0% surprise price surges guaranteed."
    },
    {
      icon: <Eye className="h-9 w-9 text-[#01B3D1]" />,
      title: "100% Transparent Collaboration",
      description: "Live smartphone project dashboard. Track material delivery invoices, lab test reports, and HD weekly drone walkthroughs from anywhere in the world."
    },
    {
      icon: <Heart className="h-9 w-9 text-[#F35A61]" />,
      title: "Client-Focused Concierge Service",
      description: "Dedicated Senior Civil Engineer for your home. Unlimited design iterations, personalized Vastu consultancy, and proactive structural advisory."
    },
    {
      icon: <TrendingUp className="h-9 w-9 text-[#01B3D1]" />,
      title: "10-Year Structural Warranty",
      description: "Multi-tier certified inspections, 430+ automated quality checks, and top-tier branded materials (Tata Tiscon, UltraTech) backed by a 10-year legal foundation bond."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="Why Choose Spacexio - Tech-Driven Construction & Honest Pricing"
        description="Discover why homeowners in Visakhapatnam trust Spacexio for turnkey construction. 10-year structural warranty, milestone payments, and BIM 3D precision engineering."
        keywords="why choose Spacexio, best builders in Vizag, reliable construction company Visakhapatnam, honest construction pricing"
        url="https://spacexio.com/why-us"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F35A61] pulse-indicator" />
            <span className="text-[#F35A61] font-bold uppercase">THE SPACEXIO STANDARD</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">HONEST TRANSPARENCY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
            Building Homes Differently, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
              Smarter, Faster & Better
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            We combine cutting-edge BIM modeling with transparent fixed pricing, escrow milestone security, and 430+ automated quality checks to eliminate contractor uncertainty.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white border border-slate-200/90 hover:border-[#F35A61]/50 hover:shadow-xl rounded-2xl transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div className="mb-6 inline-block p-4 bg-slate-50 border border-slate-200/80 group-hover:border-[#01B3D1]/40 rounded-2xl transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#F35A61] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Real Outcomes, Measurable Trust
            </h2>
            <p className="text-base text-slate-600">
              Verified outcomes from our engineering-first construction methodology
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-black text-[#F35A61] font-mono mb-2">85%</div>
              <div className="text-slate-700 font-bold text-sm">Fewer Construction Errors</div>
              <div className="text-slate-500 text-xs mt-1">Via BIM Clash Detection</div>
            </div>
            <div className="text-center p-8 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-black text-[#01B3D1] font-mono mb-2">30%</div>
              <div className="text-slate-700 font-bold text-sm">Faster Project Delivery</div>
              <div className="text-slate-500 text-xs mt-1">Guaranteed Penalty Clauses</div>
            </div>
            <div className="text-center p-8 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-black text-[#F35A61] font-mono mb-2">20%</div>
              <div className="text-slate-700 font-bold text-sm">Procurement Savings</div>
              <div className="text-slate-500 text-xs mt-1">Direct Factory Sourcing</div>
            </div>
            <div className="text-center p-8 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-black text-[#01B3D1] font-mono mb-2">10 Yrs</div>
              <div className="text-slate-700 font-bold text-sm">Structural Foundation Warranty</div>
              <div className="text-slate-500 text-xs mt-1">Signed Legal Bond</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section: Traditional vs SPACEXIO */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Traditional Builders vs SPACEXIO
            </h2>
            <p className="text-base text-slate-600">
              Why 500+ homeowners switched to our tech-enabled construction model
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Traditional Way */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-700 mb-6 pb-3 border-b border-slate-200 flex items-center justify-between">
                  <span>Traditional Contractors</span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold">Old Method</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl font-bold leading-none">✕</span>
                    <span className="text-slate-600 text-sm">Manual 2D drawings with frequent structural mismatches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl font-bold leading-none">✕</span>
                    <span className="text-slate-600 text-sm">Vague quotes leading to 20-30% mid-project cost escalations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl font-bold leading-none">✕</span>
                    <span className="text-slate-600 text-sm">Zero digital tracking — requires stressful daily site visits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl font-bold leading-none">✕</span>
                    <span className="text-slate-600 text-sm">Frequent delays with zero penalty protection for owners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl font-bold leading-none">✕</span>
                    <span className="text-slate-600 text-sm">Verbal promises with no post-handover warranty support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SPACEXIO Way */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#F35A61] ring-4 ring-[#F35A61]/10 shadow-xl relative overflow-hidden flex flex-col justify-between">
              {/* Corner Ribbon */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDF2F3] rounded-full blur-2xl pointer-events-none" />
              <div>
                <h3 className="text-xl font-bold text-slate-950 mb-6 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[#F35A61]">SPACEXIO Standard</span>
                  <span className="text-xs bg-[#F35A61] text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-xs">Recommended</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#01B3D1] text-xl font-bold leading-none">✓</span>
                    <span className="text-slate-800 text-sm font-semibold">BIM Level-2 3D modeling eliminates 85% of site revisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#01B3D1] text-xl font-bold leading-none">✓</span>
                    <span className="text-slate-800 text-sm font-semibold">Legally guaranteed fixed pricing with 0% cost escalation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#01B3D1] text-xl font-bold leading-none">✓</span>
                    <span className="text-slate-800 text-sm font-semibold">24/7 mobile app tracking with live photos & lab reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#01B3D1] text-xl font-bold leading-none">✓</span>
                    <span className="text-slate-800 text-sm font-semibold">On-time completion backed by contractual per-week penalties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#01B3D1] text-xl font-bold leading-none">✓</span>
                    <span className="text-slate-800 text-sm font-semibold">10-year legal foundation warranty & 1-year free maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FCFCF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl shadow-[#F35A61]/20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Experience the SPACEXIO Advantage
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Book a complimentary site consultation and see how technology and honesty deliver your dream home without stress.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-6 text-sm font-bold rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer"
                onClick={() => openInquiry({
                  title: 'Complimentary Architectural Consultation',
                  category: 'Why Us Consultation',
                  subtitle: 'Direct studio inquiry • Visakhapatnam & Hyderabad',
                  defaultMessage: 'Hi Spacexio, I want to experience the Spacexio advantage. Please schedule a free consultation to discuss my upcoming construction project.'
                })}
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-sm font-bold rounded-xl transition-colors cursor-pointer"
                onClick={() => window.location.href = '/packages'}
              >
                Explore Pricing Packages
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
