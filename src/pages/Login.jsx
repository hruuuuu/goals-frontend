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
      <div className="form position-relative d-flex">
        <img src={Image} alt="" className="bgImage position-absolute" />
        <div className="signup-form bg-light">
          <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
              <h1 className="title border border-top-0 border-start-0 border-end-0 border-warning border-5 pb-4">
                登入
              </h1>
            </div>
            <form className="pt-5">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="請輸入電子信箱"
                  className="form-control"
                />
                <i className="fas fa-envelope"></i>
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
                <label htmlFor="password" className="text-secondary">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-around">
                <p className="text-warning text-center py-3 mb-0">
                  尚未有帳戶？
                </p>
                <p className="text-warning text-center py-3 mb-0">忘記密碼</p>
              </div>
              <button className="btn btn-primary w-100 mt-3 py-3">
                Log In
              </button>
            </form>
            <div className="third-party">
              <p className="pt-4 mt-4 pb-3">
                &mdash;
                <span className="bg-light">
                  Or continue with social media account
                </span>
                &mdash;
              </p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary bg-light text-primary px-4 py-3">
                  <i className="fab fa-google"></i>
                </button>
                <button className="btn btn-primary bg-light facebook px-4 py-3">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="btn btn-primary bg-light line px-4 py-3">
                  <i className="fab fa-line"></i>
                </button>
                <button className="btn btn-primary bg-light apple px-4 py-3">
                  <i className="fab fa-apple"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
