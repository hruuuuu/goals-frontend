import { React, useState, useEffect } from 'react';
import { Link, useLocation, matchRoutes } from 'react-router-dom';
import routerList from '../../config/routerList';

function Breadcrumb() {
  const locationPath = useLocation().pathname;
  let matchedRoutes = matchRoutes(routerList, locationPath);
  let matches =
    matchedRoutes[matchedRoutes.length - 1].route.path === ''
      ? matchedRoutes.shift()
      : matchedRoutes;
  matches = Array.isArray(matches) ? matches : Array(matches);
  const onMatchedRoutes = (matches) => {
    return [
      {
        route: {
          path: ``,
          breadcrumbName: '首頁',
        },
      },
      ...matches,
    ];
  };
  if (typeof onMatchedRoutes === 'function') {
    matches = onMatchedRoutes(matches);
  }
  return (
    <>
      <div className="c-breadcrumb">
        <i className="fas fa-leaf e-icon--primary e-icon--left"></i>
        <ul className="c-breadcrumb__list">
          {matches.map((match, i) => {
            const { path, breadcrumbName } = match.route;
            const locationPaths = locationPath.split('/');
            const lastLocationPath = locationPaths[locationPaths.length - 1];
            const isActive = path === lastLocationPath;
            return isActive ? (
              <li key={i} className="c-breadcrumb__item">
                <span className="c-breadcrumb__link active">
                  {breadcrumbName}
                </span>
              </li>
            ) : (
              <li key={i} className="c-breadcrumb__item">
                <Link to={`/${path}`} className="c-breadcrumb__link">
                  {breadcrumbName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Breadcrumb;
