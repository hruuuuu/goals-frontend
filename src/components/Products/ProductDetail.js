import { React, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import { useShow } from '../../context/ProductDetail';

import FavIcon from '../FavIcon';
import Counter from '../Counter';

function ProductDetail() {
  const { show, setShow } = useShow();

  const navigate = useNavigate();
  const locationPath = useLocation().pathname;

  const handleClose = () => {
    setShow({ ...show, out: true });
    setTimeout(() => {
      setShow({ ...show, in: false, out: false });
    }, 500);
    let redirect = locationPath !== '/member/fav' ? navigate(-1) : '';
  };

  const handleIn = show.in && 'animation animation__modal animation__modal--in';
  const handleOut =
    show.out && 'animation animation__modal animation__modal--out';
  return (
    <>
      <Modal
        show={show.in}
        onHide={handleClose}
        dialogClassName={`c-product-detail__modal ${handleIn} ${handleOut}`}
        backdropClassName={`c-product-detail__backdrop ${handleIn} ${handleOut}`}
        contentClassName="c-product-detail__wrapper"
        centered
        animation={false}
        fullscreen="md-down"
      >
        <button
          onClick={handleClose}
          className="c-product-detail__close e-btn e-btn--icon"
        >
          <i className="fas fa-times e-icon e-icon--btn e-icon--primary"></i>
        </button>
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="c-product-detail__cover">
              <img
                className="c-product-detail__img"
                src={require('../../img/products/sunshine_bowl.jpeg')}
                alt="product"
              />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="d-flex flex-column justify-content-between p-3 p-md-0">
              <div className="c-product-detail__scroll p-md-0">
                <div className="position-relative">
                  <div className="e-tag e-tag--normal">素食餐盒</div>
                  <h4 className="my-2 my-md-3">叢林能量碗</h4>
                  <div className="d-flex align-items-center d-md-none mb-3">
                    <h4 className="c-product-detail__price me-2">$110</h4>
                    <h6 className="c-product-detail__o-price">$150</h6>
                  </div>
                  <FavIcon size="large" type="icon" />
                  <div className="c-product-detail__nutrition d-flex">
                    <ul className="c-product-detail__list">
                      <li className="c-product-detail__item">379卡路里</li>
                      <li className="c-product-detail__item">8克脂肪</li>
                    </ul>
                    <ul className="c-product-detail__list ms-md-3 ms-5">
                      <li className="c-product-detail__item">14克蛋白質</li>
                      <li className="c-product-detail__item">68克碳水化合物</li>
                    </ul>
                  </div>
                </div>
                <div className="c-product-detail__detail">
                  <div className="c-product-detail__description">
                    <div className="c-product-detail__subtitle">
                      <i className="fas fa-pencil-alt e-icon e-icon--left c-product-detail__icon"></i>
                      <h6 className="c-product-detail__heading">商品描述</h6>
                    </div>
                    <p className="c-product-detail__text">
                      我們能量碗系列中最陽光的一面。有機藜麥與大蒜羽衣甘藍拌勻，淋上薑黃花椰菜、特級初榨橄欖油、鷹嘴豆和烤無鹽南瓜籽。
                    </p>
                  </div>
                  <div className="c-product-detail__description">
                    <div className="c-product-detail__subtitle">
                      <i className="fas fa-pepper-hot e-icon e-icon--left c-product-detail__icon"></i>
                      <h6 className="c-product-detail__heading">商品成分</h6>
                    </div>
                    <p className="c-product-detail__text">
                      有機藜麥、羽衣甘藍、花椰菜、薑黃、辣椒粉、鷹嘴豆、檸檬汁、米醋、新鮮大蒜、鷹嘴豆、烤有機南瓜子、特級初榨橄欖油、海鹽和黑胡椒。
                    </p>
                  </div>
                </div>
              </div>
              <div className="c-product-detail__footer">
                <div className="c-product-detail__footer-wrapper">
                  <hr className="e-hr e-hr--divider my-2 d-none d-md-block" />
                  <div className="row">
                    <div className="col-6 col-md-12 d-flex justify-content-between align-items-end mb-0 mb-md-3">
                      <Counter />
                      <div className="d-none d-md-flex flex-column align-items-end ps-5">
                        <h6 className="c-product-detail__o-price">$150</h6>
                        <h2 className="c-product-detail__price">$110</h2>
                      </div>
                    </div>
                    <div className="col-6 col-md-12">
                      <button className="e-btn e-btn--primary e-btn--w100 e-btn--large">
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductDetail;
