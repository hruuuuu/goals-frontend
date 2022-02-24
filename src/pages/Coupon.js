import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingMember from '../components/FloatingMember';
import CouponList from '../components/Coupon/CouponList';
import FloatingChat from '../components/FloatingChat';

function Coupon() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
          <div className="col-lg-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <CouponList />
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <FloatingChat />
    </>
  );
}

export default Coupon;
