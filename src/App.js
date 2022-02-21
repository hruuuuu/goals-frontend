import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { ShowContext } from './context/ProductDetail';
import { LoginContext } from './context/LoginStatus';

import routerList from './config/routerList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  const [login, setLogin] = useState(false);
  const [loginOption, setLoginOption] = useState({
    normal: false,
    google: false,
    facebook: false,
    line: false,
  });
  useEffect(() => {
    const checkStatus = localStorage.getItem('login');
    setLogin(checkStatus);
  }, []);
  return (
    <>
      <LoginContext.Provider
        value={{ login, setLogin, loginOption, setLoginOption }}
      >
        <ShowContext.Provider value={{ show, setShow }}>
          <Navbar />
          {useRoutes(routerList)}
          <Footer />
        </ShowContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
