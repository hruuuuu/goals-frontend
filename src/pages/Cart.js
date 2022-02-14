import React from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingMember from '../components/FloatingMember';

function Cart() {
  return (
    <>
      <Header />
      <div className="container mainContent">
        <div className="row gx-4 h-100">
          <div className="col-lg-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9 col-md-12">
            <CartList />
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
    </>
  );
}

export default Cart;
