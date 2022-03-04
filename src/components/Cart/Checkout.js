import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

import axios from 'axios';

import { API_URL } from '../../utils/config';

import { useCartList } from '../../context/cart';

function Checkout(props) {
  const { activeStep, setActiveStep } = props;
  const { orderTotal, setOrderTotal } = props;
  const { couponId, setCouponId } = props;
  const { shippingData, setShippingData } = props;
  const { member, setMember } = props;

  const { cartListData, setCartListData } = useCartList();
  const [creditcard, setCreditcard] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  //coupon_receive
  const usedCouponData = {
    member_id: member.id,
    coupon_id: couponId,
  };

  //order_items
  // ->準備好要傳回資料庫的product_id, amount
  const cartItems = { ...cartListData };

  //order_details
  // ->準備好要傳回資料庫的應付金額
  const cartDetails = {
    ...shippingData,
    total: Number(orderTotal),
    member_id: member.id,
  };

  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = 'https://js.tappaysdk.com/tpdirect/v5.8.0';
  //   script.async = true;

  //   TPDirect.setupSDK(
  //     123568,
  //     'app_SJt1kIRl8dAuuyaFG2xT3hIm9GTi0weRElq2C8kPSPkMDgzI40mMXeTN7oTz',
  //     'sandbox'
  //   );

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const handleInputFocus = (e) => {
    setCreditcard({ ...creditcard, focus: e.target.name });
    // console.log(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreditcard({ ...creditcard, [name]: value });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //送出訂單 ->傳回資料庫
  async function handleSubmit(e) {
    //orderDetails
    let orderDetailsResponse = await axios.post(
      `${API_URL}/cart/orderDetails`,
      cartDetails
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
  }

  //tappay
  const handleCardChange = (e) => {
    if (update.canGetPrime) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', true);
    }

    var message = document.querySelector('#message');

    message.innerHTML = `
      canGetPrime: ${update.canGetPrime} \n
      cardNumberStatus: ${statusTable[update.status.number]} \n
      cardExpiryStatus: ${statusTable[update.status.expiry]} \n
      cvcStatus: ${statusTable[update.status.cvc]}
  `.replace(/ {4}/g, '');

    if (update.hasError) {
      message.classList.add('error');
      message.classList.remove('info');
    } else {
      message.classList.remove('error');
      message.classList.add('info');
    }
  };

  return (
    <>
      <div className="container checkoutBox" id="PaymentForm">
        <div className="my-3">
          <h5>付款資訊</h5>
        </div>
        <div className="">
          <Cards
            cvc={creditcard.cvc}
            expiry={creditcard.expiry}
            focused={creditcard.focus}
            name={creditcard.name}
            number={creditcard.number}
          />
        </div>
        <div>
          <div id="tappay-iframe" onChange={handleCardChange}>
            <form className="row" id="checkoutForm">
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
                />
              </div>

              <div className="col-6 g-3 expiration-date-group">
                <label
                  htmlFor="expiration-date"
                  className="form-label label_fs"
                >
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
                />
              </div>
              <hr className="mt-4" />
              <div className="col-6 g-3 d-grid">
                <button className="btn_outline p-2" onClick={handleBack}>
                  上一步
                </button>
              </div>
              <div className="col-6 g-3 d-grid">
                <button
                  className="btn_outline btn_grn p-2"
                  form="checkoutForm"
                  type="submit"
                  onClick={handleSubmit}
                >
                  完成付款
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
