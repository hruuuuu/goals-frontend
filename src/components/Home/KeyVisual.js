import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay, Lazy } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/lazy';

import picSwiper1 from '../../img/home/pic/swiper__1.webp';
import picSwiper2 from '../../img/home/pic/swiper__2.webp';
import picSwiper3 from '../../img/home/pic/swiper__3.webp';
import logoSlogan from '../../img/common/illustration/logo--slogan.svg';

function KeyVisual(props) {
  const { loading } = props;
  return (
    <>
      <div className="l-home__key-visual">
        <div className="c-swiper c-swiper--kv">
          <Swiper
            direction={'vertical'}
            speed={3000}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectFade, Pagination, Autoplay, Lazy]}
            effect={'fade'}
            fadeEffect={{
              crossFade: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            loopFillGroupWithBlank={true}
            lazy={{
              loadPrevNext: true,
              loadPrevNextAmount: 1,
              elementClass: 'swiper-lazy',
              loadingClass: 'swiper-lazy-loading',
              loadedClass: 'swiper-lazy-loaded',
              preloaderClass: 'swiper-lazy-preloader',
            }}
            preloadImages={true}
            slidesPerView={1}
          >
            <SwiperSlide>
              <img className="swiper-lazy" src={picSwiper1} alt="swiper-img" />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white swiper-lazy-loading"></div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="swiper-lazy" src={picSwiper2} alt="swiper-img" />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white swiper-lazy-loading"></div>
            </SwiperSlide>

            <SwiperSlide>
              <img className="swiper-lazy" src={picSwiper3} alt="swiper-img" />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white swiper-lazy-loading"></div>
            </SwiperSlide>
          </Swiper>
          <HashLink
            smooth
            to="#main"
            role="button"
            className="c-scroll-indicator"
          >
            SCROLL
          </HashLink>
          <div className="l-home__slogan">
            <h2 className={`l-home__title ${!loading ? 'active' : ''}`}>
              CHOOSE FOOD &
            </h2>
            <h2
              className={`l-home__title l-home__title--cursive ${
                !loading ? 'active' : ''
              }`}
            >
              Reach Goals
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default KeyVisual;
