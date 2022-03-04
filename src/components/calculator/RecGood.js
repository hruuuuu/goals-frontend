import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/products';

import { IMG_URL } from '../../utils/config';

import AOS from 'aos';
import 'aos/dist/aos.css';

function RecGood(props) {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const { calories } = props;
  const [tdeeCal, setTdeeCal] = useState(0);

  const [foodCal, setFoodCal] = useState({
    breakfastCal: 0,
    lunchCal: 0,
    dinnerCal: 0,
  });

  const [lunchProduct, setLunchProduct] = useState([]);
  const [dinnerProduct, setDinnerProduct] = useState([]);

  // const tdeeInt = parseInt(calories);

  // const breakfastCal = parseInt((tdeeInt * 3) / 10);
  // const lunchCal = parseInt((tdeeInt * 4) / 10);
  // const dinnerCal = parseInt((tdeeInt * 3) / 10);

  const { productsData } = useProducts();
  // console.log(calories);
  const isFetching = productsData.length === 0;

  const isFetchingCalories = calories === undefined || calories === '';
  useEffect(() => {
    if (!isFetchingCalories) {
      // console.log(calories);
      setTdeeCal(parseInt(calories));
    }
  }, [calories]);

  useEffect(() => {
    if (tdeeCal !== 0) {
      setFoodCal({
        ...foodCal,
        breakfastCal: parseInt((tdeeCal * 3) / 10),
        lunchCal: parseInt((tdeeCal * 4) / 10),
        dinnerCal: parseInt((tdeeCal * 3) / 10),
      });
    }
  }, [tdeeCal]);

  useEffect(() => {
    if (!isFetching && foodCal.lunchCal !== 0) {
      // console.log(productsData);
      // console.log(foodCal.lunchCal);
      const lunchProduct = productsData.filter((item) => {
        return (
          item.calories < foodCal.lunchCal + 100 &&
          item.calories > foodCal.lunchCal - 100
        );
      });
      setLunchProduct(lunchProduct);
      // console.log(productItem);
    }
    if (!isFetching && foodCal.dinnerCal !== 0) {
      const dinnerProduct = productsData.filter((item) => {
        return (
          item.calories < foodCal.dinnerCal + 100 &&
          item.calories > foodCal.dinnerCal - 100
        );
      });
      setDinnerProduct(dinnerProduct);
    }
  }, [productsData, foodCal]);

  return (
    <>
      {!isFetching && !isFetchingCalories && (
        <>
          <div className="model__head model__head--sec" data-aos="fade-up">
            <div className="model__head--deco-text">RECOMMENED GOODS</div>
            <div className="model__head--title">果實推薦三餐組合</div>
            <div className="model__head--subtitle">
              依照您的TDEE計算結果量身打造的餐食組合
            </div>
          </div>
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-xl-4 col-lg-12">
                <div className="rec_box__head">
                  <h4 className="rec_box__head--title">
                    您的每日建議攝取熱量為
                  </h4>
                  <div className="tdee_props">
                    <h5>{tdeeCal}</h5>
                    <span>卡</span>
                  </div>
                  <p>
                    果實建議您：
                    <br />
                    早餐可攝取約 {foodCal.breakfastCal} 卡的熱量
                    <br />
                    午晚餐可參考我們的推薦商品
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="rec_box">
                  <div className="rec_box__cal">午餐{foodCal.lunchCal}卡</div>
                  <div className="rec_box__group">
                    {lunchProduct.map((lunch) => {
                      return (
                        <div className="rec_box__item" key={lunch.id}>
                          <Link to={`/product`} title={lunch.name}>
                            <div className="rec_box__item--img">
                              <img
                                src={`${IMG_URL}/products/${lunch.image}`}
                                className="img-rec_box"
                                alt="lunchItem"
                              />
                            </div>
                            <div className="rec_box__item--product">
                              {lunch.name}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="rec_box">
                  <div className="rec_box__cal">晚餐{foodCal.dinnerCal}卡</div>

                  <div className="rec_box__group">
                    {dinnerProduct.map((dinner) => {
                      return (
                        <div className="rec_box__item" key={dinner.id}>
                          <Link
                            to={`/product/${dinner.id}`}
                            title={dinner.name}
                          >
                            <div className="rec_box__item--img">
                              <img
                                src={`${IMG_URL}/products/${dinner.image}`}
                                className="img-rec_box"
                                alt="dinnerItem"
                              />
                            </div>
                            <div className="rec_box__item--product">
                              {dinner.name}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RecGood;
