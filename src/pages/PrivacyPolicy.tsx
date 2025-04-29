
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, FileText, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'information',
      title: '1. Information We Collect',
      icon: <Info className="text-gold" />,
      content: (
        <>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Order history</li>
          </ul>
        </>
      )
    },
    {
      id: 'usage',
      title: '2. How We Use Your Information',
      icon: <FileText className="text-gold" />,
      content: (
        <>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Process your orders</li>
            <li>Send you order confirmations</li>
            <li>Provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>
        </>
      )
    },
    {
      id: 'sharing',
      title: '3. Information Sharing',
      icon: <FileText className="text-gold" />,
      content: (
        <>
          <p className="mb-4">We do not sell or rent your personal information to third parties. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </>
      )
    },
    {
      id: 'security',
      title: '4. Security',
      icon: <ShieldCheck className="text-gold" />,
      content: (
        <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information.</p>
      )
    },
    {
      id: 'rights',
      title: '5. Your Rights',
      icon: <FileText className="text-gold" />,
      content: (
        <>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
        </>
      )
    },
    {
      id: 'contact',
      title: '6. Contact Us',
      icon: <FileText className="text-gold" />,
      content: (
        <>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mb-2">Email: privacy@orphaleia.com</p>
          <p>Address: 1234 Literary Lane, Bookville, BK 12345</p>
        </>
      )
    },
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-center">Privacy Policy</h1>
          <div className="flex justify-center my-4">
            <div className="decorative-line bg-gold w-32"></div>
          </div>
          <p className="text-center text-lg max-w-2xl mx-auto mt-6 text-gray-300">
            Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-4 mb-12">
          {sections.map((section) => (
            <Card 
              key={section.id} 
              className={`overflow-hidden transition-all duration-300 border-l-4 ${activeSection === section.id ? 'border-l-gold shadow-lg' : 'border-l-transparent'}`}
            >
              <div 
                className={`p-4 flex items-center justify-between cursor-pointer ${activeSection === section.id ? 'bg-softgray' : 'hover:bg-gray-50'}`}
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="font-playfair text-lg md:text-xl font-medium">{section.title}</h2>
                </div>
                <div className={`transform transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>
              <CardContent className={`px-4 overflow-hidden transition-all duration-300 ${activeSection === section.id ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
                <div className="pl-8 border-l border-gray-200">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="border-gold text-deepblue hover:bg-gold hover:text-deepblue transition-all duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
