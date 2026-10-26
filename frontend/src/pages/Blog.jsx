import React, { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { blogData } from '../data/mock';
import SEO from '../components/SEO';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Construction Guides', 'Cost & Budgeting', 'Architecture & BIM', 'Interior Design'];

  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogData[0];

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-24">
      <SEO 
        title="Construction & Architecture Insights - Spacexio Blog"
        description="Expert advice on house construction, architectural floor plans, interior trends, and building cost estimations in Visakhapatnam and Andhra Pradesh."
        keywords="house construction blog, home building tips Vizag, interior design insights Visakhapatnam, construction cost guides"
        url="https://spacexio.com/blog"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F35A61]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <BookOpen className="h-3.5 w-3.5 text-[#F35A61]" />
            <span className="text-[#F35A61] font-bold uppercase">KNOWLEDGE & INDUSTRY GUIDES</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">VIZAG & HYDERABAD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight leading-tight">
            Insights & Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">
              Knowledge Base
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Essential tips, engineering insights, and practical guides for building your dream home in Visakhapatnam.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search guides, materials, cost tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-13 bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#F35A61] rounded-2xl shadow-sm text-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-slate-200/60 sticky top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#F35A61] text-white shadow-md shadow-[#F35A61]/25'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredBlog && selectedCategory === 'All' && !searchTerm && (
        <section className="py-12 bg-[#FCFCF7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#01B3D1] mb-3">Featured Read</div>
            <Card 
              className="bg-white border border-slate-200/90 overflow-hidden hover:border-[#01B3D1]/50 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl group cursor-pointer" 
              onClick={() => window.location.href = `/insights/${featuredBlog.id}`}
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-6 relative h-72 lg:h-auto overflow-hidden bg-slate-100">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#01B3D1] text-xs font-bold rounded-full border border-[#01B3D1]/30 shadow-xs">
                      {featuredBlog.category}
                    </span>
                  </div>
                </div>
                <CardContent className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4 group-hover:text-[#F35A61] transition-colors leading-tight">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed font-normal">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-slate-500 text-xs mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-[#01B3D1]" />
                      {new Date(featuredBlog.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-[#01B3D1]" />
                      {featuredBlog.readTime}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-slate-300 bg-white text-slate-800 hover:bg-[#F35A61] hover:text-white hover:border-[#F35A61] w-fit text-xs font-bold rounded-xl py-5 shadow-2xs transition-all cursor-pointer"
                    onClick={() => window.location.href = `/insights/${featuredBlog.id}`}
                  >
                    Read Complete Guide
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-8 pb-24 bg-[#FCFCF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.slice(selectedCategory === 'All' && !searchTerm ? 1 : 0).map((blog) => (
              <Card
                key={blog.id}
                className="bg-white border border-slate-200/90 hover:border-[#01B3D1] shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between"
                onClick={() => window.location.href = `/insights/${blog.id}`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-[#01B3D1] text-xs font-bold rounded-full border border-[#01B3D1]/30 shadow-xs">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-[#F35A61] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 text-xs mb-4 leading-relaxed line-clamp-3 font-normal">
                      {blog.excerpt}
                    </p>
                  </CardContent>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <div className="flex items-center justify-between text-slate-500 text-xs border-t border-slate-100 pt-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-[#01B3D1]" />
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <span className="text-[#F35A61] font-bold group-hover:underline flex items-center">
                      Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <p className="text-slate-500 text-base">No articles found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FCFCF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl shadow-[#F35A61]/20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Have Questions About Building Your Dream Home?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
              Our architectural civil engineers in Visakhapatnam are happy to review your plot and offer free guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-6 text-sm font-bold rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer"
                onClick={() => window.location.href = '/site-visit'}
              >
                Book Free Consultation
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

export default Blog;
