import React from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

function Order() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9"></div>
        </div>
      </div>
    </>
  );
}

export default Order;
