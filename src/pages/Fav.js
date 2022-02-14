import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
<<<<<<< HEAD
import FavItem from '../components/Fav/FavItem';
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
=======
import FloatingMember from '../components/FloatingMember';
>>>>>>> 91b86376962f4e954d101139237cf8a481c287c1

function Fav() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
<<<<<<< HEAD
          <div className="col-md-3 d-none d-md-block">
=======
          <div className="col-lg-3 d-none d-lg-block">
>>>>>>> 91b86376962f4e954d101139237cf8a481c287c1
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
