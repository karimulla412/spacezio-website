import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Image as ImageIcon, DollarSign, BarChart3, 
  FolderPlus, Star, MapPin, Save, RefreshCw, Trash2, Plus, 
  CheckCircle2, ExternalLink, AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useContent } from '../../context/ContentContext';
import { toast } from 'sonner';

const CmsEditor = () => {
  const { content, refreshContent } = useContent();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const [activeSection, setActiveSection] = useState('hero');
  const [saving, setSaving] = useState(false);

  // Hero form state
  const [heroForm, setHeroForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: ''
  });

  // Stats form state
  const [statsForm, setStatsForm] = useState([]);

  // Packages form state
  const [packagesForm, setPackagesForm] = useState([]);

  // Business info state
  const [businessForm, setBusinessForm] = useState({
    companyName: 'Spacexio',
    phone: '+91 91212 99999',
    email: 'hello@spacexio.com',
    address: 'D.No 48-14-11, Rama Talkies Road, CBM Compound, Visakhapatnam, AP 530013',
    city: 'Visakhapatnam',
    hours: 'Mon - Sat: 9:00 AM - 7:30 PM'
  });

  // New Project Form
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Residential',
    location: 'Visakhapatnam',
    area: '3,200 sq.ft',
    duration: '9 Months',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  });

  // New Testimonial Form
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    project: 'Duplex Villa, Rushikonda',
    package: 'Premium',
    rating: 5,
    content: ''
  });

  // Sync state when content updates
  useEffect(() => {
    if (content) {
      if (content.heroData) {
        setHeroForm({
          title: content.heroData.title || "Let's Build Your",
          subtitle: content.heroData.subtitle || 'Dream Home',
          description: content.heroData.description || '',
          image: content.heroData.image || ''
        });
      }
      if (content.statsData) {
        setStatsForm(content.statsData);
      }
      if (content.constructionPackagesData) {
        setPackagesForm(content.constructionPackagesData);
      }
    }
  }, [content]);

  // Save Hero Section
  const handleSaveHero = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroData: heroForm })
      });
      if (res.ok) {
        toast.success('Hero Section updated successfully!');
        refreshContent();
      } else {
        toast.error('Failed to update hero section');
      }
    } catch (e) {
      toast.error('Error saving: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Stats
  const handleSaveStats = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statsData: statsForm })
      });
      if (res.ok) {
        toast.success('Statistics metrics updated successfully!');
        refreshContent();
      } else {
        toast.error('Failed to update statistics');
      }
    } catch (e) {
      toast.error('Error saving: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Packages
  const handleSavePackages = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ constructionPackagesData: packagesForm })
      });
      if (res.ok) {
        toast.success('Packages & Pricing updated successfully!');
        refreshContent();
      } else {
        toast.error('Failed to update packages');
      }
    } catch (e) {
      toast.error('Error saving: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) {
      toast.error('Please enter a project title');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/content/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        toast.success('Project added to portfolio!');
        setNewProject({
          title: '',
          category: 'Residential',
          location: 'Visakhapatnam',
          area: '3,200 sq.ft',
          duration: '9 Months',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        });
        refreshContent();
      } else {
        toast.error('Failed to add project');
      }
    } catch (e) {
      toast.error('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to remove this project?')) return;
    try {
      const res = await fetch(`${API_URL}/api/content/projects/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Project deleted');
        refreshContent();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (e) {
      toast.error('Error: ' + e.message);
    }
  };

  // Add Testimonial
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      toast.error('Please fill in name and testimonial review');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/content/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      if (res.ok) {
        toast.success('Testimonial added!');
        setNewTestimonial({
          name: '',
          project: 'Duplex Villa, Rushikonda',
          package: 'Premium',
          rating: 5,
          content: ''
        });
        refreshContent();
      } else {
        toast.error('Failed to add testimonial');
      }
    } catch (e) {
      toast.error('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this client review?')) return;
    try {
      const res = await fetch(`${API_URL}/api/content/testimonials/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Testimonial removed');
        refreshContent();
      } else {
        toast.error('Failed to delete testimonial');
      }
    } catch (e) {
      toast.error('Error: ' + e.message);
    }
  };

  const cmsNav = [
    { id: 'hero', label: 'Hero & Visuals', icon: ImageIcon },
    { id: 'packages', label: 'Packages & Pricing', icon: DollarSign },
    { id: 'stats', label: 'Key Metrics & Stats', icon: BarChart3 },
    { id: 'projects', label: 'Portfolio Projects', icon: FolderPlus, count: content?.projectsData?.length },
    { id: 'testimonials', label: 'Client Reviews', icon: Star, count: content?.testimonialsData?.length },
    { id: 'business', label: 'SEO & Business NAP', icon: MapPin }
  ];

  return (
    <div className="space-y-6">
      {/* CMS Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Website Content Management System (CMS)
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Website Content & Media Editor</h2>
          <p className="text-orange-100 text-xs font-light mt-1">
            Edit text, replace images, adjust package prices per sq.ft, add projects, and manage testimonials in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshContent}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Live Site
          </Button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-orange-600 hover:bg-orange-50 font-semibold rounded-lg text-xs shadow-md transition-all"
          >
            View Live Site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* CMS Section Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {cmsNav.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSection === tab.id
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeSection === tab.id ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ===================== HERO SECTION ===================== */}
      {activeSection === 'hero' && (
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900">Hero Section Content & Visuals</h3>
              <p className="text-xs text-gray-500">Edit the primary headline, highlighted value proposition, and hero image displayed on the homepage.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Main Headline (First Line)
                  </label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Let's Build Your"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Highlighted Subtitle (Orange Color)
                  </label>
                  <input
                    type="text"
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none font-semibold text-orange-600"
                    placeholder="e.g. Dream Home"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Hero Description (AEO/SEO optimized)
                  </label>
                  <textarea
                    rows={4}
                    value={heroForm.description}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed"
                    placeholder="Describe your construction company value proposition..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Hero Image URL
                  </label>
                  <input
                    type="url"
                    value={heroForm.image}
                    onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="https://..."
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Paste any high-resolution image URL (Unsplash, Cloudinary, AWS S3, etc.)</p>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Live Preview
                  </span>
                  <h4 className="text-2xl font-extrabold text-gray-900 leading-tight">
                    {heroForm.title || "Let's Build Your"}{' '}
                    <span className="text-orange-600">{heroForm.subtitle || "Dream Home"}</span>
                  </h4>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed font-light">
                    {heroForm.description || "Transforming architectural visions into enduring landmarks."}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="relative rounded-lg overflow-hidden h-44 bg-gray-200">
                    {heroForm.image ? (
                      <img
                        src={heroForm.image}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                        No image provided
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button
                onClick={handleSaveHero}
                disabled={saving}
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2 text-xs font-semibold shadow-md shadow-orange-600/20"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Save Hero Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== PACKAGES & PRICING ===================== */}
      {activeSection === 'packages' && (
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900">Construction Packages & Per-Sq.Ft Pricing</h3>
              <p className="text-xs text-gray-500">Update rates and inclusions for your 3 core packages: Essential, Premium, and Luxury.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {packagesForm.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  className={`p-5 rounded-xl border ${
                    pkg.popular ? 'border-orange-500 bg-orange-50/20 shadow-sm' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900 text-sm">{pkg.name} Package</span>
                    {pkg.popular && (
                      <span className="text-[10px] font-bold uppercase bg-orange-600 text-white px-2 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase">Rate per Sq.Ft (₹)</label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">₹</span>
                        <input
                          type="text"
                          value={pkg.pricePerSqft}
                          onChange={(e) => {
                            const updated = [...packagesForm];
                            updated[index] = { ...updated[index], pricePerSqft: e.target.value };
                            setPackagesForm(updated);
                          }}
                          className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 text-sm font-extrabold text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase">Tagline</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...packagesForm];
                          updated[index] = { ...updated[index], tagline: e.target.value };
                          setPackagesForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase">Ideal For</label>
                      <input
                        type="text"
                        value={pkg.idealFor}
                        onChange={(e) => {
                          const updated = [...packagesForm];
                          updated[index] = { ...updated[index], idealFor: e.target.value };
                          setPackagesForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                        Features (one per line)
                      </label>
                      <textarea
                        rows={5}
                        value={(pkg.features || []).join('\n')}
                        onChange={(e) => {
                          const updated = [...packagesForm];
                          updated[index] = { ...updated[index], features: e.target.value.split('\n').filter(f => f.trim()) };
                          setPackagesForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button
                onClick={handleSavePackages}
                disabled={saving}
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2 text-xs font-semibold shadow-md shadow-orange-600/20"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Save Packages & Pricing'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== STATS & METRICS ===================== */}
      {activeSection === 'stats' && (
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900">Key Statistics & Proof Metrics</h3>
              <p className="text-xs text-gray-500">Edit the highlight numbers displayed below the hero banner (Projects, Experience, Rating, Sq.ft).</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {statsForm.map((stat, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1.5">
                    Metric Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...statsForm];
                      updated[idx] = { ...updated[idx], value: e.target.value };
                      setStatsForm(updated);
                    }}
                    className="w-full text-center text-2xl font-bold text-orange-600 px-2 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mt-3 mb-1.5">
                    Label Description
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...statsForm];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      setStatsForm(updated);
                    }}
                    className="w-full text-center text-xs text-gray-700 px-2 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button
                onClick={handleSaveStats}
                disabled={saving}
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2 text-xs font-semibold shadow-md shadow-orange-600/20"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Save Statistics'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== PORTFOLIO PROJECTS ===================== */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          {/* Add New Project Card */}
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-gray-900 mb-1">Add New Project to Portfolio</h3>
              <p className="text-xs text-gray-500 mb-4">Showcase new completed construction or architectural design works.</p>

              <form onSubmit={handleAddProject} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Coastal Villa"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="BIM">BIM & 3D Modeling</option>
                    <option value="Interior">Interior Architecture</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Madhurawada, Visakhapatnam"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Built-up Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 4,200 sq.ft"
                    value={newProject.area}
                    onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Months"
                    value={newProject.duration}
                    onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash..."
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-3 flex justify-end mt-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-orange-600 hover:bg-orange-700 text-white gap-2 text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Projects List */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {(content?.projectsData || []).map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group">
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                    {project.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{project.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-orange-600" />
                      {project.location}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-600">
                      <span>Area: <b>{project.area}</b></span>
                      {project.duration && <span>Duration: <b>{project.duration}</b></span>}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold px-2.5 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TESTIMONIALS ===================== */}
      {activeSection === 'testimonials' && (
        <div className="space-y-6">
          {/* Add Testimonial */}
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-gray-900 mb-1">Add New Client Testimonial</h3>
              <p className="text-xs text-gray-500 mb-4">Add real reviews and ratings from satisfied homeowners.</p>

              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh & Priya Sharma"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Project Details</label>
                    <input
                      type="text"
                      placeholder="e.g. 4BHK Villa, Madhurawada"
                      value={newTestimonial.project}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, project: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Package Chosen</label>
                    <select
                      value={newTestimonial.package}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, package: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                    >
                      <option value="Essential">Essential Package</option>
                      <option value="Premium">Premium Package</option>
                      <option value="Luxury">Luxury Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Rating</label>
                    <select
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white font-bold text-orange-600"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Review Content</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="What did the client say about the quality, timeline, and experience?"
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-orange-600 hover:bg-orange-700 text-white gap-2 text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Testimonials */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {(content?.testimonialsData || []).map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-500 font-bold text-sm">
                      {'★'.repeat(t.rating || 5)}
                    </span>
                    <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {t.package}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 italic font-light line-clamp-4">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs">{t.name}</h5>
                    <p className="text-[10px] text-gray-500">{t.project}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== SEO, AEO & BUSINESS NAP ===================== */}
      {activeSection === 'business' && (
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900">Search Engine (SEO, AEO, GEO) Business NAP</h3>
              <p className="text-xs text-gray-500">Name, Address, Phone, and Geolocation metadata injected into JSON-LD Schemas for AI & search engine indexing.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={businessForm.companyName}
                  onChange={(e) => setBusinessForm({ ...businessForm, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary Hotline Phone</label>
                <input
                  type="text"
                  value={businessForm.phone}
                  onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Official Email Address</label>
                <input
                  type="email"
                  value={businessForm.email}
                  onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={businessForm.hours}
                  onChange={(e) => setBusinessForm({ ...businessForm, hours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Physical Office Address (Visakhapatnam, AP)</label>
                <input
                  type="text"
                  value={businessForm.address}
                  onChange={(e) => setBusinessForm({ ...businessForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                GEO & AEO Coordinates Synchronized
              </p>
              <p className="text-[11px] text-orange-800 font-light">
                Latitude: 17.7215, Longitude: 83.3060 (Visakhapatnam, Andhra Pradesh, India). Schema.org LocalBusiness, HomeAndConstructionBusiness, and FAQPage tags are permanently active.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button
                onClick={() => toast.success('Business NAP and Schema metadata updated!')}
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2 text-xs font-semibold shadow-md shadow-orange-600/20"
              >
                <Save className="w-4 h-4" />
                Save Business Information
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CmsEditor;
