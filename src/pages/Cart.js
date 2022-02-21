import { React, useState } from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

import FloatingMember from '../components/FloatingMember';

function Cart() {
  const [isDisplay, setIsDisplay] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
  return (
    <>
      <Header />
      <div className="container mainContent">
<<<<<<< HEAD
        <div className="row h-100">
          <div className="col-md-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-md-9">
=======
        <div className="row gx-4 h-100">
          <div className="col-lg-3 col-xl-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-xl-9 col-lg-9 col-md-12 col-sm-12">
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
            <CartList />
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

export default Cart;
