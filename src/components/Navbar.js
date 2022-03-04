import React, { useEffect, useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTop, setIsTop] = useState(false);
  const matchHome = useMatch('/');

  const isHome = matchHome !== null;

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition <= 700) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  }, [scrollPosition]);

  useEffect(() => {
    setCartIconLength(cartListData.length);
  }, [cartListData]);

  const handleLogout = () => {
    Swal.fire({
      title: '確定要登出嗎？',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: '登出',
      denyButtonText: '返回',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isDenied) {
        history(-1);
      } else {
        const logoutResult = await axios.get(`${API_URL}/auth/logout`, {
          withCredentials: true,
        });
        if (logoutResult.status === 200 && logoutResult.data.code < 30000) {
          setUser({
            id: '',
            email: '',
          });
          if (isSocial) {
            setIsSocial(false);
          }
          setLogin(false);
          history('/login');
        }
      }
    });
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
    {
      id: 5,
      name: '優惠券',
      iconMobile: (
        <i className="fas fa-ticket-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-ticket-alt l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/coupon`,
    },
  ];

  return (
    <>
      <header
        className={`l-navbar sticky-top ${isHome ? 'l-navbar--home' : ''} ${
          !isTop ? 'l-navbar--scroll' : ''
        }`}
      >
        <div className="container h-100">
          <nav className="l-navbar__wrapper justify-content-center justify-content-lg-between">
            <NavbarDesktop
              navLinks={navLinks}
              navActions={!login ? navActions1 : navActions2}
              isHome={isHome}
              isTop={isTop}
            />
            <NavbarMobile
              navLinks={navLinks}
              navActions={!login ? navActions1 : navActions2}
              isHome={isHome}
              isTop={isTop}
            />
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
