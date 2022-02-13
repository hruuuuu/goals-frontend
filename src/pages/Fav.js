import React from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

function Fav() {
  return (
    <>
      <Header />
      <h1>Fav</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">{/* components可以放這裡 */}</div>
        </div>
      </div>
    </>
  );
}

export default Fav;
