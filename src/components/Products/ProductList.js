/* C/C */
import { React, useState } from 'react';

import { useProducts } from '../../context/products';

import ProductItem from './ProductItem';

function ProductList(props) {
  const { setShow } = props;
  const { productsData } = useProducts();

  const hasData = productsData.length !== 0;

  return (
    <>
      <div className="row gx-3 gx-md-5">
        {hasData ? (
          productsData.map((product, i) => {
            return (
              <ProductItem
                key={product.id}
                setShow={setShow}
                product={product}
              />
            );
          })
        ) : (
          <>
            <h1>Page - Empty state</h1>
          </>
        )}
        {}
      </div>
    </>
  );
}

export default ProductList;
