import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { blogData } from '../data/mock';
import SEO from '../components/SEO';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Kitchen', 'Bedroom', 'Living Room', 'Tips', 'Trends'];

  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogData[0];

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <SEO 
        title="Construction & Architecture Insights - Spacexio Blog"
        description="Expert advice on house construction, architectural floor plans, interior trends, and building cost estimations in Visakhapatnam and Andhra Pradesh."
        keywords="house construction blog, home building tips Vizag, interior design insights Visakhapatnam, construction cost guides"
        url="https://spacexio.com/blog"
      />

      {/* Hero Section */}
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Knowledge & Industry Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Insights & Architecture Guides
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light mb-8">
            Essential tips, engineering insights, and practical guides for building your dream home in Visakhapatnam.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search guides, materials, cost tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-orange-500'
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
        <section className="py-10 bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">Featured Read</div>
            <Card 
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 overflow-hidden hover:border-orange-500/50 shadow-2xl transition-all duration-300 rounded-2xl group cursor-pointer" 
              onClick={() => window.location.href = `/insights/${featuredBlog.id}`}
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-6 relative h-72 lg:h-auto overflow-hidden bg-gray-900">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-orange-400 text-xs font-bold rounded-full border border-orange-500/30">
                      {featuredBlog.category}
                    </span>
                  </div>
                </div>
                <CardContent className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 group-hover:text-orange-400 transition-colors leading-tight">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-gray-500 text-xs mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
                      {new Date(featuredBlog.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
                      {featuredBlog.readTime}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-200 hover:bg-orange-600 hover:text-white hover:border-orange-600 w-fit text-xs font-semibold rounded-lg bg-gray-900"
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
      <section className="py-8 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.slice(selectedCategory === 'All' && !searchTerm ? 1 : 0).map((blog) => (
              <Card
                key={blog.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-orange-500 shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => window.location.href = `/insights/${blog.id}`}
              >
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-0.5 bg-black/80 backdrop-blur-md text-orange-400 text-xs font-bold rounded-full border border-orange-500/30">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3 font-light">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-xs border-t border-gray-800 pt-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-orange-400" />
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <span className="text-orange-400 font-semibold group-hover:underline flex items-center">
                      Read <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
              <p className="text-gray-400 text-base">No articles found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Have Questions About Building Your Dream Home?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto font-light">
            Our architectural engineers in Visakhapatnam are happy to review your plot and offer free guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-xl border border-orange-400"
              onClick={() => window.location.href = '/site-visit'}
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-lg bg-transparent"
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

export default Blog;
