import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';

import { API_URL } from '../../utils/config';

import Shipping from './Shipping';
import Checkout from './Checkout';
import { useCartList } from '../../context/cart';

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
    name: '',
    county: '',
    district: '',
    address: '',
    recipient: '',
    tel: '',
  });
  const { handleShow } = props;
  const { orderTotal, setOrderTotal } = props;
  const { couponId, setCouponId } = props;

  // //取得已登入會員的ID
  // const userID = JSON.parse(localStorage.getItem('user'));

  // //coupon_receive
  // const usedCouponData = {
  //   member_id: userID.id,
  //   coupon_id: couponId,
  // };

  // //order_items
  // // ->準備好要傳回資料庫的product_id, amount
  // const cartItems = { ...cartListData };

  // //order_details
  // // ->準備好要傳回資料庫的應付金額
  // const cartDetails = {
  //   ...shippingData,
  //   total: Number(orderTotal),
  //   member_id: userID.id,
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
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

  // //送出訂單 ->傳回資料庫
  // async function handleSubmit(e) {
  //   //orderDetails
  //   let orderDetailsResponse = await axios.post(
  //     `${API_URL}/cart/orderDetails`,
  //     cartDetails
  //   );
  //   //order_items
  //   let orderItemsResponse = await axios.post(
  //     `${API_URL}/cart/orderItems`,
  //     cartItems
  //   );

  //   //coupon_receive
  //   let couponReceiveResponse = await axios.post(
  //     `${API_URL}/cart/orderItemsCoupon`,
  //     usedCouponData
  //   );
  // }
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
        {activeStep === steps.length ? (
          <React.Fragment>
            <p sx={{ mt: 2, mb: 1 }}>已下單</p>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <button className="btn_outline p-2" onClick={props.handleClose}>
                返回
              </button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div sx={{ mt: 3, mb: 1 }}>
              <Checkout
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                shippingData={shippingData}
                setShippingData={setShippingData}
                orderTotal={orderTotal}
                setOrderTotal={setOrderTotal}
                couponId={couponId}
                setCouponId={setCouponId}
              />
              ) : (
              <Shipping
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                shippingData={shippingData}
                setShippingData={setShippingData}
              />
              )}
            </div>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

export default CartStepper;
