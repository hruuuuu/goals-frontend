/* C/C */
import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { IMG_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';
import { useCategory } from '../../context/products';

import Counter from '../Counter';
import FavIcon from '../FavIcon';

function ProductItem(props) {
  const [number, setNumber] = useState(1);
  const { product } = props;
  const { id, image, name, calories, price } = product;
  const { show, setShow } = useShow();
  const { categoryData } = useCategory();
  const [category, setCategory] = useState({ id: '', name: '' });
  // const { cartList, setCartList } = useState([]);
  /* 控制modal顯示 */
  const handleShow = (product) => {
    setShow({ ...setShow, in: true });
  };

  /* 拿到CategoryContext的資料後跟product的category_id關聯 */
  useEffect(() => {
    if (categoryData.length !== 0) {
      const matchedCategory = categoryData.find(
        (category) => product.category_id === category.id
      );
      setCategory(matchedCategory);
    }
  }, [categoryData]); //只要有變動(拿到資料再執行)

  //addlocalStorage
  const addCart = () => {
    let cartList = JSON.parse(localStorage.getItem('cartList'));
    // console.log('cartList :>> ', cartList);
    if (!cartList) {
      cartList = [];
    }
    // let cartList = JSON.parse(localStorage.getItem('cartList'));
    // console.log(Array.isArray(cartList));

    let newItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      amount: number,
    };

    // itemList.push(...itemList, newItem);
    // setCartList([...cartList, newItem]);

    // console.log(cartList);
    // console.log(newItem);
    localStorage.setItem('cartList', JSON.stringify(cartList));
  };

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
            <FavIcon size="medium" type="icon" />
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
  );
}

export default ProductItem;
