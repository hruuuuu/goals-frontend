/* P */
import { React, useState, useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import Header from '../components/Header';
import Filter from '../components/Products/Filter';
import ProductList from '../components/Products/ProductList';
import ProductDetail from '../components/Products/ProductDetail';
import FilterMobile from '../components/Products/FilterMobile';
import FloatingIcon from '../components/FloatingIcon';
import FloatingMenu from '../components/FloatingMenu';
import FloatingChatIcon from '../components/FloatingChatIcon';
import FloatingChatModal from '../components/FloatingChatModal';

function Products() {
  /* 控制floatingMenu */
  const [isDisplay, setIsDisplay] = useState(false);
  /* 控制floatingChatModal */
  const [isExpand, setIsExpand] = useState(false);
  const [category, setCategory] = useState({
    id: '',
    name: '',
  });
  const matchProduct = useMatch('/product');
  const matchProducts = useMatch('/product/:productId');
  const isLower = matchProduct !== null || matchProducts !== null;

  return (
    <>
      <Header isLower={isLower} />
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-lg-4 col-xl-3 d-none d-lg-block">
            <Filter device="desktop" />
          </div>
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="l-product">
              <ProductList category={category} setCategory={setCategory} />
            </div>
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
      <ProductDetail category={category} setCategory={setCategory} />

      <FloatingChatIcon isExpand={isExpand} setIsExpand={setIsExpand} />
      {isExpand && (
        <FloatingChatModal isExpand={isExpand} setIsExpand={setIsExpand} />
      )}
    </>
  );
}

export default Products;
