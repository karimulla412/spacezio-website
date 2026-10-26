import React from 'react';
import { Compass, FileText, Phone, Mail, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const Sitemap = () => {
  const siteLinks = [
    {
      category: 'Main Pages',
      icon: <Compass className="h-6 w-6" />,
      links: [
        { name: 'Home', url: '/', description: 'Turnkey home construction, architecture & BIM studio' },
        { name: 'About Us', url: '/about', description: 'Our team, leadership, and engineering standards' },
        { name: 'Why Spacexio', url: '/why-us', description: 'Why 500+ homeowners choose our tech-driven approach' },
        { name: 'How It Works', url: '/how-it-works', description: 'Our 5-stage milestone construction process' },
        { name: 'Projects Portfolio', url: '/projects', description: 'Explore completed residential villas & commercial hubs' },
        { name: 'Contact Us', url: '/contact', description: 'Get in touch for free consultation and inquiries' }
      ]
    },
    {
      category: 'Services & Solutions',
      icon: <FileText className="h-6 w-6" />,
      links: [
        { name: 'All Services', url: '/services', description: 'Complete design-to-execution architectural services' },
        { name: 'BIM Services', url: '/bim', description: '3D BIM modeling, clash detection & 4D scheduling' },
        { name: 'Construction Packages', url: '/packages', description: 'Compare Essential, Premium & Luxury specifications' },
        { name: 'Cost Calculator', url: '/cost-calculator', description: 'Interactive estimation of residential building costs' },
        { name: 'Book Site Survey', url: '/site-visit', description: 'Schedule free on-plot inspection with a civil engineer' },
        { name: 'Home Types We Build', url: '/home-types', description: 'Independent houses, luxury villas, and commercial complexes' }
      ]
    },
    {
      category: 'Resources & Insights',
      icon: <FileText className="h-6 w-6" />,
      links: [
        { name: 'Architecture & Construction Blog', url: '/insights', description: 'Expert guides, material comparisons, and cost tips' },
        { name: 'House Construction Cost Guide (2026)', url: '/insights/1', description: 'Detailed sq.ft cost breakdown in Visakhapatnam' },
        { name: 'Top 7 Duplex Villa Design Trends', url: '/insights/2', description: 'Modern floor plans and Vastu-compliant layouts' },
        { name: 'BIM Clash Detection Savings Guide', url: '/insights/3', description: 'How digital modeling prevents expensive site rework' },
        { name: 'Choosing Between Turnkey vs Contractor', url: '/insights/4', description: 'Comprehensive owner comparison guide' }
      ]
    },
    {
      category: 'Legal & Policies',
      icon: <FileText className="h-6 w-6" />,
      links: [
        { name: 'Privacy Policy', url: '/privacy-policy', description: 'How we collect, store, and protect your data' },
        { name: 'Terms of Service', url: '/terms-of-service', description: 'User obligations, contracts, and dispute resolution' },
        { name: 'HTML Sitemap', url: '/sitemap', description: 'Complete site index and direct navigation directory' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFCF7] pt-24 text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white">
      <SEO 
        title="HTML Sitemap - Spacexio Complete Website Navigation"
        description="Navigate all pages, cost calculator, packages, services, and construction guides on Spacexio."
        url="https://spacexio.com/sitemap"
      />

      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <Compass className="h-3.5 w-3.5 text-[#F35A61]" />
            <span className="text-[#F35A61] font-bold uppercase">DIRECTORY & NAVIGATION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-4 tracking-tight">
            Complete Website Sitemap
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Quickly navigate all pages, tools, cost calculators, packages, and guides on spacexio.com
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {/* Sitemap Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {siteLinks.map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#01B3D1]/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-[#EFFBFC] border border-[#99E7EF] rounded-2xl text-[#01B3D1]">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-950">{section.category}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      className="block group p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#F35A61] transition-colors mb-1">
                        {link.name} →
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {link.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-10 md:p-14 shadow-2xl text-white text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Need Immediate Guidance?</h2>
          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            Can't find what you're looking for or need an architect consultation? Our civil engineering team is here to assist.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 px-8 py-5 rounded-xl font-bold transition-all shadow-xl hover:scale-105 cursor-pointer text-sm"
            >
              <Mail className="h-4 w-4 text-[#F35A61]" />
              Contact Our Engineers
            </a>
            <a
              href="tel:+919686511132"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-5 rounded-xl font-bold transition-all text-sm cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-[#01B3D1]" />
              Call +91 96865 11132
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-xs text-slate-400 font-mono">
          <p>Last Verified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
