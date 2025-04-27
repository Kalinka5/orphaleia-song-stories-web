
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deepblue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Logo variant="footer" />
            <p className="mt-4 text-sm opacity-80 max-w-xs">
              Where stories sing and ancient tales echo through modern verse. Your destination for exceptional literature.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-playfair text-xl mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/books" className="opacity-80 hover:opacity-100 transition-opacity">Books</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-playfair text-xl mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/books?category=poetry" className="opacity-80 hover:opacity-100 transition-opacity">Poetry</Link></li>
              <li><Link to="/books?category=mythology" className="opacity-80 hover:opacity-100 transition-opacity">Mythology</Link></li>
              <li><Link to="/books?category=fiction" className="opacity-80 hover:opacity-100 transition-opacity">Literary Fiction</Link></li>
              <li><Link to="/books?category=classics" className="opacity-80 hover:opacity-100 transition-opacity">Classics</Link></li>
              <li><Link to="/books?category=philosophy" className="opacity-80 hover:opacity-100 transition-opacity">Philosophy</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-playfair text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <Mail size={16} />
                <span>contact@orphaleia.com</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-white/10 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button 
                  type="submit" 
                  className="bg-gold text-deepblue px-3 py-2 rounded-r-md text-sm hover:bg-opacity-90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/20 text-sm opacity-60 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Orphaleia. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex gap-4">
            <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
