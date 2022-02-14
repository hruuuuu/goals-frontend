import { React, useState } from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
<<<<<<< HEAD
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
=======
import FloatingMember from '../components/FloatingMember';
>>>>>>> 91b86376962f4e954d101139237cf8a481c287c1

function Cart() {
  const [isDisplay, setIsDisplay] = useState(false);

  return (
    <>
      <Header />
      <div className="container mainContent">
        <div className="row gx-4 h-100">
<<<<<<< HEAD
          <div className="col-md-3 d-none d-md-block">
=======
          <div className="col-lg-3 d-none d-lg-block">
>>>>>>> 91b86376962f4e954d101139237cf8a481c287c1
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
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
