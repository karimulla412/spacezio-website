import React, { useState } from 'react';
import { X, Download, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '../config/api';

const LeadMagnet = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/api/lead-magnet`, {
        ...formData,
        source: 'lead_magnet_popup'
      });

      setIsSuccess(true);
      toast.success('Success! Check your email for the guide.');

      // Reset after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 3000);
    } catch (error) {
      console.error('Lead magnet submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {!isSuccess ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FDF2F3] border border-[#FCA5A9]/50 rounded-full mb-4">
                <Download className="h-8 w-8 text-[#F35A61]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Free Construction Planning Guide
              </h3>
              <p className="text-gray-600">
                Get our comprehensive guide covering costs, timelines, BIM benefits, and quality checks.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F35A61]/20 focus:border-[#F35A61]"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F35A61]/20 focus:border-[#F35A61]"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F35A61]/20 focus:border-[#F35A61]"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F35A61] hover:bg-[#E04850] text-white py-6 text-lg font-semibold rounded-lg shadow-lg shadow-[#F35A61]/25 transition-all"
              >
                {isLoading ? 'Sending...' : 'Download Free Guide'}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Check Your Email!
            </h3>
            <p className="text-gray-600 mb-4">
              We've sent the guide to <strong>{formData.email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              If you don't see it, check your spam folder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnet;
