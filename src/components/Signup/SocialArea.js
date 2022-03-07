import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { API_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialArea = ({ handleGoogleLogIn, setLogin, setIsSocial }) => {
  const history = useNavigate();
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
  // Facebook登入
  const handleFacebookLogIn = async (response) => {
    if (response.status === 'unknown') {
      Toast.fire({
        icon: 'error',
        html: '授權失敗',
        customClass: {
          popup: 'c-alert__toast',
          title: 'c-alert__subtitle',
        },
      });
      // Swal.fire({
      //   icon: 'error',
      //   html: '授權失敗',
      //   showCancelButton: true,
      //   cancelButtonText: 'OK',
      //   focusConfirm: false,
      //   buttonsStyling: false,
      //   customClass: {
      //     container: 'c-alert__overlay',
      //     popup: 'c-alert__modal',
      //     title: 'c-alert__title',
      //     htmlContainer: 'c-alert__text',
      //     cancelButton: 'e-btn e-btn--cancel e-btn--medium',
      //   },
      // }).then((result) => {
      //   if (!result.isConfirmed) {
      //     history('/');
      //     return;
      //   }
      // });
    }
    const sendFBData = await axios.post(
      `${API_URL}/social/facebook`,
      { access_token: response.accessToken },
      {
        withCredentials: true,
      }
    );
    if (sendFBData.status === 200 && sendFBData.data.code < 30000) {
      Swal.fire({
        icon: 'success',
        html: sendFBData.data.msg,
        focusConfirm: false,
        buttonsStyling: false,
        confirmButtonText: 'OK',
        showConfirmButton: true,
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
  return (
    <div className="another-login">
      <p className="another-login_title-wrapper">
        <span className="another-login_title">
          Or Continue With Social Media
        </span>
      </p>
      <div className="another-login_buttons">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={handleGoogleLogIn}
          onFailure={handleGoogleLogIn}
        />
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
          autoLoad={false}
          icon="fa-facebook"
          textButton="Facebook"
          fields="name,email"
          callback={handleFacebookLogIn}
        />
      </div>
    </div>
  );
};

export default SocialArea;
