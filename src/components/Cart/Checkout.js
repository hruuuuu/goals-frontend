import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

function Checkout(props) {
  const [creditcard, setCreditcard] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const handleInputFocus = (e) => {
    setCreditcard({ ...creditcard, focus: e.target.name });
    // console.log(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreditcard({ ...creditcard, [name]: value });
  };

  return (
    <>
      <div className="container checkoutBox" id="PaymentForm">
        <div className="my-3">
          <h5>付款資訊</h5>
        </div>
        <div className="mb-2">
          <Cards
            cvc={creditcard.cvc}
            expiry={creditcard.expiry}
            focused={creditcard.focus}
            name={creditcard.name}
            number={creditcard.number}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="firstName" className="form-label label_fs">
            持卡人
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="name"
            placeholder="請輸入持卡人姓名"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="invalid-feedback">Valid first name is required.</div>
        </div>

        <div className="mb-2">
          <label htmlFor="address" className="form-label label_fs">
            卡號
          </label>
          <input
            type="text"
            className="form-control"
            id="adddress"
            name="number"
            placeholder="請輸入卡號"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="invalid-feedback">Valid address is required.</div>
        </div>
        {/* <div className="mb-2">
          <label htmlFor="recipient" className="form-label label_fs">
            卡別
          </label>
          <input
            type="text"
            className="form-control"
            id="recipient"
            placeholder="請輸入卡別"
            required
          />
          <div className="invalid-feedback">Valid recipient is required.</div>
        </div> */}
        <div className="row g-2 mb-2">
          <div className="col-6">
            <label htmlFor="" className="form-label label_fs">
              有效日期
            </label>
            <input
              type=""
              className="form-control"
              id=""
              name="expiry"
              placeholder="月/ 年"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {/* <div className="d-flex align-items-center justify-content-between">
              <input
                type=""
                className="form-control"
                id=""
                placeholder="月"
                required
              />
              <div className="mx-1">/</div>
              <input
                type=""
                className="form-control"
                id=""
                placeholder="年"
                required
              />
            </div> */}
          </div>

          <div className="col-6">
            <label htmlFor="state" className="form-label label_fs">
              CVC
            </label>
            <input
              type=""
              className="form-control"
              id="tel"
              name="cvc"
              placeholder="請輸入..."
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
