import { React, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const EditPassWord = () => {
  const [member, setMember] = useState({
    //id為登入會員的id

    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  const [data, setData] = useState([]);

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
    // console.log(123);
  }

  useEffect(() => {
    let getProfile = async () => {
      let response = await axios.get(
        `http://localhost:3002/api/member/getprofile`,
        {
          // 為了跨源存取 cookie
          withCredentials: true,
        }
      );
      setData(response.data);
    };
    getProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (member.newpassword !== member.confirmpassword) {
      alert('新密碼與確認密碼不一致，請確認');
    } else if (member.oldpassword !== data[0].password) {
      alert('舊密碼輸入錯誤，請確認');
    } else {
      // make API call
      let response = await axios.post(
        'http://127.0.0.1:3002/api/member//editpassword',
        member
      );

      alert('修改成功');
      console.log(response.data);
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
