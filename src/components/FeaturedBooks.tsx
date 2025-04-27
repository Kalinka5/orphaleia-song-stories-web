
import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { featuredBooks } from '@/data/books';

const FeaturedBooks: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-playfair font-bold">Featured Books</h2>
          <div className="decorative-line mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore our handpicked selection of literary treasures that capture the essence of ancient wisdom and contemporary brilliance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/books" 
            className="inline-flex items-center gap-2 text-deepblue font-medium book-link"
          >
            View All Books
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
