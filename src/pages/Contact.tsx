
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll respond shortly.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Contact Us</h1>
          <div className="decorative-line"></div>
          <p className="mt-4 max-w-2xl">
            Have questions about a book, order, or anything else? We'd love to hear from you. 
            Fill out the form below, and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-playfair font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Please select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Return/Refund">Return/Refund</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-gold"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Sending...
                  </>
                ) : 'Send Message'}
              </Button>
            </form>
          </div>
          
          <div className="bg-softgray rounded-lg p-6">
            <h2 className="text-2xl font-playfair font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="mr-4 text-deepblue" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@orphaleia.com</p>
                  <p className="text-muted-foreground">support@orphaleia.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="mr-4 text-deepblue" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="mr-4 text-deepblue" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 Literary Lane<br />
                    Bookville, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Placeholder social media icons */}
                <div className="w-10 h-10 rounded-full bg-deepblue/10 flex items-center justify-center hover:bg-deepblue/20 transition-colors">
                  <span className="text-deepblue">f</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-deepblue/10 flex items-center justify-center hover:bg-deepblue/20 transition-colors">
                  <span className="text-deepblue">t</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-deepblue/10 flex items-center justify-center hover:bg-deepblue/20 transition-colors">
                  <span className="text-deepblue">in</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-deepblue/10 flex items-center justify-center hover:bg-deepblue/20 transition-colors">
                  <span className="text-deepblue">ig</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
