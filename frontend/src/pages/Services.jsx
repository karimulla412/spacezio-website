import React from 'react';
import { ArrowRight, PenTool, Home as HomeIcon, Sofa, Cpu, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { servicesData } from '../data/mock';
import SEO from '../components/SEO';

const iconMap = {
  PenTool,
  Sofa,
  Home: HomeIcon,
  Cpu
};

const Services = () => {
  const serviceDetails = {
    1: {
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      benefits: ['Custom Designs', 'BIM Integration', 'Structural Planning', 'Approvals Assistance']
    },
    2: {
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      benefits: ['Space Optimization', 'Premium Finishes', 'Turnkey Solutions', 'Designer Concepts']
    },
    3: {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      benefits: ['Quality Materials', 'Fixed Timelines', 'Transparent Pricing', '10-Year Warranty']
    },
    4: {
      image: 'https://images.unsplash.com/photo-1618385455730-2571c38966b7?w=800&q=80',
      benefits: ['3D Modeling', 'Clash Detection', 'Digital Coordination', 'Quality Checks']
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32">
      <SEO 
        title="Architectural & Turnkey Construction Services"
        description="Comprehensive architectural design, 3D BIM clash detection, interior design, and turnkey residential home construction services in Visakhapatnam. Fixed pricing and 10-year warranty."
        keywords="architectural services Visakhapatnam, interior design Vizag, turnkey construction services, BIM modeling services Andhra Pradesh, villa builders"
        url="https://www.spacexio.com/services"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Design to Execution Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive end-to-end solutions from architecture to construction - we deliver excellence at every stage
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
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
                    <div className="inline-block p-3 bg-orange-600/10 rounded-lg mb-6">
                      <IconComponent className="h-10 w-10 text-orange-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Key Offerings:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-300">
                            <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Benefits:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {details.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Request Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="relative rounded-lg overflow-hidden shadow-2xl group">
                      <img
                        src={details.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our 3-Step Process
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simple, transparent, and hassle-free interior design experience
            </p>
          </div>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-500 mb-4">01</div>
                  <h3 className="text-xl font-bold text-white mb-3">Design & Visualize</h3>
                  <p className="text-gray-400">
                    Meet our designers and see your home in stunning 3D
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-500 mb-4">02</div>
                  <h3 className="text-xl font-bold text-white mb-3">Select Materials</h3>
                  <p className="text-gray-400">
                    Choose from our catalog of premium materials and fittings
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-500 mb-4">03</div>
                  <h3 className="text-xl font-bold text-white mb-3">Installation & Handover</h3>
                  <p className="text-gray-400">
                    Professional installation and your dream home in 60 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Design Your Dream Home?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Book a free consultation with our expert designers today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-6 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-6 text-lg font-semibold"
              onClick={() => window.location.href = '/projects'}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
