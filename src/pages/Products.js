/* P */
import { React, useState, useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import Header from '../components/Header';
import Filter from '../components/Products/Filter';
import ProductList from '../components/Products/ProductList';
<<<<<<< HEAD
=======
import ProductDetail from '../components/Products/ProductDetail';
import FilterMobile from '../components/Products/FilterMobile';
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
import FloatingIcon from '../components/FloatingIcon';
import FloatingMenu from '../components/FloatingMenu';

function Products() {
  const [isDisplay, setIsDisplay] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [show, setShow] = useState({
    in: false,
    out: false,
=======
  const [category, setCategory] = useState({
    id: '',
    name: '',
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52
  });
  const matchProduct = useMatch('/product');
  const matchProducts = useMatch('/product/:productId');
  const isLower = () => {
    if (matchProduct !== null || matchProducts !== null) {
      return true;
    }
  };
<<<<<<< HEAD
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
=======

>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52
  return (
    <>
      <Header isLower={isLower} />
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-lg-4 col-xl-3 d-none d-lg-block">
            <Filter device="desktop" />
          </div>
<<<<<<< HEAD
          <div className="col-12 col-lg-9">
            <ProductList />
=======
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="l-product">
              <ProductList category={category} setCategory={setCategory} />
            </div>
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52
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
<<<<<<< HEAD
=======
      <FilterMobile />
<<<<<<< HEAD
      <ProductDetail show={show} setShow={setShow} />
>>>>>>> 4222b20c68ca4b4facce28b51a7a3ebf0e6a0df3
=======
      <ProductDetail category={category} setCategory={setCategory} />
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52
    </>
  );
}

export default Products;
