import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { IMG_URL } from '../../utils/config';

import { useCartList } from '../../context/cart';

function CartItem(props) {
  const [count, setCount] = useState(0);
  const [subtotal, setSubtotal] = useState();
  const { cartListData, setCartListData } = useCartList();
  const { product } = props;
  const { id, image, name, price, amount, discountPrice } = product;

  useEffect(() => {
    setCount(amount);
    setSubtotal(price * amount);
  }, [amount]);

  //移除商品、更新localStorage的value
  const removeItemFromCart = () => {
    let setCartList = cartListData.filter((item) => item.id !== id);
    setCartListData([...setCartList]);
    localStorage.setItem('cartList', JSON.stringify(setCartList));
  };

  return (
    <>
      <div className="cartItem__tbody">
        <div className="cartItem__cover">
          <img
            className="cartItem__img"
            src={`${IMG_URL}/products/${image}`}
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
                  //數量不可小於一
                  if (count <= 1) {
                    return setCount(1);
                  }
                  //數量增減
                  setCount(count - 1);

                  const newAmount = amount - 1;
                  //找到相同id物件的index
                  const index = cartListData.findIndex(
                    (item, i) => item.id === id
                  );
                  //產生一個新的陣列
                  const newCartListData = [...cartListData];
                  //更新數量到物件中
                  newCartListData[index].amount = newAmount;

                  //將更新後的陣列傳回cartListData
                  setCartListData(newCartListData);
                  //更新小計
                  setSubtotal(newAmount * discountPrice);
                  //將更新後的cartListData傳回localStorage
                  localStorage.setItem(
                    'cartList',
                    JSON.stringify(newCartListData)
                  );
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div className="mx-auto">{count}</div>
              <div
                className="btn"
                onClick={() => {
                  //數量增減
                  setCount(count + 1);

                  const newAmount = amount + 1;
                  //找到相同id物件的index
                  const index = cartListData.findIndex(
                    (item, i) => item.id === id
                  );
                  //產生一個新的陣列
                  const newCartListData = [...cartListData];
                  //更新數量到物件中
                  newCartListData[index].amount = newAmount;

                  //將更新後的陣列傳回cartListData
                  setCartListData(newCartListData);
                  //更新小計
                  setSubtotal(newAmount * discountPrice);
                  //將更新後的cartListData傳回localStorage
                  localStorage.setItem(
                    'cartList',
                    JSON.stringify(newCartListData)
                  );
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
