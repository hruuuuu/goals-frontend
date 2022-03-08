import React from 'react';
import { NavLink } from 'react-router-dom';

import logoLight from '../../img/common/logo--light.svg';
import logoPrimary from '../../img/common/logo--primary.svg';

function NavbarDesktop(props) {
  const {
    navLinks,
    navActions,
    isTop,
    handleLogout,
    login,
    isActive,
    setIsActive,
    isFullScreen,
  } = props;

  return (
    <div className="l-navbar--desktop d-none d-lg-flex">
      <ul className="l-navbar__items">
        <li className="l-navbar__item">
          <NavLink
            to="/"
            className="l-navbar__font l-navbar__logo"
            onClick={() => {
              setIsActive(0);
            }}
          >
            {!isTop || isFullScreen ? (
              <img src={logoLight} alt="logo" />
            ) : (
              <img src={logoPrimary} alt="logo" />
            )}
          </NavLink>
        </li>
        {navLinks.map((link) => {
          const { id, name, route } = link;
          return (
            <li
              className={`l-navbar__item l-navbar__link ${
                isActive === id ? 'active' : ''
              }`}
              key={id}
            >
              <NavLink to={route} className="l-navbar__font">
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <ul className="l-navbar__actions">
        {navActions
          .slice(0)
          .reverse()
          .map((action) => {
            return (
              <li className="l-navbar__icon" key={action.id}>
                <NavLink to={action.route} className="l-navbar__btn">
                  {action.iconMobile}
                  {action.tagDesktop}
                </NavLink>
              </li>
            );
          })}
        {!login ? null : (
          <li className="l-navbar__icon logout-icon">
            <i
              className="fas fa-sign-out-alt l-navbar__font"
              onClick={handleLogout}
            ></i>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavbarDesktop;
