import React, { useEffect, useState } from 'react';
import TwCitySelector from '../../../node_modules/tw-city-selector/dist/tw-city-selector';
import axios from 'axios';

import { API_URL } from '../../utils/config';

function Shipping(props) {
  const [delivery, setDelivery] = useState([]);
  const { shippingData, setShippingData } = props;
  const { activeStep, setActiveStep } = props;

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

  const handleNext = (e) => {
    e.preventDefault();

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <div className="container">
        <form
          className="row my-selector-c"
          id="shippingForm"
          onSubmit={handleNext}
        >
          <div className="col-12 g-3">
            <h5>運送資訊</h5>
          </div>
          <div className="col-12 g-3">
            <label htmlFor="firstName" className="form-label c-form__label">
              訂購人姓名
            </label>
            <input
              type="text"
              className="form-control c-form__input"
              id="firstName"
              placeholder="預設會員姓名"
              name="purchaser"
              value={shippingData.purchaser}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 g-3">
            <label htmlFor="country" className="form-label c-form__label">
              縣市
            </label>
            <select
              className="form-select styled-select county c-form__select"
              id="country"
              name="county"
              value={shippingData.county}
              onChange={handleChange}
              required
            ></select>
          </div>
          <div className="col-6 g-3">
            <label htmlFor="district" className="form-label c-form__label">
              鄉鎮市區
            </label>
            <select
              className="form-select styled-select district c-form__select"
              id="state"
              name="district"
              value={shippingData.district}
              onChange={handleChange}
              required
            ></select>
          </div>
          <div className="col-12 g-3">
            <label htmlFor="address" className="form-label c-form__label">
              地址
            </label>
            <input
              type="text"
              className="form-control c-form__input"
              id="adddress"
              name="address"
              placeholder="請輸入收件地址"
              value={shippingData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 g-3">
            <label htmlFor="recipient" className="form-label c-form__label">
              收件人
            </label>
            <input
              type="text"
              className="form-control c-form__input"
              id="recipient"
              name="recipient"
              placeholder="請輸入收件人姓名"
              value={shippingData.recipient}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 g-3">
            <label htmlFor="tel" className="form-label c-form__label">
              聯絡電話
            </label>
            <input
              type="tel"
              className="form-control c-form__input"
              id="tel"
              name="tel"
              placeholder="請輸入聯絡電話"
              value={shippingData.tel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 g-3">
            <label htmlFor="state" className="form-label c-form__label">
              運送方式
            </label>
            <select
              className="form-select styled-select c-form__select"
              id="state"
              name="delivery_id"
              onChange={handleChange}
              required
            >
              <option className="option_font" value="">
                請選擇
              </option>
              {delivery.map((method, index) => {
                return (
                  <option
                    className="option_font"
                    key={index}
                    value={method.delivery_id}
                  >
                    {method.method}
                  </option>
                );
              })}
            </select>
          </div>
          <hr className="mt-4" />
          <div className="col-6 g-3">
            <div className="d-grid">
              <button
                className="e-btn e-btn--plain e-btn--secondary e-btn--w100 e-btn--medium"
                onClick={props.handleClose}
              >
                返回購物車
              </button>
            </div>
          </div>
          <div className="col-6 g-3">
            <div className="d-grid">
              <button
                className="e-btn e-btn--primary e-btn--w100 e-btn--medium"
                type="submit"
                form="shippingForm"
                onClick={() => handleNext}
              >
                下一步
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Shipping;
