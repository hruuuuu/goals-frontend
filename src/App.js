import React, { useState, useEffect } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';

import routerList from './config/routerList';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {useRoutes(routerList)}
      <Footer />
    </>
  );
}

export default App;
