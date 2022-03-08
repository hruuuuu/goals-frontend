import React from 'react';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import BlogItem from '../components/Blog/BlogItem';
import BlogPagination from '../components/Blog/BlogPagination';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';

import picBanner from '../img/page_banner/calculator.webp';

const Blog = () => {
  return (
    <>
      <PageBanner img={picBanner} />
      <Header />
      <div className="u-margin u-margin--page-bottom">
        <div className="container">
          <BlogItem />
        </div>
      </div>
      <FloatingChat />
      <ScrollButton />
    </>
  );
};

export default Blog;
