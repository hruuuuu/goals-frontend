import { React, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import Header from '../components/Header';
import Filter from '../components/Products/Filter';
import ProductList from '../components/Products/ProductList';
import ProductDetail from '../components/Products/ProductDetail';
import FilterMobile from '../components/Products/FilterMobile';
import FloatingIcon from '../components/FloatingIcon';
import FloatingMenu from '../components/FloatingMenu';

function Products() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [show, setShow] = useState({
    in: false,
    out: false,
  });
  const matchProduct = useMatch('/product');
  const matchProducts = useMatch('/product/:productId');
  const isLower = () => {
    if (matchProduct !== null || matchProducts !== null) {
      return true;
    }
  };
  return (
    <>
      <Header isLower={isLower} />
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-3 d-none d-lg-block">
            <Filter device="desktop" />
          </div>
          <div className="col-12 col-lg-9">
            <ProductList show={show} setShow={setShow} />
          </div>
        </div>
        <FloatingIcon setIsDisplay={setIsDisplay} page="product" />
        {isDisplay && (
          <FloatingMenu
            isDisplay={isDisplay}
            setIsDisplay={setIsDisplay}
            page="product"
          />
        )}
      </div>
      <FilterMobile />
      <ProductDetail show={show} setShow={setShow} />
    </>
  );
}

export default Products;
