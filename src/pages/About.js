import React, { useEffect } from 'react';

import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import ScrollButton from '../components/ScrollButton';

import AOS from 'aos';
import 'aos/dist/aos.css';

import FloatingChat from '../components/FloatingChat';

import picBanner from '../img/page_banner/about.webp';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <>
      <PageBanner img={picBanner} />
      <div className="main-content">
        <Header />
        <div className="u-margin u-margin--page-bottom">
          <div className="l-about-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                  <div className="model__head">
                    <div className="model__head--deco-text">ABOUT</div>
                    <div className="model__head--title">
                      果實，一個健康飲食品牌
                    </div>
                  </div>
                  <div className="about-box__text" data-aos="fade-right">
                    <h4>我們的初衷</h4>
                    <p>
                      餐餐外食，高熱量、油膩且不均衡的飲食，不但容易讓體態逐漸走樣，更是離健康越來越遠。
                      <br />
                      由於深知現代人面臨的飲食問題，我們建立了果實餐盒的品牌，讓外食族多一份健康的選擇。
                    </p>
                  </div>
                  <div className="about-box__text" data-aos="fade-right">
                    <h4>全方位的服務</h4>
                    <p>
                      我們從飲食與運動方面著手，為您提供多方位健康飲食產品與服務，在這裡您可以攝取營養均衡的健康餐盒、獲取飲食目標方向的建議、試算TDEE與了解健康新知。
                    </p>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-12" data-aos="fade-up">
                  <div className="about-box__img">
                    <img
                      className="img-responsive"
                      src={require('../img/about/about.jpg')}
                      alt="About"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FloatingChat />
        <ScrollButton />
      </div>
    </>
  );
}

export default About;
