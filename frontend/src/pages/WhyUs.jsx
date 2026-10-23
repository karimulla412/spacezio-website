import React from 'react';
import { Zap, Target, DollarSign, Eye, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import SEO from '../components/SEO';

const WhyUs = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-orange-600" />,
      title: "Tech-Driven Approach",
      description: "Advanced BIM (Building Information Modeling) technology for precise planning, 3D visualization, and clash detection before construction begins. Reduce errors by 85% with digital-first workflows."
    },
    {
      icon: <Target className="h-10 w-10 text-orange-600" />,
      title: "Faster & Accurate Execution",
      description: "Streamlined processes with real-time project tracking. Complete your home 30% faster than traditional methods. Milestone-based delivery with predictable timelines you can count on."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-orange-600" />,
      title: "Cost-Efficient Solutions",
      description: "Fixed-price packages starting at ₹1,850/sqft. No hidden costs, no surprise bills. Smart material procurement and optimized construction methods save you 15-20% without compromising quality."
    },
    {
      icon: <Eye className="h-10 w-10 text-orange-600" />,
      title: "Transparent Collaboration",
      description: "24/7 access to your project dashboard. See real-time updates, photos, and spend tracking. Weekly video reports from site. You're always in control and informed at every stage."
    },
    {
      icon: <Heart className="h-10 w-10 text-orange-600" />,
      title: "Client-Focused Delivery",
      description: "Your vision, our execution. Dedicated project manager for every home. Unlimited design revisions until you're satisfied. Post-completion support with 10-year structural warranty."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-orange-600" />,
      title: "Quality You Can Trust",
      description: "ISO-certified processes. Premium materials from verified suppliers. Multi-stage quality inspections. Third-party structural audits. Your home built to last generations."
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <SEO 
        title="Why Choose Spacexio - Tech-Driven Construction & Honest Pricing"
        description="Discover why homeowners in Visakhapatnam trust Spacexio for turnkey construction. 10-year structural warranty, milestone payments, and BIM 3D precision engineering."
        keywords="why choose Spacexio, best builders in Vizag, reliable construction company Visakhapatnam, honest construction pricing"
        url="https://spacexio.com/why-us"
      />
      {/* Hero Section */}
      <section className="py-20 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full mb-6">
            <span className="text-orange-400 text-sm font-semibold">Why Choose SPACEXIO</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Building Homes Differently
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge technology with honest pricing and transparent processes to deliver your dream home faster, smarter, and better.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div className="mb-6 inline-block p-4 bg-orange-600/10 border border-orange-500/20 rounded-xl group-hover:bg-orange-600/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Results That Speak
            </h2>
            <p className="text-xl text-gray-400">
              Real outcomes from our tech-driven approach
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl">
              <div className="text-5xl font-black text-orange-400 mb-2">85%</div>
              <div className="text-gray-300 font-medium">Fewer Construction Errors</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl">
              <div className="text-5xl font-black text-orange-400 mb-2">30%</div>
              <div className="text-gray-300 font-medium">Faster Project Completion</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl">
              <div className="text-5xl font-black text-orange-400 mb-2">20%</div>
              <div className="text-gray-300 font-medium">Cost Savings Average</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl">
              <div className="text-5xl font-black text-orange-400 mb-2">10</div>
              <div className="text-gray-300 font-medium">Year Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 text-center">
            Traditional vs SPACEXIO
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Way */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-gray-300 mb-6 pb-3 border-b border-gray-700">Traditional Construction</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl font-bold">✗</span>
                  <span className="text-gray-400">Paper-based planning, frequent errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl font-bold">✗</span>
                  <span className="text-gray-400">Hidden costs, budget overruns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl font-bold">✗</span>
                  <span className="text-gray-400">Limited visibility, no tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl font-bold">✗</span>
                  <span className="text-gray-400">Delays common, timeline uncertain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl font-bold">✗</span>
                  <span className="text-gray-400">Basic warranty, limited support</span>
                </li>
              </ul>
            </div>

            {/* SPACEXIO Way */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-orange-500/60 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-orange-500/30 flex items-center justify-between">
                <span>SPACEXIO Method</span>
                <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full font-semibold">Recommended</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl font-bold">✓</span>
                  <span className="text-gray-200">BIM technology, 85% fewer errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl font-bold">✓</span>
                  <span className="text-gray-200">Fixed pricing, zero hidden costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl font-bold">✓</span>
                  <span className="text-gray-200">24/7 dashboard, real-time updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl font-bold">✓</span>
                  <span className="text-gray-200">30% faster, predictable timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl font-bold">✓</span>
                  <span className="text-gray-200">10-year warranty, lifetime support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Experience the SPACEXIO Difference
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Get a free consultation and see how we can build your dream home better
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-black text-white hover:bg-gray-900 border border-orange-400 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
