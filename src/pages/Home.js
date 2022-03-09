import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Lazy } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { API_URL } from '../utils/config';

import BlogPost from '../components/Home/BlogPost';
import ScrollButton from '../components/ScrollButton';
import Loading from '../components/Loading';

import logo from '../img/common/logo--original.svg';
import iconDeco from '../img/common/icon/deco.svg';
import picProduct from '../img/home/pic/product.webp';
import picDiet1 from '../img/home/pic/diet__1.webp';
import picDiet2 from '../img/home/pic/diet__2.webp';
import picOverviewProduct from '../img/home/pic/overview__product.webp';
import picOverviewBlog from '../img/home/pic/overview__blog.webp';
import KeyVisual from '../components/Home/KeyVisual';
import picCalculator from '../img/home/pic/calculator_home.jpg';
import picCalculatorPh from '../img/home/pic/calculator-ph.png';

function Home() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const isFetchBlog = blogData.length === 0;

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const overviewItems = [
    {
      id: 1,
      heading: '健康餐盒',
      description: '兼顧健康、營養、食材與美味的首選。',
      img: picOverviewProduct,
      delay: 0,
    },
    {
      id: 2,
      heading: 'TDEE計算機',
      description: '讓你擁有更健康的身體與體態，提升自我。',
      img: picCalculator,
      delay: 300,
    },
    {
      id: 3,
      heading: '飲食日誌',
      description: '紀錄日常飲食，讓健康之路變得更容易！',
      img: picDiet2,
      delay: 600,
    },
    {
      id: 4,
      heading: '健康新知',
      description: '定期為你帶來健康與健身的知識。',
      img: picOverviewBlog,
      delay: 900,
    },
  ];

  const productItems = [
    {
      id: 1,
      heading: '營養',
      description: '食譜是經由專業的營養師團隊以及飲食顧問精心規劃設計。',
      delay: 0,
      offset: 0,
    },
    {
      id: 2,
      heading: '健康',
      description: '符合高纖、低脂、低GI、高蛋白的標準，皆附有成分與營養標示。',
      delay: 300,
      offset: 0,
    },
    {
      id: 3,
      heading: '食材',
      description:
        '嚴選產地，在地當令採收不落地，選用新鮮、有機的食材烹調，讓你吃得健康又安心。',
      delay: 600,
      offset: -50,
    },
    {
      id: 4,
      heading: '美味',
      description: '品項多樣，並且不斷在嘗試開發新口味，健康的料理也能很好吃。',
      delay: 900,
      offset: -50,
    },
  ];

  const dietItems = [
    '輕鬆撰寫日常飲食日誌',
    '快速記錄攝取熱量及營養',
    '查看每日攝取總熱量及營養數據',
    '查看每日每餐熱量比例',
    '查看每餐攝取熱量及營養數據',
  ];

  const getBlog = async () => {
    const response = await axios.get(`${API_URL}/blog?page=1`, {
      withCredentials: true,
    });
    const blogs = response.data.dataCount;
    setBlogData([...blogs]);
  };

  useEffect(() => {
    getBlog();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="l-home">
        <KeyVisual loading={loading} />
        <div className="l-home__main">
          <div
            className="l-home__bg"
            style={{
              transform: `translateY(${offsetY * 0.3}px)`,
            }}
          />
          <div className="l-home__overview c-overview">
            <div className="row justify-content-center">
              <div className="col-10 col-md-8 col-lg-8 col-xl-6">
                <div className="c-title c-title--center">
                  <div className="c-title__icon">
                    <img
                      className="e-img e-img--contain"
                      src={iconDeco}
                      alt="deco"
                    />
                  </div>
                  <div className="c-title__deco">GOALS</div>
                  <h3 className="c-title__title">果實，一個健康飲食品牌</h3>
                  <h6 className="c-title__subtitle">幫助你成為更好的自己</h6>
                  <hr className="e-hr e-hr--primary c-title__hr" />
                  <div className="c-title__heading">
                    <h5 className="c-title__text">我們從飲食方面著手</h5>
                    <h5 className="c-title__text">
                      為你提供多方位健康食品與服務
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-10 col-md-8 col-lg-10 col-xl-9 col-xxl-8">
                <div className="c-overview__list">
                  <div className="row gx-3 gx-md-5 gx-lg-3 gx-xl-5 gy-4 gy-lg-0">
                    {overviewItems.map((item) => {
                      const { id, heading, description, img, delay } = item;
                      return (
                        <div
                          key={id}
                          className="col-6 col-lg-3"
                          data-aos="fade-up"
                          data-aos-delay={delay}
                        >
                          <div className="c-overview__item">
                            <div className="c-overview__cover">
                              <img
                                className="e-img e-img--cover"
                                src={img}
                                alt="overview"
                              />
                            </div>
                            <h6 className="c-overview__heading">{heading}</h6>
                            <p className="c-overview__description d-none d-md-flex">
                              {description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="l-home__product c-section">
            <div className="row justify-content-center g-0">
              <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
                <div
                  className="row gy-5 g-lg-0 c-section__row justify-content-center justify-content-lg-start mb-5 mb-lg-0"
                  section="product-intro"
                >
                  <div
                    className="col-12 col-md-8 col-lg-5 order-2 order-lg-1"
                    data-aos="fade-right"
                  >
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-12">
                        <div className="c-title c-title--start">
                          <div className="c-title__icon">
                            <img
                              className="e-img e-img--contain"
                              src={iconDeco}
                              alt="deco"
                            />
                          </div>
                          <div className="c-title__deco">HEALTHY FOOD</div>
                          <h3 className="c-title__title">果實健康餐盒</h3>
                          <h6 className="c-title__subtitle">
                            兼顧健康、營養與美味的首選
                          </h6>
                          <hr className="e-hr e-hr--primary c-title__hr" />
                        </div>
                        <p className="c-section__context">
                          餐餐外食，高熱量、油膩且不均衡的飲食，不但容易讓體態逐漸走樣，更是離健康越來越遠。
                        </p>
                        <p className="c-section__context">
                          由於深知現代人面臨的飲食問題，我們建立了果實餐盒的品牌，讓外食族多一份健康的選擇。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-lg-flex col-1 order-lg-2"></div>
                  <div className="col-12 col-lg-6 position-relative order-1 order-lg-3 c-section__container">
                    <div className="c-section__block c-section__block--right">
                      <img
                        className="e-img e-img--cover c-section__img"
                        src={picProduct}
                        alt="product"
                        style={{
                          transform: `translateY(-${offsetY * 0.1}px)`,
                        }}
                        section="product"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="row gy-5 g-lg-0 c-section__row mb-5 mb-lg-0"
                  section="product-list"
                >
                  <div className="col-12 col-lg-6 position-relative c-section__container">
                    <div className="c-section__block c-section__block--left"></div>
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-12">
                        <div className="c-section__wrapper" section="title">
                          <h2 className="c-section__title">果實餐盒的</h2>
                          <h2 className="c-section__title">四大特色</h2>
                          <hr className="e-hr e-hr--secondary c-section__hr" />
                          <h6 className="c-section__subtitle">
                            若你在找營養均衡、美味的健康餐
                          </h6>
                          <h6 className="c-section__subtitle">
                            果實餐盒將會是你的首選
                          </h6>
                          <Link
                            to="/product"
                            role="button"
                            className="e-btn e-btn--light e-btn--large w-50 mt-4"
                          >
                            查看商品
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 d-none d-lg-flex"></div>
                  <div className="col-12 col-lg-5">
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-12">
                        <div className="c-section__wrapper" section="list">
                          <ul className="c-section__list">
                            {productItems.map((item) => {
                              const {
                                id,
                                heading,
                                description,
                                delay,
                                offset,
                              } = item;
                              return (
                                <li
                                  key={id}
                                  className="c-section__item"
                                  data-aos="fade-left"
                                  data-aos-delay={delay}
                                  data-aos-offset={offset}
                                >
                                  <div className="c-section__list-num">
                                    {id}
                                  </div>
                                  <div className="d-flex flex-column">
                                    <h5 className="c-section__heading">
                                      {heading}
                                    </h5>
                                    <div className="c-section__description">
                                      {description}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="l-home__calculator">
            <div className="row justify-content-center g-0">
              <div className="col-12 col-lg-10">
                <div className="row gy-5 g-lg-0 c-section__row justify-content-center justify-content-lg-start mb-5 mb-lg-0">
                  <div
                    className="col-12 col-md-8 col-lg-5 order-2 order-lg-1"
                    data-aos="fade-up"
                  >
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-12 c-textbox">
                        <div className="c-title c-title--start">
                          <div className="c-title__deco">GOALS CALCULATOR</div>
                          <h3 className="c-title__title">TDEE/ BMR 計算機</h3>
                          <h6 className="c-title__subtitle">
                            果實帶您了解TDEE與BMR的不同
                          </h6>
                          <hr className="e-hr e-hr--primary c-title__hr" />
                        </div>
                        <p className="c-section__context">
                          不管你是要增肌、減脂或是維持目前的體重，都可以透過BMR跟TDEE來了解你一天需要的熱量為多少！
                        </p>
                        <p className="c-section__context">
                          我們提供了BMR/TDEE計算機，方便您了解每日該攝取約多少卡的熱量。
                        </p>
                        <p className="c-section__context">
                          就讓果實一起來帶大家了解什麼是每日總熱量消耗(TDEE)、基礎代謝率(BMR)，以及如何提升代謝率。
                        </p>
                        <Link
                          to="/calculator"
                          role="button"
                          className="e-btn e-btn--w100 e-btn--primary e-btn--large mt-5"
                        >
                          了解更多
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-lg-flex col-1 order-lg-2"></div>
                  <div
                    className="col-10 col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 position-relative order-1 order-lg-3"
                    data-aos="fade-left"
                    data-aos-offset="200"
                  >
                    <div className="cal-img">
                      <div className="des-right__deco">
                        <img className="img-responsive" src={logo} alt="" />
                      </div>
                      <img
                        className="img-responsive"
                        src={picCalculatorPh}
                        alt="calculator"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="l-home__diet-intro c-section">
            <div className="row justify-content-center">
              <div className="col-12 d-flex d-lg-none position-relative c-section__container mb-5">
                <div
                  className="c-section__block c-section__block--right"
                  section="diet"
                  data-aos="fade-left"
                >
                  <img
                    className="e-img e-img--cover"
                    src={picDiet2}
                    alt="diet"
                  />
                </div>
              </div>
              <div className="col-10 col-lg-8 col-xl-6">
                <div className="c-title c-title--center">
                  <div className="c-title__icon">
                    <img
                      className="e-img e-img--contain"
                      src={iconDeco}
                      alt="deco"
                    />
                  </div>
                  <div className="c-title__deco">DIET LOG</div>
                  <h3 className="c-title__title">果實飲食日誌</h3>
                  <h6 className="c-title__subtitle">為你打造專屬的飲食秘書</h6>
                  <hr className="e-hr e-hr--primary c-title__hr" />
                  <div className="c-title__heading">
                    <p className="c-title__context c-title__context--center">
                      你是不是常常不記得每天吃了什麼，也不知道如何追蹤飲食呢？
                    </p>
                    <p className="c-title__context c-title__context--center">
                      <span className="c-title__line-break">
                        別擔心，為了讓健康飲食之路更輕鬆，
                      </span>
                      <span className="c-title__line-break">
                        我們特別開發了一套系統，不但可以輕鬆記錄日常攝取的飲食、營養及熱量，
                      </span>
                      <span className="c-title__line-break">
                        還能幫你用視覺化的圖像產出數據，讓你對自己的飲食狀況瞭如指掌！
                      </span>
                    </p>
                    <h5 className="c-title__text">
                      就讓果實陪著你，一起見證蛻變的過程吧！
                    </h5>
                  </div>
                </div>
              </div>
              <div className="l-home__diet-list">
                <div className="row justify-content-center">
                  <div className="col-12 col-xl-10 col-xl-9 col-xxl-8">
                    <div className="row justify-content-center gx-lg-5 gx-xl-0">
                      <div
                        className="col-3 position-relative d-none d-lg-flex"
                        data-aos="fade-right"
                      >
                        <div className="c-section__block c-section__block--both-left">
                          <img
                            className="e-img e-img--cover c-section__img"
                            src={picDiet1}
                            alt="diet"
                            style={{
                              transform: `translateY(-${offsetY * 0.1}px)`,
                            }}
                            section="diet"
                          />
                        </div>
                      </div>
                      <div
                        className="col-10 col-lg-5 col-xl-6"
                        data-aos="fade-up"
                      >
                        <div className="c-diet">
                          <h5 className="c-title__text c-diet__heading">
                            只需成為果實會員，即可...
                          </h5>
                          <ul className="c-diet__list">
                            {dietItems.map((item) => {
                              return (
                                <li key={uuidv4()} className="c-diet__item">
                                  <i className="fas fa-check e-icon e-icon--primary e-icon--left"></i>
                                  <div className="c-diet__text">{item}</div>
                                </li>
                              );
                            })}
                          </ul>
                          <Link
                            to="/dietlog"
                            role="button"
                            className="e-btn e-btn--w100 e-btn--primary e-btn--large"
                          >
                            立即體驗
                          </Link>
                        </div>
                      </div>
                      <div
                        className="col-3 position-relative d-none d-lg-flex"
                        data-aos="fade-left"
                      >
                        <div className="c-section__block c-section__block--both-right">
                          <img
                            className="e-img e-img--cover c-section__img"
                            src={picDiet2}
                            alt="diet"
                            style={{
                              transform: `translateY(-${offsetY * 0.1}px)`,
                            }}
                            section="diet"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex d-lg-none position-relative c-section__container mb-5">
                <div
                  className="c-section__block c-section__block--left"
                  section="log"
                  data-aos="fade-right"
                >
                  <img
                    className="e-img e-img--cover"
                    src={picDiet1}
                    alt="diet"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="l-home__blog c-section">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-8 col-xl-6">
                <div className="c-title c-title--start">
                  <div className="c-title__icon">
                    <img
                      className="e-img e-img--contain"
                      src={iconDeco}
                      alt="deco"
                    />
                  </div>
                  <div className="c-title__deco">BLOG</div>
                  <h3 className="c-title__title">果實健康新知</h3>
                  <h6 className="c-title__subtitle">
                    定期為你帶來健康、飲食與塑身相關的知識
                  </h6>
                  <hr className="e-hr e-hr--primary c-title__hr" />
                </div>
              </div>
              <div className="col-10 col-xl-9 col-xxl-8" data-aos="fade-up">
                <div className="c-swiper c-swiper--blog">
                  {!isFetchBlog && (
                    <Swiper
                      loop={true}
                      loopFillGroupWithBlank={true}
                      pagination={false}
                      navigation={true}
                      modules={[Pagination, Navigation, Lazy]}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                          spaceBetween: 40,
                        },
                        576: {
                          slidesPerView: 1,
                          spaceBetween: 40,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 40,
                          slidesPerGroup: 2,
                        },
                        1200: {
                          slidesPerView: 3,
                          spaceBetween: 40,
                          slidesPerGroup: 3,
                        },
                        1440: {
                          slidesPerView: 3,
                          spaceBetween: 40,
                          slidesPerGroup: 3,
                        },
                      }}
                      lazy={{
                        loadPrevNext: true,
                        loadPrevNextAmount: 4,
                        preloadImages: true,
                        checkInView: true,
                      }}
                    >
                      {blogData.map((blog) => {
                        return (
                          <SwiperSlide key={blog.id}>
                            <BlogPost blog={blog} />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollButton />
    </>
  );
}

export default Home;
