import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { Modal } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from '../context/LoginStatus';
import Image from '../img/sign/login.jpg';

const Signup = () => {
  const history = useNavigate();
  const { login, setLogin } = useLogin();
  // 切換看得到/看不到密碼
  const [passwordField, setPasswordField] = useState(false);
  const [confirmPasswordField, setConfirmPasswordField] = useState(false);
  const handleSwitchEyes = (e) => {
    if (e.target.id === 'password') {
      setPasswordField(!passwordField);
    } else {
      setConfirmPasswordField(!confirmPasswordField);
    }
  };

  // 預設false為登入頁面
  const [page, setPage] = useState(false);

  // 切換登入或註冊頁面
  const switchPageHandler = () => {
    setPage(!page);
    setPasswordField(false);
  };

  // 設定modal畫面
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 設定modal Email
  const [data, setData] = useState({
    email: '',
  });

  // 設定modal輸入
  const handleChange = (e) => {
    setData({
      email: e.target.value,
    });
  };

  // 設定modal提交忘記密碼
  // const handleForgetSubmit = async () => {
  //   setShow(false);
  //   console.log(email);
  // };

  // 設定modal提交重發驗證信
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!page) {
      const forgetEmail = await axios.post(
        'http://127.0.0.1:3002/api/verify/forget',
        data,
        { withCredentials: true }
      );
      console.log(forgetEmail);
      setShow(false);
    } else {
      console.log(data);
      const reVerifyEmail = await axios.post(
        'http://127.0.0.1:3002/api/verify/resend',
        data,
        { withCredentials: true }
      );
      console.log(reVerifyEmail);
      setShow(false);
      if (reVerifyEmail.status === 200) {
        history('/');
      }
    }
  };

  // 登入初值
  const loginInitValue = {
    email: '',
    password: '',
  };

  // 註冊初值
  const signupInitValue = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  // 註冊模板
  const signupValidationSchema = Yup.object({
    // Yup套件會驗證輸入格式
    email: Yup.string().email('電子信箱格式錯誤').required('此欄位必填'),
    password: Yup.string()
      .min('6', '密碼長度至少為6')
      .required('此欄位必填')
      .matches(
        /^(?=[A-Za-z]*.)(?=\d*.)(?=[!@#$%&*?]*.)[A-Za-z\d!@#$%&*?]{6,}$/,
        '密碼長度至少為6，或至少包含一個符號'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '與密碼欄位不相符')
      .required('此欄位必填'),
  });

  // 登入模板
  const loginValidationSchema = Yup.object({
    // Yup套件會驗證輸入格式
    email: Yup.string().email('電子信箱格式錯誤').required('此欄位必填'),
    password: Yup.string()
      .min('6', '密碼長度至少為6')
      .required('此欄位必填')
      .matches(
        /^(?=[A-Za-z]*.)(?=\d*.)(?=[!@#$%&*?]*.)[A-Za-z\d!@#$%&*?]{6,}$/,
        '密碼長度至少為6，或至少包含一個符號'
      ),
  });

  // 客製化輸入設定
  const CustomInput = ({ label, ...props }) => {
    // field 是一個object包含了 onChange, onBlur, name, and value
    // meta 是一個object包含了 value, touched, error, and initialValue(顯示error，如果該輸入值是invalid且被訪問過)
    const [field, meta] = useField(props);
    const [iconName, setIconName] = useState({
      email: 'fas fa-envelope',
      lock: 'fas fa-lock',
      openEye: 'fas fa-eye',
      closeEye: 'fas fa-eye-slash',
    });

    if (login) {
      return <Navigate to="/" />;
    }

    return (
      <div className="form-floating">
        <label htmlFor={props.id || props.name} className="signup-form_label">
          {label}
        </label>
        <input {...field} {...props} />
        <i
          className={props.type === 'email' ? iconName.email : iconName.lock}
        ></i>

        {field.name === 'password' ? (
          <i
            className={passwordField ? iconName.closeEye : iconName.openEye}
            id="password"
            onClick={(e) => handleSwitchEyes(e)}
          ></i>
        ) : field.name === 'confirmPassword' ? (
          <i
            className={
              confirmPasswordField ? iconName.closeEye : iconName.openEye
            }
            id="confirmPassword"
            onClick={(e) => handleSwitchEyes(e)}
          ></i>
        ) : null}

        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const submitHandler = async (values) => {
    console.log('測試');
    try {
      if (!page) {
        const loginData = await axios.post(
          'http://127.0.0.1:3002/api/auth/login',
          values,
          { withCredentials: true }
        );
        if (loginData.status === 200) {
          localStorage.setItem('login', true);
          setLogin(true);
        } else {
          console.log(loginData.status);
        }
        history('/');
      } else {
        const signupData = await axios.post(
          'http://127.0.0.1:3002/api/auth/signup',
          values,
          { withCredentials: true }
        );
        console.log(signupData.data);
        if (signupData.status === 200) {
          history('/');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="signup-page">
        <img src={Image} alt="" className="signup-page_background" />
        <div className="signup-form-wrapper">
          <h2 className="signup-form_title">{!page ? '登入' : '註冊'}</h2>
          <Formik
            initialValues={!page ? loginInitValue : signupInitValue}
            validationSchema={
              !page ? loginValidationSchema : signupValidationSchema
            }
            onSubmit={(values, { resetForm, submitForm, setSubmitting }) => {
              // console.log('Test');
              setSubmitting(false);
              resetForm();
              submitForm();
              submitHandler(values);
            }}
          >
            {(props) => (
              <Form className="signup-form">
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="請輸入電子信箱"
                  className="form-control"
                  label="電子信箱"
                />
                <CustomInput
                  type={!passwordField ? 'password' : 'text'}
                  id="password"
                  name="password"
                  placeholder="請輸入密碼"
                  className="form-control"
                  label="密碼"
                />
                {!page ? null : (
                  <CustomInput
                    type={!confirmPasswordField ? 'password' : 'text'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="請再次輸入密碼"
                    className="form-control"
                    label="再次輸入密碼"
                  />
                )}
                {!page ? (
                  <div className="login-form_switch-page-wrapper">
                    <p
                      className="login-form_switch-page"
                      onClick={() => {
                        switchPageHandler();
                        props.resetForm();
                      }}
                    >
                      尚未有帳戶？
                    </p>
                    <p className="login-form_switch-page" onClick={handleShow}>
                      忘記密碼
                    </p>
                  </div>
                ) : (
                  <div className="login-form_switch-page-wrapper">
                    <p
                      className="signup-form_switch-page"
                      onClick={() => {
                        switchPageHandler();
                        props.resetForm();
                      }}
                    >
                      已經有帳戶了？
                    </p>
                    <p className="signup-form_switch-page" onClick={handleShow}>
                      重發驗證信
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="signup-form_button"
                  disabled={props.isSubmitting}
                >
                  {!page ? '登入' : '註冊'}
                </button>
              </Form>
            )}
          </Formik>
          {!page && (
            <div className="another-login">
              <p className="another-login_title-wrapper">
                &mdash;
                <span className="another-login_title">
                  Or Continue With Social Media
                </span>
                &mdash;
              </p>
              <div className="another-login_buttons">
                <button className="another-login_button google">
                  <i className="fab fa-google"></i>
                </button>
                <button className="another-login_button facebook">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="another-login_button line">
                  <i className="fab fa-line"></i>
                </button>
              </div>
            </div>
          )}
          <>
            <Modal show={show} onHide={handleClose}>
              <div className="modal-wrapper">
                <p className="modal_close-button" onClick={handleClose}>
                  <i className="fas fa-arrow-left"></i>
                </p>
                <h1 className="modal-title">
                  {!page ? '忘記密碼' : '重寄驗證信'}
                </h1>
                <p className="modal-statement">
                  請輸入您的電子信箱，我們將會傳送
                  {!page ? '忘記密碼' : '重寄驗證信'}的鏈結給您。
                </p>
                <div className="modal-form">
                  <label htmlFor="remail" className="modal_form-label">
                    電子信箱
                  </label>
                  <input
                    type="email"
                    id="remail"
                    name="remail"
                    placeholder="請填入您的電子信箱"
                    className="modal_form-Input form-control"
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="modal_submit-button"
                    onClick={handleSubmit}
                  >
                    送出
                  </button>
                </div>
              </div>
            </Modal>
          </>

          {/* <form className="signup-form">
            <div className="form-floating">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="請輸入電子信箱"
                className="form-control"
              />
              <i className="fas fa-envelope"></i>
              <label htmlFor="email" className="signup-form_label">
                電子信箱
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="請輸入密碼"
                className="form-control"
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'password' ? (
                <i
                  className="fas fa-eye-slash"
                  id="password"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="password"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="password" className="signup-form_label">
                密碼
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="請再次輸入密碼"
                className="form-control"
                onPaste={(e) => e.preventDefault()}
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'confirmPassword' ? (
                <i
                  className="fas fa-eye-slash"
                  id="confirmPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="confirmPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="confirmPassword" className="signup-form_label">
                再次輸入密碼
              </label>
            </div>
            <Link to="/login">
              <p className="signup-form_switch-page">已經有帳戶了？</p>
            </Link>
            <button className="signup-form_button">註冊</button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
