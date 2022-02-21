import { React, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useFav } from '../context/fav';

<<<<<<< HEAD:src/components/Products/FavIcon.js
function FavIcon() {
=======
function FavIcon(props) {
  const { size, type, id } = props;
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52:src/components/FavIcon.js
  const [fav, setFav] = useState(false);
  const locationPath = useLocation().pathname;
  const { favItemsArr, setFavItemsArr } = useFav();

  const hasLocalStorage = localStorage.getItem('fav');
  const isEmptyState = favItemsArr.length === 0;

  /* 一開始載入時先取出local storage的收藏陣列 設定到資料state */
  useEffect(() => {
    if (hasLocalStorage) {
      const favItems = localStorage
        .getItem('fav')
        .split(',')
        .map((item) => parseInt(item, 10));
      setFavItemsArr([...favItems]);
    } else {
      localStorage.setItem('fav', '');
    }
  }, []);

  const handleSetFav = () => {
    setFav(!fav);
    const favArr = [...favItemsArr, id];
    if (fav === false) {
      //未收藏 -> 收藏
      if (favItemsArr.includes(id)) {
        return;
      }
      setFavItemsArr(favArr);
      localStorage.setItem('fav', favArr);
    } else {
      //收藏 -> 取消收藏
      const remainFavArr = favArr.filter((item) => item !== id);
      setFavItemsArr([...remainFavArr]);
      localStorage.setItem('fav', remainFavArr);
    }
  };

  const isActive =
    !isEmptyState && favItemsArr.findIndex((item) => item === id) !== -1;

  return (
    <>
      <button
<<<<<<< HEAD:src/components/Products/FavIcon.js
        className={`c-fav-btn c-fav-btn--medium c-fav-btn--corner ${
          fav ? 'active' : ''
        }`}
=======
        className={`c-fav-btn c-fav-btn--${size} c-fav-btn--${type} ${
          (isActive || fav) && 'active'
        } `}
>>>>>>> 1541b0b06d6992a4d6b6fa373b9b49163a5e2f52:src/components/FavIcon.js
        type="button"
        onClick={handleSetFav}
      >
        <i className="fas fa-heart c-fav-btn__icon"></i>
      </button>
    </>
  );
}

export default FavIcon;
