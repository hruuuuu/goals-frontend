import { React, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useFav } from '../context/fav';

function FavIcon(props) {
  const { size, type, id } = props;
  const { productId } = useParams();
  const locationPath = useLocation().pathname;
  const [fav, setFav] = useState(false);
  const { favItemsArr, setFavItemsArr } = useFav();

  const hasLocalStorage = localStorage.getItem('fav');
  const isEmptyState = favItemsArr.length === 0;

  const favItems = localStorage
    .getItem('fav')
    .split(',')
    .map((item) => parseInt(item, 10));

  /* 一開始載入時 本來就有加入收藏的亮起來 */
  useEffect(() => {
    if (hasLocalStorage) {
      setFavItemsArr([...favItems]);
      if (!isEmptyState) {
        if (favItems.includes(id)) {
          setFav(!fav);
        }
        if (favItems.includes(Number(productId))) {
          setFav(!fav);
        }
      }
    } else {
      localStorage.setItem('fav', '');
    }
  }, []);

  const handleSetFav = (id) => {
    setFav(!fav);
    const favArr = isEmptyState ? [id] : [...favItemsArr, id];
    if (fav === false) {
      //未收藏 -> 收藏
      setFavItemsArr(favArr);
      localStorage.setItem('fav', favArr);
      if (favArr.includes(id)) {
        return;
      }
    } else {
      //收藏 -> 取消收藏
      const remainFavArr = favArr.filter((item) => item !== id);
      setFavItemsArr([...remainFavArr]);
      localStorage.setItem('fav', remainFavArr);
    }
  };

  const handleClick = () => {
    if (productId) {
      handleSetFav(Number(productId));
    } else {
      handleSetFav(id);
    }
  };
  /* 1.處理收藏/取消收藏 2.更新收藏state(favItemsArr) 3.更新local storage的收藏列表 */

  return (
    <>
      <button
        className={`c-fav-btn c-fav-btn--${size} c-fav-btn--${type} ${
          fav && 'active'
        } `}
        type="button"
        onClick={handleClick}
      >
        <i className="fas fa-heart c-fav-btn__icon"></i>
        {type === 'icon-text' && (
          <div className="c-fav-btn__text">取消收藏</div>
        )}
      </button>
    </>
  );
}

export default FavIcon;
