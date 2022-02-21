import React from 'react';
import SidebarDesktop from './MemberSidebar/SidebarDesktop';

function MemberSidebar() {
  const SidebarLinks = [
    {
      id: 1,
      name: '會員資料',
<<<<<<< HEAD
      router: `/member`,
      icon: <i className="fas fa-user"></i>,
      memberclass: 'Sidebaritem1',
=======
      router: `/member/`,
      icon: <i className="fas fa-user Sidebarfont__icon"></i>,
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
      line: '',
    },
    {
      id: 2,
      name: '購物車',
      router: `/member/cart`,
<<<<<<< HEAD
      icon: <i className="fas fa-shopping-cart"></i>,
      memberclass: 'Sidebaritem',
=======
      icon: <i className="fas fa-shopping-cart Sidebarfont__icon"></i>,
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
      line: '',
    },
    {
      id: 3,
      name: '折價券',
      router: `/member/coupon`,
<<<<<<< HEAD
      icon: <i className="fas fa-ticket-alt"></i>,
      memberclass: 'Sidebaritem',
=======
      icon: <i className="fas fa-ticket-alt Sidebarfont__icon"></i>,
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
      line: '',
    },
    {
      id: 4,
      name: '收藏清單',
      router: `/member/fav`,
<<<<<<< HEAD
      icon: <i className="fas fa-heart"></i>,
      memberclass: 'Sidebaritem',
=======
      icon: <i className="fas fa-heart Sidebarfont__icon"></i>,
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
      line: '',
    },
    {
      id: 5,
      name: '歷史清單',
      router: `/member/order`,
<<<<<<< HEAD
      icon: <i className="fas fa-list-alt"></i>,
      memberclass: 'Sidebaritem',
=======
      icon: <i className="fas fa-list-alt Sidebarfont__icon"></i>,
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
      line: <div className="Sidebarline"></div>,
    },
    {
      id: 6,
      name: '登出',
      router: `/`,
<<<<<<< HEAD
      icon: <i className="fas fa-sign-out-alt"></i>,
      memberclass: 'Sidebaritem',
=======
      icon: <i className="fas fa-sign-out-alt Sidebarfont__icon"></i>,

>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
      line: '',
    },
  ];
  return (
    <>
      <header>
        <div className="container h-100 p-0">
          <nav>
            <SidebarDesktop SidebarLinks={SidebarLinks} />
            {/* <NavbarMobile navLinks={navLinks}/> */}
          </nav>
        </div>
      </header>
    </>
  );
}

export default MemberSidebar;
