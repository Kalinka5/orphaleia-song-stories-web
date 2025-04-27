
import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Privacy Policy</h1>
          <div className="decorative-line"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-playfair text-2xl mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Order history</li>
          </ul>

          <h2 className="font-playfair text-2xl mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your orders</li>
            <li>Send you order confirmations</li>
            <li>Provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>

          <h2 className="font-playfair text-2xl mt-8 mb-4">3. Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="font-playfair text-2xl mt-8 mb-4">4. Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information.</p>

          <h2 className="font-playfair text-2xl mt-8 mb-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>

          <h2 className="font-playfair text-2xl mt-8 mb-4">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@orphaleia.com</p>
          <p>Address: [Your Business Address]</p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
