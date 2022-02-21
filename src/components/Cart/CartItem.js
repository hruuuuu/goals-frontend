import React, { useState } from 'react';

function ProductItem(props) {
  const [count, setCount] = useState(1);
  return (
    <>
      <div className="cartItem">
        <div className="cartItem__thead">
          <div>商品縮圖</div>
          <div>商品名稱</div>
          <div>商品單價</div>
          <div className="cartItem__qty_btn">數量</div>
          <div className="cartItem__total">小計</div>
          <div className="cartItem__del_btn">移除</div>
        </div>
        <div className="cartItem__tbody">
          <div className="cartItem__cover">
            <img
              className="cartItem__img"
              src={require('../../img/products/sunshine_bowl.jpeg')}
              alt="thumbnail"
            />
          </div>
          <div className="cartItem__name">叢林能量碗</div>
          <div className="cartItem__price txt_grn">$110</div>
          <div className="cartItem__qty_btn">
            <div className="qty_btn">
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="btn"
                  onClick={() => {
                    setCount(count - 1);
                  }}
                >
                  <i className="fas fa-minus icon_grn"></i>
                </div>
                <div className="mx-auto">{count}</div>
                <div
                  className="btn"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <i className="fas fa-plus icon_grn"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="cartItem__total txt_org">$110</div>
          <div className="cartItem__del_btn">
            <button className="del_btn py-1">
              <i className="fas fa-trash-alt p-1 icon_grn"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
