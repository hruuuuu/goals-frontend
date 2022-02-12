import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Counter from './Counter';
import FavIcon from './FavIcon';

function ProductItem(props) {
  const { id, setOpen } = props;

  //params productId -> 打api用
  const { productId } = useParams();

  const handleOpen = () => setOpen(true);
  return (
    <>
      <div className="col-6 col-md-4">
        <div className="c-product-item">
          <div className="c-product-item__cover">
            {/* <button
              type="button"
              className="c-product-item__btn"
              onClick={handleOpen}
            >
              <img
                className="c-product-item__img"
                src={require('../../img/products/sunshine_bowl.jpeg')}
                alt="thumbnail"
              />
            </button> */}
            <Link to={`/product/${id}`} onClick={handleOpen}>
              <img
                className="c-product-item__img"
                src={require('../../img/products/sunshine_bowl.jpeg')}
                alt="thumbnail"
              />
            </Link>
            <FavIcon size="medium" />
          </div>
          <div className="c-product-item__tag e-tag e-tag--normal">
            素食餐盒
          </div>
          <div className="c-product-item__detail">
            <div className="c-product-item__row">
              <div className="c-product-item__heading">叢林能量碗</div>
              <div className="c-product-item__price">$110</div>
            </div>
            <div className="c-product-item__row">
              <div className="c-product-item__cal">熱量379卡</div>
              <div className="c-product-item__o-price">$120</div>
            </div>
          </div>
          <div className="d-flex flex-md-column align-items-center">
            <Counter />
            <button
              type="button"
              className="c-product-item__action e-btn e-btn--primary mt-0 mt-md-2 ms-3 ms-md-0"
            >
              <i className="fas fa-shopping-cart e-icon me-0 me-lg-2"></i>
              <span className="d-none d-md-block">加入購物車</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
