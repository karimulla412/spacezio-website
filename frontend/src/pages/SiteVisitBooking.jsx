import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Check, ArrowRight, Shield, MessageCircle, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import SEO from '../components/SEO';

const SiteVisitBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotLocation: '',
    plotSize: '',
    packageInterest: 'Undecided',
    preferredDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/site-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      setSubmitted(true);
      toast.success('Site visit scheduled! Our team will contact you shortly.');
    } catch (error) {
      console.error('Site visit error:', error);
      toast.error('Booking failed. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FCFCF7] pt-32 pb-20 flex items-center justify-center text-slate-900 font-sans antialiased">
        <SEO 
          title="Site Visit Confirmed - Spacexio"
          description="Your free site visit in Visakhapatnam is confirmed. An expert civil engineer will inspect your plot."
        />
        <Card className="bg-white border border-slate-200/90 shadow-2xl max-w-xl mx-6 rounded-3xl overflow-hidden">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Site Visit Booked Successfully!
            </h2>
            <p className="text-slate-600 mb-8 font-normal text-base leading-relaxed">
              Our lead civil engineering team will call you within 2 hours to confirm your plot coordinates and appointment time.
            </p>
            <div className="space-y-3 text-left bg-slate-50 border border-slate-200/80 p-6 rounded-2xl mb-8 text-sm">
              <p className="text-slate-950 font-bold mb-2">What happens next:</p>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">Senior Civil Engineer calls to confirm inspection timing</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">Free physical site survey and plot boundary verification</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-[#01B3D1] flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">Receive accurate BOQ quotation tailored to your plot</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-[#F35A61] hover:bg-[#E04850] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-[#F35A61]/25 cursor-pointer"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => window.location.href = '/cost-calculator'}
                variant="outline"
                className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-6 rounded-xl cursor-pointer"
              >
                Estimate Cost
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCF7] pt-24 pb-20 text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white">
      <SEO 
        title="Book Free Site Visit & Plot Survey in Visakhapatnam"
        description="Book a complimentary plot inspection with Spacexio's licensed civil engineers in Visakhapatnam. Get soil suitability analysis, contour check, and customized quotation."
        keywords="site visit Visakhapatnam, free plot survey Vizag, civil engineer site inspection Andhra Pradesh, house construction consultation"
        url="https://spacexio.com/site-visit"
      />

      {/* Header */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#FCFCF7] via-[#FAF9F5] to-white border-b border-slate-200/80 mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 mb-6 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-[#F35A61]" />
            <span className="text-[#F35A61] font-bold uppercase">ZERO-COST IN-PERSON CONSULTATION</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-slate-600">AP & HYDERABAD</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Book Free Site Survey
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Our licensed civil engineer will inspect your plot, evaluate road access and soil conditions, and outline your project feasibility with zero obligations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Booking Form */}
          <div className="lg:col-span-8">
            <Card className="bg-white border border-slate-200/90 shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 mb-4 pb-2 border-b border-slate-100 uppercase tracking-wider">
                      1. Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name" className="text-slate-700 font-bold mb-1.5 block text-xs">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 h-12 rounded-xl focus:bg-white focus:border-[#01B3D1]"
                          placeholder="e.g. Ramesh Varma"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-slate-700 font-bold mb-1.5 block text-xs">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 h-12 rounded-xl focus:bg-white focus:border-[#01B3D1]"
                          placeholder="+91 98480 12345"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-slate-700 font-bold mb-1.5 block text-xs">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 h-12 rounded-xl focus:bg-white focus:border-[#01B3D1]"
                          placeholder="ramesh@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="plotSize" className="text-slate-700 font-bold mb-1.5 block text-xs">
                          Plot Size (sq.yds or sq.ft)
                        </Label>
                        <Input
                          id="plotSize"
                          name="plotSize"
                          type="text"
                          value={formData.plotSize}
                          onChange={handleChange}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 h-12 rounded-xl focus:bg-white focus:border-[#01B3D1]"
                          placeholder="e.g. 200 sq.yds (1800 sq.ft)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plot Details */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 mb-4 pb-2 border-b border-slate-100 uppercase tracking-wider">
                      2. Plot Location & Package
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="plotLocation" className="text-slate-700 font-bold mb-1.5 block text-xs">
                          Plot Location & Landmarks *
                        </Label>
                        <Input
                          id="plotLocation"
                          name="plotLocation"
                          type="text"
                          required
                          value={formData.plotLocation}
                          onChange={handleChange}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 h-12 rounded-xl focus:bg-white focus:border-[#01B3D1]"
                          placeholder="e.g. Madhurawada Near Law College, Visakhapatnam"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="packageInterest" className="text-slate-700 font-bold mb-1.5 block text-xs">
                            Interested Package
                          </Label>
                          <Select 
                            value={formData.packageInterest} 
                            onValueChange={(value) => setFormData({ ...formData, packageInterest: value })}
                          >
                            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 h-12 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#01B3D1]/20">
                              <SelectValue placeholder="Select package" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl rounded-xl">
                              <SelectItem value="Essential (₹1,850/sqft)">Essential (₹1,850/sqft)</SelectItem>
                              <SelectItem value="Premium (₹2,150/sqft)">Premium (₹2,150/sqft)</SelectItem>
                              <SelectItem value="Luxury (₹2,650/sqft)">Luxury (₹2,650/sqft)</SelectItem>
                              <SelectItem value="Undecided">Undecided / Need Guidance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="preferredDate" className="text-slate-700 font-bold mb-1.5 block text-xs">
                            Preferred Date
                          </Label>
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-200 text-slate-900 h-12 rounded-xl focus:bg-white focus:border-[#01B3D1]"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-slate-700 font-bold mb-1.5 block text-xs">
                          Special Requirements or Notes
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 resize-none rounded-xl text-sm focus:bg-white focus:border-[#01B3D1]"
                          placeholder="Any specific architectural desires, budget constraints, or timeline?"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F35A61] hover:bg-[#E04850] text-white h-13 text-sm font-bold rounded-xl shadow-lg shadow-[#F35A61]/25 transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Free Site Survey'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-slate-500 text-center font-normal">
                    🔒 Your contact details are 100% confidential. No spam or unsolicited marketing calls.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-white border border-slate-200/90 shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-slate-950 mb-4 pb-3 border-b border-slate-100 uppercase tracking-wider">
                  What to Expect on Your Visit
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: User,
                      title: 'Senior Civil Engineer',
                      desc: 'Direct consultation with an experienced licensed engineering professional.'
                    },
                    {
                      icon: MapPin,
                      title: 'Contour & Plot Assessment',
                      desc: 'Check road approach width, power line distance, and ground levels.'
                    },
                    {
                      icon: Home,
                      title: 'Preliminary Soil Assessment',
                      desc: 'Determine suitable foundation depth and moisture barrier requirements.'
                    },
                    {
                      icon: Clock,
                      title: 'Written BOQ & Plan',
                      desc: 'Receive tailored budget estimates without obligation.'
                    }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-2.5 bg-[#EFFBFC] border border-[#99E7EF] rounded-xl text-[#01B3D1] flex-shrink-0">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-slate-900 font-bold text-xs">{item.title}</p>
                          <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="bg-[#FDF2F3] border border-[#FCA5A9] rounded-3xl p-6 text-center shadow-xs">
              <span className="inline-block px-3 py-1 bg-[#F35A61] text-white text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
                100% Complimentary
              </span>
              <h4 className="text-slate-950 font-bold text-sm mb-1">No Hidden Fees</h4>
              <p className="text-slate-600 text-xs font-normal">
                Our site surveys are completely free across Visakhapatnam, Bheemili, Vizianagaram, and Hyderabad.
              </p>
            </div>

            <Card className="bg-white border border-slate-200/90 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <h4 className="text-slate-950 font-bold text-sm mb-3">Prefer Immediate Assistance?</h4>
                <div className="space-y-3 text-sm">
                  <a 
                    href="tel:+919686511132"
                    className="flex items-center gap-3 text-slate-700 hover:text-[#01B3D1] font-semibold transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[#01B3D1]" />
                    <span>+91 96865 11132</span>
                  </a>
                  <a 
                    href="https://wa.me/919686511132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteVisitBooking;
