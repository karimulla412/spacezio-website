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
    <div className="min-h-screen bg-black text-white pt-28">
      <SEO 
        title="Architecture & Construction Portfolio - Completed Projects"
        description="Explore Spacexio's residential villas, duplex homes, and commercial architectural projects in Visakhapatnam. Verified quality craftsmanship and engineering excellence."
        keywords="construction portfolio Visakhapatnam, residential architecture projects Vizag, completed villas Andhra Pradesh, BIM portfolio"
        url="https://spacexio.com/projects"
      />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F3]/10 border border-[#F35A61]/30 text-[#F35A61] text-xs font-semibold uppercase tracking-wider mb-4">
            Proven Track Record
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our Project Portfolio
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Showcasing excellence in architectural design, precision engineering, and turnkey construction across Visakhapatnam and coastal AP.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-6">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold data-[state=active]:bg-[#F35A61] data-[state=active]:text-white bg-gray-900 text-gray-300 border border-gray-800 hover:border-[#F35A61]/50 shadow-sm transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-[#01B3D1]/50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-60 overflow-hidden bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-[#01B3D1] border border-[#01B3D1]/30 text-xs font-bold rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F35A61] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4 font-light line-clamp-2">
                    {project.description}
                  </p>
                  <div className="space-y-1.5 mb-6 text-xs text-gray-400 border-t border-gray-700/60 pt-3">
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-2 text-[#01B3D1] flex-shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Maximize2 className="h-3.5 w-3.5 mr-2 text-[#01B3D1] flex-shrink-0" />
                      <span>{project.area}</span>
                    </div>
                    {project.year && (
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-[#01B3D1] flex-shrink-0" />
                        <span>Year: {project.year}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 bg-transparent text-gray-300 hover:bg-[#F35A61] hover:text-white hover:border-[#F35A61] transition-all text-xs font-semibold rounded-lg"
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
            <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800 p-8">
              <p className="text-gray-400 text-base">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#F35A61] mb-1">500+</div>
              <div className="text-gray-400 text-xs font-medium">Projects Executed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#01B3D1] mb-1">50M+</div>
              <div className="text-gray-400 text-xs font-medium">Sq.Ft Designed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#F35A61] mb-1">100%</div>
              <div className="text-gray-400 text-xs font-medium">Client Verification</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#01B3D1] mb-1">15+</div>
              <div className="text-gray-400 text-xs font-medium">Years In Construction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Build Your Architectural Masterpiece?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto font-light">
            Book a site survey with our engineers or run our instant cost estimator.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#F35A61] to-[#E04850] hover:brightness-105 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#F35A61]/30 transition-all hover:scale-105"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Free Site Visit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-white hover:border-[#01B3D1] hover:text-[#01B3D1] hover:bg-gray-800 px-8 py-6 text-base font-semibold rounded-lg transition-colors"
              onClick={() => window.location.href = '/cost-calculator'}
            >
              Calculate Estimated Cost
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
