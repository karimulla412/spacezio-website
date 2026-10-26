import React from 'react';
import { ArrowRight, Check, Compass, Box, Home, Hammer, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { servicesData } from '../data/mock';
import SEO from '../components/SEO';

const iconMap = {
  Compass,
  Box,
  Home,
  Hammer
};

const Services = () => {
  const serviceDetails = {
    1: {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      benefits: ['Custom 3D Concept Models', '100% Vastu Certified Designs', 'Fast Municipal Sanctions', 'Maximum Natural Light & Air']
    },
    2: {
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
      benefits: ['Premium Italian Marbles & Teak', 'Custom Modular Kitchens', 'Automated Smart Lighting', 'Turnkey 45-Day Handover']
    },
    3: {
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&q=80',
      benefits: ['Fixed Price & No Escalation', '430+ Daily Quality Checks', 'Escrow Milestone Payments', '10-Year Foundation Warranty']
    },
    4: {
      image: 'https://images.unsplash.com/photo-1618385455730-2571c38966b7?w=800&q=80',
      benefits: ['BIM Clash Detection', 'Precise 3D Coordination', 'Reduced Structural Waste', 'Accurate Material BOQ']
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="Architectural & Turnkey Construction Services"
        description="Comprehensive architectural design, 3D BIM clash detection, interior design, and turnkey residential home construction services in Visakhapatnam. Fixed pricing and 10-year warranty."
        keywords="architectural services Visakhapatnam, interior design Vizag, turnkey construction services, BIM modeling services Andhra Pradesh, villa builders"
        url="https://www.spacexio.com/services"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F35A61] pulse-indicator" />
            <span className="text-[#F35A61] font-bold uppercase">END-TO-END SOLUTIONS</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">CONCEPT TO HANDOVER</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
            Design to Execution <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
              Architectural Services
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Comprehensive end-to-end solutions from 2D/3D architectural drawings and BIM coordination to turnkey civil construction and luxury interiors.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {servicesData.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const details = serviceDetails[service.id];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="inline-block p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs mb-6">
                      <IconComponent className="h-9 w-9 text-[#F35A61]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-4">{service.title}</h2>
                    <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Key Offerings:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-slate-700 text-sm font-medium">
                            <Check className="h-4 w-4 text-[#01B3D1] mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Guaranteed Benefits:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {details.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-slate-600 text-xs sm:text-sm">
                            <div className="w-1.5 h-1.5 bg-[#01B3D1] rounded-full mr-2.5 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="bg-[#F35A61] hover:bg-[#E04850] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-[#F35A61]/25 transition-all cursor-pointer"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Request Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 group bg-slate-100">
                      <img
                        src={details.image}
                        alt={service.title}
                        className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Our 3-Step Seamless Process
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto font-normal">
              Simple, transparent, and hassle-free architectural delivery from first sketch to final key handover.
            </p>
          </div>

          <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-sm">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="text-center px-4 pt-4 md:pt-0">
                  <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] to-[#B85C8D] mb-3">01</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Design & Visualize</h3>
                  <p className="text-slate-600 text-sm">
                    Meet our senior architects and visualize your home in photorealistic 3D elevations and BIM models.
                  </p>
                </div>
                <div className="text-center px-4 pt-4 md:pt-0">
                  <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#B85C8D] to-[#01B3D1] mb-3">02</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Select Materials</h3>
                  <p className="text-slate-600 text-sm">
                    Choose from our transparent catalog of certified brands (Tata Tiscon, UltraTech, Jaquar, Asian Paints).
                  </p>
                </div>
                <div className="text-center px-4 pt-4 md:pt-0">
                  <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#01B3D1] to-[#62C290] mb-3">03</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Milestone Execution</h3>
                  <p className="text-slate-600 text-sm">
                    Guaranteed milestone construction with escrow safety and 10-year structural warranty bond.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FCFCF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl shadow-[#F35A61]/20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Design & Build Your Dream Home?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Book a complimentary consultation with our registered civil engineers today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-6 text-sm rounded-xl shadow-xl hover:scale-105 transition-all cursor-pointer"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-sm font-bold rounded-xl transition-all cursor-pointer"
                onClick={() => window.location.href = '/projects'}
              >
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
