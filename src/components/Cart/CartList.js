import { React, useState, useEffect } from 'react';
import { useCartList } from '../../context/cart';
import CartItem from './CartItem';
import Summary from './Summary';

function CartList(props) {
  const { cartListData, setCartListData } = useCartList();
  const [isLoading, setIsLoading] = useState(true);
  // const [cart, setCart] = useState([]);

  const isFetching = cartListData.length === 0;
  // console.log(cartListData);
  // let cartList = JSON.parse(localStorage.getItem('cartList'));
  // setCartListData([...cartListData, cartList]);
  // setCart(cartList);
  // console.log(cart);

  useEffect(() => {
    // 先開起載入指示器
    setIsLoading(true);
    // 將localstorage的value轉成陣列物件
    // let cartList = JSON.parse(localStorage.getItem('cartList'));
    // console.log(cartList);
    // console.log(typeof cartList);
    // setCartListData([...cartListData]);
    // console.log(cartListData);
    // console.log(typeof cartListData);

    //比對cartList跟productata兩筆資料重疊的部分，id相同則產生新陣列cartListItem
    // if (!isFetching) {
    //   let cartListItem = [];
    //   for (let i = 0; i < productsData.length; i++) {
    //     for (let x = 0; x < cartList.length; x++) {
    //       if (productsData[i].id === cartList[x].id) {
    //         cartListItem.push(productsData[i]);
    //       }
    //     }
    //   }
    //   console.log(cartListItem);
    //   setCartListItem([...cartListItem]);
    // }
    if (!isFetching) {
      setCartListData([...cartListData]);
    }

    // 3秒後關閉指示器
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const spinner = (
    <>
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );

  const display = (
    <>
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
    </>
  );

  return (
    <>
      {isLoading ? spinner : display}
      {/* <div className="h-100">
        {productsData.map((product, i) => {
          return <CartItem key={product.id} product={product} />;
        })}
        <div>
          <hr />
          <Summary />
        </div>
      </div> */}
    </>
  );
}

export default CartList;
