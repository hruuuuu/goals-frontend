import React from 'react';

const EditPassWord = () => {
  return (
    <form className="row g-3 my-3">
      <div className="alert" style={{ background: '#FAFAFA' }} role="alert">
        修改密碼
      </div>
      <label htmlFor="OldPassword" className="form-label ">
        舊密碼
      </label>
      <div className=" mb-2">
        <input
          type="password"
          className="form-control"
          id="OldPassword"
          placeholder="請輸入..."
        />
      </div>

      <label htmlFor="NewPassword" className="form-label">
        新密碼
      </label>
      <div className=" mb-2">
        <input
          type="password"
          className="form-control"
          id="NewPassword"
          placeholder="請輸入..."
        />
      </div>

      <label htmlFor="ConfirmPassword" className="form-label">
        確認密碼
      </label>
      <div className=" mb-2">
        <input
          type="password"
          className="form-control"
          id="ConfirmPassword"
          placeholder="請輸入..."
        />
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-primary col-12"
          style={{ background: '#6B9C66' }}
        >
          儲存變更
        </button>
      </div>
    </form>
  );
};

export default EditPassWord;
