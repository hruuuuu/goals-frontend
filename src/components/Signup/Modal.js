import { React, useState } from 'react';
import { Modal } from 'react-bootstrap';

const SignupModal = ({
  page,
  show,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  const handleIn = show.in
    ? 'animation animation__modal animation__modal--in'
    : '';
  const handleOut = show.out
    ? 'animation animation__modal animation__modal--out'
    : '';
  return (
    <Modal
      show={show.in}
      onHide={handleClose}
      dialogClassName={`c-modal c-modal__modal ${handleIn} ${handleOut}`}
      backdropClassName={`c-modal__backdrop ${handleIn} ${handleOut}`}
      contentClassName="c-modal__wrapper c-modal__wrapper--modal"
      animation={false}
      centered
    >
      <div className="modal-wrapper">
        <button
          type="button"
          className="modal_close-button e-btn e-btn--icon"
          onClick={handleClose}
        >
          <i className="fas fa-arrow-left e-icon e-icon--primary"></i>
        </button>
        <h1 className="modal-title">{!page ? '忘記密碼' : '重寄驗證信'}</h1>
        <p className="modal-statement m-4">
          請輸入您註冊時所填寫的電子信箱，我們會立即發送
          {!page ? '密碼重新設定' : '新的驗證'}信到您的e-mail信箱。
        </p>
        <div className="modal-form">
          <label htmlFor="remail" className="c-form__label">
            電子信箱
          </label>
          <input
            type="email"
            id="remail"
            name="remail"
            placeholder="請填入您的電子信箱"
            className="form-control c-form__input"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="e-btn e-btn--primary e-btn--w100 e-btn--medium mt-4"
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
