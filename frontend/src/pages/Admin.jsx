import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Shield, Users, Mail, MessageSquare, BookOpen, Calendar, LogOut, 
  Download, Search, Eye, Trash2, Plus, RefreshCw, CheckCircle, 
  Clock, Phone, MapPin, X, Key, Filter, TrendingUp, Building, ArrowRight, ExternalLink,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import CmsEditor from '../components/admin/CmsEditor';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
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
    packageInterest: 'Premium Package',
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
      toast.success('Welcome back, Admin!');
    } else {
      toast.error('Invalid password. Default is admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
    toast.info('Logged out securely');
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/leads/${activeTab}/${itemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Status updated to ${newStatus}`);
        setData(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus } : item));
        if (selectedItem && selectedItem.id === itemId) {
          setSelectedItem(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        toast.error('Failed to update status on server');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to permanently delete this record?')) return;
    try {
      const res = await fetch(`${API_URL}/api/leads/${activeTab}/${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Record removed successfully');
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
      toast.error('Please enter name and phone number');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/leads/manual`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
      if (res.ok) {
        toast.success('Manual lead logged successfully!');
        setShowAddModal(false);
        setNewLead({
          type: 'contacts',
          name: '',
          phone: '',
          email: '',
          location: '',
          packageInterest: 'Premium Package',
          notes: ''
        });
        fetchData();
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
      toast.error('Password must be at least 5 characters');
      return;
    }
    localStorage.setItem('adminCustomPassword', newPassword);
    toast.success('Admin password updated successfully!');
    setNewPassword('');
  };

  // CSV Export feature
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error('No data available to export');
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
    toast.success('CSV downloaded successfully!');
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
        (item.contact && item.contact.toLowerCase().includes(q))
      );
    });
  }, [data, searchQuery, statusFilter]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-100">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Spacexio Admin Portal</h2>
              <p className="text-gray-500 text-sm mt-1 font-light">Lead Management & Customer Submissions</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Security Passcode
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter admin password (default: admin123)"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md shadow-orange-600/20 text-sm"
              >
                Sign In to Dashboard
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
    { id: 'cms', label: 'Website CMS Editor', icon: Sparkles, badge: 'Live' },
    { id: 'contacts', label: 'Contact Forms', icon: Users, badge: overview?.counts?.contacts },
    { id: 'visits', label: 'Site Visits', icon: Calendar, badge: overview?.counts?.siteVisits },
    { id: 'chatbot', label: 'Chatbot Leads', icon: MessageSquare, badge: overview?.counts?.chatbotLeads },
    { id: 'newsletter', label: 'Newsletter', icon: Mail, badge: overview?.counts?.subscribers },
    { id: 'magnets', label: 'Lead Magnets', icon: BookOpen, badge: overview?.counts?.leadMagnets },
    { id: 'settings', label: 'Settings', icon: Key }
  ];

  const getStatusBadge = (status) => {
    const s = (status || 'new').toLowerCase();
    switch (s) {
      case 'new':
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">New / Pending</span>;
      case 'contacted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Contacted</span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">In Progress</span>;
      case 'converted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">Converted</span>;
      case 'closed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Closed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-black tracking-tight">
                <span className="text-gray-900">SPACE</span>
                <span className="text-orange-600">XIO</span>
              </div>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-orange-100 text-orange-700">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-light">
              Visakhapatnam Operations • Real-time database & lead capture system
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Walk-in Lead
            </button>
            <button
              onClick={fetchData}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg text-xs transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-600' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        {overview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Leads</span>
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Users className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mt-2">{overview.totalLeads}</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">Live inquiries across all channels</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Today's Inquiries</span>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Clock className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mt-2">{overview.todayLeads}</div>
                <div className="text-[11px] text-gray-500 mt-1">Received in last 24 hours</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Site Visits Booked</span>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mt-2">{overview.counts?.siteVisits || 0}</div>
                <div className="text-[11px] text-orange-600 font-medium mt-1">{overview.pendingVisits || 0} pending confirmation</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Subscribers</span>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Mail className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mt-2">{overview.counts?.subscribers || 0}</div>
                <div className="text-[11px] text-gray-500 mt-1">Newsletter community</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-28">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Navigation</h3>
              </div>
              <div className="p-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearchQuery('');
                      setStatusFilter('all');
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-orange-50 text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        activeTab === tab.id ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* If Overview Tab is active */}
            {activeTab === 'overview' ? (
              <div className="space-y-6">
                <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome to your Spacexio Command Center</h3>
                    <p className="text-gray-600 text-sm font-light mb-6">
                      Here is an overview of active lead generation channels. Click any category in the sidebar to review, update status, call customers, or export records to CSV.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div 
                        onClick={() => setActiveTab('cms')}
                        className="p-5 border-2 border-orange-400 bg-orange-50/40 rounded-xl hover:border-orange-600 hover:bg-orange-100/50 cursor-pointer transition-all shadow-sm"
                      >
                        <Sparkles className="w-6 h-6 text-orange-600 mb-3" />
                        <h4 className="font-bold text-gray-900 text-sm">Website CMS</h4>
                        <p className="text-xs text-gray-500 mt-1">Live edit hero, pricing & media</p>
                      </div>

                      <div 
                        onClick={() => setActiveTab('contacts')}
                        className="p-5 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/20 cursor-pointer transition-all"
                      >
                        <Users className="w-6 h-6 text-orange-600 mb-3" />
                        <h4 className="font-bold text-gray-900 text-sm">Direct Contact Forms</h4>
                        <p className="text-xs text-gray-500 mt-1">{overview?.counts?.contacts || 0} customer messages waiting</p>
                      </div>

                      <div 
                        onClick={() => setActiveTab('visits')}
                        className="p-5 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/20 cursor-pointer transition-all"
                      >
                        <Calendar className="w-6 h-6 text-orange-600 mb-3" />
                        <h4 className="font-bold text-gray-900 text-sm">Site Visit Consultations</h4>
                        <p className="text-xs text-gray-500 mt-1">{overview?.counts?.siteVisits || 0} plot inspection requests</p>
                      </div>

                      <div 
                        onClick={() => setActiveTab('chatbot')}
                        className="p-5 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/20 cursor-pointer transition-all"
                      >
                        <MessageSquare className="w-6 h-6 text-orange-600 mb-3" />
                        <h4 className="font-bold text-gray-900 text-sm">Chatbot AI Leads</h4>
                        <p className="text-xs text-gray-500 mt-1">{overview?.counts?.chatbotLeads || 0} automated qualified leads</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Health */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-xs text-gray-500 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-medium text-gray-700">Backend Server Active on Port 8080</span>
                  </div>
                  <span className="text-gray-400">Postgres & Hybrid Failover Storage Enabled</span>
                </div>
              </div>
            ) : activeTab === 'cms' ? (
              <CmsEditor />
            ) : activeTab === 'settings' ? (
              /* Settings Tab */
              <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Admin Security Settings</h3>
                  <p className="text-sm text-gray-500 font-light mb-6">
                    Change your dashboard passcode and view system credentials.
                  </p>

                  <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">New Security Passcode</label>
                      <input
                        type="password"
                        placeholder="Enter new passcode (min 5 chars)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold shadow-sm"
                    >
                      Update Passcode
                    </button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              /* Data Table View */
              <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  
                  {/* Table Control Bar */}
                  <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 capitalize">
                        {tabs.find(t => t.id === activeTab)?.label}
                      </h3>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {filteredData.length} records matching criteria
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                      {/* Search Input */}
                      <div className="relative flex-1 md:w-60">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-orange-500"
                        />
                      </div>

                      {/* Status Filter */}
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-700 bg-white outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New / Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>

                      {/* Export CSV Button */}
                      <button
                        onClick={exportToCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-orange-500 hover:text-orange-600 rounded-lg text-xs font-medium text-gray-700 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export CSV
                      </button>
                    </div>
                  </div>
                  
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase font-semibold tracking-wider">
                        <tr>
                          <th className="py-3 px-5">Date</th>
                          <th className="py-3 px-5">Contact Details</th>
                          <th className="py-3 px-5">Subject / Requirement</th>
                          <th className="py-3 px-5">Status</th>
                          <th className="py-3 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {loading ? (
                          <tr>
                            <td colSpan="5" className="py-12 text-center text-gray-400">
                              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-orange-600" />
                              Loading database records...
                            </td>
                          </tr>
                        ) : filteredData.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="py-12 text-center text-gray-400">
                              No records found matching your filters.
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

                            return (
                              <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                                <td className="py-3.5 px-5 text-gray-500 whitespace-nowrap">
                                  {formattedDate}
                                </td>
                                <td className="py-3.5 px-5">
                                  <div className="font-bold text-gray-900">{primaryName}</div>
                                  {primaryPhone && <div className="text-gray-500">{primaryPhone}</div>}
                                  {primaryEmail && <div className="text-gray-400 text-[11px]">{primaryEmail}</div>}
                                </td>
                                <td className="py-3.5 px-5">
                                  <div className="text-gray-900 font-medium line-clamp-1">{requirement}</div>
                                  {item.plotLocation && (
                                    <div className="text-gray-500 flex items-center gap-1 mt-0.5 text-[11px]">
                                      <MapPin className="w-3 h-3 text-orange-600" />
                                      {item.plotLocation}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3.5 px-5 whitespace-nowrap">
                                  <select
                                    value={(item.status || 'new').toLowerCase()}
                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                    className="bg-transparent border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-orange-500 font-medium"
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="converted">Converted</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </td>
                                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedItem(item)}
                                      className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded"
                                      title="View Details"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    {primaryPhone && (
                                      <a
                                        href={`tel:${primaryPhone}`}
                                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
                                        title="Call Customer"
                                      >
                                        <Phone className="w-4 h-4" />
                                      </a>
                                    )}
                                    <button
                                      onClick={() => handleDelete(item.id)}
                                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
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
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>

      {/* View Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-base">Lead Submission Details</h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500 text-xs">Submission Status</span>
                {getStatusBadge(selectedItem.status)}
              </div>

              {Object.entries(selectedItem).map(([key, value]) => {
                if (key === 'id') return null;
                return (
                  <div key={key} className="space-y-1">
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <p className="text-gray-900 font-medium bg-gray-50 p-2.5 rounded-lg break-words text-xs">
                      {String(value || '-')}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
              {selectedItem.phone && (
                <a
                  href={`tel:${selectedItem.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Customer
                </a>
              )}
              {selectedItem.email && (
                <a
                  href={`mailto:${selectedItem.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              )}
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-base">Record Walk-in / Phone Lead</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Lead Type</label>
                <select
                  value={newLead.type}
                  onChange={(e) => setNewLead({ ...newLead, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none"
                >
                  <option value="contacts">General Contact / Inquiry</option>
                  <option value="visits">Site Visit Appointment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Raju"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98480 12345"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Plot Location / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Rushikonda / Yendada"
                  value={newLead.location}
                  onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Notes / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Client wants G+2 luxury villa, budget around 75 Lakhs..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Lead
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
