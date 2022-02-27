import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../../utils/config';

const EditPassWord = () => {
  const [member, setMember] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  const [data, setData] = useState([]);

  //取得已登入會員的ID
  const userID = JSON.parse(localStorage.getItem('user'));

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  // useEffect(() => {
  //   let getProfile = async () => {
  //     let response = await axios.post(`${API_URL}/member/getprofile`, userID, {
  //       withCredentials: true,
  //     });
  //     setData(response.data);
  //   };
  //   getProfile();
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    var user = Object.assign(userID, member);

    if (member.newpassword !== member.confirmpassword) {
      alert('新密碼與確認密碼不一致，請確認');
    } else if (member.oldpassword !== data[0].password) {
      alert('舊密碼輸入錯誤，請確認');
    } else {
      let response = await axios.post(`${API_URL}/member/editpassword`, user);

      alert('修改成功');
    }
  }

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
                autoComplete="on"
                name="oldpassword"
                value={member.oldpassword}
                onChange={handleChange}
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
                autoComplete="on"
                name="newpassword"
                value={member.newpassword}
                onChange={handleChange}
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
                autoComplete="on"
                name="confirmpassword"
                value={member.confirmpassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="c-product-filter__action e-btn--primary e-btn--medium col-12"
                onClick={handleSubmit}
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
