import React from 'react';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

const SocialArea = ({ handleGoogleLogIn }) => {
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
          // isSignedIn={true}
        />
        {/* <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
          icon="fa-facebook"
          textButton="Facebook"
          fields="name,email"
          scope="public_profile, email"
          onClick={handleFacebookLogIn}
        /> */}
      </div>
    </div>
  );
};

export default SocialArea;
