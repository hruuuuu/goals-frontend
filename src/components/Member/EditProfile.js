import React from 'react';

const EditProfile = () => {
  return (
    <form className="row g-3 mb-3">
      <div className="alert" style={{ background: '#FAFAFA' }} role="alert">
        修改基本資料
      </div>

      <div className="mb-3 col-12">
        <label htmlFor="InputName" className="form-label c-search__heading">
          姓名
        </label>
        <input
          type="text"
          className="form-control name__input c-input"
          id="InputName"
          placeholder="請輸入..."
        />
      </div>

      <div className="mb-3 col-12 ">
        <label htmlFor="InputEmail" className="form-label c-search__heading">
          Email
        </label>
        <input
          type="email"
          className="form-control name__input c-input"
          id="InputEmail"
          placeholder="請輸入..."
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="SelectCity" className="form-label c-search__heading">
          縣市
        </label>
        <select id="SelectCity" className="form-select">
          <option value="DEFAULT" disabled>
            Choose a salutation ...
          </option>
          <option value="1">Mr</option>
          <option value="2">Mrs</option>
          <option value="3">Ms</option>
          <option value="4">Miss</option>
          <option value="5">Dr</option>
        </select>
      </div>

      <div className="col-md-2">
        <label
          htmlFor="SelectDistrict"
          className="form-label c-search__heading"
        >
          鄉鎮市區
        </label>
        <select id="SelectDistrict" className="form-select">
          <option value="DEFAULT" disabled>
            Choose a salutation ...
          </option>
          <option value="1">Mr</option>
          <option value="2">Mrs</option>
          <option value="3">Ms</option>
          <option value="4">Miss</option>
          <option value="5">Dr</option>
        </select>
      </div>

      <div className="col-md-8">
        <label htmlFor="inputAddress" className="form-label c-search__heading">
          地址
        </label>
        <input
          type="text"
          className="form-control phone__input c-input"
          id="inputAddress"
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="InputPhone" className="form-label c-search__heading">
          連絡電話
        </label>
        <input
          type="text"
          className="form-control phone__input c-input"
          id="InputPhone"
        />
      </div>

      <div className="col-12">
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

export default EditProfile;
