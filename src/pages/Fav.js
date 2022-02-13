import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
import FavItem from '../components/Fav/FavItem';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';

function Fav() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
          <div className="col-md-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <FavList />
          </div>
        </div>
      </div>
      <ProductDetail />

      {/* 浮動視窗 */}
      <div className="d-md-none">
        <FloatingIcon setIsDisplay={setIsDisplay} />
        {isDisplay && (
          <FloatingModal isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
        )}
      </div>
    </>
  );
}

export default Fav;
