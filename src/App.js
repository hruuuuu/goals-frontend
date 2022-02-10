import React, { useState, useEffect } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';

import routerList from './config/routerList';

function App() {
  return (
    <>
      <Navbar />
      {useRoutes(routerList)}
      <Cart />
    </>
  );
}

export default App;
