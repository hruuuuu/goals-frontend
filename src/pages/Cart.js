import { React, useState } from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

import FloatingMember from '../components/FloatingMember';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';
import PageBanner from '../components/PageBanner';

import picBanner from '../img/home/pic/swiper__1.jpg';

function Cart() {
  const [isDisplay, setIsDisplay] = useState(false);

  return (
    <>
      <PageBanner img={picBanner} />
      <Header />
      <div className="u-height u-height--page u-margin u-margin--page-bottom">
        <div className="container">
          <div className="row gx-4 h-100">
            <div className="col-lg-3 col-xl-3 d-none d-lg-block">
              <MemberSidebar />
            </div>
            <div className="col col-xl-9 col-lg-9 col-md-12 col-sm-12">
              <CartList />
            </div>
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <FloatingChat />
      <ScrollButton />
    </>
  );
}

export default Cart;
