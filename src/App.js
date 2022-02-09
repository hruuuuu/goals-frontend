import React, { useState, useEffect } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';

import routerList from './config/routerList';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {useRoutes(routerList)}
    </>
  );
}

export default App;
