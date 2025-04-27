
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';
import { Book } from '@/types/book';
import { Filter, Search, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Books: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get('category');

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromQuery || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title-asc');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const categories = ['all', 'mythology', 'poetry', 'fiction', 'classics', 'philosophy'];

  useEffect(() => {
    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setActiveCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    let result = [...books];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(book => book.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );
    }

    // Sort books
    switch (sortOption) {
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredBooks(result);
  }, [activeCategory, searchQuery, sortOption]);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Explore Our Books</h1>
          <div className="decorative-line"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={toggleFilter} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Filter size={16} /> {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className={`md:w-1/4 ${isFilterVisible ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-playfair font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search books..."
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 text-muted-foreground" size={18} />
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block px-3 py-2 text-sm w-full text-left rounded-md ${
                        activeCategory === category 
                          ? 'bg-gold/20 text-deepblue font-medium' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort */}
              <div>
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Book grid */}
          <div className="md:w-3/4">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-playfair mb-2">No books found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Books;
