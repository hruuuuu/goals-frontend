import React from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';

function Coupon() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <EditProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupon;
