/* C/C */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';

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
  const handleShow = () => {
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
    //加入購物車alert
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'c-alert__toast',
        title: 'c-alert__subtitle',
      },
    });

    const newItem = {
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
        const newAmountItem = {
          id: cartListData[i].id,
          name: cartListData[i].name,
          image: cartListData[i].image,
          price: cartListData[i].price,
          discountPrice: cartListData[i].discountPrice,
          amount: cartListData[i].amount + newItem.amount,
        };
        const oldCartListData = cartListData.filter(
          (item, i) => item.id !== newItem.id
        );
        const newCartListData = [...oldCartListData, newAmountItem];

        setCartListData(newCartListData);
        return localStorage.setItem(
          'cartList',
          JSON.stringify(newCartListData)
        );
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
          </div>
        </>
      )}
    </>
  );
}

export default ProductItem;
