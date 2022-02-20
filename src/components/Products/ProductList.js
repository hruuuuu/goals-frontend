/* C/C */
import { React, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

import { useProducts } from '../../context/products';

import ProductItem from './ProductItem';
import Sort from './Sort';

function ProductList(props) {
  const { setShow } = props;
  const { productsData } = useProducts();

  const isFetchingProducts = productsData.length === 0;

  return (
    <>
      <div className="row gx-3 gx-md-5 gy-3">
        <div className="d-flex d-sm-none justify-content-end">
          <Sort />
        </div>
        {!isFetchingProducts ? (
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
            <h1>沒有符合條件的商品</h1>
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
