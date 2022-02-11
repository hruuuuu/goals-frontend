import React from 'react';
import Header from '../components/Header';
import Filter from '../components/Products/Filter';
import ProductList from '../components/Products/ProductList';

function Products() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-5">
          <div className="col-3 d-none d-lg-block">
            <Filter />
          </div>
          <div className="col-12 col-lg-9">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
