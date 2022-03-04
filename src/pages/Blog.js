import React from 'react';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import BlogItem from '../components/Blog/BlogItem';
import BlogPagination from '../components/Blog/BlogPagination';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';

const Blog = () => {
  return (
    <>
      <PageBanner />
      <Header />
      <div className="container">
        <BlogItem />
      </div>
      <FloatingChat />
      <ScrollButton />
    </>
  );
};

export default Blog;
