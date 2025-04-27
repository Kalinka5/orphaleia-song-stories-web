
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Bookmark, Crown, Lyre } from 'lucide-react';

const categories = [
  {
    name: 'Greek Mythology',
    description: 'Ancient tales of gods, heroes, and extraordinary journeys',
    icon: Crown,
    slug: 'mythology'
  },
  {
    name: 'Poetry',
    description: 'Verses that capture the beauty and complexity of human experience',
    icon: Lyre,
    slug: 'poetry'
  },
  {
    name: 'Literary Fiction',
    description: 'Thought-provoking narratives exploring the depths of humanity',
    icon: Book,
    slug: 'fiction'
  },
  {
    name: 'Classics',
    description: 'Timeless works that have shaped literary tradition',
    icon: Bookmark,
    slug: 'classics'
  }
];

const BookCategories: React.FC = () => {
  return (
    <section className="py-16 bg-softgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-playfair font-bold">Explore Categories</h2>
          <div className="decorative-line mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Browse our curated collection of books across these special categories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.slug} 
                to={`/books?category=${category.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="bg-gold/20 text-deepblue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookCategories;
