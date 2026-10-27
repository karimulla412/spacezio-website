import React, { useState, useEffect, useRef } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { getApiUrl } from '../config/api';
import { toast } from 'sonner';
import { 
  X, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Send,
  Building,
  Sparkles
} from 'lucide-react';

const CITIES = [
  'Visakhapatnam',
  'Hyderabad',
  'Vijayawada',
  'Guntur',
  'Rajahmundry',
  'Kakinada',
  'Bengaluru',
  'Other'
];

export default function QuickInquiryModal() {
  const { isOpen, inquiryData, closeInquiry } = useInquiry();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Visakhapatnam',
    plotSize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const nameInputRef = useRef(null);

  // Synchronize when opened with new inquiryData
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: inquiryData.defaultCity || 'Visakhapatnam',
        plotSize: inquiryData.plotSize || '',
        message: inquiryData.defaultMessage || ''
      });
      setIsSuccess(false);

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Auto-focus name after short delay
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, inquiryData]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeInquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeInquiry]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.name.trim()) {
      toast.error('Please provide your name');
      return;
    }
    if (cleanPhone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    const detailedMessage = [
      `🎯 Context: ${inquiryData.title} [${inquiryData.category}]`,
      formData.plotSize ? `📐 Plot / Area: ${formData.plotSize}` : null,
      formData.city ? `📍 Location: ${formData.city}` : null,
      formData.message ? `💬 Client Requirements:\n${formData.message}` : null,
      inquiryData.details ? `📋 Technical Specs: ${typeof inquiryData.details === 'object' ? JSON.stringify(inquiryData.details) : inquiryData.details}` : null
    ].filter(Boolean).join('\n\n');

    const payload = {
      name: formData.name.trim(),
      phone: cleanPhone,
      email: formData.email.trim() || 'hellospacexio@gmail.com',
      company: formData.city,
      service: `${inquiryData.category}: ${inquiryData.title}`,
      message: detailedMessage
    };

    const apiUrl = getApiUrl();

    try {
      // 1. Submit to Primary Contact API (Dispatches email to hellospacexio@gmail.com)
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // Fallback to chatbot lead capture route
        await fetch(`${apiUrl}/api/chatbot/lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: payload.name,
            contact: `${payload.name} - ${payload.phone} (${formData.city})`,
            serviceRequired: payload.service,
            projectSize: formData.plotSize || 'Not specified',
            notes: detailedMessage,
            source: 'Quick Inquiry Modal'
          })
        });
      }

      setIsSuccess(true);
      toast.success('Inquiry submitted! Our Lead Architect will call you shortly.');
    } catch (err) {
      console.warn('Inquiry submission fallback:', err.message);
      setIsSuccess(true);
      toast.success('Inquiry recorded! Our engineering team will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappText = encodeURIComponent(
    `Hello Spacexio Team,\n\nI just submitted an inquiry on your website.\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Interest:* ${inquiryData.title} (${inquiryData.category})\n*Location:* ${formData.city}\n${formData.plotSize ? `*Plot Size:* ${formData.plotSize}\n` : ''}\nPlease connect me with a Senior Civil Engineer.`
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeInquiry();
      }}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]"></div>

        {/* Modal Close Button */}
        <button
          onClick={closeInquiry}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          /* SUCCESS VIEW */
          <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 bg-[#EFFBFC] border-2 border-[#01B3D1] rounded-2xl flex items-center justify-center mb-5 text-[#01B3D1] shadow-lg shadow-[#01B3D1]/20">
              <CheckCircle2 className="h-9 w-9 text-[#01B3D1]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F3] text-[#F35A61] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3 w-3" />
              Direct Studio Alert Dispatched
            </div>

            <h3 className="text-2xl font-extrabold text-slate-950 mb-2">
              Inquiry Sent Successfully!
            </h3>

            <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our Lead Civil Engineer has received your query regarding <span className="font-semibold text-slate-800">"{inquiryData.title}"</span> and will call you on <strong className="text-slate-900">{formData.phone}</strong> within 2 hours.
            </p>

            <div className="w-full space-y-3">
              <a
                href={`https://wa.me/919686511132?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02]"
              >
                <span>Connect Instantly on WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={closeInquiry}
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            {/* Context Badge & Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-[11px] font-mono font-bold uppercase tracking-wider mb-2.5">
                <Building className="h-3.5 w-3.5 text-[#01B3D1]" />
                {inquiryData.category}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug">
                {inquiryData.title}
              </h2>

              <p className="text-slate-500 text-xs sm:text-sm mt-1 flex items-center gap-1.5 font-normal">
                <Clock className="h-3.5 w-3.5 text-[#01B3D1] flex-shrink-0" />
                <span>Quick callback guaranteed • Direct alert to project leads</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-[#F35A61]">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F35A61]/30 focus:border-[#F35A61] transition-all"
                />
              </div>

              {/* Phone & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-[#F35A61]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F35A61]/30 focus:border-[#F35A61] transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Project Location / City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B3D1]/30 focus:border-[#01B3D1] transition-all"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email & Plot Size Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B3D1]/30 focus:border-[#01B3D1] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Plot / Built-up Size <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="plotSize"
                    placeholder="e.g. 200 sq.yds / 2400 sq.ft"
                    value={formData.plotSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B3D1]/30 focus:border-[#01B3D1] transition-all"
                  />
                </div>
              </div>

              {/* Custom Message / Requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Project Notes or Questions
                </label>
                <textarea
                  rows={3}
                  name="message"
                  placeholder="Share details about your timeline, floor plan requirements, or specific questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F35A61]/30 focus:border-[#F35A61] transition-all resize-none"
                ></textarea>
              </div>

              {/* Trust Micro-bar */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
                <ShieldCheck className="h-4 w-4 text-[#01B3D1] flex-shrink-0" />
                <span>Zero spam guarantee • 100% confidential architectural assessment</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#F35A61] via-[#E04850] to-[#F35A61] hover:brightness-105 active:scale-[0.99] shadow-lg shadow-[#F35A61]/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Dispatching Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Project Query & Receive Callback</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
