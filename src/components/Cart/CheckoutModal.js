import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CartStepper from './CartStepper';

function CheckoutModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn_grn py-3" type="button" onClick={handleShow}>
        前往結帳
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="mt-3 px-3 d-flex justify-content-end">
          <button className="btn btn-lg" onClick={handleClose}>
            <i className="fas fa-times icon_grn"></i>
          </button>
        </div>
        <div className="container mt-2 mb-4 px-5">
          <CartStepper handleClose={handleClose} />
        </div>
        {/* <div className="container px-5">
          <div className="fs-5 pb-4">
            <h2>運送資訊</h2>
          </div>
          <div className="mb-2">
            <label for="firstName" className="form-label label_fs">
              訂購人姓名
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="預設會員姓名"
              value=""
              required
            />
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="row g-3 mb-2">
            <div className="col-6">
              <label for="country" className="form-label label_fs">
                縣市
              </label>
              <select
                className="form-select styled-select"
                id="country"
                required
              >
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
              <label for="state" className="form-label label_fs">
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
            <label for="address" className="form-label label_fs">
              地址
            </label>
            <input
              type="text"
              className="form-control"
              id="adddress"
              placeholder="請輸入收件地址"
              value=""
              required
            />
            <div className="invalid-feedback">Valid address is required.</div>
          </div>
          <div className="mb-2">
            <label for="recipient" className="form-label label_fs">
              收件人
            </label>
            <input
              type="text"
              className="form-control"
              id="recipient"
              placeholder="請輸入收件人姓名"
              value=""
              required
            />
            <div className="invalid-feedback">Valid recipient is required.</div>
          </div>
          <div className="row g-3 mb-2">
            <div className="col-6">
              <label for="tel" className="form-label label_fs">
                聯絡電話
              </label>
              <input
                type="tel"
                className="form-control"
                id="tel"
                placeholder="請輸入聯絡電話"
                value=""
                required
              />
            </div>
            <div className="col-6">
              <label for="state" className="form-label label_fs">
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
        </div> */}
        {/* <div className="container my-3 px-5">
          <hr />
          <div className="row justify-content-between">
            <div className="col-6">
              <div className="d-grid gap-2">
                <Button
                  onClick={handleClose}
                  className="close_btn"
                  type="button"
                >
                  取消
                </Button>
              </div>
            </div>
            <div className="col-6">
              <div className="d-grid gap-2">
                <Checkout />
              </div>
            </div>
          </div>
        </div> */}
      </Modal>
    </>
  );
}

export default CheckoutModal;
