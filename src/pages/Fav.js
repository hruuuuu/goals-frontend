import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import ProductDetail from '../components/Products/ProductDetail';
import FavList from '../components/Fav/FavList';
import FavItem from '../components/Fav/FavItem';

function Fav() {
  return (
    <>
      <Header />
      <div className="container">
<<<<<<< HEAD
        <div className="row">
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
        </div>
      </div>
      <ProductDetail />
    </>
  );
}

export default Fav;
