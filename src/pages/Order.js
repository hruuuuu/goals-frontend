import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import OrderList from '../components/Order/OrderList';
import FloatingMember from '../components/FloatingMember';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';
import PageBanner from '../components/PageBanner';

import picBanner from '../img/page_banner/calculator.webp';

function Order() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <PageBanner img={picBanner} />
      <Header />
      <div className="u-margin u-margin--page-bottom">
        <div className="container">
          <div className="row gx-0 gx-lg-4">
            <div className="col-md-3 d-none d-lg-block">
              <MemberSidebar />
            </div>
            <div className="col col-lg-9 mb-4">
              <OrderList />
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

export default Order;
