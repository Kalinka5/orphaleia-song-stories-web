
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

const Newsletter: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual newsletter signup
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail('');
  };

  return (
    <section className="py-16 bg-deepblue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold">Stay Inspired</h2>
          <div className="decorative-line mx-auto bg-gold"></div>
          <p className="mt-4 text-white/80">
            Subscribe to our newsletter and be the first to know about new books, 
            author interviews, and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gold text-deepblue px-6 py-3 rounded-md font-medium hover:bg-gold/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs mt-4 text-white/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
