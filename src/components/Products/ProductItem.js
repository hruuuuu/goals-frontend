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
          <div className="c-product-item__tag e-tag e-tag--normal">
            素食餐盒
          </div>
          <div className="c-product-item__detail">
            <div className="c-product-item__row">
              <div className="c-product-item__heading">叢林能量碗</div>
              <div className="c-product-item__price">$110</div>
            </div>
            <div className="c-product-item__row">
              <div className="c-product-item__cal">熱量379卡</div>
              <div className="c-product-item__o-price">$120</div>
            </div>
          </div>
          <Counter />
          <button
            type="button"
            className="e-btn e-btn--primary e-btn--w100 e-btn--medium mt-2"
          >
            <i className="fas fa-shopping-cart e-icon e-icon--left-large"></i>
            加入購物車
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
