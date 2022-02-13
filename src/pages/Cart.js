import React from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

function Cart() {
  return (
    <>
      <Header />
      <div className="container mainContent">
<<<<<<< HEAD
        <div className="row h-100">
          <div className="col-lg-3 d-none d-md-block">
=======
        <div className="row gx-4 h-100">
          <div className="col-lg-3">
>>>>>>> 81bbfd97534cff3c4e7840e41ffbfe222e444ac9
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
