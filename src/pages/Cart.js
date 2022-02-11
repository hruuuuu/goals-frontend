import React from 'react';
import CartList from '../components/Cart/CartList';
import '../styles/_cart.scss';

function Cart() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">sidebar</div>
          <div className="col-9">
            <CartList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
