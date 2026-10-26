import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <SEO 
        title="Privacy Policy - Spacexio"
        description="Learn how Spacexio collects, uses, and safeguards your personal data."
        url="https://spacexio.com/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p className="text-sm text-gray-500 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <p className="mb-6">
              At SPACEXIO, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number</li>
              <li><strong className="text-white">Project Details:</strong> Information you provide about your construction or design project</li>
              <li><strong className="text-white">Newsletter Subscriptions:</strong> Email addresses for our newsletter</li>
              <li><strong className="text-white">Referral Information:</strong> Referral codes and source information</li>
              <li><strong className="text-white">Technical Data:</strong> IP address, browser type, device information, and usage data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>To provide and improve our construction and design services</li>
              <li>To communicate with you about your projects and inquiries</li>
              <li>To send you newsletters, updates, and marketing communications (with your consent)</li>
              <li>To process referrals and reward programs</li>
              <li>To analyze and improve our website functionality</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Protection & Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Your data is stored securely in our database with encryption and access controls.
            </p>
            <p className="mb-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>With service providers who assist us in operating our business (e.g., email service providers)</li>
              <li>When required by law or to protect our legal rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies & Tracking</h2>
            <p className="mb-4">
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Newsletter Subscriptions</h2>
            <p className="mb-4">
              When you subscribe to our newsletter, we collect your email address to send you updates about design trends, project insights, and our services. You can unsubscribe at any time using the link in our emails.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
            <p className="mb-4">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
            </p>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 rounded-xl">
              <p className="mb-2"><strong className="text-white">SPACEXIO</strong></p>
              <p className="mb-2">Email: <a href="mailto:hellospacexio@gmail.com" className="text-[#01B3D1] hover:underline">hellospacexio@gmail.com</a></p>
              <p className="mb-2">Phone: <a href="tel:+919686511132" className="text-[#01B3D1] hover:underline">+91 96865 11132</a></p>
              <p>Address: Near Abid Nagar Road, Akkayyapalem, Visakhapatnam - 530016, Andhra Pradesh, India</p>
            </div>
          </section>

          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500 italic">
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
