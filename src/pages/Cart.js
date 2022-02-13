import { React, useState } from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

function Cart() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container mainContent">
<<<<<<< HEAD
        <div className="row h-100">
<<<<<<< HEAD
          <div className="col-lg-3 d-none d-md-block">
=======
        <div className="row gx-4 h-100">
          <div className="col-lg-3">
>>>>>>> 81bbfd97534cff3c4e7840e41ffbfe222e444ac9
=======
          <div className="col-md-3 d-none d-md-block">
>>>>>>> d9049c77b0603eeb9e7031ce679e3c91bcb389be
            <MemberSidebar />
          </div>
          <div className="col col-md-9">
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
    </>
  );
}

export default Cart;
