import { React, useEffect, useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useCartList } from '../../context/cart';

import axios from 'axios';
import { API_URL } from '../../utils/config';
import { number } from 'prop-types';
import { useLogin } from '../../context/LoginStatus';

function Summary(props) {
  const { user, login } = useLogin();
  const [total, setTotal] = useState();
  const [discountTotal, setDiscountTotal] = useState(0);
  // const [couponDiscountTotal, setCouponDiscountTotal] = useState(0);
  const [member, setMember] = useState({});
  const [couponId, setCouponId] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderTotal, setOrderTotal] = useState();
  const { cartListData, setCartListData } = useCartList();
  const [data, setData] = useState([]);

  const isReceiveList = data.length === 0;

  //取得用戶、coupon資料
  useEffect(() => {
    let getProfile = async () => {
      let response = await axios.post(`${API_URL}/member/getprofile`, user, {
        withCredentials: true,
      });

      setMember(response.data[0]);
    };

    getProfile();

    let getcoupon = async () => {
      let response = await axios.post(`${API_URL}/coupon/receive`, user, {
        withCredentials: true,
      });
      setData(response.data);
    };
    if (login) {
      getcoupon();
    }
  }, []);

  useEffect(() => {
    //總計
    let allSubtotal = 0;
    for (let i = 0; i < cartListData.length; i++) {
      allSubtotal += cartListData[i].price * cartListData[i].amount;
    }
    setTotal(allSubtotal);

    //活動折扣
    let allDiscountTotal = 0;
    for (let i = 0; i < cartListData.length; i++) {
      allDiscountTotal +=
        cartListData[i].discountPrice * cartListData[i].amount;
    }

    setDiscountTotal(
      Math.round(allSubtotal - allDiscountTotal + couponDiscount)
    );

    //應付金額
    setOrderTotal(Math.round(allDiscountTotal - couponDiscount));
  }, [cartListData, couponDiscount]);

  //選定折價券後，回傳折扣內容，更新活動折扣跟應付金額
  const handleChange = (e) => {
    if (e.target.value === 0) {
      let allDiscountTotal = 0;
      for (let i = 0; i < cartListData.length; i++) {
        allDiscountTotal +=
          cartListData[i].discountPrice * cartListData[i].amount;
      }
      setOrderTotal(Math.round(allDiscountTotal));
    } else {
      setCouponId(Number(e.target.value));
      const usedCoupon = data.find(
        (coupon) => coupon.id === Number(e.target.value)
      );

      setCouponDiscount(
        total -
          (total * usedCoupon.discount_multiplication -
            usedCoupon.discount_minus)
      );
    }
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
                className="form-select styled-select c-form__select"
                id="coupon"
                name="coupon"
                onChange={handleChange}
              >
                <option className="option_font" value="0">
                  請選擇優惠券
                </option>
                {data.map((coupon, i) => {
                  return (
                    <option
                      className="option_font"
                      key={coupon.id}
                      coupon={coupon.id}
                      value={coupon.id}
                    >
                      {coupon.discription}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                className="form-select styled-select disabled c-form__select"
                id="coupon"
              >
                <option className="option_font" value="" disabled>
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
              member={member}
              setMember={setMember}
              couponId={couponId}
              setCouponId={setCouponId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
