import React, { useState, useEffect } from 'react';
import { useRoutes, useLocation, useMatch } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { useBeforeunload } from 'react-beforeunload';

import { API_URL } from './utils/config';
import { ShowContext } from './context/showProductDetail';

import { CartListContext } from './context/cart';
import { ProductsContext, CategoryContext } from './context/products';
import { FavContext } from './context/fav';
import { ActivityContext } from './context/activity';
import { AdminContext } from './context/admin';
import { LoginContext } from './context/LoginStatus';
import { DietlogContext } from './context/dietlog';

import routerList from './config/routerList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const date = dayjs(new Date()).format('YYYY-MM-DD');
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  const [login, setLogin] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [user, setUser] = useState({
    userID: '',
  });
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [cartListData, setCartListData] = useState([]);

  const [activityData, setActivityData] = useState([]);
  const [favItemsArr, setFavItemsArr] = useState([]);
  const [favData, setFavData] = useState([]);
  const [adminOnline, setAdminOnline] = useState(false);
  const [calendarDate, setCalendarDate] = useState(date);
  const [dietlogData, setDietlogData] = useState([]);
  const [dietlogCategoryData, setDietlogCategoryData] = useState([]);

  const hasLocalStorage = localStorage.getItem('fav');

  const location = useLocation();
  const matchProduct = useMatch('/product/:productId');
  useEffect(() => {
    if (!matchProduct) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useBeforeunload(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    (async () => {
      try {
        // api/login
        // 判斷用戶是否有登入，且是否為admin
        const checkStatus = await axios.get(`${API_URL}/auth`, {
          withCredentials: true,
        });
        const isLogin = checkStatus.data;
        setLogin(isLogin.status);
        setUser({
          userID: isLogin.user,
        });
        setAdmin(isLogin.administrator);

        if (!isLogin.status) {
          localStorage.setItem('fav', '');
          setFavItemsArr([]);
          localStorage.setItem('cartList', '');
          setCartListData([]);
        }

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

        //api/dietlog/category
        const dietlogCategoryResponse = await axios.get(
          `${API_URL}/dietlog/category`,
          {
            withCredentials: true,
          }
        );
        const dietlogCategories = dietlogCategoryResponse.data;
        setDietlogCategoryData([...dietlogCategories]);

        //初始化localStorage購物車
        const cartList = localStorage.getItem('cartList');
        if (cartList) {
          const cartList = JSON.parse(localStorage.getItem('cartList'));
          setCartListData([...cartListData, ...cartList]);
        } else {
          localStorage.setItem('cartList', '');
        }
      } catch (error) {
        console.log(error);
      }
    })();

    /* 一開始載入時先取出local storage的收藏陣列 設定到資料state */
    if (hasLocalStorage) {
      const favItems = localStorage
        .getItem('fav')
        .split(',')
        .map((item) => parseInt(item, 10));
      setFavItemsArr([...favItems]);
    } else {
      localStorage.setItem('fav', '');
    }
  }, [login]);

  return (
    <>
      <LoginContext.Provider
        value={{
          login,
          setLogin,
          isSocial,
          setIsSocial,
          user,
          setUser,
          admin,
          commentStatus,
          setCommentStatus,
          message,
          setMessage,
        }}
      >
        <AdminContext.Provider value={{ adminOnline, setAdminOnline }}>
          <DietlogContext.Provider
            value={{
              calendarDate,
              setCalendarDate,
              dietlogData,
              setDietlogData,
              dietlogCategoryData,
              setDietlogCategoryData,
            }}
          >
            <ProductsContext.Provider value={{ productsData, setProductsData }}>
              <CartListContext.Provider
                value={{ cartListData, setCartListData }}
              >
                <FavContext.Provider
                  value={{ favData, setFavData, favItemsArr, setFavItemsArr }}
                >
                  <ActivityContext.Provider
                    value={{ activityData, setActivityData }}
                  >
                    <CategoryContext.Provider
                      value={{ categoryData, setCategoryData }}
                    >
                      <ShowContext.Provider value={{ show, setShow }}>
                        <Navbar />
                        {useRoutes(routerList)}
                        <Footer />
                      </ShowContext.Provider>
                    </CategoryContext.Provider>
                  </ActivityContext.Provider>
                </FavContext.Provider>
              </CartListContext.Provider>
            </ProductsContext.Provider>
          </DietlogContext.Provider>
        </AdminContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
