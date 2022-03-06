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
            <div className="u-height u-height--empty-page">
              <div className="empty_img">
                <img
                  className="img-responsive"
                  src={
                    require('../../img/common/illustration/order-empty.svg')
                      .default
                  }
                  alt=""
                />
                <h5>沒有符合條件的商品呢！</h5>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
