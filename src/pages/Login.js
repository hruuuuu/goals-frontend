import React, { useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Image from '../img/sign/login.jpg';
import { Modal } from 'react-bootstrap';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [eye, setEye] = useState('');
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSwitchEyes = (e) => {
    setShowPassword(!showPassword);
    setEye(e.target.id);
    if (!showPassword) {
      $(e.target).parent().children()[0].type = 'text';
    } else {
      $(e.target).parent().children()[0].type = 'password';
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    setShow(false);
    console.log(email);
  };

  return (
    <>
      <div className="login-page">
        <img src={Image} alt="" className="login-page_background" />
        <div className="login-form-wrapper">
          <h2 className="login-form_title">登入</h2>
          <form className="login-form">
            <div className="form-floating">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="請輸入電子信箱"
                className="form-control"
              />
              <i className="fas fa-envelope"></i>
              <label htmlFor="email" className="login-form_label">
                電子信箱
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="請輸入密碼"
                className="form-control"
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'password' ? (
                <i
                  className="fas fa-eye-slash"
                  id="password"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="password"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="password" className="login-form_label">
                密碼
              </label>
            </div>
            <div className="login-form_switch-page-wrapper">
              <Link to="/signup">
                <p className="login-form_switch-page">尚未有帳戶？</p>
              </Link>
              <p className="login-form_switch-page" onClick={handleShow}>
                忘記密碼
              </p>
            </div>
            <button className="login-form_button">登入</button>
          </form>
          <div className="another-login">
            <p className="another-login_title-wrapper">
              <span className="another-login_title">
                Or Continue With Social Media
              </span>
            </p>
            <div className="another-login_buttons">
              <button className="another-login_button google">
                <i className="fab fa-google"></i>
              </button>
              <button className="another-login_button facebook">
                <i className="fab fa-facebook"></i>
              </button>
              <button className="another-login_button line">
                <i className="fab fa-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <div className="modal-wrapper">
          <p className="modal_close-button" onClick={handleClose}>
            <i className="fas fa-arrow-left"></i>
          </p>
          <h1 className="modal-title">忘記密碼?</h1>
          <p className="modal-statement">
            請輸入您的電子信箱，我們將會傳送更改密碼的鏈結給您。
          </p>
          <div className="modal-form">
            <label htmlFor="forgetEmail" className="modal_form-label">
              電子信箱
            </label>
            {/* 用formik檢查信箱格式 */}
            <input
              type="email"
              id="forgetEmail"
              placeholder="請填入您的電子信箱"
              className="modal_form-Input form-control"
              onChange={handleChange}
            />
          </div>
          <button className="modal_submit-button" onClick={handleSubmit}>
            送出
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Login;
