import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
import FavItem from '../components/Fav/FavItem';

function Fav() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col-lg-9">
            <FavList />
          </div>
        </div>
      </div>
      <ProductDetail />
    </>
  );
}

export default Fav;
