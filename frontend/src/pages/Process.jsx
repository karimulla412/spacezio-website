import React from 'react';
import { ArrowRight, MessageSquare, Pencil, FileText, Settings, CheckCircle, ShieldCheck, Clock, Calculator } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { processData } from '../data/mock';
import SEO from '../components/SEO';

const iconMap = {
  MessageSquare,
  Pencil,
  FileText,
  Settings,
  CheckCircle
};

const Process = () => {
  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="Our House Construction Process - From Concept to Handover"
        description="Discover Spacexio's transparent 5-stage architectural design & construction methodology in Visakhapatnam. Guaranteed milestone-based delivery and 10-year warranty."
        keywords="house building process Visakhapatnam, construction workflow Vizag, turnkey construction stages, architectural design timeline"
        url="https://spacexio.com/how-it-works"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F35A61] pulse-indicator" />
            <span className="text-[#F35A61] font-bold uppercase">ENGINEERING PRECISION</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">ZERO HIDDEN COSTS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
            Our Turnkey Home <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
              Construction Process
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            A milestone-driven, BIM-backed engineering workflow ensuring complete transparency, escrow payment safety, and guaranteed on-time handover.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 transform -translate-x-1/2"></div>

            <div className="space-y-20">
              {processData.map((step, index) => {
                const IconComponent = iconMap[step.icon] || CheckCircle;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={step.step}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    <div className={`${isEven ? 'lg:text-right' : 'lg:col-start-2'}`}>
                      <div className={`inline-block ${isEven ? 'lg:float-right' : ''}`}>
                        <span className="text-5xl font-black text-slate-200 font-mono block mb-1">
                          0{step.step}
                        </span>
                        <div className="inline-block p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs mb-3 text-[#01B3D1]">
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="clear-both"></div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-base leading-relaxed max-w-lg font-normal">
                        {step.description}
                      </p>
                    </div>

                    {/* Center Circle */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-slate-100 shadow-md">
                        <span className="text-[#F35A61] font-black font-mono text-lg">{step.step}</span>
                      </div>
                    </div>

                    <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Visualization */}
      <section className="py-16 bg-[#FAF9F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-950 mb-2 tracking-tight">
              Project Execution Timeline
            </h2>
            <p className="text-slate-600 text-base font-normal">
              Predictable scheduling from concept design to key handover
            </p>
          </div>

          <Card className="bg-white border border-slate-200/90 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="text-2xl font-black text-[#01B3D1] mb-1 font-mono">Week 1-2</div>
                  <div className="text-slate-900 font-bold text-sm mb-1">Site Survey</div>
                  <div className="text-slate-500 text-xs">Soil Test & Requirements</div>
                </div>
                <div className="text-center p-4 bg-[#FDF2F3]/60 border border-[#FCA5A9]/40 rounded-xl">
                  <div className="text-2xl font-black text-[#F35A61] mb-1 font-mono">Week 3-6</div>
                  <div className="text-slate-900 font-bold text-sm mb-1">3D Elevation</div>
                  <div className="text-slate-500 text-xs">Architectural Drawings</div>
                </div>
                <div className="text-center p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="text-2xl font-black text-[#01B3D1] mb-1 font-mono">Week 7-8</div>
                  <div className="text-slate-900 font-bold text-sm mb-1">Approvals</div>
                  <div className="text-slate-500 text-xs">Sanction & BOQ Sign-off</div>
                </div>
                <div className="text-center p-4 bg-[#FDF2F3]/60 border border-[#FCA5A9]/40 rounded-xl">
                  <div className="text-2xl font-black text-[#F35A61] mb-1 font-mono">Month 3-7</div>
                  <div className="text-slate-900 font-bold text-sm mb-1">Civil Construction</div>
                  <div className="text-slate-500 text-xs">Foundation, Slab & Brickwork</div>
                </div>
                <div className="text-center p-4 bg-[#EFFBFC] rounded-xl border border-[#99E7EF]">
                  <div className="text-2xl font-black text-[#01B3D1] mb-1 font-mono">Final</div>
                  <div className="text-slate-900 font-bold text-sm mb-1">Handover</div>
                  <div className="text-slate-600 text-xs font-medium">10-Yr Warranty Handover</div>
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
              Ready to Begin Your Construction Journey?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Book a complimentary site inspection or calculate your building estimate today with zero commitments.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-6 text-sm font-bold rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer"
                onClick={() => window.location.href = '/site-visit'}
              >
                Book Free Site Visit
                <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-sm font-bold rounded-xl transition-colors cursor-pointer"
                onClick={() => window.location.href = '/cost-calculator'}
              >
                Estimate Construction Cost
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
