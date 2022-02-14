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
      <div className="loginWrapper">
        <img src={Image} alt="" className="loginBackground" />
        <div className="loginFormWrapper">
          <h2 className="formTitle">登入</h2>
          <form className="loginForm">
            <div className="form-floating mb-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="請輸入電子信箱"
                className="form-control"
              />
              <i className="fas fa-envelope"></i>
              <label htmlFor="email" className="inputLabel">
                E-mail
              </label>
            </div>
            <div className="form-floating mb-3">
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
              <label htmlFor="password" className="inputLabel">
                Password
              </label>
            </div>
            <div className="notificationWrapper">
              <Link to="/signup">
                <p className="notification">尚未有帳戶？</p>
              </Link>
              <p className="notification" onClick={handleShow}>
                忘記密碼
              </p>
            </div>
            <button className="loginBtn">Log In</button>
          </form>
          <div className="anotherLoginMethod">
            <p className="socialTag">
              &mdash;
              <span className="socialTitle">Or Continue With Social Media</span>
              &mdash;
            </p>
            <div className="btnGroup">
              <button className="btn google">
                <i className="fab fa-google"></i>
              </button>
              <button className="btn facebook">
                <i className="fab fa-facebook"></i>
              </button>
              <button className="btn line">
                <i className="fab fa-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <div className="modalWrapper">
          <p className="goBack" onClick={handleClose}>
            <i className="fas fa-arrow-left"></i>
          </p>
          <h1 className="modalTitle">忘記密碼?</h1>
          <p className="modalStatement">
            請輸入您的電子信箱，我們將會傳送更改密碼的鏈結給您。
          </p>
          <div className="mb-3">
            <label htmlFor="forgetEmail" className="form-label">
              電子郵箱
            </label>
            {/* 用formik檢查信箱格式 */}
            <input
              type="email"
              id="forgetEmail"
              placeholder="請填入您的電子郵箱"
              className="modalInput form-control"
              onChange={handleChange}
            />
          </div>
          <button className="modalBtn" onClick={handleSubmit}>
            送出
          </button>
        </div>
      </Modal>
      {/* Modal */}
    </>
  );
};

export default Login;
