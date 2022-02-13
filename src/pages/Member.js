import React from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';
import EditPassWord from '../components/Member/EditPassword';

function Member() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row gx-4">
          <div className="col-md-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <EditProfile />
            <EditPassWord />
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
