import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';

import Counter from '../Counter';
import FavIcon from '../FavIcon';

function ProductItem(props) {
  const { product } = props;
  const { id, image, name, calories, price } = product;
  const { show, setShow } = useShow();
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState({
    id: '',
    name: '',
  });

  //params productId -> 打api用
  const { productId } = useParams();

  const handleShow = () => {
    setShow({ ...setShow, in: true });
  };

  useEffect(() => {
    //api/product
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/product/category`, {
          withCredentials: true,
        });
        const categories = response.data;
        setCategoryData(categories);

        const matchedCategory = categories.find(
          (category) => product.category_id === category.id
        );
        setCategory(matchedCategory);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="col-6 col-md-4 col-lg-6 col-xl-4">
        <div className="c-product-item">
          <div className="c-product-item__cover">
            <Link to={`/product/${id}`} onClick={handleShow}>
              <img
                className="c-product-item__img"
                src={require(`../../img/products/${image}`)}
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
