import React, { useState, useEffect } from 'react';
import { Router, Route, useRoutes } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from './utils/config';
import { ShowContext } from './context/showProductDetail';
import { ProductsContext } from './context/products';
import { CategoryContext } from './context/products';
import { CartListContext } from './context/cart';

import routerList from './config/routerList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  const [productsData, setProductsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [cartListData, setCartListData] = useState([]);

  useEffect(() => {
    //api/product
    (async () => {
      try {
        const productResponse = await axios.get(`${API_URL}/product`, {
          withCredentials: true,
        });
        const products = productResponse.data;
        setProductsData([...productsData, ...products]);

        //api/product/category
        const categoryResponse = await axios.get(
          `${API_URL}/product/category`,
          {
            withCredentials: true,
          }
        );
        const categories = categoryResponse.data;
        setCategoryData([...categoryData, ...categories]);

        //初始化localStorage購物車
        const cartList = JSON.parse(localStorage.getItem('cartList'));
        setCartListData([...cartListData, ...cartList]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <CartListContext.Provider value={{ cartListData, setCartListData }}>
        <ProductsContext.Provider value={{ productsData, setProductsData }}>
          <CategoryContext.Provider value={{ categoryData, setCategoryData }}>
            <ShowContext.Provider value={{ show, setShow }}>
              <Navbar />
              {useRoutes(routerList)}
              <Footer />
            </ShowContext.Provider>
          </CategoryContext.Provider>
        </ProductsContext.Provider>
      </CartListContext.Provider>
    </>
  );
}

export default App;
