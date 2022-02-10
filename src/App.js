import React, { useState, useEffect } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';

import routerList from './config/routerList';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      {useRoutes(routerList)}
      <Footer />
    </>
  );
}

export default App;
