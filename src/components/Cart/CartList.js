import React from 'react';
import ProductItem from './CartItem';
import Summary from './Summary';

function CartList() {
  return (
    <>
      <div className="h-100">
        <ProductItem />
        <div>
          <hr />
          <Summary />
        </div>
      </div>
    </>
  );
}

export default CartList;
