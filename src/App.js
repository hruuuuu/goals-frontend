import React, { useState, useEffect } from 'react';
import { Router, Route, useRoutes } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from './utils/config';
import { ShowContext } from './context/showProductDetail';
import { ProductsContext } from './context/products';

import routerList from './config/routerList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    //api/product
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/product`, {
          withCredentials: true,
        });
        setProductsData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <ProductsContext.Provider value={{ productsData, setProductsData }}>
        <ShowContext.Provider value={{ show, setShow }}>
          <Navbar />
          {useRoutes(routerList)}
          <Footer />
        </ShowContext.Provider>
      </ProductsContext.Provider>
    </>
  );
}

export default App;
