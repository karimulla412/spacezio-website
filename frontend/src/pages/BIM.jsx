import React from 'react';
import { ArrowRight, Layers, Eye, Wrench, CheckCircle, TrendingDown, Clock, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const BIM = () => {
  const bimServices = [
    {
      icon: Layers,
      title: '3D/4D/5D BIM Modeling',
      description: 'Comprehensive 3D models with time (4D) and cost (5D) integration for complete project visualization and planning.'
    },
    {
      icon: Eye,
      title: 'Clash Detection & Resolution',
      description: 'Advanced clash detection between architectural, structural, and MEP systems to eliminate on-site conflicts.'
    },
    {
      icon: Wrench,
      title: 'BIM Coordination',
      description: 'Seamless coordination across all disciplines ensuring smooth project execution and delivery.'
    },
    {
      icon: CheckCircle,
      title: 'As-Built Documentation',
      description: 'Accurate as-built BIM models for facility management and future modifications.'
    }
  ];

  const benefits = [
    {
      icon: TrendingDown,
      title: 'Cost Savings up to 20%',
      description: 'Reduce project costs through early conflict detection and optimized resource planning'
    },
    {
      icon: Clock,
      title: 'Faster Project Delivery',
      description: 'Accelerate timelines with enhanced coordination and reduced rework'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Identify and resolve issues before construction begins, minimizing risks'
    }
  ];

  const software = [
    'Autodesk Revit',
    'Navisworks',
    'BIM 360',
    'Tekla Structures',
    'Solibri',
    'Synchro 4D'
  ];

  return (
    <div className="min-h-screen bg-black pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                BIM Excellence for Complex Projects
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Leverage cutting-edge Building Information Modeling technology to optimize your project from design through construction and beyond.
              </p>
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-6"
                onClick={() => window.location.href = '/contact'}
              >
                Request BIM Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1618385455730-2571c38966b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxCSU0lMjBjb25zdHJ1Y3Rpb258ZW58MHx8fHwxNzc0MDA4NjU1fDA&ixlib=rb-4.1.0&q=85"
                alt="BIM Technology"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BIM Services */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our BIM Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive BIM solutions tailored to your project requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bimServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div className="inline-block p-4 bg-orange-600/10 rounded-lg mb-6 group-hover:bg-orange-600/20 transition-colors duration-300">
                      <IconComponent className="h-10 w-10 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why BIM Matters
            </h2>
            <p className="text-xl text-gray-400">
              Measurable benefits that impact your bottom line
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-orange-900/20 to-gray-900 border-orange-500/30 text-center"
                >
                  <CardContent className="p-10">
                    <div className="inline-block p-4 bg-orange-600/20 rounded-full mb-6">
                      <IconComponent className="h-12 w-12 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software & Tools */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Industry-Leading BIM Tools
            </h2>
            <p className="text-xl text-gray-400">
              We work with the best software in the industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {software.map((tool, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg text-center hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                <p className="text-white font-semibold text-sm">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-4 py-2 bg-orange-600/20 text-orange-500 text-sm font-semibold rounded-full">
                Case Study
              </span>
              <h2 className="text-4xl font-bold text-white mt-6 mb-6">
                Healthcare Complex: 95% Conflict Reduction
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                For a 150,000 sq.ft multi-specialty hospital project, our BIM coordination identified and resolved 1,200+ clashes before construction began.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold">18% Cost Reduction</div>
                    <div className="text-gray-400 text-sm">Through early conflict detection</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold">3 Months Faster</div>
                    <div className="text-gray-400 text-sm">Accelerated project timeline</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold">Zero Site Conflicts</div>
                    <div className="text-gray-400 text-sm">Seamless construction execution</div>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                onClick={() => window.location.href = '/projects'}
              >
                View More Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="BIM Case Study"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Your Project with BIM
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get a free BIM assessment for your upcoming project
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-6 text-lg font-semibold"
            onClick={() => window.location.href = '/contact'}
          >
            Schedule Free BIM Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BIM;
