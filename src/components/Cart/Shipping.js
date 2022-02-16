import React from 'react';

function Shipping() {
  return (
    <>
      <div className="container">
        <div className="my-3">
          <h5>運送資訊</h5>
        </div>
        <div className="mb-2">
          <label htmlFor="firstName" className="form-label label_fs">
            訂購人姓名
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="預設會員姓名"
            required
          />
          <div className="invalid-feedback">Valid first name is required.</div>
        </div>
        <div className="row g-3 mb-2">
          <div className="col-6">
            <label htmlFor="country" className="form-label label_fs">
              縣市
            </label>
            <select className="form-select styled-select" id="country" required>
              <option className="option_font" value="">
                請選擇
              </option>
              <option className="option_font">桃園市</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="state" className="form-label label_fs">
              鄉鎮市區
            </label>
            <select className="form-select styled-select" id="state" required>
              <option className="option_font">請選擇</option>
              <option className="option_font">中壢區</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="address" className="form-label label_fs">
            地址
          </label>
          <input
            type="text"
            className="form-control"
            id="adddress"
            placeholder="請輸入收件地址"
            required
          />
          <div className="invalid-feedback">Valid address is required.</div>
        </div>
        <div className="mb-2">
          <label htmlFor="recipient" className="form-label label_fs">
            收件人
          </label>
          <input
            type="text"
            className="form-control"
            id="recipient"
            placeholder="請輸入收件人姓名"
            required
          />
          <div className="invalid-feedback">Valid recipient is required.</div>
        </div>
        <div className="row g-3">
          <div className="col-6">
            <label htmlFor="tel" className="form-label label_fs">
              聯絡電話
            </label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              placeholder="請輸入聯絡電話"
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="state" className="form-label label_fs">
              運送方式
            </label>
            <select className="form-select styled-select" id="state" required>
              <option className="option_font" value="">
                請選擇
              </option>
              <option className="option_font">宅配到府</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;
