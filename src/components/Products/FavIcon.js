import { React, useState } from 'react';

function FavIcon(props) {
  const { size, type } = props;
  const [fav, setFav] = useState(false);
  return (
    <>
      <button
        className={`c-fav-btn c-fav-btn--${size} ${fav ? 'active' : ''}`}
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
