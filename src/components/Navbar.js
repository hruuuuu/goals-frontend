import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';
import { useLogin } from '../context/LoginStatus';
import { GoogleLogout } from 'react-google-login';

import { API_URL } from '../utils/config';

function Navbar() {
  const { login, setLogin, loginOption, setLoginOption } = useLogin();
  const history = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    setLogin(false);
    setLoginOption({
      ...loginOption,
      normal: false,
    });
    const logoutResult = await axios.post(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });
    console.log(logoutResult);
    if (logoutResult.status === 200) {
      history('/');
    }
  };

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  const handleGoogleLogout = async () => {
    setLogin(false);
    setLoginOption({
      ...loginOption,
      google: false,
    });
    const logoutResult = await axios.post(`${API_URL}/social/logout`, {
      withCredentials: true,
    });
    console.log(logoutResult);
    if (logoutResult.status === 200) {
      sessionStorage.clear();
      localStorage.clear();
      deleteAllCookies();
      history('/');
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

  const navActions = [
    {
      id: 1,
      name: !login ? '註冊/登入' : '登出',
      iconMobile: !login ? (
        <i className="fas fa-user l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ) : login && !loginOption['normal'] ? (
        <GoogleLogout
          className="google-logout"
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText={
            <i className="fas fa-sign-out-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
          }
          onLogoutSuccess={handleGoogleLogout}
        ></GoogleLogout>
      ) : (
        <i
          className="fas fa-sign-out-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"
          onClick={handleLogout}
        ></i>
      ),
      iconDesktop: !login ? (
        <i className="fas fa-user l-navbar__font"></i>
      ) : login && !loginOption['normal'] ? (
        <GoogleLogout
          className="google-logout"
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText={<i className="fas fa-sign-out-alt l-navbar__font"></i>}
          onLogoutSuccess={handleGoogleLogout}
        ></GoogleLogout>
      ) : (
        <i
          className="fas fa-sign-out-alt l-navbar__font"
          onClick={handleLogout}
        ></i>
      ),
      tagDesktop: ``,
      route: `${
        !login
          ? '/login'
          : login && !loginOption['normal']
          ? '/social/logout'
          : '/logout'
      }`,
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
      tagDesktop: <div className="e-tag e-tag--corner">5</div>,
      route: `/member/cart`,
    },
    // {
    //   id: 4,
    //   name: '優惠券',
    //   iconMobile: (
    //     <i className="fas fa-ticket-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
    //   ),
    //   iconDesktop: <i className="fas fa-ticket-alt l-navbar__font"></i>,
    //   tagDesktop: ``,
    //   route: `/member/coupon`,
    // },
    // {
    //   id: 5,
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
            <NavbarDesktop navLinks={navLinks} navActions={navActions} />
            <NavbarMobile navLinks={navLinks} navActions={navActions} />
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
