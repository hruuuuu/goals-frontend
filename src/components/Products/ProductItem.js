import React from 'react';
import Counter from './Counter';

function ProductItem() {
  return (
    <>
      <div className="col-4">
        <div className="c-product-item">
          <div className="c-product-item__cover">
            <img src="" alt="" />
          </div>
          <div>
            <div className="c-product-item__tag e-tag">素食餐盒</div>
            <div className="c-product-item__cal">熱量379卡</div>
          </div>
          <div>
            <div>$ 110</div>
            <div></div>
          </div>
          <Counter />
          <button type="button"></button>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
