import React from 'react';
import Breadcrumb from './Header/Breadcrumb';
import { useLocation, matchRoutes } from 'react-router-dom';
import routerList from '../config/routerList';

function Header(props) {
  const { isLower } = props;
  const locationPath = useLocation().pathname;
  const matchedRoutes = matchRoutes(routerList, locationPath);
  const lastLocationPath = matchedRoutes[matchedRoutes.length - 1];
  return (
    <>
      <header className={`l-header ${isLower ? 'u-padding__product-top' : ''}`}>
        <div className="container">
          <div className="l-header__wrapper">
            <Breadcrumb />
            <div className="l-header__title">
              <img src={lastLocationPath.route.headerImg} alt="food" />
              <h3 className="l-header__text">
                {lastLocationPath.route.header}
              </h3>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
