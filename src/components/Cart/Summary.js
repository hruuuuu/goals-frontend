import { React, useEffect, useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useCartList } from '../../context/cart';

import axios from 'axios';
import { API_URL } from '../../utils/config';
import { number } from 'prop-types';

function Summary(props) {
  const [total, setTotal] = useState();
  const [discountTotal, setDiscountTotal] = useState(0);
  // const [couponDiscountTotal, setCouponDiscountTotal] = useState(0);
  const [coupon, setCoupon] = useState({ id: '', value: 0 });
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderTotal, setOrderTotal] = useState();
  const { cartListData, setCartListData } = useCartList();
  const [data, setData] = useState([]);
  const userID = JSON.parse(localStorage.getItem('user'));

  const isReceiveList = data.length === 0;

  //coupon資料
  useEffect(() => {
    let getcoupon = async () => {
      let response = await axios.post(`${API_URL}/coupon/receive`, userID, {
        withCredentials: true,
      });
      setData(response.data);
    };
    getcoupon();
  }, []);
  // console.log(data);

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
    setDiscountTotal(allSubtotal - allDiscountTotal + couponDiscount);
    //應付金額
    setOrderTotal(allDiscountTotal - couponDiscount);
  }, [cartListData, couponDiscount]);

  //選定折價券後，回傳折扣內容，更新活動折扣跟應付金額
  const handleChange = (e) => {
    setCoupon(e.target.value);
    setCouponDiscount();
  };

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
            <p className="txt_org">- ${discountTotal}</p>
          </div>
          <div className="pt-2 couponItem">
            {!isReceiveList ? (
              <select
                className="form-select styled-select"
                id="coupon"
                name="coupon"
                onChange={handleChange}
              >
                <option className="option_font" value={total}>
                  請選擇
                </option>
                {data.map((coupon, i) => {
                  return (
                    <option
                      className="option_font"
                      key={coupon.id}
                      coupon={coupon}
                      value={
                        coupon.id
                        // total -
                        // (total * coupon.discount_multiplication -
                        //   coupon.discount_minus)
                      }
                    >
                      {coupon.discription}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                className="form-select styled-select disabled"
                id="coupon"
              >
                <option className="option_font" value="">
                  目前沒有可用的折價券
                </option>
              </select>
            )}
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between py-2">
            <span>應付金額</span>
            <span className="txt_org fs-1">${orderTotal}</span>
          </div>
          <div className="d-grid gap-2">
            <CheckoutModal
              orderTotal={orderTotal}
              setOrderTotal={setOrderTotal}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
