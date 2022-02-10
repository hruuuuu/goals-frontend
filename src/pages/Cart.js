import React from 'react';
import CartList from '../components/Cart/CartList';

const cart = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">sidebar</div>
          <div className="col-8">
            <CartList />
          </div>
        </div>
      </div>
    </>
  );
};

export default cart;
