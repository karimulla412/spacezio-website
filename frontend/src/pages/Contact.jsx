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
    <div className="min-h-screen bg-black pt-24 text-white">
      <SEO 
        title="Contact Us - Start Your Home Construction Project"
        description="Get in touch with Spacexio for home construction, architectural design, and 3D elevation in Visakhapatnam. Call +91 96865 11132 or visit our Akkayyapalem office."
        keywords="contact Spacexio, construction company Visakhapatnam phone number, architecture office Vizag, Akkayyapalem builders"
        url="https://spacexio.com/contact"
      />
      {/* Hero Lead Generation Section */}
      <section className="py-16 md:py-24 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  Direct Studio Inquiry // Visakhapatnam
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Start Your Project with <span className="text-orange-500">SPACEXIO</span>
                </h1>
                <p className="text-xl text-gray-400">
                  Smart, BIM-driven solutions to design and build efficiently.
                </p>
              </div>

              <div className="space-y-5 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">BIM-driven planning & 3D clash coordination</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">Cost-efficient & optimized construction solutions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">Faster, accurate milestone-based execution</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg">Transparent collaboration & 10-year warranty</p>
                </div>
              </div>
            </div>

            {/* Right Side - Premium Dark Form */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-orange-400">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 h-12 rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number <span className="text-orange-400">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 h-12 rounded-lg"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email <span className="text-orange-400">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 h-12 rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type <span className="text-orange-400">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors h-12"
                  >
                    <option value="" className="bg-gray-900">Select project type</option>
                    <option value="New Home Construction" className="bg-gray-900">New Home Construction</option>
                    <option value="Renovation" className="bg-gray-900">Renovation</option>
                    <option value="Interior Design" className="bg-gray-900">Interior Design</option>
                    <option value="Architecture Planning" className="bg-gray-900">Architecture Planning</option>
                    <option value="BIM Services" className="bg-gray-900">BIM Services</option>
                    <option value="Other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message <span className="text-gray-500">(Optional)</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 resize-none rounded-lg"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div>
                  <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us? <span className="text-gray-500">(Optional)</span>
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors h-12"
                  >
                    <option value="" className="bg-gray-900">Select an option</option>
                    <option value="Google Search" className="bg-gray-900">Google Search</option>
                    <option value="Social Media" className="bg-gray-900">Social Media (Facebook, Instagram)</option>
                    <option value="Friend/Family Referral" className="bg-gray-900">Friend or Family Referral</option>
                    <option value="Advertisement" className="bg-gray-900">Advertisement</option>
                    <option value="Website" className="bg-gray-900">Direct Website Visit</option>
                    <option value="Other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="referralCode" className="block text-sm font-medium text-gray-300 mb-2">
                    Referral Code <span className="text-gray-500">(Optional)</span>
                  </label>
                  <Input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 h-12 rounded-lg"
                    placeholder="Enter referral code if you have one"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Have a referral code? Enter it to get special benefits
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Submitting...' : 'Start Your Project'}
                </Button>

                <p className="text-sm text-gray-400 text-center">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-600/10 border border-orange-500/20 rounded-lg">
                    <MapPin className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Office Address</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Near Abid Nagar Road,<br />
                      Abidnagar Park, Akkayyapalem,<br />
                      Visakhapatnam - 530016,<br />
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-600/10 border border-orange-500/20 rounded-lg">
                    <Phone className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Phone</h3>
                    <a
                      href="tel:+919686511132"
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      +91 96865 11132
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-600/10 border border-orange-500/20 rounded-lg">
                    <Mail className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:hellospacexio@gmail.com"
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      hellospacexio@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Hours */}
          <div className="mt-12 text-center bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-xl mb-4">Business Hours</h3>
            <div className="text-gray-400 space-y-2">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prefer to Talk Directly?
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Call us now for immediate assistance
          </p>
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-900 border border-orange-400 px-8 py-6 text-lg font-semibold shadow-xl"
            onClick={() => window.location.href = 'tel:+919686511132'}
          >
            Call +91 96865 11132
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
