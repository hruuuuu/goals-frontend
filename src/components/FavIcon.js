import { React, useState } from 'react';

function FavIcon(props) {
  const { size, type } = props;
  const [fav, setFav] = useState(false);
  return (
    <>
      <button
        className={`c-fav-btn c-fav-btn--${size} c-fav-btn--${type} ${
          fav && 'active'
        } `}
        type="button"
        onClick={() => {
          setFav(!fav);
        }}
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
