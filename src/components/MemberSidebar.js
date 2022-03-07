import React from 'react';
import Sidebar from './MemberSidebar/Sidebar';
import { useLogin } from '../context/LoginStatus';

function MemberSidebar() {
  const { login } = useLogin();
  const SidebarLinks1 = [
    {
      id: 1,
      name: '購物車',
      router: `/member/cart`,
      icon: <i className="fas fa-shopping-cart Sidebarfont__icon"></i>,
      line: '',
    },
    {
      id: 2,
      name: '收藏清單',
      router: `/member/fav`,
      icon: <i className="fas fa-heart Sidebarfont__icon"></i>,
      line: '',
    },
  ];
  const SidebarLinks2 = [
    {
      id: 1,
      name: '會員資料',
      router: `/member/`,
      icon: <i className="fas fa-user Sidebarfont__icon"></i>,
      line: '',
    },
    {
      id: 2,
      name: '購物車',
      router: `/member/cart`,
      icon: <i className="fas fa-shopping-cart Sidebarfont__icon"></i>,
      line: '',
    },
    {
      id: 3,
      name: '優惠券',
      router: `/member/coupon`,
      icon: <i className="fas fa-ticket-alt Sidebarfont__icon"></i>,
      line: '',
    },
    {
      id: 4,
      name: '收藏清單',
      router: `/member/fav`,
      icon: <i className="fas fa-heart Sidebarfont__icon"></i>,
      line: '',
    },
    {
      id: 5,
      name: '歷史清單',
      router: `/member/order`,
      icon: <i className="fas fa-list-alt Sidebarfont__icon"></i>,
      line: <div className="Sidebarline"></div>,
    },
  ];
  return (
    <>
      <aside className="c-member-sidebar">
        <div className="container h-100 p-0">
          <nav>
            <Sidebar SidebarLinks={!login ? SidebarLinks1 : SidebarLinks2} />
            {/* <NavbarMobile navLinks={navLinks}/> */}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default MemberSidebar;
