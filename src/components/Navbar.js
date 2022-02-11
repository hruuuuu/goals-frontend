import React from 'react';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';

function Navbar() {
  const navLinks = [
    {
      id: 1,
      name: '關於果實',
      router: `/`,
    },
    {
      id: 2,
      name: '健康餐盒',
      router: `/`,
    },
    {
      id: 3,
      name: '健身課程',
      router: `/`,
    },
    {
      id: 4,
      name: '計算機',
      router: `/`,
    },
    {
      id: 5,
      name: '健康新知',
      router: `/`,
    },
  ];
  const navActions = [
    {
      id: 1,
      name: '註冊/登入',
      iconMobile: (
        <i className="fas fa-user l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-user l-navbar__font"></i>,
      tagDesktop: ``,
      router: `/`,
    },
    {
      id: 2,
      name: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart l-navbar__font"></i>,
      tagDesktop: ``,
      router: `/`,
    },
    {
      id: 3,
      name: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart l-navbar__font"></i>,
      tagDesktop: <div className="e-tag e-tag--corner">5</div>,
      router: `/`,
    },
    {
      id: 4,
      name: '優惠券',
      iconMobile: (
        <i className="fas fa-ticket-alt l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i class="fas fa-ticket-alt l-navbar__font"></i>,
      tagDesktop: ``,
      router: `/`,
    },
    {
      id: 5,
      name: '搜索',
      iconMobile: (
        <i className="fas fa-search l-navbar__font l-navbar__icon l-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-search l-navbar__font"></i>,
      tagDesktop: ``,
      router: `/`,
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
