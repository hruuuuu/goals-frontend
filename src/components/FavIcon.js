import { React, useState, useEffect } from 'react';

import { useFav } from '../context/fav';

function FavIcon(props) {
  const { size, type, id } = props;
  const [fav, setFav] = useState(false);
  const { favStorage, setFavStorage } = useFav();

  /* 一開始載入時 本來就有加入收藏的亮起來 */
  useEffect(() => {
    const favItems = localStorage
      .getItem('fav')
      .split(',')
      .map((item) => parseInt(item, 10));
    setFavStorage([...favItems]);
    if (favItems.includes(id)) {
      setFav(!fav);
    }
  }, []);

  /* 1.處理收藏/取消收藏 2.更新收藏state(favStorage) 3.更新local storage的收藏列表 */
  const handleSetFav = () => {
    const favArr = [...favStorage, id];
    setFav(!fav);
    if (fav === false) {
      //未收藏 -> 收藏
      setFavStorage(favArr);
      localStorage.setItem('fav', favArr);
      if (favArr.includes(id)) {
        return;
      }
    } else {
      //收藏 -> 取消收藏
      const remainFavArr = favArr.filter((item) => item !== id);
      setFavStorage([...remainFavArr]);
      localStorage.setItem('fav', remainFavArr);
    }
  };

  return (
    <>
      <button
        className={`c-fav-btn c-fav-btn--${size} c-fav-btn--${type} ${
          fav && 'active'
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
