import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import OrderList from '../components/Order/OrderList';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

function Order() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />

      <div className="container">
        <div className="row gx-4">
          <div className="col-md-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <OrderList />
          </div>
        </div>

        {/* 浮動視窗 */}
        <div className="d-md-none">
          <FloatingIcon setIsDisplay={setIsDisplay} />
          {isDisplay && (
            <FloatingModal isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
