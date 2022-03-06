import React from 'react';
import Breadcrumb from './Header/Breadcrumb';
import { useLocation, matchRoutes } from 'react-router-dom';
import routerList from '../config/routerList';

function Header() {
  const locationPath = useLocation().pathname;
  const matchedRoutes = matchRoutes(routerList, locationPath);
  const lastLocationPath = matchedRoutes[matchedRoutes.length - 1];

  const hasLayout = lastLocationPath.route.layout !== undefined;

  return (
    <>
      <header className="l-header">
        <div className="container">
          <div className="l-header__wrapper">
            <Breadcrumb />
            <div className="l-header__title">
              <div className="d-flex align-items-center">
                <img src={lastLocationPath.route.headerImg} alt="food" />
                <h3 className="l-header__text">
                  {lastLocationPath.route.header}
                </h3>
              </div>
              <div className="d-none d-sm-flex">
                {hasLayout && lastLocationPath.route.layout}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
