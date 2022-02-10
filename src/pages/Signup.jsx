import React, { useState } from 'react';
// import $ from 'jquery';
// import { ReactComponent as Logo } from '../img/sign/logo.svg';
import '../styles/_signup.scss';
import Image from '../img/sign/login.jpg';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [eye, setEye] = useState("");
  const handleSwitchEyes = (e) => {
    setShowPassword(!showPassword);
    setEye(e.target.id);
    console.log(document.querySelector("password"))
  }
  return (
    <>
      <div className="form position-relative d-flex">
        <img src={Image} alt="" className="bgImage" />
        <div className="signup-form">
          <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
              <h2 className="title border border-top-0 border-start-0 border-end-0 border-warning border-5 pb-4 pt-5">
                註冊
              </h2>
            </div>
            <form className="pt-5 w-75">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="請輸入電子信箱"
                  className="form-control"
                />
                <label htmlFor="email" className="text-secondary">
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
                <label htmlFor="password" className="text-secondary">
                  Password
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="請再次輸入密碼"
                  className="form-control"
                />
                <label htmlFor="confirmPassword" className="text-secondary">
                  Confirm Password
                </label>
              </div>
              <p className="text-warning text-center py-3">已經有帳戶了？</p>
              <button className="btn btn-primary w-100 mt-3 py-3">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mobile-form container">
        <div className="text-center">
          <h1 className="pt-5">註冊</h1>
          <p className="text-warning py-3">Welcome!</p>
        </div>
        <form className="w-75 m-auto">
          <div className="form-floating mb-3">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="請輸入電子信箱"
              className="form-control"
            />
            <i className="fas fa-envelope"></i>
            <label htmlFor="email">
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
            {showPassword && eye === "password" ?
              <i className="fas fa-eye-slash" id="password" onClick={(e) => handleSwitchEyes(e)}></i>
            :
              <i className="fas fa-eye" id="password" onClick={(e) => handleSwitchEyes(e)}></i>
            }
            <label htmlFor="password">
              Password
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="請再次輸入密碼"
              className="form-control"
            />
            <i className="fas fa-lock"></i>
            {showPassword && eye === "confirmPassword" ? 
              <i className="fas fa-eye-slash" id="confirmPassword" onClick={(e) => handleSwitchEyes(e)}></i>
            :
              <i className="fas fa-eye" id="confirmPassword" onClick={(e) => handleSwitchEyes(e)}></i>
            }
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
          </div>
          <button className="btn btn-primary w-100 my-3 py-3">Sign In</button>
        </form>
        <p className="text-warning text-center pt-3">已經有帳戶了？</p>
      </div>
    </>
  );
};

export default Signup;
