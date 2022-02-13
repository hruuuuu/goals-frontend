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
        <div className="row gx-4 h-100">
          <div className="col-md-3 d-none d-md-block">
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
    </>
  );
}

export default Cart;
