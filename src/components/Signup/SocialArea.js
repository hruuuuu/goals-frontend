import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { API_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialArea = ({ handleGoogleLogIn, setLogin, setIsSocial }) => {
  const history = useNavigate();
  // Facebook登入
  const handleFacebookLogIn = async (response) => {
    if (response.status === 'unknown') {
      Swal.fire({
        icon: 'error',
        html: '授權失敗',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (!result.isConfirmed) {
          history('/');
          return;
        }
      });
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
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
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
        &mdash;
        <span className="another-login_title">
          Or Continue With Social Media
        </span>
        &mdash;
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
