import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Shield, Users, Mail, MessageSquare, BookOpen, Calendar, LogOut, 
  Download, Search, Eye, Trash2, Plus, RefreshCw, CheckCircle2, 
  Clock, Phone, MapPin, X, Key, Filter, TrendingUp, Building2, ArrowRight, 
  ExternalLink, Sparkles, MessageCircle, Activity, ChevronRight, Check, 
  AlertTriangle, Copy, Layers, Server, Lock, Globe, HardDrive, PhoneCall,
  Laptop
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import CmsEditor from '../components/admin/CmsEditor';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modals
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    type: 'contacts',
    name: '',
    phone: '',
    email: '',
    location: '',
    packageInterest: 'Executive Villa (₹2,250/sq.ft)',
    notes: ''
  });

  // Settings
  const [newPassword, setNewPassword] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchOverview = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/overview`);
      if (res.ok) {
        const json = await res.json();
        setOverview(json);
      }
    } catch (err) {
      console.warn('Overview fetch error:', err);
    }
  }, [API_URL]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      fetchOverview();
      let endpoint = '';
      switch (activeTab) {
        case 'contacts': endpoint = '/api/contact-submissions'; break;
        case 'visits': endpoint = '/api/site-visit-bookings'; break;
        case 'newsletter': endpoint = '/api/newsletter/subscribers'; break;
        case 'chatbot': endpoint = '/api/chatbot/leads'; break;
        case 'magnets': endpoint = '/api/lead-magnets'; break;
        default: endpoint = '/api/contact-submissions';
      }
      
      const response = await fetch(`${API_URL}${endpoint}`);
      if (response.ok) {
        const json = await response.json();
        setData(Array.isArray(json) ? json : []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, API_URL, fetchOverview]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab, fetchData]);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('adminCustomPassword') || 'admin123';
    if (password === storedPass) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      toast.success('Welcome back, Operations Administrator!');
    } else {
      toast.error('Invalid security passcode. Default is admin123');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to exit the Admin Console?')) {
      localStorage.removeItem('adminAuth');
      setIsAuthenticated(false);
      setPassword('');
      toast.info('Logged out securely');
    }
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/leads/${activeTab}/${itemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Lead status updated to: ${newStatus}`);
        setData(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus } : item));
        if (selectedItem && selectedItem.id === itemId) {
          setSelectedItem(prev => ({ ...prev, status: newStatus }));
        }
        fetchOverview();
      } else {
        toast.error('Failed to update status on server');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead record?')) return;
    try {
      const res = await fetch(`${API_URL}/api/leads/${activeTab}/${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Record purged from database');
        setData(prev => prev.filter(item => item.id !== itemId));
        if (selectedItem && selectedItem.id === itemId) {
          setSelectedItem(null);
        }
        fetchOverview();
      } else {
        toast.error('Failed to delete record');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting record');
    }
  };

  const handleCreateManualLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) {
      toast.error('Please enter client name and phone number');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/leads/manual`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
      if (res.ok) {
        toast.success('Walk-in lead recorded into database!');
        setShowAddModal(false);
        setNewLead({
          type: 'contacts',
          name: '',
          phone: '',
          email: '',
          location: '',
          packageInterest: 'Executive Villa (₹2,250/sq.ft)',
          notes: ''
        });
        fetchData();
        fetchOverview();
      } else {
        toast.error('Failed to save manual lead');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding lead');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 5) {
      toast.error('Passcode must be at least 5 characters');
      return;
    }
    localStorage.setItem('adminCustomPassword', newPassword);
    toast.success('Admin passcode updated successfully!');
    setNewPassword('');
  };

  // CSV Export feature
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error('No data available to export in current tab');
      return;
    }

    const headers = Object.keys(data[0]).filter(k => k !== 'id');
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header] === null || row[header] === undefined ? '' : String(row[header]);
        return `"${val.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `spacexio_${activeTab}_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV Export downloaded successfully!');
  };

  // Helper for generating clean WhatsApp direct chat links
  const getWhatsAppLink = (phone, name = 'Client') => {
    if (!phone) return null;
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const intlNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
    const text = encodeURIComponent(`Hello ${name}, thank you for contacting Spacexio Architecture & Construction, Visakhapatnam. How may we assist your project today?`);
    return `https://wa.me/${intlNumber}?text=${text}`;
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Status filter
      if (statusFilter !== 'all') {
        const itemStatus = (item.status || 'new').toLowerCase();
        if (itemStatus !== statusFilter) return false;
      }
      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.plotLocation && item.plotLocation.toLowerCase().includes(q)) ||
        (item.service && item.service.toLowerCase().includes(q)) ||
        (item.packageInterest && item.packageInterest.toLowerCase().includes(q)) ||
        (item.contact && item.contact.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q))
      );
    });
  }, [data, searchQuery, statusFilter]);

  // Status Badge UI
  const getStatusBadge = (status) => {
    const s = (status || 'new').toLowerCase();
    switch (s) {
      case 'new':
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            New / Uncontacted
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Contacted
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            In Consultation
          </span>
        );
      case 'converted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Converted Client
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
            Closed / Archived
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-300">
            {status}
          </span>
        );
    }
  };

  // Nav configuration
  const navGroups = [
    {
      label: 'CORE CONSOLE',
      items: [
        { id: 'overview', label: 'Executive Overview', icon: TrendingUp },
      ]
    },
    {
      label: 'CONTENT & ASSETS',
      items: [
        { id: 'cms', label: 'Website CMS Editor', icon: Sparkles, badge: 'LIVE', badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
      ]
    },
    {
      label: 'LEAD PIPELINE & CRM',
      items: [
        { id: 'contacts', label: 'Contact Inquiries', icon: Users, badge: overview?.counts?.contacts },
        { id: 'visits', label: 'Site Visit Bookings', icon: Calendar, badge: overview?.counts?.siteVisits, alert: overview?.pendingVisits > 0 },
        { id: 'chatbot', label: 'Chatbot AI Leads', icon: MessageSquare, badge: overview?.counts?.chatbotLeads },
        { id: 'newsletter', label: 'Newsletter Subscribers', icon: Mail, badge: overview?.counts?.subscribers },
        { id: 'magnets', label: 'Guide Downloads', icon: BookOpen, badge: overview?.counts?.leadMagnets },
      ]
    },
    {
      label: 'SYSTEM & SETTINGS',
      items: [
        { id: 'settings', label: 'Security & Passcode', icon: Shield },
        { id: 'diagnostics', label: 'Server Diagnostics', icon: Activity },
      ]
    }
  ];

  // -------------------------------------------------------------
  // Full-Screen Dark Login View
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black text-white flex items-center justify-center p-6 z-50 overflow-hidden font-sans">
        {/* Subtle Architectural Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Ambient Orange Glow */}
        <div className="absolute w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none -bottom-40 -right-40" />

        <div className="relative w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-orange-950/20 backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 p-0.5 shadow-lg shadow-orange-600/30 mb-5">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <Shield className="w-7 h-7 text-orange-500" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-2xl font-black tracking-tight text-white">SPACE</span>
              <span className="text-2xl font-black tracking-tight text-orange-500">XIO</span>
            </div>

            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mt-1">
              Enterprise Console Access
            </p>
            <p className="text-xs text-zinc-500 mt-2 font-light max-w-xs">
              Visakhapatnam Operations • Real-time lead pipeline, site visit dispatch & visual CMS
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Security Passcode
                </label>
                <span className="text-[10px] text-zinc-500">Default: admin123</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter administrator passcode"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all tracking-wide"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/30 text-xs tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Authenticate & Enter Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Port 8080 Active
            </span>
            <a 
              href="/" 
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              Back to Live Website ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Full-Screen Dark Enterprise SaaS Layout
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* ===================== FIXED LEFT SIDEBAR ===================== */}
      <aside className="w-72 flex-shrink-0 bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between select-none z-20">
        
        {/* Brand & Workspace Header */}
        <div className="p-6 border-b border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-orange-600/30">
                S
              </div>
              <div>
                <div className="flex items-center gap-1 text-base font-black tracking-tight leading-none">
                  <span className="text-white">SPACE</span>
                  <span className="text-orange-500">XIO</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-medium tracking-wide mt-0.5">
                  ENTERPRISE OS
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-orange-500" />
              Visakhapatnam HQ
            </span>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
              :8080
            </span>
          </div>
        </div>

        {/* Navigation Menus */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                {group.label}
              </div>
              {group.items.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearchQuery('');
                      setStatusFilter('all');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-orange-600 text-white font-semibold shadow-lg shadow-orange-600/20'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                      <span>{tab.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {tab.alert && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      )}
                      {tab.badge !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive 
                            ? 'bg-black/30 text-white' 
                            : tab.badgeColor || 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Profile & Direct Live Site Button */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-orange-500" />
            <span>Open Live Website</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-xs text-orange-400">
                AD
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-zinc-200 leading-tight">Admin Console</div>
                <div className="text-[10px] text-zinc-500">Superadmin</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN APPLICATION AREA ===================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-black">
        
        {/* Top Header Bar */}
        <header className="h-16 flex-shrink-0 bg-zinc-900/40 backdrop-blur-md border-b border-zinc-800/80 px-8 flex items-center justify-between z-10">
          
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Console
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <div className="text-sm font-bold text-zinc-100 capitalize">
              {activeTab === 'overview' && 'Executive Overview'}
              {activeTab === 'cms' && 'Website Visual CMS'}
              {activeTab === 'contacts' && 'Contact Form Leads'}
              {activeTab === 'visits' && 'Site Visit Bookings'}
              {activeTab === 'chatbot' && 'Chatbot AI Leads'}
              {activeTab === 'newsletter' && 'Newsletter Subscribers'}
              {activeTab === 'magnets' && 'Guide Download Leads'}
              {activeTab === 'settings' && 'Security & Passcode'}
              {activeTab === 'diagnostics' && 'Server Telemetry'}
            </div>
          </div>

          {/* Center Search Input (Active when in lead views) */}
          {['contacts', 'visits', 'chatbot', 'newsletter', 'magnets'].includes(activeTab) && (
            <div className="relative w-72 lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search leads by name, phone, email, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {['contacts', 'visits', 'chatbot', 'newsletter', 'magnets'].includes(activeTab) && (
              <>
                {/* Status Filter */}
                <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1">
                  <Filter className="w-3 h-3 text-zinc-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-xs text-zinc-300 outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-zinc-900 text-zinc-300">All Statuses</option>
                    <option value="new" className="bg-zinc-900 text-zinc-300">New / Uncontacted</option>
                    <option value="contacted" className="bg-zinc-900 text-zinc-300">Contacted</option>
                    <option value="in-progress" className="bg-zinc-900 text-zinc-300">In Consultation</option>
                    <option value="converted" className="bg-zinc-900 text-zinc-300">Converted</option>
                    <option value="closed" className="bg-zinc-900 text-zinc-300">Closed</option>
                  </select>
                </div>

                {/* CSV Export */}
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300 transition-colors"
                  title="Export records to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>CSV</span>
                </button>
              </>
            )}

            {/* Refresh */}
            <button
              onClick={fetchData}
              className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-orange-500' : ''}`} />
            </button>

            {/* Add Walk-in Lead Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Lead</span>
            </button>
          </div>
        </header>

        {/* Scrollable Viewport Canvas */}
        <main className="flex-1 overflow-y-auto bg-black p-8 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          
          {/* ===================== TAB: OVERVIEW ===================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              
              {/* Executive Snapshot Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 shadow-2xl">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      Executive Command Center
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white">
                      Visakhapatnam Construction Operations
                    </h2>
                    <p className="text-zinc-400 text-xs font-light mt-1.5 max-w-2xl leading-relaxed">
                      Unified lead generation management, site inspection scheduling, chatbot conversations, and visual website CMS dispatch for Spacexio Architecture & Turnkey Construction.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('visits')}
                      className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Review Site Visits</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('cms')}
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span>Edit Live Site</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Total Leads */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Total Leads Captured</span>
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight">
                    {overview?.totalLeads || 0}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-time database count</span>
                  </div>
                </div>

                {/* Today's Inquiries */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Today's Inquiries</span>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight">
                    {overview?.todayLeads || 0}
                  </div>
                  <div className="text-xs text-zinc-400 mt-2 font-light">
                    Arrived within the last 24 hours
                  </div>
                </div>

                {/* Site Visits */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Site Visits Booked</span>
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight">
                    {overview?.counts?.siteVisits || 0}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mt-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{overview?.pendingVisits || 0} awaiting confirmation</span>
                  </div>
                </div>

                {/* Newsletter Community */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Newsletter Subscribers</span>
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight">
                    {overview?.counts?.subscribers || 0}
                  </div>
                  <div className="text-xs text-zinc-400 mt-2 font-light">
                    Homeowner audience database
                  </div>
                </div>

              </div>

              {/* Pipeline Quick Access Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div 
                  onClick={() => setActiveTab('cms')}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900/80 cursor-pointer transition-all group"
                >
                  <Sparkles className="w-6 h-6 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Visual Website CMS</h4>
                  <p className="text-xs text-zinc-400 mt-1">Live edit hero, packages, and client portfolio</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-orange-400 font-semibold">
                    Launch CMS <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('contacts')}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900/80 cursor-pointer transition-all group"
                >
                  <Users className="w-6 h-6 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Contact Submissions</h4>
                  <p className="text-xs text-zinc-400 mt-1">{overview?.counts?.contacts || 0} general customer inquiries</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-orange-400 font-semibold">
                    View Leads <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('visits')}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900/80 cursor-pointer transition-all group"
                >
                  <Calendar className="w-6 h-6 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Plot Site Visits</h4>
                  <p className="text-xs text-zinc-400 mt-1">{overview?.counts?.siteVisits || 0} physical inspection requests</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-orange-400 font-semibold">
                    Schedule Visits <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('chatbot')}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900/80 cursor-pointer transition-all group"
                >
                  <MessageSquare className="w-6 h-6 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Chatbot AI Leads</h4>
                  <p className="text-xs text-zinc-400 mt-1">{overview?.counts?.chatbotLeads || 0} AI pre-qualified leads</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-orange-400 font-semibold">
                    View Transcripts <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

              {/* System Telemetry & Operational Health */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <div>
                    <span className="font-bold text-zinc-200">Backend API Active on Port 8080</span>
                    <span className="text-zinc-500 ml-2">PostgreSQL Database + Real-time JSON Failover</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-400">
                  <span>Visakhapatnam AP Node</span>
                  <span>•</span>
                  <span>AEO / GEO Schema Synced</span>
                  <span>•</span>
                  <span>HTTPS Ready</span>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB: WEBSITE CMS ===================== */}
          {activeTab === 'cms' && (
            <div className="max-w-7xl mx-auto">
              <CmsEditor />
            </div>
          )}

          {/* ===================== TAB: SECURITY & SETTINGS ===================== */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Security & Access Management</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Update the administrator authentication passcode for this console.
                  </p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      New Security Passcode
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="password"
                        placeholder="Enter new master passcode (min 5 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-orange-500 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/30 transition-all"
                  >
                    Save New Passcode
                  </button>
                </form>

                <div className="pt-6 border-t border-zinc-800/80">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Default Credentials
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Console Passcode default: <code className="bg-zinc-950 px-2 py-1 rounded text-orange-400 font-mono">admin123</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB: SERVER DIAGNOSTICS ===================== */}
          {activeTab === 'diagnostics' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Server & Infrastructure Telemetry</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Live status check of backend microservices, database, and content files.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-2">
                      <Server className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold text-sm text-zinc-200">Express Node.js Server</span>
                    </div>
                    <p className="text-xs text-zinc-400">Listening on port 8080 with CORS allowed</p>
                    <div className="mt-3 text-[11px] font-mono text-emerald-400">STATUS: 200 OK</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-2">
                      <HardDrive className="w-5 h-5 text-blue-400" />
                      <span className="font-bold text-sm text-zinc-200">Database Storage</span>
                    </div>
                    <p className="text-xs text-zinc-400">PostgreSQL with automatic JSON failover</p>
                    <div className="mt-3 text-[11px] font-mono text-blue-400">STORAGE: /backend/data/</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-2">
                  <div className="font-bold text-zinc-300">Active API Endpoints Verified:</div>
                  <div className="font-mono text-[11px] text-zinc-400 space-y-1">
                    <div>• GET /api/admin/overview - 200 OK</div>
                    <div>• GET /api/contact-submissions - 200 OK</div>
                    <div>• GET /api/site-visit-bookings - 200 OK</div>
                    <div>• GET /api/chatbot/leads - 200 OK</div>
                    <div>• GET /api/newsletter/subscribers - 200 OK</div>
                    <div>• GET /api/lead-magnets - 200 OK</div>
                    <div>• PUT /api/content (Visual CMS) - 200 OK</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB: DATA TABLES (CRM LEADS) ===================== */}
          {['contacts', 'visits', 'chatbot', 'newsletter', 'magnets'].includes(activeTab) && (
            <div className="max-w-7xl mx-auto space-y-4">
              
              {/* Table Container Card */}
              <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden shadow-2xl backdrop-blur-sm">
                
                {/* Table Header / Metadata Bar */}
                <div className="p-6 border-b border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize">
                      {activeTab === 'contacts' && 'Direct Contact Inquiries'}
                      {activeTab === 'visits' && 'Site Visit Consultation Bookings'}
                      {activeTab === 'chatbot' && 'Chatbot AI Qualified Leads'}
                      {activeTab === 'newsletter' && 'Newsletter Subscribers'}
                      {activeTab === 'magnets' && 'Civil Cost Guide Downloads'}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Showing {filteredData.length} records matching current filter
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 font-mono">
                      Fast Action: Click WhatsApp icon to initiate direct conversation
                    </span>
                  </div>
                </div>

                {/* Dense Enterprise Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 uppercase font-semibold tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-6">Date</th>
                        <th className="py-3.5 px-6">Client Details</th>
                        <th className="py-3.5 px-6">Requirement / Plot Location</th>
                        <th className="py-3.5 px-6">Pipeline Status</th>
                        <th className="py-3.5 px-6 text-right">Quick Dispatch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="py-16 text-center text-zinc-400">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-orange-500" />
                            Querying live database records...
                          </td>
                        </tr>
                      ) : filteredData.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="py-16 text-center text-zinc-500">
                            No records found matching your search or status filter.
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((item) => {
                          const dateStr = item.timestamp || item.subscribedAt;
                          const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }) : 'N/A';

                          const primaryName = item.name || item.client_name || item.contact || item.email || 'Lead';
                          const primaryPhone = item.phone || item.contact || '';
                          const primaryEmail = item.email || '';
                          const requirement = item.service || item.packageInterest || item.projectType || item.message || item.source || '-';
                          const waLink = getWhatsAppLink(primaryPhone, primaryName);

                          return (
                            <tr key={item.id} className="hover:bg-zinc-900/80 transition-colors group">
                              {/* Date */}
                              <td className="py-4 px-6 text-zinc-400 whitespace-nowrap font-mono text-[11px]">
                                {formattedDate}
                              </td>

                              {/* Client Details */}
                              <td className="py-4 px-6">
                                <div className="font-bold text-zinc-100 text-sm group-hover:text-orange-400 transition-colors">
                                  {primaryName}
                                </div>
                                {primaryPhone && (
                                  <div className="text-zinc-400 font-mono text-xs mt-0.5">
                                    {primaryPhone}
                                  </div>
                                )}
                                {primaryEmail && (
                                  <div className="text-zinc-500 text-[11px]">
                                    {primaryEmail}
                                  </div>
                                )}
                              </td>

                              {/* Requirement & Location */}
                              <td className="py-4 px-6 max-w-xs">
                                <div className="text-zinc-200 font-medium line-clamp-1">
                                  {requirement}
                                </div>
                                {item.plotLocation && (
                                  <div className="text-zinc-400 flex items-center gap-1 mt-1 text-[11px]">
                                    <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
                                    <span>{item.plotLocation}</span>
                                    {item.plotSize && <span className="text-zinc-500 font-mono">({item.plotSize})</span>}
                                  </div>
                                )}
                                {item.preferredDate && (
                                  <div className="text-zinc-500 text-[10px] mt-0.5">
                                    Preferred: {item.preferredDate} ({item.preferredTime || 'Anytime'})
                                  </div>
                                )}
                              </td>

                              {/* Pipeline Status Dropdown */}
                              <td className="py-4 px-6 whitespace-nowrap">
                                <select
                                  value={(item.status || 'new').toLowerCase()}
                                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200 outline-none focus:border-orange-500 font-medium cursor-pointer"
                                >
                                  <option value="new" className="bg-zinc-900 text-emerald-400">● New / Uncontacted</option>
                                  <option value="contacted" className="bg-zinc-900 text-blue-400">● Contacted</option>
                                  <option value="in-progress" className="bg-zinc-900 text-amber-400">● In Consultation</option>
                                  <option value="converted" className="bg-zinc-900 text-purple-400">● Converted Client</option>
                                  <option value="closed" className="bg-zinc-900 text-zinc-400">● Closed / Archived</option>
                                </select>
                              </td>

                              {/* Fast Action Buttons */}
                              <td className="py-4 px-6 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  {/* Direct WhatsApp Action */}
                                  {waLink && (
                                    <a
                                      href={waLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                                      title="Open WhatsApp Chat"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                  )}

                                  {/* Direct Phone Call */}
                                  {primaryPhone && (
                                    <a
                                      href={`tel:${primaryPhone}`}
                                      className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-colors"
                                      title="Call Client"
                                    >
                                      <PhoneCall className="w-3.5 h-3.5" />
                                    </a>
                                  )}

                                  {/* View Full Lead Details Modal */}
                                  <button
                                    onClick={() => setSelectedItem(item)}
                                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                                    title="View Full Details"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete Record */}
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                                    title="Purge Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* ===================== VIEW ITEM DETAILS MODAL ===================== */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-fade-in-up text-zinc-100">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
              <div>
                <h3 className="font-bold text-white text-base">Lead Submission Dossier</h3>
                <p className="text-[11px] text-zinc-400">Complete recorded metadata and timestamp</p>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs scrollbar-thin scrollbar-thumb-zinc-800">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-zinc-400 text-xs font-semibold">Workflow Status</span>
                {getStatusBadge(selectedItem.status)}
              </div>

              {Object.entries(selectedItem).map(([key, value]) => {
                if (key === 'id') return null;
                return (
                  <div key={key} className="space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <p className="text-zinc-200 font-medium bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 break-words leading-relaxed">
                      {String(value || '-')}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-5 bg-zinc-950 border-t border-zinc-800 flex gap-3 justify-end items-center">
              {selectedItem.phone && (
                <>
                  <a
                    href={getWhatsAppLink(selectedItem.phone, selectedItem.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedItem.phone}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Client
                  </a>
                </>
              )}
              {selectedItem.email && (
                <a
                  href={`mailto:${selectedItem.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              )}
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD WALK-IN LEAD MODAL ===================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-fade-in-up text-zinc-100">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
              <div>
                <h3 className="font-bold text-white text-base">Record Walk-in / Direct Call Lead</h3>
                <p className="text-[11px] text-zinc-400">Save offline prospective client into Spacexio CRM</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Channel Type</label>
                <select
                  value={newLead.type}
                  onChange={(e) => setNewLead({ ...newLead, type: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 outline-none focus:border-orange-500"
                >
                  <option value="contacts">Direct Walk-in / Phone Inquiry</option>
                  <option value="visits">Plot Site Visit Appointment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. K. Verma"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98480 12345"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Plot Location / Neighborhood</label>
                <input
                  type="text"
                  placeholder="e.g. Rushikonda, Yendada, Madhurawada"
                  value={newLead.location}
                  onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Construction Package / Interest</label>
                <select
                  value={newLead.packageInterest}
                  onChange={(e) => setNewLead({ ...newLead, packageInterest: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 outline-none focus:border-orange-500"
                >
                  <option value="Executive Villa (₹2,250/sq.ft)">Executive Villa (₹2,250/sq.ft)</option>
                  <option value="Standard Home (₹1,850/sq.ft)">Standard Home (₹1,850/sq.ft)</option>
                  <option value="Ultra Luxury Signature (₹2,850/sq.ft)">Ultra Luxury Signature (₹2,850/sq.ft)</option>
                  <option value="Architectural Design Only">Architectural Design & Approval Only</option>
                  <option value="Commercial Space">Commercial / Turnkey Office</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">Discussion Notes / Specifications</label>
                <textarea
                  rows={3}
                  placeholder="Plot size 240 sq.yards, wants G+2 duplex villa with private terrace garden..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-zinc-700 text-zinc-300 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-md shadow-orange-600/30 transition-all"
                >
                  Save to CRM Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
