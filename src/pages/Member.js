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
        <div className="row">
          <div className="col-3">
            <MemberSidebar />
          </div>
          <div className="col-9">
            <EditProfile />
            <EditPassWord />
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
