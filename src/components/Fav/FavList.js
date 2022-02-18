import { React, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../utils/config';
import { useFav } from '../../context/fav';

import FavItem from './FavItem';

function FavList() {
  const [fav, setFav] = useState(false);
  const { favData, setFavData, favStorage, setFavStorage } = useFav();

  //const navigate = useNavigate();

  const favItems = localStorage.getItem('fav');
  const isFetchingFav = favStorage.length === 0;

  const handleFavQuery = (favString) => {
    const query = new URLSearchParams();
    query.append('favItems', favString);
    const queryString = query.toString();
    return queryString;
  };

  const getFavProductsData = async (queryString) => {
    try {
      const response = await axios.get(`${API_URL}/fav?${queryString}`, {
        withCredentials: true,
      });
      const favProductsData = response.data;
      setFavData([...favProductsData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const favItemsArr = localStorage
      .getItem('fav')
      .split(',')
      .map((item) => parseInt(item, 10));
    setFavStorage([...favItemsArr]);

    const queryString = handleFavQuery(favItems);
    getFavProductsData(queryString);
  }, []);

  useEffect(() => {
    if (!isFetchingFav) {
      const favItemsString = favStorage.join(',');
      const queryString = handleFavQuery(favItemsString);
      getFavProductsData(queryString);
    }
  }, [favStorage]);

  const isEmpty = localStorage.getItem('fav') === '';

  return (
    <>
      <div className="row g-3">
        {isEmpty ? (
          <>
            <h1>Fav is empty</h1>
          </>
        ) : (
          favData.map((product) => {
            const { id } = product;
            return <FavItem key={id} product={product} />;
          })
        )}
      </div>
    </>
  );
}

export default FavList;
