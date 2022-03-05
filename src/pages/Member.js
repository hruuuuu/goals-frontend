import { React, useEffect, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';
import EditPassWord from '../components/Member/EditPassword';
import FloatingMember from '../components/FloatingMember';
import FloatingChat from '../components/FloatingChat';
import { useLogin } from '../context/LoginStatus';
import { Navigate } from 'react-router-dom';
import ScrollButton from '../components/ScrollButton';

function Member() {
  const [isDisplay, setIsDisplay] = useState(false);
  const { login } = useLogin();
  if (!login) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="u-margin u-margin--page-bottom">
        <div className="container">
          <div className="row gx-4">
            <div className="col-md-3 d-none d-lg-block">
              <MemberSidebar />
            </div>
            <div className="col col-lg-9">
              <EditProfile />
              <EditPassWord />
            </div>
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <FloatingChat />
      <ScrollButton />
    </>
  );
}

export default Member;
