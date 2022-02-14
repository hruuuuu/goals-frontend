import React, { useState } from 'react';
import $ from 'jquery';
import Image from '../img/sign/login.jpg';

const ResetPassword = () => {
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
      <div className="resetWrapper">
        <img src={Image} alt="" className="resetBackground" />
        {/* container for signFormWrapper */}
        <div className="resetFormWrapper">
          {/* text-center for div below */}
          <h2 className="formTitle">重設密碼</h2>
          <form className="resetForm">
            <div className="form-floating">
              <input
                type="email"
                id="showEmail"
                name="showEmail"
                placeholder="顯示用戶電子信箱"
                className="form-control"
                disabled
              />
              <i className="fas fa-envelope"></i>
              <label htmlFor="showEmail" className="inputLabel">
                電子信箱
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="請輸入新密碼"
                className="form-control"
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'newPassword' ? (
                <i
                  className="fas fa-eye-slash"
                  id="newPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="newPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="newPassword" className="inputLabel">
                新密碼
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="請再次輸入新密碼"
                className="form-control"
                onPaste={(e) => e.preventDefault()}
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'confirmNewPassword' ? (
                <i
                  className="fas fa-eye-slash"
                  id="confirmNewPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="confirmNewPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="confirmNewPassword" className="inputLabel">
                確認新密碼
              </label>
            </div>
            {/* w-100 for below */}
            <button className="resetBtn">重設密碼</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
