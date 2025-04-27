
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedBooks from '@/components/FeaturedBooks';
import BookCategories from '@/components/BookCategories';
import Newsletter from '@/components/Newsletter';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedBooks />
      <BookCategories />
      <Newsletter />
    </Layout>
  );
};

export default Index;
