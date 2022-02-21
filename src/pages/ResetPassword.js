import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import Image from '../img/sign/login.jpg';

const ResetPassword = () => {
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
        <i
          className={props.type === 'email' ? iconName.email : iconName.lock}
        ></i>

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
    console.log('測試');
  };

  // const [showPassword, setShowPassword] = useState(false);
  // const [eye, setEye] = useState('');

  // const handleSwitchEyes = (e) => {
  //   setShowPassword(!showPassword);
  //   setEye(e.target.id);
  //   if (!showPassword) {
  //     $(e.target).parent().children()[0].type = 'text';
  //   } else {
  //     $(e.target).parent().children()[0].type = 'password';
  //   }
  // };

  return (
    <>
      <div className="reset-page">
        <img src={Image} alt="" className="reset-page_background" />
        <div className="reset-form-Wrapper">
          <h2 className="reset-form-title">重設密碼</h2>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={resetValidationSchema}
            onSubmit={(values, { resetForm, submitForm, setSubmitting }) => {
              setSubmitting(false);
              resetForm();
              submitForm();
              submitHandler(values);
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
                  disabled
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
          {/* <form className="reset-form">
            <div className="form-floating">
              <input
                type="email"
                id="showEmail"
                name="showEmail"
                placeholder="顯示用戶電子信箱"
                className="form-control"
                disabled
              />
              <i className="fas fa-envelope"></i>
              <label htmlFor="showEmail" className="reset-form_label">
                電子信箱
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="請輸入新密碼"
                className="form-control"
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'newPassword' ? (
                <i
                  className="fas fa-eye-slash"
                  id="newPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="newPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="newPassword" className="reset-form_label">
                新密碼
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="請再次輸入新密碼"
                className="form-control"
                onPaste={(e) => e.preventDefault()}
              />
              <i className="fas fa-lock"></i>
              {showPassword && eye === 'confirmNewPassword' ? (
                <i
                  className="fas fa-eye-slash"
                  id="confirmNewPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye"
                  id="confirmNewPassword"
                  onClick={(e) => handleSwitchEyes(e)}
                ></i>
              )}
              <label htmlFor="confirmNewPassword" className="reset-form_label">
                確認新密碼
              </label>
            </div>
            <button className="reset-form_button">重設密碼</button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
