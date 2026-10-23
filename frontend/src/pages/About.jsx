import React from 'react';
import { Award, Shield, Users, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { teamData, certificationsData } from '../data/mock';
import SEO from '../components/SEO';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Integrity & Transparency',
      description: 'Clear pricing, zero hidden charges, and honest updates at every stage of construction.'
    },
    {
      icon: Target,
      title: 'Engineering Precision',
      description: 'Leveraging BIM 3D modeling to eliminate structural clashes and optimize building efficiency.'
    },
    {
      icon: Users,
      title: 'Customer-Centricity',
      description: 'Personalized project managers, weekly site video logs, and dedicated client service.'
    },
    {
      icon: Award,
      title: '10-Year Warranty',
      description: 'Guaranteed quality assurance backed by certified structural audits and branded materials.'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <SEO 
        title="About Spacexio - Premium Construction & Architectural Studio in Vizag"
        description="Learn about Spacexio's mission to bring transparent, high-precision house construction to Visakhapatnam. Discover our leadership, civil engineers, and core values."
        keywords="about Spacexio, construction company Visakhapatnam, architects in Vizag, home builders Andhra Pradesh"
        url="https://spacexio.com/about"
      />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Who We Are
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Building Quality Homes in Visakhapatnam
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Spacexio is a modern architectural design and turnkey home construction studio dedicated to honest pricing, milestone execution, and lasting craftsmanship.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">Our Mission & Philosophy</h2>
              <div className="space-y-4 text-gray-300 font-light leading-relaxed text-base">
                <p>
                  We established Spacexio in Visakhapatnam to resolve the biggest frustrations homeowners face: unpredictable contractor costs, delayed schedules, and poor material transparency.
                </p>
                <p>
                  By marrying digital Building Information Modeling (BIM) with disciplined project management, we ensure every brick, column, and finish is calculated before construction even starts.
                </p>
                <p>
                  Whether you are planning a modern independent villa in Madhurawada, a contemporary duplex in Yendada, or a family residence in MVP Colony, our in-house architects and civil engineers work collaboratively to turn your dream into reality.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-600/20 rounded-2xl transform translate-x-3 translate-y-3"></div>
              <img
                src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?crop=entropy&cs=srgb&fm=jpg&w=800&q=80"
                alt="Engineers planning construction"
                className="relative rounded-2xl shadow-2xl w-full h-[380px] object-cover border border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Our Core Values</h2>
            <p className="text-gray-400 text-sm font-light">
              Principles guiding every architectural blueprint and site delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-orange-500/50 hover:shadow-xl transition-all text-center rounded-xl"
                >
                  <CardContent className="p-6">
                    <div className="inline-block p-3.5 bg-orange-600/10 text-orange-400 border border-orange-500/20 rounded-full mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Our Leadership Team</h2>
            <p className="text-gray-400 text-sm font-light">
              Engineers and architects driving construction excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member) => (
              <Card
                key={member.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-orange-500 shadow-xl transition-all rounded-xl overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-orange-400 text-xs font-semibold mb-2">{member.position}</p>
                  <p className="text-gray-300 text-xs font-light">{member.expertise}</p>
                  <p className="text-gray-500 text-[11px] mt-1">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Certifications & Accreditations</h2>
            <p className="text-gray-400 text-xs font-light">
              Adhering to Indian Standards (IS Codes) and ISO construction safety benchmarks
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certificationsData.map((cert, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl text-center shadow-lg"
              >
                <Award className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <p className="text-white text-xs font-semibold">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Plan Your Construction Project?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto font-light">
            Meet our team for a free on-site consultation or check out our transparent packages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-xl border border-orange-400"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Site Visit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-lg bg-transparent"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Our Studio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
