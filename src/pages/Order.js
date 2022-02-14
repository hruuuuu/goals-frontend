import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import OrderList from '../components/Order/OrderList';
import FloatingMember from '../components/FloatingMember';

function Order() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
          <div className="col-md-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <OrderList />
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
    </>
  );
}

export default Order;
