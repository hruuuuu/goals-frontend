import React from 'react';
import { NavLink } from 'react-router-dom';

import logoLight from '../../img/common/logo--light.svg';
import logoPrimary from '../../img/common/logo--primary.svg';

function NavbarDesktop(props) {
  const { navLinks, navActions, isHome, isTop, handleLogout, login } = props;

  return (
    <div className="l-navbar--desktop d-none d-lg-flex">
      <ul className="l-navbar__items">
        <li className="l-navbar__item">
          <NavLink to="/" className="l-navbar__font l-navbar__logo">
            {isHome && isTop ? (
              <img src={logoPrimary} alt="logo" />
            ) : (
              <img src={logoLight} alt="logo" />
            )}
          </NavLink>
        </li>
        {navLinks.map((link) => {
          return (
            <li className="l-navbar__item" key={link.id}>
              <NavLink to={link.route} className="l-navbar__font">
                {link.name}
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
          <li className="l-navbar__icon">
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
