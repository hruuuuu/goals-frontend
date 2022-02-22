import { React, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useFav } from '../context/fav';

function FavIcon(props) {
  const { size, type, id } = props;
  const [fav, setFav] = useState(false);
  const locationPath = useLocation().pathname;
  const { favItemsArr, setFavItemsArr } = useFav();

  const isEmptyState = favItemsArr.length === 0;

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
        className={`c-fav-btn c-fav-btn--${size} c-fav-btn--${type} ${
          (isActive || fav) && 'active'
        } `}
        type="button"
        onClick={handleSetFav}
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
