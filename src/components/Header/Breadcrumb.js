import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb() {
  return (
    <>
      <div className="c-breadcrumb">
        <i className="fa-solid fa-leaf e-icon--primary"></i>
        <Link to="/">首頁</Link>
        <Link to="/products">商品列表</Link>
      </div>
    </>
  );
}

export default Breadcrumb;
