import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../img/common/logo--light.svg';

function Footer() {
  const footerLinks = [
    [
      { id: 0, path: `/`, name: '首頁' },
      { id: 1, path: `/about`, name: '關於果實' },
      { id: 2, path: `/product`, name: '健康餐盒' },
    ],
    [
      { id: 3, path: `/blog`, name: '健康新知' },
      { id: 4, path: `/calculator`, name: '計算機' },
    ],
  ];
  const footerSocialMedias = [
    {
      id: 0,
      name: 'Facebook',
      link: `https://www.facebook.com/`,
      icon: <i className="fab fa-facebook-square e-icon l-footer__icon"></i>,
    },
    {
      id: 1,
      name: 'Instagram',
      link: `https://www.instagram.com/`,
      icon: <i className="fab fa-instagram-square e-icon l-footer__icon"></i>,
    },
    {
      id: 2,
      name: 'Line',
      link: `https://line.me/zh-hant/`,
      icon: <i className="fab fa-line e-icon l-footer__icon"></i>,
    },
  ];
  return (
    <>
      <footer className="l-footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11 col-lg-10 col-xl-9">
              <div className="l-footer__wrapper d-flex flex-column flex-lg-row justify-content-lg-between">
                <div className="d-flex">
                  {footerLinks.map((group, i) => {
                    return (
                      <ul
                        key={i}
                        className="l-footer__list me-5 me-lg-4 me-xl-5"
                      >
                        {group.map((item, i) => {
                          const { id, path, name } = item;
                          return (
                            <li key={id} className="l-footer__item">
                              <NavLink to={path} className="l-footer__link">
                                {name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
                </div>
                <ul className="l-footer__list my-4 my-lg-0">
                  <li className="l-footer__item">
                    <i className="fas fa-map-marker-alt e-icon e-icon--left"></i>
                    桃園市中壢區新生路二段421號
                  </li>
                  <li className="l-footer__item">
                    <i className="fas fa-phone e-icon e-icon--left"></i>
                    (03) 425-7387
                  </li>
                  <li className="l-footer__item l-footer__item--muted d-none d-lg-block">
                    © 2021 果實GOALS. All rights reserved.
                  </li>
                  <li className="l-footer__item l-footer__item--muted d-none d-lg-block">
                    此網站僅供資展國際學生練習使用，如有雷同，純屬虛構。
                  </li>
                </ul>
                <ul className="l-footer__list d-flex align-items-center flex-lg-column-reverse">
                  <li className="l-footer__item d-flex justify-content-end">
                    {footerSocialMedias.map((item) => {
                      const { id, link, icon } = item;
                      return (
                        <Link
                          key={id}
                          to={link}
                          target="blank"
                          className="l-footer__btn"
                        >
                          {icon}
                        </Link>
                      );
                    })}
                  </li>
                  <li className="l-footer__item ms-4 ms-lg-0">
                    <img src={logo} alt="" className="l-footer__logo" />
                  </li>
                </ul>
                <ul className="l-footer__list mt-3 d-block d-lg-none">
                  <li className="l-footer__item l-footer__item--muted">
                    © 2021 果實GOALS. All rights reserved.
                  </li>
                  <li className="l-footer__item l-footer__item--muted">
                    此網站僅供資展國際學生練習使用，如有雷同，純屬虛構。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
