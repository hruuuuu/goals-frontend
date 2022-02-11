import { React, useState } from 'react';

function FavIcon() {
  const [fav, setFav] = useState(false);
  return (
    <>
      <button
        className={`c-fav-btn c-fav-btn--medium c-fav-btn--corner ${
          fav ? 'active' : ''
        }`}
        type="button"
        onClick={() => {
          setFav(!fav);
        }}
      >
        <i className="fas fa-heart c-fav-btn__icon"></i>
      </button>
    </>
  );
}

export default FavIcon;
