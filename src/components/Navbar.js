import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useMatch,
  useLocation,
  matchRoutes,
} from 'react-router-dom';
import axios from 'axios';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';
import { useLogin } from '../context/LoginStatus';
import { useCartList } from '../context/cart';
import Swal from 'sweetalert2';

import { API_URL } from '../utils/config';
import routerList from '../config/routerList';

function Navbar() {
  const { login, setLogin, isSocial, setIsSocial, setUser } = useLogin();
  const history = useNavigate();
  const { cartListData } = useCartList();
  const [cartIconLength, setCartIconLength] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTop, setIsTop] = useState(false);
  const [isActive, setIsActive] = useState(0);

  const matchHome = useMatch('/');
  const matchLogin = useMatch('/login');
  const matchAdmin = useMatch('/admin');
  const locationPath = useLocation().pathname;
  const matchedRoutes = matchRoutes(routerList, locationPath);

  const isHome = matchHome !== null;
  const isFullScreen =
    matchLogin !== null ||
    matchAdmin !== null ||
    matchedRoutes[0].route.path === '*';

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
    if (!isHome && scrollPosition <= 300) {
      setIsTop(true);
    } else if (isHome && scrollPosition <= 700) {
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
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: '登出',
      cancelButtonText: '返回',
      focusCancel: false,
      focusConfirm: false,
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        container: 'c-alert__overlay',
        popup: 'c-alert__modal',
        title: 'c-alert__title',
        htmlContainer: 'c-alert__text',
        confirmButton: 'e-btn e-btn--plain e-btn--medium ms-2',
        cancelButton: 'e-btn e-btn--cancel e-btn--medium',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      name: 'TDEE計算機',
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

  const navActionsVisitor = [
    {
      id: 6,
      name: '註冊/登入',
      iconMobile: (
        <i className="fas fa-user-circle l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas user-circle l-navbar__font"></i>,
      tagDesktop: ``,
      route: '/login',
    },
    {
      id: 9,
      name: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/fav`,
    },
    {
      id: 10,
      name: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart l-navbar__font"></i>,
      tagDesktop: <div className="e-tag e-tag--corner">{cartIconLength}</div>,
      route: `/member/cart`,
    },
  ];

  const navActionsLogin = [
    {
      id: 7,
      name: '會員',
      iconMobile: (
        <i className="fas fa-user l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-user l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/`,
    },
    {
      id: 8,
      name: '優惠券',
      iconMobile: (
        <i className="fas fa-ticket-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-ticket-alt l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/coupon`,
    },
    {
      id: 9,
      name: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/fav`,
    },
    {
      id: 10,
      name: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart l-navbar__font"></i>,
      tagDesktop: <div className="e-tag e-tag--corner">{cartIconLength}</div>,
      route: `/member/cart`,
    },
  ];

  useEffect(() => {
    navLinks.forEach((nav) => {
      const matched = nav.route === locationPath;
      if (matched) {
        setIsActive(nav.id);
      }
    });
    navActionsVisitor.forEach((nav) => {
      const matched = nav.route === locationPath;
      if (matched) {
        setIsActive(nav.id);
      }
    });
    navActionsLogin.forEach((nav) => {
      const matched = nav.route === locationPath;
      if (matched) {
        setIsActive(nav.id);
      }
    });
  }, [locationPath]);

  return (
    <>
      <header
        className={`l-navbar sticky-top ${
          !isTop || isFullScreen ? 'l-navbar--scroll' : ''
        }`}
      >
        <div className="container h-100">
          <nav className="l-navbar__wrapper justify-content-center justify-content-lg-between">
            <NavbarDesktop
              navLinks={navLinks}
              navActions={!login ? navActionsVisitor : navActionsLogin}
              isTop={isTop}
              handleLogout={handleLogout}
              login={login}
              isActive={isActive}
              setIsActive={setIsActive}
              isFullScreen={isFullScreen}
            />
            <NavbarMobile
              navLinks={navLinks}
              navActions={!login ? navActionsVisitor : navActionsLogin}
              isTop={isTop}
              handleLogout={handleLogout}
              isActive={isActive}
              isFullScreen={isFullScreen}
            />
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
