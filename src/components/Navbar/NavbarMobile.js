import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../img/common/logo--light.svg';
import { useLogin } from '../../context/LoginStatus';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import Swal from 'sweetalert2';

function NavbarMobile(props) {
  const history = useNavigate();
  const { navLinks, navActions } = props;
  const { login, setLogin, isSocial, setIsSocial, setUser } = useLogin();

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
    <div className="l-navbar--mobile d-flex d-lg-none">
      <input type="checkbox" id="menuToggle" className="l-navbar__check" />
      <label htmlFor="menuToggle" className="l-navbar__toggle">
        <i className="fas fa-bars l-navbar__icon"></i>
      </label>
      <NavLink to="/" className="l-navbar__font l-navbar__logo">
        <img src={logo} alt="logo" />
      </NavLink>
      <div className="l-navbar__menu">
        <ul className="l-navbar__list">
          {navLinks.map((link) => {
            return (
              <li
                className="l-navbar__item"
                key={link.id}
                onClick={
                  link.name === '登出' && login ? () => handleLogout() : null
                }
              >
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
