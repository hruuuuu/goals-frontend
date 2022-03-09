import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { useCartList } from '../../context/cart';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import {
  PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

function Checkout(props) {
  const history = useNavigate();
  const { activeStep, setActiveStep } = props;
  const { orderTotal, setOrderTotal } = props;
  const { member, setMember } = props;
  const { couponId, setCouponId } = props;
  const { shippingData, setShippingData } = props;
  // const [creditcard, setCreditcard] = useState({
  //   cvc: '',
  //   expiry: '',
  //   focus: '',
  //   name: '',
  //   cardNumber: '',
  // });
  const { cartListData, setCartListData } = useCartList();

  const stripe = useStripe();
  const elements = useElements();

  // const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    if (!e.complete) {
      $('.pay-btn').attr('disabled', 'disabled');
    } else {
      $('.pay-btn').removeAttr('disabled', 'disabled');
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

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

  // const handleInputFocus = (e) => {
  //   setCreditcard({ ...creditcard, focus: e.target.name });
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setCreditcard({ ...creditcard, [name]: value });
  // };

  //返回運輸資訊modal
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //送出訂單 ->傳回資料庫
  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    let orderDetailsResponse = await axios.post(
      `${API_URL}/cart/orderDetails`,
      cartDetails,
      usedCouponData
    );

    // order_items
    let orderItemsResponse = await axios.post(
      `${API_URL}/cart/orderItems`,
      cartItems
    );

    //coupon_receive
    let couponReceiveResponse = await axios.post(
      `${API_URL}/cart/orderItemsCoupon`,
      usedCouponData
    );

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // 付款成功會回到此頁面，並顯示payment_intent 跟 payment_intent_client_secret 以及 redirect_status
        return_url: 'http://localhost:3000/member/cart',
      },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: 'An unexpected error occured.',
      });
    }

    setIsLoading(false);

    // // orderDetails
    // let orderDetailsResponse = await axios.post(
    //   `${API_URL}/cart/orderDetails`,
    //   cartDetails,
    //   usedCouponData
    // );

    // // order_items
    // let orderItemsResponse = await axios.post(
    //   `${API_URL}/cart/orderItems`,
    //   cartItems
    // );

    // //coupon_receive
    // let couponReceiveResponse = await axios.post(
    //   `${API_URL}/cart/orderItemsCoupon`,
    //   usedCouponData
    // );
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  return (
    <>
      <div className="container checkoutBox">
        <form id="payment-form" onSubmit={handleSubmit} className="row">
          <div className="col-12 g-3">
            <h5>付款資訊</h5>
          </div>
          {/* <div className="col-12 g-3">
            <Cards
              cvc={creditcard.cvc}
              expiry={creditcard.expiry}
              focused={creditcard.focus}
              name={creditcard.name}
              number={creditcard.cardNumber}
            />
          </div>
          <div className="col-12 g-3">
            <label htmlFor="firstName" className="form-label c-form__label">
              持卡人
            </label>
            <input
              type="text"
              className="form-control c-form__input"
              name="name"
              placeholder="請輸入持卡人姓名"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group col-12 g-3">
            <label
              htmlFor="card_num_field"
              className="form-label c-form__label"
            >
              卡號
            </label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control c-form__input"
              name="cardNumber"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
            />
          </div> */}
          <PaymentElement
            id="payment-element"
            onChange={handleChange}
            className="col-12 g-3"
          />
          <hr className="mt-4" />
          <div className="col-6 g-3">
            <div className="d-grid">
              <button
                className="e-btn e-btn--plain e-btn--secondary e-btn--w100 e-btn--medium"
                onClick={handleBack}
              >
                上一步
              </button>
            </div>
          </div>
          <div className="col-6 g-3">
            <div className="d-grid">
              <button
                className="e-btn e-btn--primary e-btn--w100 e-btn--medium pay-btn"
                disabled={isLoading || !stripe || !elements}
                id="submit"
                onClick={() => {
                  handleSubmit();
                }}
                form="payment-form"
              >
                <span id="button-text">
                  {/* {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : ( */}
                  確認付款
                  {/* )} */}
                </span>
              </button>
            </div>
          </div>

          {/* {message && <div id="payment-message">{message}</div>} */}
        </form>
      </div>

      {/* <div className="container checkoutBox">
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
            <label htmlFor="firstName" className="form-label c-form__label">
              持卡人
            </label>
            <input
              type="text"
              className="form-control c-form__input"
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
            <label htmlFor="card-number" className="form-label c-form__label">
              卡號
            </label>
            <input
              type=""
              className="form-control card-number c-form__input"
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
            <label
              htmlFor="expiration-date"
              className="form-label c-form__label"
            >
              有效日期
            </label>
            <input
              type=""
              className="form-control expiration-date c-form__input"
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
            <label htmlFor="cvc" className="form-label c-form__label">
              CVC
            </label>
            <input
              type=""
              className="form-control cvc c-form__input"
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
              <button
                className="e-btn e-btn--plain e-btn--secondary e-btn--w100 e-btn--medium"
                onClick={handleBack}
              >
                上一步
              </button>
            </div>
          </div>
          <div className="col-6 g-3">
            <div className="d-grid">
              <button
                type="submit"
                className="btn_outline btn_grn p-2"
                disabled={isLoading || !stripe || !elements}
                form="checkoutForm"
              >
                確認付款
              </button>
            </div>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default Checkout;
