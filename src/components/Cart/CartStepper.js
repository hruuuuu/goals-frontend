import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';

import { API_URL } from '../../utils/config';

import Shipping from './Shipping';
import Checkout from './Checkout';
import { useCartList } from '../../context/cart';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const steps = ['購物車', '運送資訊', '付款資訊'];

function CartStepper(props) {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  const { cartListData, setCartListData } = useCartList();
  const [shippingData, setShippingData] = React.useState({
    order_status_id: '1',
    delivery_status_id: '1',
    payment_status_id: '4',
    payment_id: '1',
    purchaser: '',
    county: '',
    district: '',
    address: '',
    recipient: '',
    tel: '',
  });
  // const { handleShow } = props;
  const { orderTotal, setOrderTotal, handleClose } = props;
  const { member, setMember } = props;
  const { couponId, setCouponId } = props;

  //取得已登入會員的ID
  // const userID = JSON.parse(localStorage.getItem('user'));
  // console.log(userID);

  //coupon_receive
  const usedCouponData = {
    member_id: member.id,
    coupon_id: couponId,
  };

  // console.log(usedCouponData);

  // //order_items
  // // ->準備好要傳回資料庫的product_id, amount
  // const cartItems = { ...cartListData };

  //order_details
  // ->準備好要傳回資料庫的應付金額
  const cartDetails = {
    ...shippingData,
    total: Number(orderTotal),
    member_id: member.id,
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleNext = (e) => {
  //   e.stopPropagation();
  //   e.nativeEvent.stopImmediatePropagation();
  //   handleShow();

  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  //送出訂單 ->傳回資料庫
  async function handleSubmit(e) {
    e.preventDefault();

    //orderDetails
    // let orderDetailsResponse = await axios.post(
    //   `${API_URL}/cart/orderDetails`,
    //   cartListData,
    //   usedCouponData,
    //   { withCredentials: true }
    // );

    //order_items
    // let orderItemsResponse = await axios.post(
    //   `${API_URL}/cart/orderItems`,
    //   cartItems
    // );

    //coupon_receive
    // let couponReceiveResponse = await axios.post(
    //   `${API_URL}/cart/orderItemsCoupon`,
    //   usedCouponData
    // );
  }

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const showStripe = async () => {
      const firstRender = await axios.post(
        'http://localhost:3002/api/cart/create-payment-intent',
        cartListData
      );
      setClientSecret(firstRender.data.clientSecret);
    };
    showStripe();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Box className="box" sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <div sx={{ mt: 3, mb: 1 }}>
            {activeStep === steps.length - 1 && clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <Checkout
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  member={member}
                  setMember={setMember}
                  couponId={couponId}
                  set={setCouponId}
                  orderTotal={orderTotal}
                  setOrderTotal={setOrderTotal}
                  shippingData={shippingData}
                  setShippingData={setShippingData}
                />
              </Elements>
            ) : (
              <Shipping
                shippingData={shippingData}
                setShippingData={setShippingData}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleClose={handleClose}
              />
            )}
          </div>
        </React.Fragment>
      </Box>
    </>
  );
}

export default CartStepper;
