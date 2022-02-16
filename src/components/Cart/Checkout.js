import React from 'react';

function Checkout() {
  return (
    <>
      <div className="container">
        <div className="my-3">
          <h5>付款資訊</h5>
        </div>
        <div className="mb-2">
          <label htmlFor="firstName" className="form-label label_fs">
            持卡人
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="請輸入持卡人姓名"
            required
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
            placeholder="請輸入卡號"
            required
          />
          <div className="invalid-feedback">Valid address is required.</div>
        </div>
        <div className="mb-2">
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
        </div>
        <div className="row g-2 mb-2">
          <div className="col-4">
            <label htmlFor="" className="form-label label_fs">
              有效日期
            </label>
            <div className="d-flex align-items-center justify-content-between">
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
            </div>
          </div>

          <div className="col-8">
            <label htmlFor="state" className="form-label label_fs">
              CVC
            </label>
            <input
              type=""
              className="form-control"
              id="tel"
              placeholder="請輸入..."
              required
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
