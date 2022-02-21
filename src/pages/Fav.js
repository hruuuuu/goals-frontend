import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
<<<<<<< HEAD
import FloatingModal from '../components/MemberSidebar/FloatingModal';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
=======
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
import FloatingMember from '../components/FloatingMember';
import FloatingIcon from '../components/FloatingMember';
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3

function Fav() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <h1>Fav</h1>

      <div className="container">
<<<<<<< HEAD
        <div className="row">
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
        </div>
      </div>
=======
        <div className="row gx-4">
          <div className="col-lg-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9">
            <div className="l-fav">
              <FavList />
            </div>
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
<<<<<<< HEAD
      <ProductDetail />
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
=======
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52
    </>
  );
}

export default Fav;
