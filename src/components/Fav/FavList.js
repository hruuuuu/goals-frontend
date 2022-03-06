import { React, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../utils/config';
import { useFav } from '../../context/fav';

import FavItem from './FavItem';

function FavList() {
  const { favData, setFavData, favItemsArr, setFavItemsArr } = useFav();

  const favItems = localStorage.getItem('fav');
  const isEmptyStorage = favItems === '';
  const isFetchingFav = favItemsArr.length === 0;

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
    if (!isEmptyStorage) {
      const favItems = localStorage
        .getItem('fav')
        .split(',')
        .map((item) => parseInt(item, 10));
      setFavItemsArr([...favItems]);
      const queryString = handleFavQuery(favItems);
      getFavProductsData(queryString);
    }
  }, []);

  useEffect(() => {
    if (!isFetchingFav && !isEmptyStorage) {
      const favItemsString = favItemsArr.join(',');
      const queryString = handleFavQuery(favItemsString);
      getFavProductsData(queryString);
    }
  }, [favItemsArr]);

  return (
    <>
      <div className="row gx-3">
        {isEmptyStorage ? (
          <>
            <div className="u-height u-height--empty-page">
              <div className="empty_img">
                <img
                  className="img-responsive"
                  src={
                    require('../../img/common/illustration/order-empty.svg')
                      .default
                  }
                  alt=""
                />
                <h5>您的收藏清單空空如也！快去找喜愛的商品吧！</h5>
              </div>
            </div>
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
