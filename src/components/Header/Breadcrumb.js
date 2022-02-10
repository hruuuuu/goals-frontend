import { React, useState, useEffect } from 'react';
import { Link, useLocation, matchRoutes } from 'react-router-dom';
import routerList from '../../config/routerList';

function Breadcrumb() {
  const locationPath = useLocation().pathname;
  let matchedRoutes = matchRoutes(routerList, locationPath);
  const onMatchedRoutes = (matchedRoutes) => {
    return [
      {
        route: {
          path: '/',
          breadcrumbName: '首頁',
        },
      },
      ...matchedRoutes,
    ];
  };
  if (typeof onMatchedRoutes === 'function') {
    matchedRoutes = onMatchedRoutes(matchedRoutes);
  }
  return (
    <>
      <div className="c-breadcrumb">
        <i className="fas fa-leaf e-icon--primary e-icon--left"></i>
        <ul className="c-breadcrumb__list">
          {matchedRoutes.map((matchRoute, i) => {
            const { path, breadcrumbName } = matchRoute.route;
            const locationPaths = locationPath.split('/');
            const lastLocationPath =
              locationPaths.length >= 3
                ? locationPaths[locationPaths.length - 1]
                : '/' + locationPaths[locationPaths.length - 1];
            const isActive = path === lastLocationPath;
            return isActive ? (
              <li key={i} className="c-breadcrumb__item">
                <span className="c-breadcrumb__link active">
                  {breadcrumbName}
                </span>
              </li>
            ) : (
              <li key={i} className="c-breadcrumb__item">
                <Link to={path} className="c-breadcrumb__link">
                  {breadcrumbName}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <Link to="/" className="c-breadcrumb__link">
          首頁
        </Link>
        <Link to="/products" className="c-breadcrumb__link">
          商品列表
        </Link> */}
      </div>
    </>
  );
}

export default Breadcrumb;
