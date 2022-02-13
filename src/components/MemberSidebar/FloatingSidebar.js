import React from 'react';
import SidebarMobile from './SidebarMobile';

function FloatingSidebar() {
  const SidebarLinks = [
    {
      id: 1,
      name: '會員資料',
      router: `/member`,
      icon: <i className="fas fa-user"></i>,
      memberclass: 'SidebarMobileitem1',
      line: '',
    },
    {
      id: 2,
      name: '購物車',
      router: `/member/cart`,
      icon: <i className="fas fa-shopping-cart"></i>,
      memberclass: 'Sidebaritem',
      line: '',
    },
    {
      id: 3,
      name: '折價券',
      router: `/member/coupon`,
      icon: <i className="fas fa-ticket-alt"></i>,
      memberclass: 'Sidebaritem',
      line: '',
    },
    {
      id: 4,
      name: '收藏清單',
      router: `/member/fav`,
      icon: <i className="fas fa-heart"></i>,
      memberclass: 'Sidebaritem',
      line: '',
    },
    {
      id: 5,
      name: '歷史清單',
      router: `/member/order`,
      icon: <i className="fas fa-list-alt"></i>,
      memberclass: 'Sidebaritem',
      line: <div className="Sidebarline"></div>,
    },
    {
      id: 6,
      name: '登出',
      router: `/`,
      icon: <i className="fas fa-sign-out-alt"></i>,
      memberclass: 'Sidebaritem',
      line: '',
    },
  ];
  return (
    <>
      <header>
        <div className="container h-100 p-0">
          <nav>
            <SidebarMobile SidebarLinks={SidebarLinks} />
            {/* <NavbarMobile navLinks={navLinks}/> */}
          </nav>
        </div>
      </header>
    </>
  );
}

export default FloatingSidebar;
