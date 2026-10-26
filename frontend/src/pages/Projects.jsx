import React, { useState } from 'react';
import { MapPin, Calendar, Maximize2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { projectsData as defaultProjects } from '../data/mock';
import { useContent } from '../context/ContentContext';
import SEO from '../components/SEO';

const Projects = () => {
  const { content } = useContent();
  const projects = content?.projectsData || defaultProjects;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'BIM', 'Interior', 'Industrial'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="Architecture & Construction Portfolio - Completed Projects"
        description="Explore Spacexio's residential villas, duplex homes, and commercial architectural projects in Visakhapatnam. Verified quality craftsmanship and engineering excellence."
        keywords="construction portfolio Visakhapatnam, residential architecture projects Vizag, completed villas Andhra Pradesh, BIM portfolio"
        url="https://spacexio.com/projects"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F35A61] pulse-indicator" />
            <span className="text-[#F35A61] font-bold uppercase">PROVEN TRACK RECORD</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">500+ DELIVERED SPACES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
            Our Architectural & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
              Construction Portfolio
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Showcasing excellence in architectural design, BIM clash-free engineering, and turnkey construction across Visakhapatnam, Hyderabad, and coastal Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-white border-b border-slate-200/60 sticky top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all data-[state=active]:bg-[#F35A61] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-[#F35A61]/25 bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 pb-24 bg-[#FCFCF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#01B3D1]/50 transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[#01B3D1] border border-[#01B3D1]/30 text-xs font-bold rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#F35A61] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="space-y-2 mb-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-[#01B3D1] flex-shrink-0" />
                        <span className="font-medium text-slate-700">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Maximize2 className="h-3.5 w-3.5 mr-2 text-[#01B3D1] flex-shrink-0" />
                        <span className="font-medium text-slate-700">{project.area}</span>
                      </div>
                      {project.year && (
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-2 text-[#01B3D1] flex-shrink-0" />
                          <span className="font-medium text-slate-700">Year: {project.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 bg-white text-slate-800 hover:bg-[#F35A61] hover:text-white hover:border-[#F35A61] transition-all text-xs font-bold rounded-xl py-5 shadow-2xs cursor-pointer"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Inquire About Similar Project
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <p className="text-slate-500 text-base">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[#F35A61] mb-1 font-mono">500+</div>
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Projects Executed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[#01B3D1] mb-1 font-mono">50M+</div>
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Sq.Ft Designed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[#F35A61] mb-1 font-mono">100%</div>
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Client Verification</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[#01B3D1] mb-1 font-mono">15+</div>
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Years In Construction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FCFCF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl shadow-[#F35A61]/20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Build Your Architectural Masterpiece?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Book a complimentary site survey with our senior civil engineers or get an instant transparent BOQ estimate.
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
                Calculate Estimated Cost
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
