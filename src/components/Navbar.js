import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';
import { useLogin } from '../context/LoginStatus';

function Navbar() {
  const { login, setLogin } = useLogin();
  const history = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    setLogin(false);
    const logoutResult = await axios.post(
      'http://127.0.0.1:3002/api/auth/logout',
      {
        withCredentials: true,
      }
    );
    console.log(logoutResult);
    if (logoutResult.status === 200) {
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
  ];
  const navActions = [
    {
      id: 1,
      name: !login ? '註冊/登入' : '登出',
      iconMobile: !login ? (
        <i className="fas fa-user l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ) : (
        <i
          className="fas fa-sign-out-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"
          onClick={handleLogout}
        ></i>
      ),
      iconDesktop: !login ? (
        <i className="fas fa-user l-navbar__font"></i>
      ) : (
        <i
          className="fas fa-sign-out-alt l-navbar__font"
          onClick={handleLogout}
        ></i>
      ),
      tagDesktop: ``,
      route: `${!login ? '/login' : '/logout'}`,
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
    {
      id: 4,
      name: '優惠券',
      iconMobile: (
        <i className="fas fa-ticket-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i class="fas fa-ticket-alt l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/member/coupon`,
    },
    {
      id: 5,
      name: '搜索',
      iconMobile: (
        <i className="fas fa-search l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-search l-navbar__font"></i>,
      tagDesktop: ``,
      route: `/`,
    },
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
