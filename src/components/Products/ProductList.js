/* C/C */
import { React, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

import { useProducts } from '../../context/products';

import ProductItem from './ProductItem';

function ProductList(props) {
  const { setShow } = props;
  const { productsData } = useProducts();

  const isFetchingProducts = productsData.length === 0;

  return (
    <>
      <div className="row gx-3 gx-md-5 gy-3">
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
            <h1>Spinner</h1>
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
