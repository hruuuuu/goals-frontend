import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';
import EditPassWord from '../components/Member/EditPassword';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

function Member() {
  const [isDisplay, setIsDisplay] = useState(false);

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

        {/* 浮動視窗 */}
        <div className="d-md-none">
          <FloatingIcon setIsDisplay={setIsDisplay} />
          {isDisplay && (
            <FloatingModal isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
          )}
        </div>
      </div>
    </>
  );
}

export default Member;
