import React from 'react';

const EditPassWord = () => {
  return (
    <form className="row g-3 my-3">
      <div className="alert" style={{ background: '#FAFAFA' }} role="alert">
        修改密碼
      </div>
      <label htmlFor="OldPassword" className="form-label c-search__heading">
        舊密碼
      </label>
      <div className=" mb-2">
        <input
          type="password"
          className="form-control password__input c-input"
          id="OldPassword"
          placeholder="請輸入..."
        />
      </div>

      <label htmlFor="NewPassword" className="form-label c-search__heading">
        新密碼
      </label>
      <div className=" mb-2">
        <input
          type="password"
          className="form-control password__input__input c-input"
          id="NewPassword"
          placeholder="請輸入..."
        />
      </div>

      <label htmlFor="ConfirmPassword" className="form-label c-search__heading">
        確認密碼
      </label>
      <div className=" mb-2">
        <input
          type="password"
          className="form-control password__input__input c-input"
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
    </form>
  );
};

export default EditPassWord;
