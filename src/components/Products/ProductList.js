import { React, useState } from 'react';
import ProductItem from './ProductItem';

function ProductList(props) {
  const { setShow } = props;
  const productItems = () => {
    let products = [];
    for (let i = 1; i < 14; i++) {
      products.push(<ProductItem key={i} id={i} setShow={setShow} />);
    }
    return products;
  };
  return (
    <>
      <div className="row gx-3 gx-md-5">{productItems()}</div>
    </>
  );
}

export default ProductList;
