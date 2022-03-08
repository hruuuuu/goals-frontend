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
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  const handleClose = () => {
    setShow({ ...show, out: true });
    setTimeout(() => {
      setShow({ ...show, in: false, out: false });
    }, 500);
  };
  const handleShow = () => {
    setShow({ ...setShow, in: true });
  };

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

  // 設定modal提交重發驗證信/忘記密碼
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!page) {
      const forgetEmail = await axios.post(`${API_URL}/verify/forget`, data, {
        withCredentials: true,
      });
      setShow(false);
      if (forgetEmail.status === 200 && forgetEmail.data.code < 30000) {
        Toast.fire({
          icon: 'success',
          html: forgetEmail.data.msg,
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
      }
    } else {
      const reVerifyEmail = await axios.post(`${API_URL}/verify/resend`, data, {
        withCredentials: true,
      });
      setShow(false);
      if (reVerifyEmail.status === 200 && reVerifyEmail.data.code < 30000) {
        Toast.fire({
          icon: 'success',
          html: reVerifyEmail.data.msg,
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
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
      Swal.fire({
        icon: 'success',
        html: loginResult.data.msg,
        showConfirmButton: true,
        focusConfirm: false,
        buttonsStyling: false,
        confirmButtonText: 'OK',
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
          setIsSocial(true);
          history('/');
        }
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
