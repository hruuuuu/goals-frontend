import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

function Fav() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <h1>Fav</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-md-9">{/* components可以放這裡 */}</div>
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

export default Fav;
