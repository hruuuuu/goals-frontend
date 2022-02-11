import React from 'react';
import ProductItem from './ProductItem';
import Summary from './Summary';
import '../../styles/_cartList.scss';

function CartList() {
  return (
    <>
      <ProductItem />
      <hr />
      <Summary />
    </>
  );
}

export default CartList;
