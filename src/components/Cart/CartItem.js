import { React, useEffect, useState } from 'react';
import axios from 'axios';

import { IMG_URL } from '../../utils/config';

function CartItem(props) {
  const [count, setCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const { cart, setCart } = props;
  const { id, image, name, price, amount } = cart;
  // const { product } = props;
  // const { id, image, name, calories, price } = product;

  useEffect(() => {
    setCount(amount);
    setSubtotal(price * amount);
  }, []);

  //移除商品、更新localStorage的value
  const removeItemFromCart = () => {
    let cartList = JSON.parse(localStorage.getItem('cartList'));
    console.log('cartList :>> ', cartList);
    if (!cartList) {
      cartList = [];
    }
    let setCartList = cartList.filter((item) => item.id !== id);
    setCart(setCartList);
    console.log(setCartList);
    localStorage.setItem('cartList', JSON.stringify(setCartList));
  };

  return (
    <>
      <div className="cartItem__tbody">
        <div className="cartItem__cover">
          <img
            className="cartItem__img"
            src={`${IMG_URL}/products/${image}`}
            // src={require('../../img/products/sunshine_bowl.jpeg')}
            alt="thumbnail"
          />
        </div>
        <div className="cartItem__name">{name}</div>
        <div className="cartItem__price txt_grn">${price}</div>
        <div className="cartItem__qty_btn">
          <div className="qty_btn">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="btn"
                onClick={() => {
                  setCount(count - 1);
                  setSubtotal((count - 1) * price);
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div className="mx-auto">{count}</div>
              <div
                className="btn"
                onClick={() => {
                  setCount(count + 1);
                  setSubtotal((count + 1) * price);
                }}
              >
                <i className="fas fa-plus icon_grn"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="cartItem__total txt_org">${subtotal}</div>
        <div className="cartItem__del_btn">
          <button className="del_btn py-1" onClick={removeItemFromCart}>
            <i className="fas fa-trash-alt p-1 icon_grn"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
