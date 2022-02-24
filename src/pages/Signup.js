import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from '../context/LoginStatus';
import Image from '../img/sign/login.jpg';
import SignupModal from '../components/Signup/Modal';
import SocialArea from '../components/Signup/SocialArea';
import CustomForm from '../components/Signup/CustomForm';

const Signup = () => {
  const history = useNavigate();
  const { login, setLogin, loginOption, setLoginOption } = useLogin();
  // 預設false為登入頁面
  const [page, setPage] = useState(false);

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

  // 設定modal提交重發驗證信/忘記密碼
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!page) {
      const forgetEmail = await axios.post(
        `${process.env.BACKEND_API_URL}/api/verify/forget`,
        data,
        { withCredentials: true }
      );
      setShow(false);
      if (forgetEmail.status === 200 && forgetEmail.data.code < 30000) {
        alert(forgetEmail.data.msg);
        setTimeout(() => {
          history('/');
        });
      } else {
        alert(forgetEmail.data.msg);
        setTimeout(() => {
          history('/');
        });
      }
    } else {
      console.log(data);
      const reVerifyEmail = await axios.post(
        `${process.env.BACKEND_API_URL}/api/verify/resend`,
        data,
        { withCredentials: true }
      );
      setShow(false);
      if (reVerifyEmail.status === 200 && reVerifyEmail.data.code < 30000) {
        alert(reVerifyEmail.data.msg);
        setTimeout(() => {
          history('/');
        });
      } else {
        alert(reVerifyEmail.data.msg);
        setTimeout(() => {
          history('/');
        });
      }
    }
  };

  // google登入
  const handleGoogleLogIn = async (googleData) => {
    const loginResult = await axios.post(
      `${process.env.BACKEND_API_URL}/api/social/google`,
      { access_token: googleData.accessToken },
      {
        withCredentials: true,
      }
    );

    console.log(loginResult);
    if (loginResult.status === 200) {
      localStorage.setItem('login', true);
      setLogin(true);
      setLoginOption({
        ...loginOption,
        google: true,
      });
    }
    history('/');
  };

  // Facebook登入
  // const handleFacebookLogIn = async () => {
  //   const loginResult = await axios.post(
  //     `${process.env.BACKEND_API_URL}/api/social/facebook`,
  //     { withCredentials: true }
  //   );
  //   console.log(loginResult);
  // };

  if (login) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="signup-page">
        <img src={Image} alt="" className="signup-page_background" />
        <div className="signup-form-wrapper">
          <h2 className="signup-form_title">{!page ? '登入' : '註冊'}</h2>
          <CustomForm
            page={page}
            setLogin={setLogin}
            loginOption={loginOption}
            setLoginOption={setLoginOption}
            setPage={setPage}
            handleShow={handleShow}
          />
          {!page && (
            <SocialArea
              handleGoogleLogIn={handleGoogleLogIn}
              // handleFacebookLogIn={handleFacebookLogIn}
            />
          )}
          <SignupModal
            page={page}
            show={show}
            handleClose={handleClose}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
