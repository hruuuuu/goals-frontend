import React, { useEffect, useState } from 'react';
import TwCitySelector from '../../../node_modules/tw-city-selector/dist/tw-city-selector';
import axios from 'axios';

import { API_URL } from '../../utils/config';

function Shipping(props) {
  const [delivery, setDelivery] = useState([]);
  const { shippingData, setShippingData } = props;
  const { activeStep, setActiveStep } = props;
  const { orderTotal, setOrderTotal } = props;
  const { couponId, setCouponId } = props;

  //取得運送方式
  useEffect(() => {
    let getDelivery = async () => {
      let response = await axios.post(
        `${API_URL}/cart/deliveryMethod`,

        {
          withCredentials: true,
        }
      );
      setDelivery(response.data);
    };
    getDelivery();
  }, []);

  //取得縣市行政區API資料
  useEffect(() => {
    cityselect();
  }, []);

  function cityselect() {
    new TwCitySelector({
      el: '.my-selector-c',
      elCounty: '.county', // 在 el 裡查找 dom
      elDistrict: '.district', // 在 el 裡查找 dom
      elZipcode: '.zipcode', // 在 el 裡查找 dom
    });
  }

  function handleChange(e) {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  }

  //stepper
  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <div className="container">
        <form
          id="shippingForm"
          className="row needs-validation my-selector-c"
          onSubmit={handleNext}
        >
          <div className="col-12 g-3">
            <h5>運送資訊</h5>
          </div>
          <div className="col-12 g-3">
            <label htmlFor="firstName" className="form-label label_fs">
              訂購人姓名
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="預設會員姓名"
              name="name"
              value={shippingData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 g-3">
            <label htmlFor="country" className="form-label label_fs">
              縣市
            </label>
            <select
              className="form-select styled-select county"
              id="country"
              name="county"
              value={shippingData.county}
              onChange={handleChange}
              required
            ></select>
          </div>
          <div className="col-6 g-3">
            <label htmlFor="district" className="form-label label_fs">
              鄉鎮市區
            </label>
            <select
              className="form-select styled-select district"
              id="state"
              name="district"
              value={shippingData.district}
              onChange={handleChange}
              required
            ></select>
            <div className="invalid-feedback">
              Please provide a valid district.
            </div>
          </div>
          {/* </div> */}
          <div className="col-12 g-3">
            <label htmlFor="address" className="form-label label_fs">
              地址
            </label>
            <input
              type="text"
              className="form-control"
              id="adddress"
              name="address"
              placeholder="請輸入收件地址"
              value={shippingData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 g-3">
            <label htmlFor="recipient" className="form-label label_fs">
              收件人
            </label>
            <input
              type="text"
              className="form-control"
              id="recipient"
              name="recipient"
              placeholder="請輸入收件人姓名"
              value={shippingData.recipient}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="row g-3"> */}
          <div className="col-6 g-3">
            <label htmlFor="tel" className="form-label label_fs">
              聯絡電話
            </label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              name="tel"
              placeholder="請輸入聯絡電話"
              value={shippingData.tel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 g-3">
            <label htmlFor="state" className="form-label label_fs">
              運送方式
            </label>
            <select
              className="form-select styled-select"
              id="state"
              name="delivery_id"
              onChange={handleChange}
              required
            >
              <option className="option_font" value="" disabled>
                請選擇
              </option>
              {delivery.map((method, i) => {
                return (
                  <option
                    className="option_font"
                    key={method.id}
                    method={method}
                    value={method.id}
                  >
                    {method.method}
                  </option>
                );
              })}
            </select>
          </div>
          <hr className="mt-4" />
          <div className="col-6 g-3 d-grid">
            <button className="btn_outline p-2" onClick={props.handleClose}>
              返回購物車
            </button>
          </div>
          <div className="col-6 g-3 d-grid">
            <button
              className="btn_outline btn_grn p-2"
              form="shippingForm"
              type="submit"
              // onClick={handleNext}
            >
              下一步
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Shipping;
