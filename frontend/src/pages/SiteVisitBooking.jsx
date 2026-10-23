import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, Phone, Mail, Home, Check, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import SEO from '../components/SEO';
import { API_URL } from '../config/api';

const SiteVisitBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotLocation: '',
    plotSize: '',
    packageInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== '')
      );
      const response = await axios.post(`${API_URL}/api/site-visit`, cleanedData);
      
      if (response.status === 200 || response.data) {
        setSubmitted(true);
        toast.success('Site visit booked successfully! Our team will call you within 2 hours.');

        // Send WhatsApp notification
        const message = `New Site Visit Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nLocation: ${formData.plotLocation}\nPackage: ${formData.packageInterest}`;
        const whatsappUrl = `https://wa.me/919686511132?text=${encodeURIComponent(message)}`;
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 2000);
      }
    } catch (error) {
      console.error('Site visit booking error:', error);
      toast.error('Failed to book site visit. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center text-white">
        <SEO 
          title="Site Visit Confirmed - Spacexio"
          description="Your free site visit in Visakhapatnam is confirmed. An expert civil engineer will inspect your plot."
        />
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl max-w-xl mx-6 rounded-2xl overflow-hidden">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Site Visit Booked Successfully!
            </h2>
            <p className="text-gray-400 mb-8 font-light text-base">
              Our technical engineering team will call you within 2 hours to confirm your site location and schedule.
            </p>
            <div className="space-y-3 text-left bg-gray-800/80 border border-gray-700 p-6 rounded-xl mb-8 text-sm">
              <p className="text-white font-bold mb-2">What happens next:</p>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Senior Civil Engineer calls to confirm inspection timing</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Free physical site survey and plot boundary verification</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Receive accurate BOQ quotation tailored to your plot</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => window.location.href = '/cost-calculator'}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 py-3 px-6 rounded-lg"
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
    <div className="min-h-screen bg-black pt-28 pb-20 text-white">
      <SEO 
        title="Book Free Site Visit & Plot Survey in Visakhapatnam"
        description="Book a complimentary plot inspection with Spacexio's licensed civil engineers in Visakhapatnam. Get soil suitability analysis, contour check, and customized quotation."
        keywords="site visit Visakhapatnam, free plot survey Vizag, civil engineer site inspection Andhra Pradesh, house construction consultation"
        url="https://spacexio.com/site-visit"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="h-4 w-4" />
            Zero-Cost In-Person Consultation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Book Free Site Visit
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Our licensed civil engineer will inspect your plot, evaluate road access and soil conditions, and outline your project feasibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Booking Form */}
          <div className="lg:col-span-8">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div>
                    <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-700">
                      1. Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300 font-medium mb-1.5 block text-xs">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-11 rounded-lg focus:border-orange-500"
                          placeholder="e.g. Ramesh Varma"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-300 font-medium mb-1.5 block text-xs">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-11 rounded-lg focus:border-orange-500"
                          placeholder="+91 98480 12345"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-300 font-medium mb-1.5 block text-xs">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-11 rounded-lg focus:border-orange-500"
                          placeholder="ramesh@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="plotSize" className="text-gray-300 font-medium mb-1.5 block text-xs">
                          Plot Size (sq.yds or sq.ft)
                        </Label>
                        <Input
                          id="plotSize"
                          name="plotSize"
                          type="text"
                          value={formData.plotSize}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-11 rounded-lg focus:border-orange-500"
                          placeholder="e.g. 200 sq.yds"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plot Details */}
                  <div>
                    <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-700">
                      2. Plot Location & Package
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="plotLocation" className="text-gray-300 font-medium mb-1.5 block text-xs">
                          Plot Location & Landmarks *
                        </Label>
                        <Input
                          id="plotLocation"
                          name="plotLocation"
                          type="text"
                          required
                          value={formData.plotLocation}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-11 rounded-lg focus:border-orange-500"
                          placeholder="e.g. Madhurawada Near Law College, Visakhapatnam"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="packageInterest" className="text-gray-300 font-medium mb-1.5 block text-xs">
                            Interested Package
                          </Label>
                          <Select 
                            value={formData.packageInterest} 
                            onValueChange={(value) => setFormData({ ...formData, packageInterest: value })}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 rounded-lg focus:ring-2 focus:ring-orange-500">
                              <SelectValue placeholder="Select package" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white shadow-xl">
                              <SelectItem value="Essential (₹1,850/sqft)" className="hover:bg-gray-800">Essential (₹1,850/sqft)</SelectItem>
                              <SelectItem value="Premium (₹2,150/sqft)" className="hover:bg-gray-800">Premium (₹2,150/sqft)</SelectItem>
                              <SelectItem value="Luxury (₹2,650/sqft)" className="hover:bg-gray-800">Luxury (₹2,650/sqft)</SelectItem>
                              <SelectItem value="Undecided" className="hover:bg-gray-800">Undecided / Need Guidance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="preferredDate" className="text-gray-300 font-medium mb-1.5 block text-xs">
                            Preferred Date
                          </Label>
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-700 text-white h-11 rounded-lg focus:border-orange-500"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-300 font-medium mb-1.5 block text-xs">
                          Special Requirements or Notes
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 resize-none rounded-lg text-sm focus:border-orange-500"
                          placeholder="Any specific architectural desires, budget constraints, or timeline?"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white h-13 text-base font-semibold rounded-lg shadow-md shadow-orange-600/20 transition-all duration-200"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Free Site Visit'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-gray-400 text-center font-light">
                    🔒 Your contact details are 100% confidential. No spam or aggressive sales calls.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-gray-700">
                  What to Expect on Your Visit
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: User,
                      title: 'Senior Civil Engineer',
                      desc: 'Direct consultation with an experienced engineering professional.'
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
                      title: 'Written Estimate & Plan',
                      desc: 'Receive tailored budget estimates without obligation.'
                    }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-2 bg-orange-600/10 border border-orange-500/20 rounded-lg text-orange-400 flex-shrink-0">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-xs">{item.title}</p>
                          <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-500/30 rounded-2xl p-6 text-center shadow-lg">
              <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
                100% Complimentary
              </span>
              <h4 className="text-white font-bold text-sm mb-1">No Hidden Fees</h4>
              <p className="text-gray-400 text-xs font-light">
                Our site visits are completely free across Visakhapatnam, Bheemili, and Vizianagaram.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h4 className="text-white font-bold text-sm mb-3">Prefer Immediate Assistance?</h4>
                <div className="space-y-3 text-sm">
                  <a 
                    href="tel:+919686511132"
                    className="flex items-center gap-3 text-gray-300 hover:text-orange-400 font-medium transition-colors"
                  >
                    <Phone className="h-4 w-4 text-orange-400" />
                    <span>+91 96865 11132</span>
                  </a>
                  <a 
                    href="https://wa.me/919686511132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-green-400 hover:text-green-300 font-medium transition-colors"
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
