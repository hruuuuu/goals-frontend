import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import { IMG_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';
import { useCategory } from '../../context/products';
import { useActivity } from '../../context/activity';

import FavIcon from '../FavIcon';
import Counter from '../Counter';

function FavItem(props) {
  const { product } = props;
  const {
    id,
    image,
    name,
    description,
    calories,
    fat,
    protein,
    carb,
    price,
    category_id,
    activity_id,
  } = product;
  const [category, setCategory] = useState({
    id: '',
    name: '',
  });
  const [activity, setActivity] = useState({ id: '', discount: 0 });
  const navigate = useNavigate();
  const { show, setShow } = useShow();
  const { categoryData } = useCategory();
  const { activityData } = useActivity();

  const isFetchingCategory = categoryData.id === '';
  const isFetchingActivity = activityData.id === '';

  const discountPrice = Math.ceil(price * activity.discount);

  /* 拿到CategoryContext的資料後跟product的category_id關聯 */
  useEffect(() => {
    if (!isFetchingCategory) {
      const matchedCategory = categoryData.find((category) => {
        return category_id === category.id;
      });
      setCategory({ ...matchedCategory });
    }
  }, [categoryData]); //只要有變動(拿到資料再執行)

  /* 拿到ActivityContext的資料後跟product的activity_id關聯  */
  useEffect(() => {
    if (!isFetchingActivity) {
      const matchedActivity = activityData.find(
        (activity) => activity_id === activity.id
      );
      setActivity({ ...matchedActivity });
    }
  }, [activityData]); //只要有變動(拿到資料再執行)

  return (
    <>
      {!isFetchingCategory && !isFetchingActivity ? (
        <>
          <div className="col-6 col-md-12">
            <div className="c-product-detail c-product-detail--fav">
              <FavIcon size="medium" type="icon-text" id={id} />
              <div className="row gy-2 gy-md-0">
                <div className="col-12 col-md-3">
                  <div className="c-product-detail__btn">
                    <img
                      className="c-product-detail__img"
                      src={`${IMG_URL}/products/${image}`}
                      alt="thumbnail"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column">
                    <div className="e-tag e-tag--normal">{category.name}</div>
                    <div className="c-product-item-detail">
                      <div className="c-product-item-detail__row">
                        <div className="c-product-item-detail__heading">
                          {name}
                        </div>
                        <div className="c-product-item-detail__price d-md-none">
                          ${discountPrice}
                        </div>
                      </div>
                      <div className="c-product-item-detail__row d-md-none">
                        <div className="c-product-item-detail__cal">
                          熱量{calories}卡
                        </div>
                        <div className="c-product-item-detail__o-price">
                          ${price}
                        </div>
                      </div>
                    </div>
                    <p className="c-product-detail__text d-none d-md-block">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-4 d-none d-md-flex flex-column align-items-end">
                  <div className="c-product-detail__nutrition mt-0 mt-md-5">
                    <ul className="c-product-detail__list mb-2">
                      <li className="c-product-detail__item">
                        {calories}卡路里
                      </li>
                      <li className="c-product-detail__item">{fat}克脂肪</li>
                    </ul>
                    <ul className="c-product-detail__list">
                      <li className="c-product-detail__item">
                        {protein}克蛋白質
                      </li>
                      <li className="c-product-detail__item">
                        {carb}克碳水化合物
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end g-2 g-sm-0 g-md-3">
                <div className="col-8 col-sm-9 col-md-5 d-flex flex-column flex-md-row align-items-md-center">
                  <div className="d-none d-md-flex align-items-center me-4">
                    <h4 className="c-product-detail__price me-2">
                      ${discountPrice}
                    </h4>
                    <h6 className="c-product-detail__o-price">${price}</h6>
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
      ) : (
        <>
          <div className="row g-3">
            <div className="col-12 col-md-4 col-lg-3">
              <Skeleton variant="rectangular" animation="wave" />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FavItem;
