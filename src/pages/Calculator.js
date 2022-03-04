import React from 'react';
import PageBanner from '../components/PageBanner';
import MainContent from '../components/Calculator/MainContent';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';

const Caculator = () => {
  return (
    <>
      <FloatingChat />
      <PageBanner />
      <MainContent />
      <ScrollButton />
    </>
  );
};

export default Caculator;
