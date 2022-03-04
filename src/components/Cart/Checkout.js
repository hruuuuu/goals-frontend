import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import axios from 'axios';

import { API_URL } from '../../utils/config';

import { useCartList } from '../../context/cart';

function Checkout(props) {
  const { activeStep, setActiveStep } = props;
  const { creditcard, setCreditcard } = props;
  const { orderTotal, setOrderTotal } = props;
  const { member, setMember } = props;
  const { couponId, setCouponId } = props;
  const { shippingData, setShippingData } = props;
  const { cartListData, setCartListData } = useCartList();
  // const [creditcard, setCreditcard] = useState({
  //   cvc: '',
  //   expiry: '',
  //   focus: '',
  //   name: '',
  //   number: '',
  // });

  //coupon_receive
  const usedCouponData = {
    member_id: member.id,
    coupon_id: couponId,
  };
  // console.log(usedCouponData);

  //order_items
  // ->準備好要傳回資料庫的product_id, amount
  const cartItems = { ...cartListData };
  // console.log(cartItems);

  //order_details
  // ->準備好要傳回資料庫的應付金額
  const cartDetails = {
    ...shippingData,
    total: Number(orderTotal),
    member_id: member.id,
  };
  // console.log(cartDetails);

  const handleInputFocus = (e) => {
    setCreditcard({ ...creditcard, focus: e.target.name });
    // console.log(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreditcard({ ...creditcard, [name]: value });
  };

  // const handleNext = (e) => {
  //   e.preventDefault();

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //送出訂單 ->傳回資料庫
  async function handleSubmit(e) {
    e.preventDefault();

    //orderDetails
    let orderDetailsResponse = await axios.post(
      `${API_URL}/cart/orderDetails`,
      cartDetails,
      usedCouponData
    );
    //order_items
    let orderItemsResponse = await axios.post(
      `${API_URL}/cart/orderItems`,
      cartItems
    );

    //coupon_receive
    let couponReceiveResponse = await axios.post(
      `${API_URL}/cart/orderItemsCoupon`,
      usedCouponData
    );
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  return (
    <>
      <div className="container checkoutBox">
        <form className="row" onSubmit={handleSubmit} id="checkoutForm">
          <div className="col-12 g-3">
            <h5>付款資訊</h5>
          </div>
          <div className="col-12 g-3">
            <Cards
              cvc={creditcard.cvc}
              expiry={creditcard.expiry}
              focused={creditcard.focus}
              name={creditcard.name}
              number={creditcard.number}
            />
          </div>
          <div className="col-12 g-3">
            <label htmlFor="firstName" className="form-label label_fs">
              持卡人
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="name"
              value={creditcard.name}
              placeholder="請輸入持卡人姓名"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="col-12 g-3 card-number-group">
            <label htmlFor="card-number" className="form-label label_fs">
              卡號
            </label>
            <input
              type=""
              className="form-control card-number"
              id="adddress"
              name="number"
              value={creditcard.number}
              placeholder="**** **** **** ****"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <div className="col-6 g-3 expiration-date-group">
            <label htmlFor="expiration-date" className="form-label label_fs">
              有效日期
            </label>
            <input
              type=""
              className="form-control expiration-date"
              id=""
              name="expiry"
              value={creditcard.expiry}
              placeholder="MM / YY"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="col-6 g-3 cvc-group">
            <label htmlFor="cvc" className="form-label label_fs">
              CVC
            </label>
            <input
              type=""
              className="form-control cvc"
              id="cvc"
              name="cvc"
              value={creditcard.cvc}
              placeholder="安全碼"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <hr className="mt-4" />
          <div className="col-6 g-3">
            <div className="d-grid">
              <button className="btn_outline p-2" onClick={handleBack}>
                上一步
              </button>
            </div>
          </div>
          <div className="col-6 g-3">
            <div className="d-grid">
              <button
                type="submit"
                className="btn_outline btn_grn p-2"
                // onClick={() => {
                //   handleSubmit();
                //   handleNext();
                // }}
                form="checkoutForm"
              >
                確認付款
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout;
