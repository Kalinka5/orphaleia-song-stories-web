
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, FileText, ShieldCheck } from 'lucide-react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: <ShieldCheck className="text-gold" />,
      content: (
        <p className="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
      )
    },
    {
      id: 'license',
      title: '2. Use License',
      icon: <FileText className="text-gold" />,
      content: (
        <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on Orphaleia's website for personal, non-commercial transitory viewing only.</p>
      )
    },
    {
      id: 'account',
      title: '3. Account Terms',
      icon: <Info className="text-gold" />,
      content: (
        <>
          <p className="mb-4">When using our services:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>You must be 13 years or older to use this Service.</li>
            <li>You must provide a valid email address and any other required information.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>You are responsible for all activities that occur under your account.</li>
          </ul>
        </>
      )
    },
    {
      id: 'payment',
      title: '4. Payment Terms',
      icon: <FileText className="text-gold" />,
      content: (
        <p className="mb-4">Full payment is required at the time of purchase. We accept major credit cards and other forms of electronic payment.</p>
      )
    },
    {
      id: 'shipping',
      title: '5. Shipping & Returns',
      icon: <FileText className="text-gold" />,
      content: (
        <p className="mb-4">Please refer to our shipping and returns policy for detailed information about delivery times and return procedures.</p>
      )
    },
    {
      id: 'disclaimer',
      title: '6. Disclaimer',
      icon: <Info className="text-gold" />,
      content: (
        <p className="mb-4">The materials on Orphaleia's website are provided on an 'as is' basis. Orphaleia makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      )
    },
    {
      id: 'limitations',
      title: '7. Limitations',
      icon: <ShieldCheck className="text-gold" />,
      content: (
        <p className="mb-4">In no event shall Orphaleia or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Orphaleia's website.</p>
      )
    },
    {
      id: 'contact',
      title: '8. Contact Information',
      icon: <FileText className="text-gold" />,
      content: (
        <>
          <p className="mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
          <p className="mb-2">Email: legal@orphaleia.com</p>
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
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-center">Terms of Service</h1>
          <div className="flex justify-center my-4">
            <div className="decorative-line bg-gold w-32"></div>
          </div>
          <p className="text-center text-lg max-w-2xl mx-auto mt-6 text-gray-300">
            Please read these terms carefully before using our services.
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

export default TermsOfService;
