import React from 'react';
import { ArrowRight, Check, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { industriesData } from '../data/mock';
import SEO from '../components/SEO';

const Industries = () => {
  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="Residential & Commercial Construction Expertise - Spacexio"
        description="Spacexio serves luxury residential villas, independent homes, commercial complexes, and industrial projects in Visakhapatnam and Andhra Pradesh."
        keywords="residential construction Vizag, commercial builders Visakhapatnam, villa developers Andhra Pradesh, turnkey builders"
        url="https://spacexio.com/home-types"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <Building2 className="h-3.5 w-3.5 text-[#F35A61]" />
            <span className="text-[#F35A61] font-bold uppercase">SECTORS WE SPECIALIZE IN</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">AP & HYDERABAD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
            Home Types & Sectors <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
              Engineered by Spacexio
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Comprehensive design-to-execution capabilities across independent houses, luxury duplexes, commercial studios, and modern interiors.
          </p>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {industriesData.map((industry, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={industry.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">{industry.title}</h2>
                    <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed font-normal">
                      {industry.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">Our Core Deliverables:</h3>
                      <div className="space-y-2.5">
                        {industry.capabilities.map((capability, idx) => (
                          <div key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-[#01B3D1] mr-2.5 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm font-medium">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/90 mb-6">
                      <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-1.5">Why Choose Us for {industry.title}?</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-normal">
                        Our in-house architects and structural engineers collaborate seamlessly with verified material suppliers to guarantee on-time completion with zero budget overruns.
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="bg-[#F35A61] hover:bg-[#E04850] text-white font-bold text-xs uppercase tracking-wider px-7 py-6 rounded-xl shadow-lg shadow-[#F35A61]/25 transition-all cursor-pointer"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Inquire for This Project Type
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <Card className="overflow-hidden bg-white border border-slate-200/90 shadow-xl rounded-3xl">
                      <div className="relative h-80 lg:h-96 group overflow-hidden bg-slate-100">
                        <img
                          src={industry.image}
                          alt={industry.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FCFCF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl shadow-[#F35A61]/20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Have a Specific Project in Mind?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Whether it's an individual plot in Visakhapatnam or a luxury duplex in Hyderabad, we provide turnkey execution.
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-6 text-sm font-bold rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Free Site Inspection
              <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
