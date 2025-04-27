
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-deepblue text-white">
      {/* Decorative elements - abstract lyre shapes */}
      <div className="absolute top-1/4 right-[5%] w-20 h-40 border-r-2 border-gold/30 rounded-r-full"></div>
      <div className="absolute bottom-1/4 left-[5%] w-20 h-40 border-l-2 border-gold/30 rounded-l-full"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
            Where Stories <span className="text-gold">Sing</span>
          </h1>
          <div className="decorative-line"></div>
          <p className="text-lg md:text-xl mt-6 text-white/80 max-w-xl">
            Discover literary treasures inspired by the timeless traditions of Greek mythology, 
            poetry, and song at Orphaleia — your modern haven for ancient wisdom and contemporary tales.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="bg-gold text-deepblue hover:bg-gold/90">
              <Link to="/books">Explore Books</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="border-white/30 text-gold hover:bg-gold/10 hover:border-gold/50"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
