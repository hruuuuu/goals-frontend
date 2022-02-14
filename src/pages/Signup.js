import React, { useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Image from '../img/sign/login.jpg';

const Signup = () => {
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
      <div className="signWrapper">
        <img src={Image} alt="" className="signBackground" />
        {/* container for signFormWrapper */}
        <div className="signFormWrapper">
          {/* text-center for div below */}
          <h2 className="formTitle">註冊</h2>
          <form className="signForm">
            <div className="form-floating">
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
              <label htmlFor="password" className="inputLabel">
                Password
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="請再次輸入密碼"
                className="form-control"
                onPaste={(e) => e.preventDefault()}
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'confirmPassword' ? (
                <i
                  className="fas fa-eye-slash"
                  id="confirmPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="confirmPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="confirmPassword" className="inputLabel">
                Confirm Password
              </label>
            </div>
            <Link to="/login">
              <p className="notification">已經有帳戶了？</p>
            </Link>
            {/* w-100 for below */}
            <button className="signBtn">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
