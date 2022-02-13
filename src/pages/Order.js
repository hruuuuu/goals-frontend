import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import OrderList from '../components/Order/OrderList';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
import FloatingModal from '../components/MemberSidebar/FloatingModal';

function Order() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />

      <div className="container">
<<<<<<< HEAD
        <div className="row">
<<<<<<< HEAD
          <div className="col-lg-3 d-none d-md-block">
=======
        <div className="row gx-4">
          <div className="col-lg-3">
>>>>>>> 81bbfd97534cff3c4e7840e41ffbfe222e444ac9
=======
          <div className="col-md-3 d-none d-md-block">
>>>>>>> d9049c77b0603eeb9e7031ce679e3c91bcb389be
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <OrderList />
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

export default Order;
