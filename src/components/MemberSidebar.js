import React from 'react';
import Sidebar from './MemberSidebar/Sidebar';

function MemberSidebar() {
  const SidebarLinks = [
    {
      id: 1,
      name: '會員資料',
      router: `/`,
      icon: <i className="fas fa-user"></i>,
      line: '',
    },
    {
      id: 2,
      name: '購物車',
      router: `/`,
      icon: <i className="fas fa-shopping-cart"></i>,
      line: '',
    },
    {
      id: 3,
      name: '折價券',
      router: `/`,
      icon: <i className="fas fa-ticket-alt"></i>,
      line: '',
    },
    {
      id: 4,
      name: '收藏清單',
      router: `/`,
      icon: <i className="fas fa-heart"></i>,
      line: '',
    },
    {
      id: 5,
      name: '歷史清單',
      router: `/`,
      icon: <i className="fas fa-list-alt"></i>,
      line: <div className="Sidebarline"></div>,
    },
    {
      id: 6,
      name: '登出',
      router: `/`,
      icon: <i className="fas fa-sign-out-alt"></i>,
      line: '',
    },
  ];
  return (
    <>
      <header>
        <div className="container h-100">
          <nav>
            <Sidebar SidebarLinks={SidebarLinks} />
            {/* <NavbarMobile navLinks={navLinks}/> */}
          </nav>
        </div>
      </header>
    </>
  );
}

export default MemberSidebar;
