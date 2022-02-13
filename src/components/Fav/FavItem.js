import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useShow } from '../../context/ProductDetail';
import FavIcon from '../FavIcon';
import Counter from '../Counter';

function FavItem(props) {
  const { id } = props;
  const { show, setShow } = useShow();

  const handleShow = () => {
    setShow({ ...setShow, in: true });
  };

  return (
    <>
      <div className="col-6 col-md-12">
        <div className="c-product-detail c-product-detail--fav">
          <FavIcon size="medium" type="icon-text" />
          <div className="row gy-2 gy-md-0">
            <div className="col-12 col-md-3">
              <button
                type="button"
                className="c-product-detail__btn"
                onClick={handleShow}
              >
                <img
                  className="c-product-detail__img"
                  src={require('../../img/products/sunshine_bowl.jpeg')}
                  alt="thumbnail"
                />
              </button>
            </div>
            <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
              <div className="d-flex flex-column">
                <div className="e-tag e-tag--normal">素食餐盒</div>
                <div className="c-product-item-detail">
                  <div className="c-product-item-detail__row">
                    <div className="c-product-item-detail__heading">
                      叢林能量碗
                    </div>
                    <div className="c-product-item-detail__price d-md-none">
                      $110
                    </div>
                  </div>
                  <div className="c-product-item-detail__row d-md-none">
                    <div className="c-product-item-detail__cal">熱量379卡</div>
                    <div className="c-product-item-detail__o-price">$120</div>
                  </div>
                </div>
                <p className="c-product-detail__text d-none d-md-block">
                  我們能量碗系列中最陽光的一面。有機藜麥與大蒜羽衣甘藍拌勻，淋上薑黃花椰菜、特級初榨橄欖油、鷹嘴豆和烤無鹽南瓜籽。
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 d-none d-md-flex flex-column align-items-end">
              <div className="c-product-detail__nutrition mt-0 mt-md-5">
                <ul className="c-product-detail__list mb-2">
                  <li className="c-product-detail__item">379卡路里</li>
                  <li className="c-product-detail__item">8克脂肪</li>
                </ul>
                <ul className="c-product-detail__list">
                  <li className="c-product-detail__item">14克蛋白質</li>
                  <li className="c-product-detail__item">68克碳水化合物</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-end g-2 g-sm-0 g-md-3">
            <div className="col-8 col-sm-9 col-md-5 d-flex flex-column flex-md-row align-items-md-center">
              <div className="d-none d-md-flex align-items-center me-4">
                <h4 className="c-product-detail__price me-2">$110</h4>
                <h6 className="c-product-detail__o-price">$150</h6>
              </div>
              <Counter />
            </div>
            <div className="col-4 col-sm-3 col-md-4 d-flex justify-content-end align-items-md-end">
              <button className="e-btn e-btn--primary e-btn--w100 e-btn--medium e-btn--mobile d-flex align-items-center justify-content-center">
                <i className="fas fa-shopping-cart e-icon me-0 me-md-2"></i>
                <span className="d-none d-md-block">加入購物車</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FavItem;
