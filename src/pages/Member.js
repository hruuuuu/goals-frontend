import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';
import EditPassWord from '../components/Member/EditPassword';
<<<<<<< HEAD
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

function Member() {
  const [isDisplay, setIsDisplay] = useState(false);
=======
import FloatingMember from '../components/FloatingMember';

function Member() {
  const [isDisplay, setIsDisplay] = useState(false);

>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
  return (
    <>
      <Header />
      <div className="container">
<<<<<<< HEAD
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
=======
        <div className="row gx-4">
          <div className="col-md-3 d-none d-lg-block">
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
            <MemberSidebar />
          </div>
          <div className="col col-md-9">
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
      {/* 浮動視窗 */}
      <FloatingMember />
    </>
  );
}

export default Member;
