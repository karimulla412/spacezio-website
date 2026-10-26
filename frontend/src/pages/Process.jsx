import React from 'react';
import { ArrowRight, MessageSquare, Pencil, FileText, Settings, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-black pt-28 text-white">
      <SEO 
        title="Our House Construction Process - From Concept to Handover"
        description="Discover Spacexio's transparent 5-stage architectural design & construction methodology in Visakhapatnam. Guaranteed milestone-based delivery and 10-year warranty."
        keywords="house building process Visakhapatnam, construction workflow Vizag, turnkey construction stages, architectural design timeline"
        url="https://spacexio.com/how-it-works"
      />

      {/* Hero Section */}
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F3]/10 border border-[#F35A61]/30 text-[#F35A61] text-xs font-semibold uppercase tracking-wider mb-4">
            Engineering Precision
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our Construction Process
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            A milestone-driven, technology-backed workflow ensuring complete transparency, zero hidden costs, and flawless structural execution.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 transform -translate-x-1/2"></div>

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
                        <span className="text-5xl font-black text-white/20 block mb-1">
                          0{step.step}
                        </span>
                        <div className="inline-block p-3.5 bg-[#EFFBFC]/10 border border-[#01B3D1]/30 rounded-xl mb-3 text-[#01B3D1]">
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="clear-both"></div>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-base leading-relaxed max-w-lg font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Center Circle */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center border-4 border-gray-700 shadow-xl">
                        <span className="text-[#F35A61] font-bold text-lg">{step.step}</span>
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
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              Project Execution Timeline
            </h2>
            <p className="text-gray-400 text-base font-light">
              Predictable scheduling from concept design to key handover
            </p>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center p-4 bg-gray-800/80 border border-gray-700 rounded-xl">
                  <div className="text-2xl font-black text-[#01B3D1] mb-1">Week 1-2</div>
                  <div className="text-white font-bold text-sm mb-1">Site Survey</div>
                  <div className="text-gray-400 text-xs">Soil Test & Requirements</div>
                </div>
                <div className="text-center p-4 bg-gray-800/80 border border-gray-700 rounded-xl">
                  <div className="text-2xl font-black text-[#F35A61] mb-1">Week 3-6</div>
                  <div className="text-white font-bold text-sm mb-1">3D Elevation</div>
                  <div className="text-gray-400 text-xs">Architectural Drawings</div>
                </div>
                <div className="text-center p-4 bg-gray-800/80 border border-gray-700 rounded-xl">
                  <div className="text-2xl font-black text-[#01B3D1] mb-1">Week 7-8</div>
                  <div className="text-white font-bold text-sm mb-1">Approvals</div>
                  <div className="text-gray-400 text-xs">Sanction & BOQ Sign-off</div>
                </div>
                <div className="text-center p-4 bg-gray-800/80 border border-gray-700 rounded-xl">
                  <div className="text-2xl font-black text-[#F35A61] mb-1">Month 3-7</div>
                  <div className="text-white font-bold text-sm mb-1">Civil Construction</div>
                  <div className="text-gray-400 text-xs">Foundation, Slab & Brickwork</div>
                </div>
                <div className="text-center p-4 bg-[#FDF2F3]/10 rounded-xl border border-[#F35A61]/30">
                  <div className="text-2xl font-black text-[#F35A61] mb-1">Final</div>
                  <div className="text-white font-bold text-sm mb-1">Handover</div>
                  <div className="text-gray-300 text-xs">10-Yr Warranty Handover</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Begin Your Construction Journey?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto font-light">
            Book a complimentary site inspection or calculate your building estimate today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-6 text-base font-bold rounded-lg shadow-2xl transition-all hover:scale-105"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Site Visit
              <ArrowRight className="ml-2 h-5 w-5 text-[#F35A61]" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-lg bg-transparent"
              onClick={() => window.location.href = '/cost-calculator'}
            >
              Estimate Construction Cost
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
