import React, { useState, useEffect } from 'react';
import { Router, Route, useRoutes } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from './utils/config';
import { ShowContext } from './context/showProductDetail';
import { ProductsContext, CategoryContext } from './context/products';
import { FavContext } from './context/fav';
import { ActivityContext } from './context/activity';

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
  const [activityData, setActivityData] = useState([]);
  const [favItemsArr, setFavItemsArr] = useState([]);
  const [favData, setFavData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        //api/product
        const productResponse = await axios.get(`${API_URL}/product`, {
          withCredentials: true,
        });
        const products = productResponse.data;
        setProductsData([...products]);

        //api/product/category
        const categoryResponse = await axios.get(
          `${API_URL}/product/category`,
          {
            withCredentials: true,
          }
        );
        const categories = categoryResponse.data;
        setCategoryData([...categories]);

        //api/product/activity
        const activityResponse = await axios.get(`${API_URL}/activity`, {
          withCredentials: true,
        });
        const activities = activityResponse.data;
        setActivityData([...activities]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <ProductsContext.Provider value={{ productsData, setProductsData }}>
        <FavContext.Provider
          value={{ favData, setFavData, favItemsArr, setFavItemsArr }}
        >
          <ActivityContext.Provider value={{ activityData, setActivityData }}>
            <CategoryContext.Provider value={{ categoryData, setCategoryData }}>
              <ShowContext.Provider value={{ show, setShow }}>
                <Navbar />
                {useRoutes(routerList)}
                <Footer />
              </ShowContext.Provider>
            </CategoryContext.Provider>
          </ActivityContext.Provider>
        </FavContext.Provider>
      </ProductsContext.Provider>
    </>
  );
}

export default App;
