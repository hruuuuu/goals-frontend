/* C/C */
import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import { API_URL, IMG_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';
import { useCategory } from '../../context/products';

import FavIcon from '../FavIcon';
import Counter from '../Counter';

function ProductDetail(props) {
  const { show, setShow } = useShow();
  const navigate = useNavigate();
  const locationPath = useLocation().pathname;
  const [isFetching, setIsFetching] = useState(false);
  const [detailData, setDetailData] = useState({
    image: 'salmon.jpeg',
    name: '',
    price: 0,
    calories: 0,
    fat: 0,
    protein: 0,
    carb: 0,
    description: '',
    ingredients: '',
    category_id: 0,
  });
  const {
    image,
    name,
    price,
    calories,
    fat,
    protein,
    carb,
    description,
    ingredients,
    category_id,
  } = detailData;
  const { categoryData } = useCategory();
  const [category, setCategory] = useState({ id: '', name: '' });

  const isFetchingCategory = category === undefined || category.name === '';

  /* 1.取得網址params 2.打api拿特定product id的資料 */
  //params productId -> 打api用
  const { productId } = useParams();
  const getDetail = async () => {
    if (productId) {
      let response = await axios.get(`${API_URL}/product/${productId}`);
      const details = response.data[0];
      setDetailData({ ...detailData, ...details });
    }
  };

  const getCategoryData = () => {
    if (categoryData.length === 0) {
      setIsFetching(true);
    }
  };

  /* 拿到CategoryContext的資料後跟product的category_id關聯 */
  const matchCategory = () => {
    const matchedCategory = categoryData.find(
      (category) => detailData.category_id === category.id
    );
    setCategory({ ...matchedCategory });
  };

  useEffect(() => {
    setIsFetching(true);
    getCategoryData();
    getDetail();
  }, [productId]);

  useEffect(() => {
    setIsFetching(true);
    matchCategory();
  }, [detailData]);

  /* 控制modal關閉 & 淡出淡入效果 */
  const handleClose = () => {
    setShow({ ...show, out: true });
    setTimeout(() => {
      setShow({ ...show, in: false, out: false });
    }, 500);
    navigate(-1);
    // const redirect =
    //   locationPath === '/member/fav' ? navigate(-1) : navigate('/product');
  };
  const handleIn = show.in
    ? 'animation animation__modal animation__modal--in'
    : '';
  const handleOut = show.out
    ? 'animation animation__modal animation__modal--out'
    : '';

  return (
    <>
      {!isFetching || !isFetchingCategory ? (
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
                    src={`${IMG_URL}/products/${image}`}
                    alt="product"
                  />
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div className="d-flex flex-column justify-content-between p-3 p-md-0">
                  <div className="c-product-detail__scroll p-md-0">
                    <div className="position-relative">
                      <div className="e-tag e-tag--normal">{category.name}</div>
                      <h4 className="my-2 my-md-3">{name}</h4>
                      <div className="d-flex align-items-center d-md-none mb-3">
                        <h4 className="c-product-detail__price me-2">$110</h4>
                        <h6 className="c-product-detail__o-price">${price}</h6>
                      </div>
                      <FavIcon size="large" type="icon" />
                      <div className="c-product-detail__nutrition d-flex">
                        <ul className="c-product-detail__list">
                          <li className="c-product-detail__item">
                            {calories}卡路里
                          </li>
                          <li className="c-product-detail__item">
                            {fat}克脂肪
                          </li>
                        </ul>
                        <ul className="c-product-detail__list ms-md-3 ms-5">
                          <li className="c-product-detail__item">
                            {protein}克蛋白質
                          </li>
                          <li className="c-product-detail__item">
                            {carb}克碳水化合物
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="c-product-detail__detail">
                      <div className="c-product-detail__description">
                        <div className="c-product-detail__subtitle">
                          <i className="fas fa-pencil-alt e-icon e-icon--left c-product-detail__icon"></i>
                          <h6 className="c-product-detail__heading">
                            商品描述
                          </h6>
                        </div>
                        <p className="c-product-detail__text">{description}</p>
                      </div>
                      <div className="c-product-detail__description">
                        <div className="c-product-detail__subtitle">
                          <i className="fas fa-pepper-hot e-icon e-icon--left c-product-detail__icon"></i>
                          <h6 className="c-product-detail__heading">
                            商品成分
                          </h6>
                        </div>
                        <p className="c-product-detail__text">{ingredients}</p>
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
                            <h6 className="c-product-detail__o-price">
                              ${price}
                            </h6>
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
      ) : (
        <>
          <h1>Spinner</h1>
        </>
      )}
    </>
  );
}

export default ProductDetail;
