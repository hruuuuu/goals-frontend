import { React, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import logoLight from '../../img/common/logo--light.svg';
import logoPrimary from '../../img/common/logo--primary.svg';

import { useLogin } from '../../context/LoginStatus';
import { API_URL } from '../../utils/config';

function NavbarMobile(props) {
  const { navLinks, navActions, isTop, isActive } = props;
  const { login, setLogin, isSocial, setIsSocial, setUser } = useLogin();
  const [check, setCheck] = useState(false);
  const location = useLocation().pathname;
  const history = useNavigate();

  useEffect(() => {
    setCheck(false);
  }, [location]);

  const handleLogout = async () => {
    const logoutResult = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });

    if (logoutResult.status === 200 && logoutResult.data.code < 30000) {
      setUser({
        id: '',
        email: '',
      });
      if (isSocial) {
        setIsSocial(false);
      }
      Swal.fire({
        icon: 'success',
        html: '登出成功',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          setLogin(false);
          history('/');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        html: logoutResult.data.msg,
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (!result.isConfirmed) {
          history('/');
        }
      });
    }
  };

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
        {isTop ? (
          <img src={logoPrimary} alt="logo" />
        ) : (
          <img src={logoLight} alt="logo" />
        )}
      </NavLink>
      <div className={`l-navbar__menu ${!isTop ? 'l-navbar--scroll' : ''}`}>
        <ul className="l-navbar__list">
          {navLinks.map((link) => {
            const { id, name, route } = link;
            return (
              <li
                className={`l-navbar__item l-navbar__link ${
                  isActive === id ? 'active' : ''
                }`}
                key={id}
                onClick={name === '登出' && login ? () => handleLogout() : null}
              >
                <NavLink to={route}>
                  <h4 className="l-navbar__font">{name}</h4>
                </NavLink>
              </li>
            );
          })}
          <li className="l-navbar__item">
            <hr className="e-hr e-hr--navbar" />
          </li>
          {navActions.map((action) => {
            return (
              <li
                className="l-navbar__item"
                key={action.id}
                onClick={
                  action.name === '登出' && login ? () => handleLogout() : null
                }
              >
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
