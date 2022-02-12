import React from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

function Cart() {
  return (
    <>
      <Header />
      <div className="container mainContent">
        <div className="row h-100">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <CartList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
