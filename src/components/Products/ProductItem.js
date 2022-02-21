<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

import Counter from './Counter';
import FavIcon from './FavIcon';

function ProductItem() {
  return (
    <>
      <div className="col-6 col-md-4">
        <div className="c-product-item">
          <div className="c-product-item__cover">
            <Link to="/product/detail">
              <img
                className="c-product-item__img"
                src={require('../../img/products/sunshine_bowl.jpeg')}
                alt="thumbnail"
              />
            </Link>
            <FavIcon />
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
=======
/* C/C */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import { IMG_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';
import { useCategory } from '../../context/products';
import { useCartList } from '../../context/cart';
import { useActivity } from '../../context/activity';

import Counter from '../Counter';
import FavIcon from '../FavIcon';

function ProductItem(props) {
  const [number, setNumber] = useState(1);
  const { product } = props;
  const { id, image, name, calories, price, discountPrice } = product;
  const { show, setShow } = useShow();
  const { categoryData } = useCategory();
  const { cartListData, setCartListData } = useCartList();
  const { activityData } = useActivity();
  const [category, setCategory] = useState({ id: '', name: '' });
  const [activity, setActivity] = useState({ id: '', discount: 0 });

  const isFetchingCategory = categoryData.length === 0;
  const isFetchingActivity = activityData.length === 0;
  /* 控制modal顯示 */
  const handleShow = (product) => {
    setShow({ ...setShow, in: true });
  };

  /* 拿到ActivityContext的資料後跟product的activity_id關聯  */
  useEffect(() => {
    if (!isFetchingActivity) {
      const matchedActivity = activityData.find(
        (activity) => product.activity_id === activity.id
      );
      setActivity({ ...matchedActivity });
    }
  }, [activityData]); //只要有變動(拿到資料再執行)

  /* 拿到CategoryContext的資料後跟product的category_id關聯 */
  useEffect(() => {
    if (!isFetchingCategory) {
      const matchedCategory = categoryData.find(
        (category) => product.category_id === category.id
      );
      setCategory({ ...matchedCategory });
    }
  }, [categoryData]); //只要有變動(拿到資料再執行)

  //加入購物車
  const addCart = () => {
    let newItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      discountPrice: product.discountPrice,
      amount: number,
    };

    const newItemData = [...cartListData, newItem];

    for (let i = 0; i < cartListData.length; i++) {
      if (cartListData[i].id === newItem.id) {
        return alert('您已添加此商品進購物車');
      }
    }

    if (cartListData.length !== 0) {
      setCartListData(newItemData);
      localStorage.setItem('cartList', JSON.stringify(newItemData));
    } else {
      setCartListData([newItem]);
      localStorage.setItem('cartList', JSON.stringify([newItem]));
    }
  };

  return (
    <>
      {!isFetchingCategory && !isFetchingActivity ? (
        <>
          <div className="col-6 col-md-6 col-xl-4">
            <div className="c-product-item">
              <div className="c-product-item__cover">
                <Link to={`/product/${id}`} onClick={handleShow}>
                  <img
                    className="c-product-item__img"
                    src={`${IMG_URL}/products/${image}`}
                    alt="thumbnail"
                  />
                </Link>
                <FavIcon size="medium" type="icon" id={id} />
              </div>
              <div className="c-product-item__tag e-tag e-tag--normal">
                {category.name}
              </div>
              <div className="c-product-item-detail">
                <div className="c-product-item-detail__row">
                  <div className="c-product-item-detail__heading">{name}</div>
                  <div className="c-product-item-detail__price">
                    ${discountPrice}
                  </div>
                </div>
                <div className="c-product-item-detail__row">
                  <div className="c-product-item-detail__cal">
                    熱量{calories}卡
                  </div>
                  {activity.id !== 0 && (
                    <div className="c-product-item-detail__o-price">
                      ${price}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex flex-md-column align-items-center">
                <Counter number={number} setNumber={setNumber} />
                <button
                  type="button"
                  className="c-product-item__action e-btn e-btn--primary e-btn--w100 mt-0 mt-md-2 ms-3 ms-md-0 e-btn--mobile"
                  onClick={addCart}
                >
                  <i className="fas fa-shopping-cart e-icon me-0 me-md-2"></i>
                  <span className="d-none d-md-block">加入購物車</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-6 col-md-6 col-xl-4">
            <Skeleton variant="rectangular" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52
          </div>
        </>
      )}
    </>
  );
}

export default ProductItem;
