
import React from 'react';
import Layout from '@/components/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Terms of Service</h1>
          <div className="decorative-line"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-playfair text-2xl mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Orphaleia's website for personal, non-commercial transitory viewing only.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">3. Account Terms</h2>
          <ul>
            <li>You must be 13 years or older to use this Service.</li>
            <li>You must provide a valid email address and any other required information.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>You are responsible for all activities that occur under your account.</li>
          </ul>

          <h2 className="font-playfair text-2xl mt-8 mb-4">4. Payment Terms</h2>
          <p>Full payment is required at the time of purchase. We accept major credit cards and other forms of electronic payment.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">5. Shipping & Returns</h2>
          <p>Please refer to our shipping and returns policy for detailed information about delivery times and return procedures.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">6. Disclaimer</h2>
          <p>The materials on Orphaleia's website are provided on an 'as is' basis. Orphaleia makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">7. Limitations</h2>
          <p>In no event shall Orphaleia or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Orphaleia's website.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">8. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p>Email: legal@orphaleia.com</p>
          <p>Address: [Your Business Address]</p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
