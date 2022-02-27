import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from '../context/LoginStatus';
import Image from '../img/sign/login.jpg';
import SignupModal from '../components/Signup/Modal';
import SocialArea from '../components/Signup/SocialArea';
import CustomForm from '../components/Signup/CustomForm';
import Swal from 'sweetalert2';

import { API_URL } from '../utils/config';

const Signup = () => {
  const history = useNavigate();
  const { login, setLogin, isSocial, setIsSocial } = useLogin();
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
      const forgetEmail = await axios.post(`${API_URL}/verify/forget`, data, {
        withCredentials: true,
      });
      setShow(false);
      if (forgetEmail.status === 200 && forgetEmail.data.code < 30000) {
        Swal.fire({
          icon: 'success',
          html: forgetEmail.data.msg,
        });
        setTimeout(() => {
          history('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          html: forgetEmail.data.msg,
        });
        setTimeout(() => {
          history('/');
        });
      }
    } else {
      console.log(data);
      const reVerifyEmail = await axios.post(`${API_URL}/verify/resend`, data, {
        withCredentials: true,
      });
      setShow(false);
      if (reVerifyEmail.status === 200 && reVerifyEmail.data.code < 30000) {
        Swal.fire({
          icon: 'success',
          html: reVerifyEmail.data.msg,
        });
        setTimeout(() => {
          history('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          html: reVerifyEmail.data.msg,
        });
        setTimeout(() => {
          history('/');
        });
      }
    }
  };

  // google登入
  const handleGoogleLogIn = async (googleData) => {
    const loginResult = await axios.post(
      `${API_URL}/social/google`,
      { access_token: googleData.accessToken },
      {
        withCredentials: true,
      }
    );
    if (loginResult.status === 200 && loginResult.data.code < 30000) {
      setLogin(true);
      setIsSocial(true);
      Swal.fire({
        icon: 'success',
        html: loginResult.data.msg,
      });
      setTimeout(() => {
        history('/');
      });
    } else {
      Swal.fire({
        icon: 'error',
        html: loginResult.data.msg,
      });
      setTimeout(() => {
        history('/');
      });
    }
  };

  // Facebook憑證
  // const handleGetFacebookCredential = async () => {
  //   try {
  //     const loginResult = await axios.post(
  //       `${API_URL}/social/facebook/getCredential`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log('loginResult', loginResult);
  //   } catch (err) {
  //     console.error(err);
  //   }
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
            isSocial={isSocial}
            setIsSocial={setIsSocial}
            setPage={setPage}
            handleShow={handleShow}
          />
          {!page && (
            <SocialArea
              handleGoogleLogIn={handleGoogleLogIn}
              setLogin={setLogin}
              setIsSocial={setIsSocial}
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
