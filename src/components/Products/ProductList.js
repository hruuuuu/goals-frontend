import { React, useState } from 'react';

import { useProducts } from '../../context/products';

import ProductItem from './ProductItem';

function ProductList(props) {
  const { setShow } = props;
  const { productsData, setProductsData } = useProducts();

  return (
    <>
      <div className="row gx-3 gx-md-5">
        {productsData.map((product, i) => {
          return (
            <ProductItem key={product.id} setShow={setShow} product={product} />
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
