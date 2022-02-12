import { React, useState } from 'react';

import Header from '../components/Header';
import Filter from '../components/Products/Filter';
import ProductList from '../components/Products/ProductList';
import FloatingIcon from '../components/FloatingIcon';
import FloatingMenu from '../components/FloatingMenu';

function Products() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-3 d-none d-lg-block">
            <Filter />
          </div>
          <div className="col-12 col-lg-9">
            <ProductList />
          </div>
        </div>
        <FloatingIcon setIsDisplay={setIsDisplay} />
        {isDisplay && (
          <FloatingMenu isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
        )}
      </div>
    </>
  );
}

export default Products;
