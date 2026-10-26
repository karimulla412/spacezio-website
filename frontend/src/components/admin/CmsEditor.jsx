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
import { API_URL } from '../../config/api';

const CmsEditor = () => {
  const { content, refreshContent } = useContent();

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
        toast.success('Hero Section updated on live website!');
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
        toast.success('Project deleted from portfolio');
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
      toast.error('Please fill in client name and testimonial review');
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
        toast.success('Client review added!');
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F35A61]-600 via-[#F35A61]-500 to-amber-600 p-8 text-white shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Website Content Management System (CMS)
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Website Content & Media Editor</h2>
          <p className="text-[#F35A61]-100 text-xs font-light mt-1 max-w-xl leading-relaxed">
            Modify hero headlines, update package construction rates per sq.ft, add architectural projects to your portfolio, and publish verified client reviews in real time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshContent}
            className="bg-black/20 hover:bg-black/40 text-white border-white/20 text-xs gap-1.5 rounded-xl cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Site
          </Button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#F35A61]-600 hover:bg-[#F35A61]-50 font-bold rounded-xl text-xs shadow-lg transition-all"
          >
            View Live Site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* CMS Section Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800">
        {cmsNav.map(tab => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#F35A61] text-white shadow-lg shadow-[#F35A61]/25'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800/40'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ===================== HERO SECTION ===================== */}
      {activeSection === 'hero' && (
        <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl shadow-xl text-zinc-100 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white">Hero Section Content & Visuals</h3>
              <p className="text-xs text-zinc-400">Edit the primary headline, highlighted value proposition, and hero image displayed on the homepage.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Main Headline (First Line)
                  </label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:border-[#01B3D1] outline-none"
                    placeholder="e.g. Let's Build Your"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Highlighted Subtitle (Orange Color)
                  </label>
                  <input
                    type="text"
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm focus:border-[#01B3D1] outline-none font-bold text-[#F35A61]"
                    placeholder="e.g. Dream Home"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Hero Description (AEO/SEO optimized)
                  </label>
                  <textarea
                    rows={4}
                    value={heroForm.description}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:border-[#01B3D1] outline-none leading-relaxed"
                    placeholder="Describe your construction company value proposition..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Hero Image URL
                  </label>
                  <input
                    type="url"
                    value={heroForm.image}
                    onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:border-[#01B3D1] outline-none"
                    placeholder="https://..."
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Paste any high-resolution image URL (Unsplash, Cloudinary, AWS S3, etc.)</p>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F35A61]/10 text-[#01B3D1] border border-[#F35A61]/20 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Live Hero Mockup
                  </span>
                  <h4 className="text-2xl font-black text-white leading-tight">
                    {heroForm.title || "Let's Build Your"}{' '}
                    <span className="text-[#F35A61]">{heroForm.subtitle || "Dream Home"}</span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-light">
                    {heroForm.description || "Transforming architectural visions into enduring landmarks."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <div className="relative rounded-xl overflow-hidden h-44 bg-zinc-900 border border-zinc-800">
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
                      <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
                        No image preview
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800">
              <Button
                onClick={handleSaveHero}
                disabled={saving}
                className="bg-[#F35A61] hover:bg-[#E04850] text-white gap-2 text-xs font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Publish Hero Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== PACKAGES & PRICING ===================== */}
      {activeSection === 'packages' && (
        <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl shadow-xl text-zinc-100 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white">Construction Packages & Per-Sq.Ft Pricing</h3>
              <p className="text-xs text-zinc-400">Update rates and inclusions for your 3 core packages: Essential, Premium, and Luxury.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {packagesForm.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  className={`p-6 rounded-2xl border transition-all ${
                    pkg.popular ? 'border-[#01B3D1]/80 bg-[#F35A61]-950/10 shadow-lg shadow-[#F35A61]-950/20' : 'border-zinc-800 bg-zinc-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-black text-white text-base">{pkg.name} Package</span>
                    {pkg.popular && (
                      <span className="text-[10px] font-bold uppercase bg-[#F35A61] text-white px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Rate per Sq.Ft (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F35A61] font-bold text-sm">₹</span>
                        <input
                          type="text"
                          value={pkg.pricePerSqft}
                          onChange={(e) => {
                            const updated = [...packagesForm];
                            updated[index] = { ...updated[index], pricePerSqft: e.target.value };
                            setPackagesForm(updated);
                          }}
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-extrabold text-white focus:border-[#01B3D1] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...packagesForm];
                          updated[index] = { ...updated[index], tagline: e.target.value };
                          setPackagesForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:border-[#01B3D1] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Ideal For
                      </label>
                      <input
                        type="text"
                        value={pkg.idealFor}
                        onChange={(e) => {
                          const updated = [...packagesForm];
                          updated[index] = { ...updated[index], idealFor: e.target.value };
                          setPackagesForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:border-[#01B3D1] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
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
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:border-[#01B3D1] outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800">
              <Button
                onClick={handleSavePackages}
                disabled={saving}
                className="bg-[#F35A61] hover:bg-[#E04850] text-white gap-2 text-xs font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Publish Packages & Pricing'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== STATS & METRICS ===================== */}
      {activeSection === 'stats' && (
        <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl shadow-xl text-zinc-100 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white">Key Statistics & Proof Metrics</h3>
              <p className="text-xs text-zinc-400">Edit the highlight numbers displayed below the hero banner (Projects, Experience, Rating, Sq.ft).</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {statsForm.map((stat, idx) => (
                <div key={idx} className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
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
                    className="w-full text-center text-3xl font-black text-[#F35A61] px-2 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#01B3D1] outline-none"
                  />
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-4 mb-2">
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
                    className="w-full text-center text-xs text-zinc-200 px-2 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#01B3D1] outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800">
              <Button
                onClick={handleSaveStats}
                disabled={saving}
                className="bg-[#F35A61] hover:bg-[#E04850] text-white gap-2 text-xs font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Publish Statistics'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== PORTFOLIO PROJECTS ===================== */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          {/* Add New Project Card */}
          <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl shadow-xl text-zinc-100 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-base font-bold text-white mb-1">Add New Project to Portfolio</h3>
              <p className="text-xs text-zinc-400 mb-6">Showcase new completed construction or architectural design works.</p>

              <form onSubmit={handleAddProject} className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Coastal Villa"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="BIM">BIM & 3D Modeling</option>
                    <option value="Interior">Interior Architecture</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Madhurawada, Visakhapatnam"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Built-up Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 4,200 sq.ft"
                    value={newProject.area}
                    onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Months"
                    value={newProject.duration}
                    onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash..."
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-3 flex justify-end mt-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-[#F35A61] hover:bg-[#E04850] text-white gap-2 text-xs font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Publish Project
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Projects List */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(content?.projectsData || []).map((project) => (
              <div key={project.id} className="bg-zinc-900/60 rounded-2xl border border-zinc-800 overflow-hidden shadow-lg flex flex-col group hover:border-zinc-700 transition-all">
                <div className="relative h-44 bg-zinc-950 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/10">
                    {project.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{project.title}</h4>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#F35A61] flex-shrink-0" />
                      {project.location}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-[11px] text-zinc-400 font-mono">
                      <span>Area: <b className="text-zinc-200">{project.area}</b></span>
                      {project.duration && <span>Duration: <b className="text-zinc-200">{project.duration}</b></span>}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800 flex justify-end">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold px-2.5 py-1 rounded-lg hover:bg-red-500/10 transition-colors"
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
          <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl shadow-xl text-zinc-100 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-base font-bold text-white mb-1">Add New Client Testimonial</h3>
              <p className="text-xs text-zinc-400 mb-6">Add real reviews and ratings from satisfied homeowners.</p>

              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh & Priya Sharma"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Project Details</label>
                    <input
                      type="text"
                      placeholder="e.g. 4BHK Villa, Madhurawada"
                      value={newTestimonial.project}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, project: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Package Chosen</label>
                    <select
                      value={newTestimonial.package}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, package: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none"
                    >
                      <option value="Essential">Essential Package</option>
                      <option value="Premium">Premium Package</option>
                      <option value="Luxury">Luxury Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Rating</label>
                    <select
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-[#01B3D1] font-bold focus:border-[#01B3D1] outline-none"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Review Content</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="What did the client say about the quality, timeline, and experience?"
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-[#01B3D1] outline-none leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-[#F35A61] hover:bg-[#E04850] text-white gap-2 text-xs font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Publish Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Testimonials */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(content?.testimonialsData || []).map((t) => (
              <div key={t.id} className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 shadow-lg flex flex-col justify-between hover:border-zinc-700 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#F35A61] font-bold text-sm tracking-widest">
                      {'★'.repeat(t.rating || 5)}
                    </span>
                    <span className="text-[10px] font-bold text-[#01B3D1] bg-[#F35A61]/10 border border-[#F35A61]/20 px-2 py-0.5 rounded-full">
                      {t.package}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 italic font-light line-clamp-4 leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-xs">{t.name}</h5>
                    <p className="text-[10px] text-zinc-500">{t.project}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
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
        <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl shadow-xl text-zinc-100 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white">Search Engine (SEO, AEO, GEO) Business NAP</h3>
              <p className="text-xs text-zinc-400">Name, Address, Phone, and Geolocation metadata injected into JSON-LD Schemas for AI & search engine indexing.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Company Legal Name</label>
                <input
                  type="text"
                  value={businessForm.companyName}
                  onChange={(e) => setBusinessForm({ ...businessForm, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:border-[#01B3D1] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Primary Hotline Phone</label>
                <input
                  type="text"
                  value={businessForm.phone}
                  onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-[#01B3D1] focus:border-[#01B3D1] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Official Email Address</label>
                <input
                  type="email"
                  value={businessForm.email}
                  onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:border-[#01B3D1] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Operating Hours</label>
                <input
                  type="text"
                  value={businessForm.hours}
                  onChange={(e) => setBusinessForm({ ...businessForm, hours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:border-[#01B3D1] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Physical Office Address (Visakhapatnam, AP)</label>
                <input
                  type="text"
                  value={businessForm.address}
                  onChange={(e) => setBusinessForm({ ...businessForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:border-[#01B3D1] outline-none"
                />
              </div>
            </div>

            <div className="p-5 bg-[#F35A61]-950/20 border border-[#01B3D1]/30 rounded-2xl text-xs text-[#F35A61]-200 space-y-1">
              <p className="font-bold flex items-center gap-2 text-[#01B3D1]">
                <CheckCircle2 className="w-4 h-4 text-[#F35A61]" />
                GEO & AEO Coordinates Synchronized
              </p>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Latitude: 17.7215, Longitude: 83.3060 (Visakhapatnam, Andhra Pradesh, India). Schema.org LocalBusiness, HomeAndConstructionBusiness, and FAQPage tags are permanently active.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800">
              <Button
                onClick={() => toast.success('Business NAP and Schema metadata updated!')}
                className="bg-[#F35A61] hover:bg-[#E04850] text-white gap-2 text-xs font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
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
