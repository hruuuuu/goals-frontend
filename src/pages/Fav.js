import { React, useState, useEffect } from 'react';

import { useFav } from '../context/fav';

import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FavList from '../components/Fav/FavList';
import FloatingMember from '../components/FloatingMember';
import FloatingChat from '../components/FloatingChat';

function Fav() {
  const [isDisplay, setIsDisplay] = useState(false);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
          <div className="col-lg-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <div className="l-fav">
              <FavList />
            </div>
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <FloatingChat />
    </>
  );
}

export default Fav;
