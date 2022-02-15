import React from 'react';

const EditProfile = () => {
  return (
    <>
      <form className="c-member-info">
        <div className="container">
          <div className="row gx-5 gy-4">
            <div className="c-member-info__title">修改基本資料</div>
            <div className="col-12">
              <label htmlFor="InputName" className="form-label c-form__label">
                姓名
              </label>
              <input
                type="text"
                className="form-control name__input c-form__input"
                id="InputName"
                placeholder="請輸入..."
              />
            </div>
            <div className="col-12">
              <label htmlFor="InputEmail" className="form-label c-form__label">
                Email
              </label>
              <input
                type="email"
                className="form-control name__input c-form__input"
                id="InputEmail"
                placeholder="請輸入..."
              />
            </div>
            <div className="col-12">
              <div className="row gx-3 gy-4">
                <div className="col-12 col-sm-6 col-lg-3">
                  <label
                    htmlFor="SelectCity"
                    className="form-label c-form__label"
                  >
                    縣市
                  </label>
                  <select
                    id="SelectCity"
                    className="form-select c-form__select"
                  >
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
                <div className="col-12 col-sm-6 col-lg-3">
                  <label
                    htmlFor="SelectDistrict"
                    className="form-label c-form__label"
                  >
                    鄉鎮市區
                  </label>
                  <select
                    id="SelectDistrict"
                    className="form-select c-form__select"
                  >
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
                <div className="col-12 col-sm-12 col-lg-6">
                  <label
                    htmlFor="inputAddress"
                    className="form-label c-form__label"
                  >
                    地址
                  </label>
                  <input
                    type="text"
                    className="form-control phone__input c-form__input"
                    id="inputAddress"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="InputPhone" className="form-label c-form__label">
                連絡電話
              </label>
              <input
                type="text"
                className="form-control phone__input c-form__input"
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
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
