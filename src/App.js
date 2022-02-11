import React, { useState, useEffect } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import routerList from './config/routerList';

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
