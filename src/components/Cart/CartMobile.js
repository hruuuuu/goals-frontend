import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartList } from '../../context/cart';
import CartMobileItem from './CartMobileItem';

function CartMoblie(props) {
  const { cartListData, setCartListData } = useCartList();
  const [total, setTotal] = useState();
  const [discountTotal, setDiscountTotal] = useState();

  useEffect(() => {
    //總計
    let allSubtotal = 0;
    for (let i = 0; i < cartListData.length; i++) {
      allSubtotal += cartListData[i].price * cartListData[i].amount;
    }
    setTotal(allSubtotal);

    //TODO:活動折扣
    let allDiscountTotal = 0;
    for (let i = 0; i < cartListData.length; i++) {
      allDiscountTotal +=
        cartListData[i].discountPrice * cartListData[i].amount;
    }
    setDiscountTotal(allSubtotal - allDiscountTotal);
  }, [cartListData]);

  const isFetchingCartList = cartListData.length === 0;

  return (
    <>
      <div className="floatingCart c-floating-cart">
        <div className="c-floating-cart__top">
          <h3 className="c-floating-cart__title">購物車</h3>

          <div className="floatingCartItem">
            {cartListData.map((product, i) => {
              return <CartMobileItem key={product.id} product={product} />;
            })}
          </div>
        </div>
        <div className="floatingCartSummary">
          <hr />
          <div className="d-flex justify-content-between mb-2">
            <p>活動折扣</p>
            <p className="txt_bolder txt_error">-${discountTotal}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="font_larger txt_bolder">總計</p>
            <p className="txt_org txt_bolder fs-2">${total}</p>
          </div>
          <Link to={`/member/cart`}>
            <div className="d-grid gap-2">
              <button
                className="e-btn e-btn--primary e-btn--w100 e-btn--medium"
                type="button"
              >
                前往結帳
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartMoblie;
