import React from 'react';

const EditPassWord = () => {
  return (
    <>
      <form className="c-member-info">
        <div className="container">
          <div className="row gx-5 gy-4">
            <div className="c-member-info__title">修改密碼</div>
            <div className="col-12">
              <label htmlFor="OldPassword" className="form-label c-form__label">
                舊密碼
              </label>
              <input
                type="password"
                className="form-control password__input__input c-form__input"
                id="OldPassword"
                placeholder="請輸入..."
              />
            </div>
            <div className="col-12">
              <label htmlFor="NewPassword" className="form-label c-form__label">
                新密碼
              </label>
              <input
                type="password"
                className="form-control password__input__input c-form__input"
                id="NewPassword"
                placeholder="請輸入..."
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="ConfirmPassword"
                className="form-label c-form__label"
              >
                確認密碼
              </label>
              <input
                type="password"
                className="form-control password__input__input c-form__input"
                id="ConfirmPassword"
                placeholder="請輸入..."
              />
            </div>
            <div>
              <button
                type="submit"
                className="c-product-filter__action e-btn--primary e-btn--medium col-12"
              >
                儲存變更
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditPassWord;
