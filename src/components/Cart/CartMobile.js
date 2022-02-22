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
            <p className="txt_bolder txt_error">-$ {discountTotal}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="font_larger txt_bolder">總計</p>
            <p className="txt_org txt_bolder fs-2">${total}</p>
          </div>
          <Link to={`/member/cart`}>
            <div className="d-grid gap-2">
              <button className="btn btn_grn rounded-3 py-2" type="button">
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
