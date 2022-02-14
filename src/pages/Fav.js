import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
import FloatingMember from '../components/FloatingMember';
import FloatingIcon from '../components/FloatingMember';

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
            <FavList />
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <ProductDetail />
    </>
  );
}

export default Fav;
