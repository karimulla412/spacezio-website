import React from 'react';
import { Home, Info, Briefcase, Lightbulb, FileText, Mail, Calculator, MapPin, Package } from 'lucide-react';
import SEO from '../components/SEO';

const Sitemap = () => {
  const siteLinks = [
    {
      category: 'Main Pages',
      icon: <Home className="h-5 w-5" />,
      links: [
        { name: 'Home', url: '/', description: 'Homepage with overview of our services' },
        { name: 'About Us', url: '/about', description: 'Learn about SPACEXIO and our story' },
        { name: 'Services', url: '/services', description: 'Our architecture, interior & construction services' },
        { name: 'Why Us', url: '/why-us', description: 'Why choose SPACEXIO for your project' },
        { name: 'Contact', url: '/contact', description: 'Get in touch with our team' }
      ]
    },
    {
      category: 'Tools & Resources',
      icon: <Calculator className="h-5 w-5" />,
      links: [
        { name: 'Cost Calculator', url: '/cost-calculator', description: 'Calculate your construction costs' },
        { name: 'Site Visit Booking', url: '/site-visit', description: 'Book a free site visit' },
        { name: 'Packages Comparison', url: '/packages', description: 'Compare our service packages' }
      ]
    },
    {
      category: 'Information',
      icon: <Info className="h-5 w-5" />,
      links: [
        { name: 'Blog', url: '/blog', description: 'Latest articles and insights' },
        { name: 'Projects', url: '/projects', description: 'Our completed projects portfolio' }
      ]
    },
    {
      category: 'Legal',
      icon: <FileText className="h-5 w-5" />,
      links: [
        { name: 'Privacy Policy', url: '/privacy-policy', description: 'How we protect your data' },
        { name: 'Terms of Service', url: '/terms-of-service', description: 'Terms and conditions for using our services' },
        { name: 'Sitemap', url: '/sitemap', description: 'Complete website navigation' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <SEO 
        title="HTML Sitemap - Spacexio Complete Website Navigation"
        description="Navigate all pages, cost calculator, packages, services, and construction guides on Spacexio."
        url="https://spacexio.com/sitemap"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Sitemap</h1>
          <p className="text-xl text-gray-400">
            Navigate through all pages on spacexio.com
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {siteLinks.map((section, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                <div className="p-3 bg-orange-600/10 border border-orange-500/20 rounded-lg text-orange-400">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.category}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      className="block group p-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-200 group-hover:text-orange-400 transition-colors mb-1">
                        {link.name} →
                      </h3>
                      <p className="text-sm text-gray-400">
                        {link.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 shadow-2xl text-white">
          <h2 className="text-2xl font-extrabold text-white mb-2">Need Immediate Guidance?</h2>
          <p className="text-orange-100 mb-6 font-light">
            Can't find what you're looking for or need an architect consultation? We're here to help!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg border border-orange-400"
            >
              <Mail className="h-5 w-5" />
              Contact Us
            </a>
            <a
              href="tel:+919686511132"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
            >
              <MapPin className="h-5 w-5" />
              Call +91 96865 11132
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
