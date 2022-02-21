import { React, useEffect, useState } from 'react';
import { IMG_URL } from '../../utils/config';

import { useCartList } from '../../context/cart';

function CartMobileItem(props) {
  const [count, setCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const { cartListData, setCartListData } = useCartList();

  const { product } = props;
  const { id, image, name, price, amount, discountPrice } = product;

  useEffect(() => {
    setCount(amount);
    setSubtotal(discountPrice * amount);
  }, [amount]);

  //移除商品、更新localStorage的value
  const removeItemFromCart = () => {
    let setCartList = cartListData.filter((item) => item.id !== id);
    setCartListData([...setCartList]);
    localStorage.setItem('cartList', JSON.stringify(setCartList));
  };

  return (
    <>
      <div className="mobileCartItem__tbody">
        <div className="mobileCartItem__cover">
          <img
            className="mobileCartItem__img"
            src={`${IMG_URL}/products/${image}`}
            alt="thumbnail"
          />
        </div>
        <div className="mobileCartItem__name">{name}</div>
        <div className="mobileCartItem__price d-flex">
          <p className="txt_gry">單價:</p>
          <p className="txt_grn">${price}</p>
        </div>
        <div className="mobileCartItem__qty_btn">
          <div className="qty_btn">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="btn"
                onClick={() => {
                  setCount(count - 1);
                  if (count <= 1) {
                    return setCount(1);
                  }
                  setSubtotal((count - 1) * discountPrice);
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div className="mx-auto">{count}</div>
              <div
                className="btn"
                onClick={() => {
                  setCount(count + 1);
                  setSubtotal((count + 1) * discountPrice);
                }}
              >
                <i className="fas fa-plus icon_grn"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="mobileCartItem__total txt_org">${subtotal}</div>
        <div className="mobileCartItem__del_btn">
          <button className="del_btn py-1" onClick={removeItemFromCart}>
            <i className="fas fa-trash-alt p-1 icon_grn"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default CartMobileItem;
