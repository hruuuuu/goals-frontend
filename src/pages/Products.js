import { React, useState } from 'react';

import Header from '../components/Header';
import Filter from '../components/Products/Filter';
import ProductList from '../components/Products/ProductList';
import ProductDetail from '../components/Products/ProductDetail';
import FloatingIcon from '../components/FloatingIcon';
import FloatingMenu from '../components/FloatingMenu';

function Products() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [show, setShow] = useState({
    in: true,
    out: false,
  });
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-3 d-none d-lg-block">
            <Filter />
          </div>
          <div className="col-12 col-lg-9">
            <ProductList show={show} setShow={setShow} />
          </div>
        </div>
        <FloatingIcon setIsDisplay={setIsDisplay} />
        {isDisplay && (
          <FloatingMenu isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
        )}
      </div>
      <ProductDetail show={show} setShow={setShow} />
    </>
  );
}

export default Products;
