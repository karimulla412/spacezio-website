import React from 'react';
import { ArrowRight, Check, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { industriesData } from '../data/mock';
import SEO from '../components/SEO';

const Industries = () => {
  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <SEO 
        title="Residential & Commercial Construction Expertise - Spacexio"
        description="Spacexio serves luxury residential villas, independent homes, commercial complexes, and industrial projects in Visakhapatnam and Andhra Pradesh."
        keywords="residential construction Vizag, commercial builders Visakhapatnam, villa developers Andhra Pradesh, turnkey builders"
        url="https://spacexio.com/home-types"
      />

      {/* Hero Section */}
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3]/10 border border-[#F35A61]/30 text-[#F35A61] text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="h-3.5 w-3.5" />
            Sectors We Specialize In
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Home Types & Sectors We Build
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Comprehensive design-to-execution capabilities across independent houses, luxury duplexes, commercial studios, and modern interiors.
          </p>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
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
                    <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{industry.title}</h2>
                    <p className="text-base text-gray-400 mb-6 leading-relaxed font-light">
                      {industry.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Our Core Deliverables:</h3>
                      <div className="space-y-2.5">
                        {industry.capabilities.map((capability, idx) => (
                          <div key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-[#01B3D1] mr-2.5 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm font-medium">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 mb-6">
                      <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1.5">Why Choose Us for {industry.title}?</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-light">
                        Our in-house architects and structural engineers collaborate seamlessly with verified material suppliers to guarantee on-time completion with zero budget overruns.
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#F35A61] to-[#E04850] hover:brightness-105 text-white font-semibold text-sm rounded-lg shadow-lg shadow-[#F35A61]/25 transition-all"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Inquire for This Project Type
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl rounded-2xl">
                      <div className="relative h-80 lg:h-96 group overflow-hidden">
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
      <section className="py-20 bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Have a Specific Project in Mind?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto font-light">
            Whether it's an individual plot in Visakhapatnam or a multi-story apartment, we provide turnkey delivery.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-6 text-base font-bold rounded-lg shadow-2xl transition-all hover:scale-105"
            onClick={() => window.location.href = '/site-visit'}
          >
            Book Free Site Inspection
            <ArrowRight className="ml-2 h-5 w-5 text-[#F35A61]" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Industries;
