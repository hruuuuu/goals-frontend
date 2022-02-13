import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
<<<<<<< HEAD
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
import FavItem from '../components/Fav/FavItem';
=======
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
>>>>>>> d9049c77b0603eeb9e7031ce679e3c91bcb389be

function Fav() {
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
            <MemberSidebar />
          </div>
          <div className="col-lg-9">
            <FavList />
          </div>
=======
          <div className="col-md-3 d-none d-md-block">
            <MemberSidebar />
          </div>
          <div className="col col-md-9">{/* components可以放這裡 */}</div>
        </div>

        {/* 浮動視窗 */}
        <div className="d-md-none">
          <FloatingIcon setIsDisplay={setIsDisplay} />
          {isDisplay && (
            <FloatingModal isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
          )}
>>>>>>> d9049c77b0603eeb9e7031ce679e3c91bcb389be
        </div>
      </div>
      <ProductDetail />
    </>
  );
}

export default Fav;
