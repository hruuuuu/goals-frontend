/* C/C */
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Skeleton from '@mui/material/Skeleton';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import { API_URL, IMG_URL } from '../../utils/config';
import { useShow } from '../../context/showProductDetail';
import { useCategory } from '../../context/products';
import { useActivity } from '../../context/activity';
import { useCartList } from '../../context/cart';
import { useLogin } from '../../context/LoginStatus';

import ProductDetailFavIcon from './ProductDetailFavIcon';
import Counter from '../Counter';
import dayjs from 'dayjs';

function ProductDetail(props) {
  const history = useNavigate();
  const [showComment, setShowComment] = useState({
    in: false,
    out: false,
  });
  const [commentDetail, setCommentDetail] = useState([]);
  const [commentEmpty, setCommentEmpty] = useState('目前還沒有評論唷~');
  const [newComment, setNewComment] = useState({
    product_id: '',
    comment: '',
    date: '',
    user_id: '',
  });
  const { user, login, commentStatus, setCommentStatus } = useLogin();
  const [number, setNumber] = useState(1);
  const { show, setShow } = useShow();
  const navigate = useNavigate();
  const { cartListData, setCartListData } = useCartList();
  const [detailData, setDetailData] = useState({
    id: '',
    image: '',
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
    id,
    image,
    name,
    price,
    calories,
    fat,
    protein,
    carb,
    description,
    ingredients,
    discountPrice,
  } = detailData;
  const { categoryData } = useCategory();
  const { activityData } = useActivity();
  const [category, setCategory] = useState({ id: '', name: '' });
  const [activity, setActivity] = useState({ id: '', discount: 0 });

  const isFetchingDetail = detailData.id === '';
  // const isFetchingDetail = true;
  const isFetchingCategory = categoryData.id === '';
  const isFetchingActivity = activityData.id === '';
  const isNoActivity = activity.id === 0;

  /* 1.取得網址params 2.打api拿特定product id的資料 */
  //params productId -> 打api用
  const { productId } = useParams();
  const getDetail = async () => {
    if (productId) {
      let response = await axios.get(`${API_URL}/product/${productId}`);
      const details = response.data[0];
      setDetailData({ ...details });
    }
  };

  const getComments = async () => {
    if (productId) {
      const commentsData = await axios.post(
        `${API_URL}/comment`,
        { product_id: productId },
        {
          withCredentials: true,
        }
      );
      const comments = commentsData.data.data;
      setCommentDetail([...comments]);
    }
  };

  // 檢查用戶是否合資格留下評論
  const checkUserEligible = async () => {
    const checkUserCommentEligible = await axios.post(
      `${API_URL}/comment/check`,
      { product_id: productId, user_id: user.userID },
      { withCredentials: true }
    );
    setCommentStatus(checkUserCommentEligible.data.status);
  };

  /* 設定url一進入/:productId就開啟modal*/
  useEffect(() => {
    if (productId) {
      setDetailData({
        id: '',
        image: '',
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
      getDetail();
      setShow({ ...show, in: true });
      if (login) {
        checkUserEligible();
      }
    }
  }, [productId, user.userID]);

  useEffect(() => {
    getComments();
  }, [productId, showComment]);

  /* 拿到CategoryContext的資料後跟product的category_id關聯 */
  useEffect(() => {
    if (!isFetchingDetail && !isFetchingCategory) {
      const matchedCategory = categoryData.find(
        (category) => detailData.category_id === category.id
      );
      setCategory({ ...matchedCategory });
    }
  }, [detailData, categoryData]);

  /* 拿到ActivityContext的資料後跟product的activity_id關聯  */
  useEffect(() => {
    if (!isFetchingDetail && !isFetchingActivity) {
      const matchedActivity = activityData.find(
        (activity) => detailData.activity_id === activity.id
      );
      setActivity({ ...matchedActivity });
    }
  }, [detailData, activityData]);

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

  const handleCommentIn = showComment.in
    ? 'animation animation__modal animation__modal--in'
    : '';
  const handleCommentOut = showComment.out
    ? 'animation animation__modal animation__modal--out'
    : '';

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
      id: detailData.id,
      name: detailData.name,
      image: detailData.image,
      price: detailData.price,
      discountPrice: detailData.discountPrice,
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

  const handleCommentOpen = () => {
    setShowComment({ ...setShow, in: true });
  };

  const handleCommentClose = () => {
    setShowComment({ ...show, out: true });
    setTimeout(() => {
      setShowComment({ ...show, in: false, out: false });
    }, 500);
  };

  const handleCommentChange = (e) => {
    setNewComment({
      product_id: productId,
      newComment: e.target.value,
      date: dayjs().format('YYYY-MM-DD'),
      user_id: user.userID,
    });
  };

  const handleCommentAdd = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    if (document.querySelector('#comment-content').value !== '') {
      const commentPost = await axios.post(
        `${API_URL}/comment/new`,
        newComment,
        {
          withCredentials: true,
        }
      );
      if (commentPost.data.code < 30020) {
        Toast.fire({
          icon: 'error',
          html: commentPost.data.msg,
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
      } else {
        Toast.fire({
          icon: 'success',
          html: commentPost.data.msg,
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
        // handleCommentClose();
        // handleClose();
        setShowComment(false);
        history(`/product`);
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '請輸入評論',
        customClass: {
          popup: 'c-alert__toast',
          title: 'c-alert__subtitle',
        },
      });
    }
  };

  const handleHideUserInfo = (email) => {
    const getUserAccount = email.split('@')[0];
    const getUserAccountDomain = email.split(getUserAccount)[1];
    let replaceStr = '';
    // 要被取代的字串 ex: test -> es要被取代
    const replacedStr = getUserAccount.slice(1, getUserAccount.length - 1);
    // 要被取代的字串長度
    const replacedStrLength = getUserAccount.slice(
      1,
      getUserAccount.length - 1
    ).length;

    for (let i = 0; i < replacedStrLength; i++) {
      replaceStr += '*';
    }
    return getUserAccount
      .replace(replacedStr, replaceStr)
      .concat(getUserAccountDomain);
  };

  return (
    <>
      <Modal
        show={show.in}
        onHide={handleClose}
        dialogClassName={`c-product-detail c-product-detail__modal ${handleIn} ${handleOut}`}
        backdropClassName={`c-product-detail__backdrop ${handleIn} ${handleOut}`}
        contentClassName="c-product-detail__wrapper"
        centered
        animation={false}
        fullscreen="md-down"
      >
        {!isFetchingDetail && !isFetchingCategory && !isFetchingActivity ? (
          <>
            <button
              onClick={handleClose}
              className="c-product-detail__close e-btn e-btn--icon"
            >
              <i className="fas fa-times e-icon e-icon--btn e-icon--primary"></i>
            </button>
            <div className="row">
              <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                <div className="c-product-detail__cover">
                  <img
                    className="c-product-detail__img"
                    src={`${IMG_URL}/products/${image}`}
                    alt="product"
                  />
                </div>
                <div className="c-product-detail__footer">
                  <div className="c-product-detail__footer-wrapper">
                    <div className="row gx-2">
                      <div className="col-5 col-md-12 d-flex justify-content-between align-items-end mb-0 mb-md-3">
                        <Counter
                          show={show}
                          number={number}
                          setNumber={setNumber}
                        />
                        <div className="d-none d-md-flex flex-column align-items-end ps-5">
                          {!isNoActivity && (
                            <h6 className="c-product-detail__o-price">
                              ${price}
                            </h6>
                          )}
                          <h2
                            className={`c-product-detail__price ${
                              isNoActivity ? 'c-product-detail__price--top' : ''
                            }`}
                          >
                            ${discountPrice}
                          </h2>
                        </div>
                      </div>
                      <div className="col-7 col-md-12">
                        {!login || !commentStatus ? (
                          <button
                            className="e-btn e-btn--primary e-btn--w100 e-btn--large"
                            onClick={addCart}
                          >
                            加入購物車
                          </button>
                        ) : (
                          <div className="d-flex justify-content-between">
                            <button
                              className="e-btn e-btn--primary e-btn--w100 e-btn--large me-2"
                              onClick={addCart}
                            >
                              加入購物車
                            </button>
                            <button
                              className="e-btn e-btn--primary e-btn--w100 e-btn--large comment-text"
                              onClick={handleCommentOpen}
                            >
                              撰寫評論
                            </button>
                            <button
                              className="e-btn e-btn--primary e-btn--w50 e-btn--large comment-text-icon"
                              onClick={handleCommentOpen}
                            >
                              <i className="fas fa-comments"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column justify-content-between p-3 p-md-0 product-info">
                  <div className="c-product-detail__scroll p-md-0">
                    <div className="position-relative">
                      <div className="e-tag e-tag--normal">{category.name}</div>
                      <h4 className="my-2 my-md-3">{name}</h4>
                      <div className="d-flex align-items-center d-md-none mb-3">
                        <h4 className="c-product-detail__price me-2">
                          ${discountPrice}
                        </h4>
                        {!isNoActivity && (
                          <h6 className="c-product-detail__o-price">
                            ${price}
                          </h6>
                        )}
                      </div>
                      <ProductDetailFavIcon id={id} />
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

                      <div className="c-product-detail__description">
                        <Modal
                          show={showComment.in}
                          onHide={handleCommentClose}
                          dialogClassName={`c-modal c-modal__modal c-comment ${handleCommentIn} ${handleCommentOut}`}
                          backdropClassName={`c-modal__backdrop ${handleCommentIn} ${handleCommentOut}`}
                          contentClassName="c-modal__wrapper c-modal__wrapper--full-page"
                          animation={false}
                          centered
                        >
                          {/* <button
                            onClick={handleClose}
                            className="c-modal__close e-btn e-btn--icon"
                          >
                            <i className="fas fa-times e-icon e-icon--btn e-icon--primary"></i>
                          </button> */}
                          <div className="comment-form">
                            <div className="mb-3">
                              <label
                                htmlFor="comment-title"
                                className="form-label c-form__label"
                              >
                                商品名稱
                              </label>
                              <input
                                type="text"
                                id="comment-title"
                                value={name}
                                className="form-control c-form__input"
                                disabled
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="comment-content"
                                className="form-label c-form__label"
                              >
                                評論
                              </label>
                              <textarea
                                id="comment-content"
                                rows="3"
                                placeholder="請留下您對此商品之評論"
                                className="form-control c-form__input c-comment__textarea"
                                onChange={handleCommentChange}
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              className="e-btn e-btn--primary e-btn--w50 e-btn--medium float-end"
                              onClick={() => handleCommentAdd()}
                            >
                              提交評論
                            </button>
                          </div>
                        </Modal>
                        <div className="c-product-detail__comments">
                          <div className="card border-0">
                            <div className="c-product-detail__subtitle">
                              <i className="fas fa-comments e-icon e-icon--left c-product-detail__icon"></i>
                              <h6 className="c-product-detail__heading">
                                商品評論
                              </h6>
                            </div>
                            {commentDetail.length > 0 ? (
                              commentDetail.map((comment, i) => (
                                <div
                                  className="card-body c-product-detail__comment-background"
                                  key={i}
                                >
                                  <h6 className="c-product-detail__comment-title">
                                    {handleHideUserInfo(comment.member_email)}
                                  </h6>
                                  <p className="c-product-detail__comment-text">
                                    {comment.comment}
                                  </p>
                                  <p className="c-product-detail__comment-subTitle">
                                    - {comment.create_at}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="c-product-detail__comment-text">
                                {commentEmpty}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-12 col-md-7">
                <Skeleton variant="rectangular" animation="wave" />
              </div>
              <div className="col-12 col-md-5">
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ProductDetail;
