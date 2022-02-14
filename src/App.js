import React, { useState, useEffect } from 'react';
import { Router, Route, useRoutes } from 'react-router-dom';

import { ShowContext } from './context/ProductDetail';

import routerList from './config/routerList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  return (
    <>
      <ShowContext.Provider value={{ show, setShow }}>
        <Navbar />
        {useRoutes(routerList)}
        <Footer />
      </ShowContext.Provider>
    </>
  );
}

export default App;
