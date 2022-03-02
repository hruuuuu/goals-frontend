import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

function Checkout(props) {
  const { activeStep, setActiveStep } = props;
  const { creditcard, setCreditcard } = props;
  // const [creditcard, setCreditcard] = useState({
  //   cvc: '',
  //   expiry: '',
  //   focus: '',
  //   name: '',
  //   number: '',
  // });

  const handleInputFocus = (e) => {
    setCreditcard({ ...creditcard, focus: e.target.name });
    // console.log(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreditcard({ ...creditcard, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <div className="container checkoutBox" id="PaymentForm">
        <form className="" onSubmit={handleNext} id="payButton">
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
              value={creditcard.name}
              placeholder="請輸入持卡人姓名"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="mb-2 card-number-group">
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
          <div className="row g-2 mb-2">
            <div className="col-6 expiration-date-group">
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

            <div className="col-6 cvc-group">
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
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout;
