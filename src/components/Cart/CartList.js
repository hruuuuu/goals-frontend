import { React, useState, useEffect } from 'react';
import { useCartList } from '../../context/cart';
import CartItem from './CartItem';
import Summary from './Summary';

function CartList(props) {
  const { cartListData, setCartListData } = useCartList();

  useEffect(() => {}, [cartListData]);

  const isFetchingCartList = cartListData.length === 0;

  return (
    <>
      {!isFetchingCartList ? (
        <div className="h-100">
          <div className="cartItem">
            <div className="cartItem__thead">
              <div>商品縮圖</div>
              <div>商品名稱</div>
              <div>商品單價</div>
              <div className="cartItem__qty_btn">數量</div>
              <div className="cartItem__total">小計</div>
              <div className="cartItem__del_btn">移除</div>
            </div>
            {cartListData.map((product, i) => {
              return <CartItem key={product.id} product={product} />;
            })}
          </div>
          <div>
            <hr />
            <Summary />
          </div>
        </div>
      ) : (
        <h1>您尚未選購任何商品</h1>
      )}
    </>
  );
}

export default CartList;
