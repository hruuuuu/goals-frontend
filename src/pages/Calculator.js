import React from 'react';
import PageBanner from '../components/PageBanner';
import MainContent from '../components/Calculator/MainContent';
import FloatingChat from '../components/FloatingChat';

const Caculator = () => {
  return (
    <>
      <FloatingChat />
      <PageBanner />
      <MainContent />
    </>
  );
};

export default Caculator;
