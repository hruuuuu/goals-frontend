import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import routerList from './config/routerList';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <Navbar />
      {useRoutes(routerList)}
      <Cart />
      <Footer />
    </>
  );
}

export default App;
