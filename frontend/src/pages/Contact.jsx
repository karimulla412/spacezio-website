import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';
import SEO from '../components/SEO';
import { API_URL } from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    referralCode: '',
    hearAboutUs: ''
  });

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
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      
      if (response.status === 200) {
        toast.success('Thank you! We will get back to you within 24 hours.');
        
        // Send WhatsApp notification with lead details
        const whatsappMessage = `🔔 New Lead from SPACEXIO Website!\n\n` +
          `📋 Name: ${formData.name}\n` +
          `📞 Phone: ${formData.phone}\n` +
          `📧 Email: ${formData.email}\n` +
          `🏗️ Project Type: ${formData.service}\n` +
          `💬 Message: ${formData.message || 'No message provided'}\n\n` +
          `⏰ Time: ${new Date().toLocaleString()}`;
        
        const whatsappUrl = `https://wa.me/919686511132?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in new tab after 2 seconds
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 2000);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          referralCode: '',
          hearAboutUs: ''
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to submit form. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCF7] pt-24 text-slate-900">
      <SEO 
        title="Contact Us - Start Your Home Construction Project"
        description="Get in touch with Spacexio for home construction, architectural design, and 3D elevation in Visakhapatnam. Call +91 96865 11132 or visit our Akkayyapalem office."
        keywords="contact Spacexio, construction company Visakhapatnam phone number, architecture office Vizag, Akkayyapalem builders"
        url="https://spacexio.com/contact"
      />
      {/* Hero Lead Generation Section */}
      <section className="py-16 md:py-24 bg-[#FCFCF7] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  Direct Studio Inquiry // Visakhapatnam
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-4 leading-tight">
                  Start Your Project with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1]">SPACEXIO</span>
                </h1>
                <p className="text-xl text-slate-600 font-light">
                  Smart, BIM-driven solutions to design and build efficiently.
                </p>
              </div>

              <div className="space-y-5 text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-[#F35A61] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">BIM-driven planning & 3D clash coordination</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-[#01B3D1] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">Cost-efficient & optimized construction solutions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-[#F35A61] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">Faster, accurate milestone-based execution</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-[#01B3D1] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">Transparent collaboration & 10-year warranty</p>
                </div>
              </div>
            </div>

            {/* Right Side - Classic Form */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name <span className="text-[#F35A61]">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#F35A61] focus:bg-white h-12 rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number <span className="text-[#F35A61]">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#F35A61] focus:bg-white h-12 rounded-lg"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email <span className="text-[#F35A61]">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#F35A61] focus:bg-white h-12 rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Type <span className="text-[#F35A61]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#F35A61] focus:bg-white focus:ring-2 focus:ring-[#F35A61]/20 transition-colors h-12"
                  >
                    <option value="">Select project type</option>
                    <option value="New Home Construction">New Home Construction</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Architecture Planning">Architecture Planning</option>
                    <option value="BIM Services">BIM Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-slate-400">(Optional)</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#F35A61] focus:bg-white resize-none rounded-lg"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div>
                  <label htmlFor="hearAboutUs" className="block text-sm font-medium text-slate-700 mb-2">
                    How did you hear about us? <span className="text-slate-400">(Optional)</span>
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#F35A61] focus:bg-white focus:ring-2 focus:ring-[#F35A61]/20 transition-colors h-12"
                  >
                    <option value="">Select an option</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media">Social Media (Facebook, Instagram)</option>
                    <option value="Friend/Family Referral">Friend or Family Referral</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Website">Direct Website Visit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="referralCode" className="block text-sm font-medium text-slate-700 mb-2">
                    Referral Code <span className="text-slate-400">(Optional)</span>
                  </label>
                  <Input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#F35A61] focus:bg-white h-12 rounded-lg"
                    placeholder="Enter referral code if you have one"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Have a referral code? Enter it to get special benefits
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#F35A61] to-[#E04850] hover:brightness-105 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#F35A61]/25"
                >
                  {isSubmitting ? 'Submitting...' : 'Start Your Project'}
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-[#F6F5EF] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-slate-200 hover:border-[#F35A61]/40 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#FDF2F3] border border-[#FCA5A9]/50 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#F35A61]" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold mb-2">Office Address</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Near Abid Nagar Road,<br />
                      Abidnagar Park, Akkayyapalem,<br />
                      Visakhapatnam - 530016,<br />
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 hover:border-[#01B3D1]/40 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#EFFBFC] border border-[#99E7EF]/50 rounded-lg">
                    <Phone className="h-6 w-6 text-[#01B3D1]" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold mb-2">Phone</h3>
                    <a
                      href="tel:+919686511132"
                      className="text-slate-600 hover:text-[#01B3D1] transition-colors font-medium"
                    >
                      +91 96865 11132
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 hover:border-[#F35A61]/40 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#FDF2F3] border border-[#FCA5A9]/50 rounded-lg">
                    <Mail className="h-6 w-6 text-[#F35A61]" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:hellospacexio@gmail.com"
                      className="text-slate-600 hover:text-[#F35A61] transition-colors font-medium"
                    >
                      hellospacexio@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Hours */}
          <div className="mt-12 text-center bg-white border border-slate-200 shadow-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-slate-900 font-bold text-xl mb-4">Business Hours</h3>
            <div className="text-slate-600 space-y-2">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] shadow-xl">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prefer to Talk Directly?
          </h2>
          <p className="text-lg text-white/90 mb-8 font-light">
            Call us now for immediate assistance with your architectural & construction needs.
          </p>
          <Button
            size="lg"
            className="bg-white text-slate-950 hover:bg-slate-100 px-8 py-6 text-lg font-bold shadow-2xl transition-all hover:scale-105"
            onClick={() => window.location.href = 'tel:+919686511132'}
          >
            Call +91 96865 11132
            <ArrowRight className="ml-2 h-5 w-5 text-[#F35A61]" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
