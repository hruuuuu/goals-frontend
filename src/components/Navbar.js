import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';
import { useLogin } from '../context/LoginStatus';
import { useCartList } from '../context/cart';
import Swal from 'sweetalert2';
import { API_URL } from '../utils/config';

function Navbar() {
  const { login, setLogin, isSocial, setIsSocial, setUser } = useLogin();
  const history = useNavigate();
  const { cartListData, setCartListData } = useCartList();
  const [cartIconLength, setCartIconLength] = useState();

  useEffect(() => {
    setCartIconLength(cartListData.length);
  }, [cartListData]);

  const handleLogout = async () => {
    const logoutResult = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });

    if (logoutResult.status === 200 && logoutResult.data.code < 30000) {
      setLogin(false);
      setUser({
        id: '',
        email: '',
      });
      if (isSocial) {
        setIsSocial(false);
      }
      Swal.fire({
        icon: 'success',
        html: logoutResult.data.msg,
      });
      setTimeout(() => {
        history('/');
      });
    } else {
      Swal.fire({
        icon: 'error',
        html: logoutResult.data.msg,
      });
      setTimeout(() => {
        history('/');
      });
    }
  };

  const navLinks = [
    {
      id: 1,
      name: '關於果實',
      route: `/about`,
    },
    {
      id: 2,
      name: '健康餐盒',
      route: `/product`,
    },
    {
      id: 3,
      name: '計算機',
      route: `/calculator`,
    },
    {
      id: 4,
      name: '健康新知',
      route: `/blog`,
    },
    {
      id: 5,
      name: '飲食日誌',
      route: `/dietlog`,
    },
  ];

  const navActions1 = [
    {
      id: 1,
      name: '註冊/登入',
      iconMobile: (
        <i className="fas fa-sign-in-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-sign-in-alt l-navbar__font"></i>,
      tagDesktop: ``,
      route: '/login',
    },
    {
      id: 2,
      name: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/fav`,
    },
    {
      id: 3,
      name: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart l-navbar__font"></i>,
      tagDesktop: <div className="e-tag e-tag--corner">{cartIconLength}</div>,
      route: `/member/cart`,
    },
  ];

  const navActions2 = [
    {
      id: 1,
      name: '登出',
      iconMobile: (
        <i
          className="fas fa-sign-out-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"
          onClick={handleLogout}
        ></i>
      ),
      iconDesktop: (
        <i
          className="fas fa-sign-out-alt l-navbar__font"
          onClick={handleLogout}
        ></i>
      ),
      tagDesktop: ``,
      route: '/logout',
    },
    {
      id: 2,
      name: '會員',
      iconMobile: (
        <i className="fas fa-user l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-user l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/`,
    },
    {
      id: 3,
      name: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/fav`,
    },
    {
      id: 4,
      name: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart l-navbar__font"></i>,
      tagDesktop: <div className="e-tag e-tag--corner">{cartIconLength}</div>,
      route: `/member/cart`,
    },
    // {
    //   id: 5,
    //   name: '優惠券',
    //   iconMobile: (
    //     <i className="fas fa-ticket-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
    //   ),
    //   iconDesktop: <i className="fas fa-ticket-alt l-navbar__font"></i>,
    //   tagDesktop: ``,
    //   route: `/member/coupon`,
    // },
    // {
    //   id: 6,
    //   name: '搜索',
    //   iconMobile: (
    //     <i className="fas fa-search l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
    //   ),
    //   iconDesktop: <i className="fas fa-search l-navbar__font"></i>,
    //   tagDesktop: ``,
    //   route: `/`,
    // },
  ];
  return (
    <>
      <header className="l-navbar sticky-top">
        <div className="container h-100">
          <nav className="l-navbar__wrapper justify-content-center justify-content-lg-between">
            <NavbarDesktop
              navLinks={navLinks}
              navActions={!login ? navActions1 : navActions2}
            />
            <NavbarMobile
              navLinks={navLinks}
              navActions={!login ? navActions1 : navActions2}
            />
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
