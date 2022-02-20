import { React, useState, useEffect } from 'react';
import { useCartList } from '../../context/cart';
import CartMobileItem from './CartMobileItem';

function CartMoblie(props) {
  const { cartListData, setCartListData } = useCartList();
  
  useEffect(() => {}, [cartListData]);

  return (
    <>
      <div className="floatingCart">
        <div className="mt-2">
          <h3>購物車</h3>
        </div>
        <hr className="mt-1 mb-2" />
        <div className="floatingCartItem">
          {cartListData.map((product, i) => {
            return <CartMobileItem key={product.id} product={product} />;
          })}
        </div>
        <hr />
        <div className="floatingCartSummary">
          <div className="d-flex justify-content-between mb-2">
            <p>活動折扣</p>
            <p className="txt_bolder txt_error">-$ 20</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="font_larger txt_bolder">總計</p>
            <p className="txt_org txt_bolder fs-2">$110</p>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn_grn rounded-3 py-2" type="button">
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartMoblie;
