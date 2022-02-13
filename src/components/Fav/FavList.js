import React from 'react';
import FavItem from './FavItem';

function FavList() {
  const favItems = () => {
    let favs = [];
    for (let i = 1; i < 5; i++) {
      favs.push(<FavItem key={i} id={i} />);
    }
    return favs;
  };
  return (
    <>
      <div className="row g-3">{favItems()}</div>
    </>
  );
}

export default FavList;
