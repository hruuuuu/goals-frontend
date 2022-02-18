/* C/C */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IMG_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';
import { useCategory } from '../../context/products';

import Counter from '../Counter';
import FavIcon from '../FavIcon';

function ProductItem(props) {
  const { product } = props;
  const { id, image, name, calories, price } = product;
  const { show, setShow } = useShow();
  const { categoryData } = useCategory();
  const [category, setCategory] = useState({ id: '', name: '' });

  const isFetchingCategory = categoryData.length === 0;

  /* 控制modal顯示 */
  const handleShow = () => {
    setShow({ ...setShow, in: true });
  };

  /* 拿到CategoryContext的資料後跟product的category_id關聯 */
  useEffect(() => {
    if (!isFetchingCategory) {
      const matchedCategory = categoryData.find(
        (category) => product.category_id === category.id
      );
      setCategory(matchedCategory);
    }
  }, [categoryData]); //只要有變動(拿到資料再執行)

  return (
    <>
      <div className="col-6 col-md-4 col-lg-6 col-xl-4">
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
              <div className="c-product-item-detail__price">$110</div>
            </div>
            <div className="c-product-item-detail__row">
              <div className="c-product-item-detail__cal">熱量{calories}卡</div>
              <div className="c-product-item-detail__o-price">${price}</div>
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
