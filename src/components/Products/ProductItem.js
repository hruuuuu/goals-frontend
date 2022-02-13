import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useShow } from '../../context/ProductDetail';

import Counter from '../Counter';
import FavIcon from '../FavIcon';

function ProductItem(props) {
  const { id } = props;
  const { show, setShow } = useShow();

  //params productId -> 打api用
  const { productId } = useParams();

  const handleShow = () => {
    setShow({ ...setShow, in: true });
  };
  return (
    <>
      <div className="col-6 col-md-4">
        <div className="c-product-item">
          <div className="c-product-item__cover">
            <Link to={`/product/${id}`} onClick={handleShow}>
              <img
                className="c-product-item__img"
                src={require('../../img/products/sunshine_bowl.jpeg')}
                alt="thumbnail"
              />
            </Link>
            <FavIcon size="medium" type="icon" />
          </div>
          <div className="c-product-item__tag e-tag e-tag--normal">
            素食餐盒
          </div>
          <div className="c-product-item-detail">
            <div className="c-product-item-detail__row">
              <div className="c-product-item-detail__heading">叢林能量碗</div>
              <div className="c-product-item-detail__price">$110</div>
            </div>
            <div className="c-product-item-detail__row">
              <div className="c-product-item-detail__cal">熱量379卡</div>
              <div className="c-product-item-detail__o-price">$120</div>
            </div>
          </div>
          <div className="d-flex flex-md-column align-items-center">
            <Counter />
            <button
              type="button"
              className="c-product-item__action e-btn e-btn--primary e-btn--w100 mt-0 mt-md-2 ms-3 ms-md-0 e-btn--mobile"
            >
              <i className="fas fa-shopping-cart e-icon me-0 me-md-2"></i>
              <span className="d-none d-md-block">加入購物車</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
