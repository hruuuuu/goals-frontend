import React from 'react';
import CartItem from './CartItem';
import Summary from './Summary';

function CartList() {
  return (
    <>
      <div className="h-100">
        <CartItem />
        <div>
          <hr />
          <Summary />
        </div>
      </div>
    </>
  );
}

export default CartList;
