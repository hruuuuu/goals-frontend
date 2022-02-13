import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';
import EditPassWord from '../components/Member/EditPassword';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
import FloatingMenu from '../components/FloatingMenu';

function Member() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <EditProfile />
            <EditPassWord />
          </div>
        </div>

        <div className="d-md-none">
          <FloatingIcon setIsDisplay={setIsDisplay} />
          {isDisplay && (
            <FloatingMenu isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
          )}
        </div>
      </div>
    </>
  );
}

export default Member;
