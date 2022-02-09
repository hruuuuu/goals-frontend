import React from 'react';
import $ from 'jquery';
import { ReactComponent as Logo } from '../images/logo.svg';
import '../styles/_signup.scss';
import Image from '../images/login.jpg';

const Signup = () => {
  const handleMenu = () => {
    $('.menu-line2').css('display', 'none');

    $('.menu-line1').css('transform-origin', 'left bottom');
    $('.menu-line1').css('transform', 'rotate(45deg)');

    $('.menu-line3').css('transform-origin', 'top left');
    $('.menu-line3').css('transform', 'rotate(-45deg)');
  };
  return (
    <>
      <div className="header container-fluid bg-dark">
        <div className="container text-light d-flex justify-content-between align-items-center py-2">
          <ul className="d-flex align-items-center">
            <li className="logo">
              <Logo className="logo" />
            </li>
            <li className="ps-3">關於果實</li>
            <li className="ps-3">健康餐盒</li>
            <li className="ps-3">飲食日誌</li>
            <li className="ps-3">健康新知</li>
          </ul>
          <div className="btn-group">
            <button className="btn btn-dark text-light btn-outline-secondary">
              登入
            </button>
            <button className="btn btn-warning text-dark ms-2">註冊</button>
          </div>
          <div className="mobile-only" onClick={handleMenu}>
            <span className="menu-line1"></span>
            <span className="menu-line2"></span>
            <span className="menu-line3"></span>
          </div>
        </div>
      </div>
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

      <div className="mobile-form">
        <form>
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
          <button className="btn btn-primary w-100 mt-3 py-3">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
