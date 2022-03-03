import { React, useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import logoLight from '../../img/common/logo--light.svg';
import logoPrimary from '../../img/common/logo--primary.svg';

function NavbarMobile(props) {
  const { navLinks, navActions, isHome, isTop } = props;
  const [check, setCheck] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    if (location !== '/') {
      setCheck(!check);
    }
  }, [location]);

  return (
    <div className={`l-navbar--mobile d-flex d-lg-none`}>
      <input
        type="checkbox"
        id="menuToggle"
        className="l-navbar__check"
        checked={check}
        onChange={() => {
          setCheck(!check);
        }}
      />
      <label htmlFor="menuToggle" className="l-navbar__toggle">
        <i className="fas fa-bars l-navbar__icon"></i>
      </label>
      <NavLink to="/" className="l-navbar__font l-navbar__logo">
        {isHome && isTop ? (
          <img src={logoPrimary} alt="logo" />
        ) : (
          <img src={logoLight} alt="logo" />
        )}
      </NavLink>
      <div
        className={`l-navbar__menu ${isHome ? 'l-navbar--home' : ''} ${
          !isTop ? 'l-navbar--scroll' : ''
        }`}
      >
        <ul className="l-navbar__list">
          {navLinks.map((link) => {
            return (
              <li className="l-navbar__item" key={link.id}>
                <NavLink to={link.route}>
                  <h4 className="l-navbar__font">{link.name}</h4>
                </NavLink>
              </li>
            );
          })}
          <li className="l-navbar__item">
            <hr className="e-hr e-hr--navbar" />
          </li>
          {navActions.map((action) => {
            return (
              <li className="l-navbar__item" key={action.id}>
                <NavLink to={action.route} className="l-navbar__btn">
                  <h4 className="l-navbar__font">{action.name}</h4>
                  {action.iconMobile}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NavbarMobile;
