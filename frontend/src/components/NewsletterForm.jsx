import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '../config/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/newsletter/subscribe`, {
        email,
        source: 'website',
        subscribedAt: new Date().toISOString()
      });
      
      if (response.status === 200) {
        toast.success("Thank you for subscribing to Spacexio. You'll receive updates on design trends, project insights, and solutions.");
        setEmail(''); // Reset form
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      if (error.response?.status === 409) {
        toast.error('This email is already subscribed');
      } else {
        toast.error('Failed to subscribe. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F35A61] transition-colors disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#F35A61] hover:bg-[#E04850] text-white font-semibold px-6 shadow-md shadow-[#F35A61]/25 disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      <p className="text-gray-500 text-xs">
        🔒 We respect your privacy. No spam.
      </p>
    </form>
  );
};

export default NewsletterForm;
