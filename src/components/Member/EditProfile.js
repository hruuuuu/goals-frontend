import { React, useState, useEffect, Component } from 'react';
import axios from 'axios';
import TwCitySelector from '../../../node_modules/tw-city-selector/dist/tw-city-selector';
import { API_URL } from '../../utils/config';
import { useLogin } from '../../context/LoginStatus';
import { Form, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

// import $ from 'jquery';

const EditProfile = () => {
  const [member, setMember] = useState({});
  //取得已登入會員的資料
  const { user } = useLogin();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    let getProfile = async () => {
      let response = await axios.post(`${API_URL}/member/getprofile`, user, {
        withCredentials: true,
      });
      new TwCitySelector({
        el: '.my-selector-c',
        elCounty: '.county',
        elDistrict: '.district',
        countyValue: response.data[0].county, //預設填入從資料庫取回的資料
        districtValue: response.data[0].district,
      });
      setMember(response.data[0]);
    };
    getProfile();
  }, [user]);

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      Swal.fire('', '修改資料成功', 'success');
      let response = await axios.post(`${API_URL}/member/editprofile`, member);
    }
    setValidated(true);
  }

  return (
    <>
      <Form
        className="c-member-info"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="container">
          <div className="row gx-5 gy-4">
            <div className="c-member-info__title">修改基本資料</div>
            <Form.Group as={Col}>
              <Form.Label
                htmlFor="InputName"
                className="form-label c-form__label"
              >
                姓名
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control name__input c-form__input"
                id="InputName"
                placeholder="請輸入..."
                name="username"
                value={member.username ? member.username : ''}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                請輸入姓名
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Label
                htmlFor="InputEmail"
                className="form-label c-form__label"
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                className="form-control name__input c-form__input"
                id="InputEmail"
                placeholder="請輸入..."
                name="email"
                value={member.email ? member.email : ''}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                請輸入電子郵件
              </Form.Control.Feedback>
            </Form.Group>

            <div className="col-12">
              <div className="row gx-3 gy-4 my-selector-c">
                <div className="col-12 col-sm-6 col-lg-3">
                  <label
                    htmlFor="SelectCity"
                    className="form-label c-form__label"
                  >
                    縣市
                  </label>

                  <Form.Select
                    id="SelectCity"
                    className="form-select c-form__select county"
                    name="county"
                    value={member.county ? member.county : ''}
                    id="county"
                    onChange={handleChange}
                    required
                  ></Form.Select>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <label
                    htmlFor="SelectDistrict"
                    className="form-label c-form__label"
                  >
                    鄉鎮市區
                  </label>
                  <Form.Select
                    id="SelectDistrict"
                    className="form-select c-form__select district"
                    name="district"
                    value={member.district ? member.district : ''}
                    id="district"
                    onChange={handleChange}
                    required
                  ></Form.Select>
                </div>
                <Form.Group as={Col} lg="6" sm="12">
                  {/* <div className="col-12 col-sm-12 col-lg-6"> */}
                  <Form.Label
                    htmlFor="inputAddress"
                    className="form-label c-form__label"
                  >
                    地址
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control phone__input c-form__input"
                    id="inputAddress"
                    // name="address"
                    name="default_address"
                    value={member.default_address ? member.default_address : ''}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入地址
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <Form.Group as={Col}>
              <Form.Label
                htmlFor="InputPhone"
                className="form-label c-form__label"
              >
                連絡電話
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control phone__input c-form__input"
                id="InputPhone"
                name="default_tel"
                value={member.default_tel ? member.default_tel : ''}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                請輸入聯絡電話
              </Form.Control.Feedback>
            </Form.Group>
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
      </Form>
    </>
  );
};

export default EditProfile;
