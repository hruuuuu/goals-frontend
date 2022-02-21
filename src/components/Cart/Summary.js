import { React, useEffect, useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useCartList } from '../../context/cart';

function Summary(props) {
  const [total, setTotal] = useState();
  const [coupon, setCoupon] = useState();
  const [orderTotal, setOrderTotal] = useState();
  const { cartListData, setCartListData } = useCartList();

  useEffect(() => {
    //總計
    let allSubtotal = 0;
    for (let i = 1; i < cartListData.length; i++) {
      allSubtotal += cartListData[i].discountPrice * cartListData[i].amount;
    }
    // console.log(allSubtotal);
    setTotal(allSubtotal);

    //TODO:活動折扣

    //應付金額
    setOrderTotal(allSubtotal);
  }, []);

  return (
    <>
      <div className="checkoutBox row gx-4 gx-md-5 gy-2 align-items-end">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between py-2">
            <p>總計</p>
            <p className="txt_org">${total}</p>
          </div>
          <div className="d-flex justify-content-between py-2">
            <p>活動折扣</p>
            <p className="txt_org">- ${coupon}</p>
          </div>
          <div className="d-flex justify-content-between pt-2">
            <input
              type="text"
              className="rounded-3 coupon_input flex-grow-1 me-2"
              placeholder="請輸入折扣券編號"
            />
            <button className="btn-sm btn_grn rounded-3" type="button">
              送出
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between py-2">
            <span>應付金額</span>
            <span className="txt_org fs-1">${orderTotal}</span>
          </div>
          <div className="d-grid gap-2">
            {/* <Shipping /> */}
            <CheckoutModal />
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
