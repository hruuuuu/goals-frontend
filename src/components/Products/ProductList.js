import React from 'react';
import ProductItem from './ProductItem';

function ProductList(props) {
  const { open, setOpen } = props;
  const productItems = () => {
    let products = [];
    for (let i = 1; i < 14; i++) {
      products.push(<ProductItem key={i} setOpen={setOpen} id={i} />);
    }
    return products;
  };
  return (
    <>
      <div className="row gx-5">{productItems()}</div>
    </>
  );
}

export default ProductList;
