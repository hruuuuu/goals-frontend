import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import Image from '../img/sign/login.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

import { API_URL } from '../utils/config';

const ResetPassword = () => {
  const history = useNavigate();
  const { pathname } = useLocation();

  const email = pathname
    .slice(7, pathname.length - 1)
    .split('&')[0]
    .split('=')[1];

  const verifyString = pathname
    .slice(7, pathname.length)
    .split('&')[1]
    .split('=')[1];
  console.log(verifyString);

  // const verifyString =
  // 切換看得到/看不到密碼
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const handleSwitchEyes = (e) => {
    if (e.target.id === 'password') {
      setPassword(!password);
    } else {
      setConfirmPassword(!confirmPassword);
    }
  };

  const resetValidationSchema = Yup.object({
    // Yup套件會驗證輸入格式
    // email用帶入的
    // email: Yup.string().email('電子信箱格式錯誤').required('此欄位必填'),
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
        <label htmlFor={props.id || props.name} className="reset-form_label">
          {label}
        </label>
        <input {...field} {...props} />

        {props.type === 'hidden' ? null : (
          <i
            className={props.type === 'email' ? iconName.email : iconName.lock}
          ></i>
        )}

        {field.name === 'password' ? (
          <i
            className={password ? iconName.closeEye : iconName.openEye}
            id="password"
            onClick={(e) => handleSwitchEyes(e)}
          ></i>
        ) : field.name === 'confirmPassword' ? (
          <i
            className={confirmPassword ? iconName.closeEye : iconName.openEye}
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
    try {
      const resetData = await axios.post(`${API_URL}/verify/reset`, values, {
        withCredentials: true,
      });
      console.log(resetData);
      if (resetData.status === 200 && resetData.data.code < 30000) {
        Toast.fire({
          icon: 'success',
          html: resetData.data.msg,
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
        history('/login');
      } else {
        Toast.fire({
          icon: 'error',
          html: resetData.data.msg,
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="reset-page">
        <img src={Image} alt="" className="reset-page_background" />
        <div className="reset-form-Wrapper">
          <h2 className="reset-form-title">重設密碼</h2>
          <Formik
            initialValues={{
              email,
              password: '',
              confirmPassword: '',
              verifyString,
            }}
            validationSchema={resetValidationSchema}
            onSubmit={(values, { resetForm, submitForm, setSubmitting }) => {
              setSubmitting(false);
              submitHandler(values);
              resetForm();
            }}
          >
            {(props) => (
              <Form className="reset-form">
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="顯示用戶電子信箱"
                  className="form-control"
                  label="電子信箱"
                  readOnly
                />
                <CustomInput
                  type={!password ? 'password' : 'text'}
                  id="password"
                  name="password"
                  placeholder="請輸入密碼"
                  className="form-control"
                  label="密碼"
                />

                <CustomInput
                  type={!confirmPassword ? 'password' : 'text'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="請再次輸入密碼"
                  className="form-control"
                  label="再次輸入密碼"
                  onPaste={(e) => e.preventDefault()}
                />

                <CustomInput
                  type="hidden"
                  id="verifyString"
                  name="verifyString"
                />

                <button
                  type="submit"
                  className="reset-form_button"
                  disabled={props.isSubmitting}
                >
                  重設密碼
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
