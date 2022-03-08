import React from 'react';
import PageBanner from '../components/PageBanner';
import MainContent from '../components/Calculator/MainContent';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';

import picBanner from '../img/page_banner/calculator.webp';

const Caculator = () => {
  return (
    <>
      <FloatingChat />
      <PageBanner img={picBanner} />
      <MainContent />
      <ScrollButton />
    </>
  );
};

export default Caculator;
