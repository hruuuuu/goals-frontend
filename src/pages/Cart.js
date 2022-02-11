import React from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

function Cart() {
  return (
    <>
      <Header />
      <h1>Cart</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">{/* 元件可以放這裡 */}</div>
        </div>
      </div>
    </>
  );
}

export default Cart;
