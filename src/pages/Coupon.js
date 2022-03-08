import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingMember from '../components/FloatingMember';
import CouponList from '../components/Coupon/CouponList';
import FloatingChat from '../components/FloatingChat';
import { useLogin } from '../context/LoginStatus';
import { Navigate } from 'react-router-dom';
import ScrollButton from '../components/ScrollButton';
import PageBanner from '../components/PageBanner';

import picBanner from '../img/page_banner/calculator.webp';

function Coupon() {
  const [isDisplay, setIsDisplay] = useState(false);
  const { login } = useLogin();
  if (!login) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageBanner img={picBanner} />
      <Header />
      <div className="u-margin u-margin--page-bottom">
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
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <FloatingChat />
      <ScrollButton />
    </>
  );
}

export default Coupon;
