import React from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#FCFCF7] pt-28 text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white">
      <SEO 
        title="Terms of Service - Spacexio"
        description="Review Spacexio's terms of service, construction agreements, milestone policies, and customer guidelines."
        url="https://spacexio.com/terms-of-service"
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-8 tracking-tight">Terms of Service</h1>
        
        <div className="space-y-8 text-slate-700 leading-relaxed font-normal">
          <section>
            <p className="text-sm text-slate-500 mb-6 font-mono">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <p className="mb-6">
              Welcome to SPACEXIO. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using spacexio.com or engaging with our services, you accept and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">2. Services Offered</h2>
            <p className="mb-4">SPACEXIO provides:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Architecture and structural design services</li>
              <li>Interior design and space planning</li>
              <li>Construction and project management</li>
              <li>BIM (Building Information Modeling) services</li>
              <li>Consultation and advisory services</li>
            </ul>
            <p className="mt-4">
              Specific terms for each service will be outlined in individual service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">3. User Obligations</h2>
            <p className="mb-4">As a user of our website and services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Provide accurate and truthful information</li>
              <li>Use the website and services only for lawful purposes</li>
              <li>Not attempt to disrupt or interfere with the website's functionality</li>
              <li>Respect intellectual property rights</li>
              <li>Maintain confidentiality of any sensitive project information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">4. Service Limitations</h2>
            <p className="mb-4">
              While we strive to provide high-quality services, we make no guarantees regarding:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Project completion timelines (estimates are provided in good faith)</li>
              <li>Specific outcomes or results</li>
              <li>Third-party approvals (e.g., municipal permits, regulatory compliance)</li>
              <li>Uninterrupted access to our website or services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">5. Pricing & Payment</h2>
            <p className="mb-4">
              Pricing for our services is provided on a project-by-project basis. Payment terms will be outlined in individual service agreements. We reserve the right to modify our pricing at any time.
            </p>
            <p className="mb-4">
              Fixed-price packages are subject to the specific terms and conditions outlined in the package agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of SPACEXIO or its content suppliers and is protected by copyright and trademark laws.
            </p>
            <p className="mb-4">
              Design work, drawings, and BIM models created as part of our services remain our intellectual property until full payment is received, unless otherwise specified in a service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">7. Referral Program</h2>
            <p className="mb-4">
              Our referral program is subject to specific terms and conditions. Referral rewards are paid only after successful project milestone completion. SPACEXIO reserves the right to modify or terminate the referral program at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, SPACEXIO shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Loss of profits or revenue</li>
              <li>Loss of data or information</li>
              <li>Business interruption</li>
              <li>Delays caused by third parties or unforeseen circumstances</li>
            </ul>
            <p className="mt-4">
              Our total liability for any claim arising from our services shall not exceed the amount paid by the client for those specific services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">9. Warranty Disclaimer</h2>
            <p className="mb-4">
              Our website and services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our website will be error-free, secure, or available at all times.
            </p>
            <p className="mb-4">
              Structural warranties are provided separately as part of construction service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">10. Termination</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your access to our website and services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Visakhapatnam, Andhra Pradesh, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a new "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">13. Contact Information</h2>
            <p className="mb-4">
              For questions or concerns regarding these Terms of Service, please contact us:
            </p>
            <div className="bg-white border border-slate-200/90 shadow-sm p-6 rounded-2xl">
              <p className="mb-2"><strong className="text-slate-950">SPACEXIO</strong></p>
              <p className="mb-2">Email: <a href="mailto:hellospacexio@gmail.com" className="text-[#01B3D1] hover:underline font-semibold">hellospacexio@gmail.com</a></p>
              <p className="mb-2">Phone: <a href="tel:+919686511132" className="text-[#01B3D1] hover:underline font-semibold">+91 96865 11132</a></p>
              <p>Address: Near Abid Nagar Road, Akkayyapalem, Visakhapatnam - 530016, Andhra Pradesh, India</p>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 italic">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
