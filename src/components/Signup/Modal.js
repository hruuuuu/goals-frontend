import React from 'react';
import { Modal } from 'react-bootstrap';

const SignupModal = ({
  page,
  show,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="modal-wrapper">
        <p className="modal_close-button" onClick={handleClose}>
          <i className="fas fa-arrow-left"></i>
        </p>
        <h1 className="modal-title">{!page ? '忘記密碼' : '重寄驗證信'}</h1>
        <p className="modal-statement">
          請輸入您註冊時所填寫的電子信箱，我們會立即發送
          {!page ? '密碼重新設定' : '新的驗證'}信到您的e-mail信箱。
        </p>
        <div className="modal-form">
          <label htmlFor="remail" className="modal_form-label">
            電子信箱
          </label>
          <input
            type="email"
            id="remail"
            name="remail"
            placeholder="請填入您的電子信箱"
            className="modal_form-Input form-control"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="modal_submit-button"
            onClick={handleSubmit}
          >
            送出
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignupModal;
