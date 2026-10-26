import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FCFCF7] pt-28 text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white">
      <SEO 
        title="Privacy Policy - Spacexio"
        description="Learn how Spacexio collects, uses, and safeguards your personal data."
        url="https://spacexio.com/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-slate-700 leading-relaxed font-normal">
          <section>
            <p className="text-sm text-slate-500 mb-6 font-mono">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <p className="mb-6">
              At SPACEXIO, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong className="text-slate-950">Contact Information:</strong> Name, email address, phone number</li>
              <li><strong className="text-slate-950">Project Details:</strong> Information you provide about your construction or design project</li>
              <li><strong className="text-slate-950">Newsletter Subscriptions:</strong> Email addresses for our newsletter</li>
              <li><strong className="text-slate-950">Referral Information:</strong> Referral codes and source information</li>
              <li><strong className="text-slate-950">Technical Data:</strong> IP address, browser type, device information, and usage data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>To provide and improve our construction and design services</li>
              <li>To communicate with you about your projects and inquiries</li>
              <li>To send you newsletters, updates, and marketing communications (with your consent)</li>
              <li>To process referrals and reward programs</li>
              <li>To analyze and improve our website functionality</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">3. Data Protection & Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Your data is stored securely in our database with encryption and access controls.
            </p>
            <p className="mb-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Service providers who assist in operating our website or conducting our business</li>
              <li>Professional advisors (lawyers, accountants, auditors)</li>
              <li>Law enforcement or regulatory authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">5. Contact Information</h2>
            <p className="mb-4">
              For any questions or requests regarding your personal data, please contact our team:
            </p>
            <div className="bg-white border border-slate-200/90 shadow-sm p-6 rounded-2xl">
              <p className="mb-2"><strong className="text-slate-950">SPACEXIO Privacy Office</strong></p>
              <p className="mb-2">Email: <a href="mailto:hellospacexio@gmail.com" className="text-[#01B3D1] hover:underline font-semibold">hellospacexio@gmail.com</a></p>
              <p className="mb-2">Phone: <a href="tel:+919686511132" className="text-[#01B3D1] hover:underline font-semibold">+91 96865 11132</a></p>
              <p>Address: Near Abid Nagar Road, Akkayyapalem, Visakhapatnam - 530016, Andhra Pradesh, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
