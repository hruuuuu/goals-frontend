import React, { useState } from 'react';
import $ from 'jquery';
import '../styles/_login.scss';
import Image from '../img/sign/login.jpg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [eye, setEye] = useState('');
  const handleSwitchEyes = (e) => {
    setShowPassword(!showPassword);
    setEye(e.target.id);
    if (!showPassword) {
      $(e.target).parent().children()[0].type = 'text';
    } else {
      $(e.target).parent().children()[0].type = 'password';
    }
  };

  return (
    <>
      <div className="loginWrapper">
        <img src={Image} alt="" className="loginBackground" />
        <div className="loginFormWrapper">
          <h1 className="formTitle">登入</h1>
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
              <p className="notification">尚未有帳戶？</p>
              <p className="notification">忘記密碼</p>
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
              <button className="btn apple">
                <i className="fab fa-apple"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
