import React from 'react';
import Counter from './Counter';
import FavIcon from './FavIcon';

function ProductItem() {
  return (
    <>
      <div className="col-4">
        <div className="c-product-item">
          <div className="c-product-item__cover">
            <img
              className="c-product-item__img"
              src={require('../../img/products/sunshine_bowl.jpeg')}
              alt="thumbnail"
            />
            <FavIcon />
          </div>
          <div>
            <div className="c-product-item__tag e-tag e-tag--normal">
              素食餐盒
            </div>
            <div className="c-product-item__cal">熱量379卡</div>
          </div>
          <div>
            <div>$ 110</div>
            <div></div>
          </div>
          <Counter />
          <button type="button">
            <i className="fas fa-shopping-cart"></i>
            加入購物車
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
