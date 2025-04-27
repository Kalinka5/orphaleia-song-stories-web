
import React from 'react';
import { Link } from 'react-router-dom';
import { Lyre } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 ${variant === 'footer' ? 'text-white' : 'text-deepblue'}`}
    >
      <Lyre size={28} className="text-gold animate-float" />
      <span className="font-playfair text-2xl font-semibold tracking-tight">Orphaleia</span>
    </Link>
  );
};

export default Logo;
