import React from 'react';
import { ArrowRight, CheckCircle, Layers, Box, Cpu, ShieldCheck, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import SEO from '../components/SEO';

const BIM = () => {
  const bimServices = [
    {
      icon: Box,
      title: '3D BIM Modeling (LOD 100 - 500)',
      description: 'Parametric 3D digital models integrating architectural, structural, and MEP engineering systems for complete coordination.'
    },
    {
      icon: Layers,
      title: 'Clash Detection & Resolution',
      description: 'Identify hard and soft clashes between structural elements and utility conduits before construction commences, reducing site rework by 85%.'
    },
    {
      icon: Cpu,
      title: '4D Scheduling & 5D Cost Estimation',
      description: 'Link project construction milestones to timeline simulations and automated BOQ quantity takeoffs for zero cost escalation.'
    },
    {
      icon: ShieldCheck,
      title: 'As-Built Documentation',
      description: 'High-precision digital twin deliverables for facility management, lifecycle operations, and post-handover warranty tracking.'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: '85% Fewer Site Clashes',
      description: 'Digital pre-construction resolves mechanical, electrical, and plumbing conflicts before concrete is poured.'
    },
    {
      icon: TrendingUp,
      title: '15-20% Material Savings',
      description: 'Exact digital quantity takeoffs prevent over-ordering of steel, cement, and electrical conduits.'
    },
    {
      icon: ShieldCheck,
      title: '30% Faster Delivery',
      description: 'Streamlined coordination between architects, structural engineers, and site supervisors accelerates delivery.'
    }
  ];

  const software = [
    'Autodesk Revit',
    'Navisworks Manage',
    'Autodesk BIM 360',
    'Tekla Structures',
    'Solibri Model Checker',
    'Synchro 4D Pro'
  ];

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="BIM Modeling & Architectural Clash Detection Services"
        description="Advanced Building Information Modeling (BIM) solutions in Visakhapatnam & Hyderabad. LOD 100-500 modeling, MEP clash detection, 4D simulation, and automated quantity takeoffs."
        keywords="BIM modeling Visakhapatnam, Revit architectural services Vizag, clash detection Andhra Pradesh, 3D building modeling"
        url="https://spacexio.com/bim"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#01B3D1] pulse-indicator" />
                <span className="text-[#01B3D1] font-bold uppercase">BIM LEVEL 2 & 3 CAPABILITY</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-600">ZERO SITE CLASHES</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
                BIM Precision for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
                  Predictable Construction
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed font-normal">
                Leverage cutting-edge Building Information Modeling to simulate, coordinate, and cost-optimize your luxury villa or commercial development before breaking ground.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#F35A61] hover:bg-[#E04850] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-[#F35A61]/25 transition-all cursor-pointer"
                  onClick={() => window.location.href = '/contact'}
                >
                  Request BIM Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-6 rounded-xl transition-all cursor-pointer shadow-2xs"
                  onClick={() => window.location.href = '/projects'}
                >
                  Explore BIM Projects
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1618385455730-2571c38966b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxCSU0lMjBjb25zdHJ1Y3Rpb258ZW58MHx8fHwxNzc0MDA4NjU1fDA&ixlib=rb-4.1.0&q=85"
                  alt="BIM Technology"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIM Services Grid */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Comprehensive BIM Solutions
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              End-to-end digital engineering services tailored for residential owners, builders, and developers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bimServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border border-slate-200/90 hover:border-[#01B3D1]/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div className="inline-block p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl mb-6 group-hover:border-[#01B3D1]/40 transition-colors">
                      <IconComponent className="h-8 w-8 text-[#01B3D1]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#F35A61] transition-colors">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Why BIM Matters to Your Home
            </h2>
            <p className="text-base text-slate-600">
              Measurable benefits that safeguard your structural budget and schedule
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border border-slate-200/90 rounded-2xl shadow-sm text-center p-8 hover:shadow-md transition-all"
                >
                  <CardContent className="p-0">
                    <div className="inline-block p-4 bg-[#FDF2F3] border border-[#FCA5A9] rounded-2xl mb-6">
                      <IconComponent className="h-9 w-9 text-[#F35A61]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software & Tools */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-2">
              Industry-Leading BIM Tech Stack
            </h2>
            <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">
              Autodesk Certified Workflows & Collaborative Cloud Platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {software.map((tool, index) => (
              <div
                key={index}
                className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl text-center hover:border-[#01B3D1]/50 hover:bg-white transition-all shadow-2xs"
              >
                <p className="text-slate-800 font-bold text-xs font-mono">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3.5 py-1 bg-[#EFFBFC] border border-[#99E7EF] text-[#01B3D1] text-xs font-mono font-bold uppercase rounded-full">
                Engineering Case Study
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-4 mb-4 tracking-tight">
                Multi-Story Residential Complex: 95% Conflict Elimination
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed text-base font-normal">
                For a 120,000 sq.ft residential & commercial development in Visakhapatnam, Spacexio's BIM coordination resolved 850+ clashes between plumbing risers and structural beams before pouring slabs.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#01B3D1] mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-bold text-sm">₹28 Lakhs Saved in Rework</div>
                    <div className="text-slate-500 text-xs">Prevented destructive slab coring and piping rerouting</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#01B3D1] mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-bold text-sm">2.5 Months Accelerated Delivery</div>
                    <div className="text-slate-500 text-xs">Fast-track fabrication from clash-free shop drawings</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#01B3D1] mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-bold text-sm">100% As-Built Digital Twin Handover</div>
                    <div className="text-slate-500 text-xs">Delivered complete facility management model to owners</div>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 bg-white text-slate-800 hover:border-[#01B3D1] hover:text-[#01B3D1] transition-colors rounded-xl shadow-2xs font-bold text-xs"
                onClick={() => window.location.href = '/projects'}
              >
                View More Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100">
                <img
                  src="https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="BIM Case Study"
                  className="w-full h-[380px] object-cover"
                />
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
              Transform Your Construction with BIM
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Get a complimentary BIM feasibility assessment and structural clash review for your upcoming project.
            </p>
            <Button
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-100 px-8 py-6 text-sm font-bold rounded-xl shadow-xl hover:scale-105 transition-all cursor-pointer"
              onClick={() => window.location.href = '/contact'}
            >
              Schedule Free BIM Audit
              <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BIM;
