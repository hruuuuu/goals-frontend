import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../utils/config';

const CustomForm = ({ page, setPage, setLogin, handleShow }) => {
  const history = useNavigate();
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

  // 切換登入或註冊頁面
  const switchPageHandler = () => {
    setPage(!page);
    setPasswordField(false);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  // 提交表單
  const submitHandler = async (values) => {
    try {
      if (!page) {
        const loginData = await axios.post(`${API_URL}/auth/login`, values, {
          withCredentials: true,
        });
        const userProfile = loginData.data;
        if (loginData.status === 200 && userProfile.code < 30000) {
          Swal.fire({
            icon: 'success',
            html: userProfile.msg,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            focusConfirm: false,
            buttonsStyling: false,
            customClass: {
              container: 'c-alert__overlay',
              popup: 'c-alert__modal',
              title: 'c-alert__title',
              htmlContainer: 'c-alert__text',
              confirmButton: 'e-btn e-btn--plain e-btn--medium',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              setLogin(true);
              history('/');
            }
          });
        } else {
          Toast.fire({
            icon: 'error',
            html: userProfile.msg,
            customClass: {
              popup: 'c-alert__toast',
              title: 'c-alert__subtitle',
            },
          });
          // Swal.fire({
          //   icon: 'error',
          //   html: userProfile.msg,
          //   showConfirmButton: true,
          //   confirmButtonText: 'OK',
          //   focusConfirm: false,
          //   buttonsStyling: false,
          //   customClass: {
          //     container: 'c-alert__overlay',
          //     popup: 'c-alert__modal',
          //     title: 'c-alert__title',
          //     htmlContainer: 'c-alert__text',
          //     confirmButton: 'e-btn e-btn--plain e-btn--medium',
          //   },
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     history('/login');
          //   }
          // });
        }
      } else {
        const signupData = await axios.post(`${API_URL}/auth/signup`, values, {
          withCredentials: true,
        });
        const userProfile = signupData.data;
        if (signupData.status === 200 && userProfile.code < 30000) {
          Swal.fire({
            icon: 'success',
            html: userProfile.msg,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            focusConfirm: false,
            buttonsStyling: false,
            customClass: {
              container: 'c-alert__overlay',
              popup: 'c-alert__modal',
              title: 'c-alert__title',
              htmlContainer: 'c-alert__text',
              confirmButton: 'e-btn e-btn--plain e-btn--medium',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              history('/');
            }
          });
        } else {
          Toast.fire({
            icon: 'error',
            html: userProfile.msg,
            customClass: {
              popup: 'c-alert__toast',
              title: 'c-alert__subtitle',
            },
          });
          // Swal.fire({
          //   icon: 'error',
          //   html: userProfile.msg,
          //   showConfirmButton: true,
          //   confirmButtonText: 'OK',
          //   focusConfirm: false,
          //   buttonsStyling: false,
          //   customClass: {
          //     container: 'c-alert__overlay',
          //     popup: 'c-alert__modal',
          //     title: 'c-alert__title',
          //     htmlContainer: 'c-alert__text',
          //     confirmButton: 'e-btn e-btn--plain e-btn--medium',
          //   },
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     history('/login');
          //   }
          // });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 登入初值
  const loginInitValue = {
    email: '',
    password: '',
    confirmPassword: '',
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
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        '需包含一個英文字母，一個數字'
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
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        '需包含一個英文字母，一個數字'
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

  return (
    <Formik
      initialValues={!page ? loginInitValue : signupInitValue}
      validationSchema={!page ? loginValidationSchema : signupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(false);
        submitHandler(values);
        resetForm();
      }}
    >
      {(props) => (
        <Form className="signup-form">
          <CustomInput
            type="email"
            id="email"
            name="email"
            placeholder="請輸入電子信箱"
            className="form-control c-form__input"
            label="電子信箱"
          />
          <CustomInput
            type={!passwordField ? 'password' : 'text'}
            id="password"
            name="password"
            placeholder="請輸入密碼"
            className="form-control c-form__input"
            label="密碼"
          />
          {!page ? null : (
            <CustomInput
              type={!confirmPasswordField ? 'password' : 'text'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="請再次輸入密碼"
              className="form-control c-form__input"
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
            className="e-btn e-btn--primary e-btn--w100 e-btn--medium mt-3"
            disabled={props.isSubmitting}
          >
            {!page ? '登入' : '註冊'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
