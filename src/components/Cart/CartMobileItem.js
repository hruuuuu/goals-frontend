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
                  // //數量不可小於一
                  // if (count <= 1) {
                  //   return setCount(1);
                  // }
                  // //數量增減
                  // setCount(count - 1);

                  // //更新數量到localStorge
                  // //準備添加進購物車的物件
                  // let newItem = {
                  //   id: product.id,
                  //   name: product.name,
                  //   image: product.image,
                  //   price: product.price,
                  //   discountPrice: product.discountPrice,
                  //   amount: product.amount - 1,
                  // };
                  // //重複添加商品，則更改陣列中應對物件的amount
                  // for (let i = 0; i < cartListData.length; i++) {
                  //   if (cartListData[i].id === newItem.id) {
                  //     const newAmountItem = {
                  //       id: cartListData[i].id,
                  //       name: cartListData[i].name,
                  //       image: cartListData[i].image,
                  //       price: cartListData[i].price,
                  //       discountPrice: cartListData[i].discountPrice,
                  //       amount: product.amount - 1,
                  //     };
                  //     const oldCartListData = cartListData.filter(
                  //       (item, i) => item.id !== newItem.id
                  //     );
                  //     const newCartListData = [
                  //       ...oldCartListData,
                  //       newAmountItem,
                  //     ];
                  //     //更新至localStorage
                  //     setCartListData(newCartListData);
                  //     return localStorage.setItem(
                  //       'cartList',
                  //       JSON.stringify(newCartListData)
                  //     );
                  //   }
                  // }
                  // //更新小計
                  // setSubtotal(newItem.amount * discountPrice);
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
        <div className="mobileCartItem__total txt_org">${subtotal}</div>
        <div className="mobileCartItem__del_btn">
          <button
            className="e-btn e-btn--icon e-btn--outline"
            onClick={removeItemFromCart}
          >
            <i className="fas fa-trash-alt icon_grn e-icon"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default CartMobileItem;
