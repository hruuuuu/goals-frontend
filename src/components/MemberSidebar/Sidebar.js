import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginStatus';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import Swal from 'sweetalert2';

function Sidebar(props) {
  const { SidebarLinks } = props;
  const history = useNavigate();
  const { login, setLogin, setUser, isSocial, setIsSocial } = useLogin();

  const handleLogout = async () => {
    const logoutResult = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });

    if (logoutResult.status === 200 && logoutResult.data.code < 30000) {
      if (isSocial) {
        setIsSocial(false);
      }
      Swal.fire({
        icon: 'success',
        html: '登出成功',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        focusConfirm: false,
        buttonsStyling: false,
        customClass: {
          container: 'c-alert__overlay',
          popup: 'c-alert__modal',
          title: 'c-alert__title',
          htmlContainer: 'c-alert__text',
          confirmButton: 'e-btn e-btn--plain e-btn--medium',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setLogin(false);
          history('/login');
          setUser({
            id: '',
            email: '',
          });
        }
      });
    }
    localStorage.removeItem('cartList');
  };

  return (
    <div className="d-flex justify-content-center">
      <ul className="Sidebaritems">
        {SidebarLinks.map((link) => {
          return (
            <li className="Sidebaritem" key={link.id}>
              <NavLink to={link.router} className="Sidebarfont">
                {link.icon}
                <h5 className="Sidebarfont__text">{link.name}</h5>
              </NavLink>
              {link.line}
            </li>
          );
        })}
        {!login ? null : (
          <li className="Sidebaritem logout-icon" onClick={handleLogout}>
            <div className="Sidebarfont d-flex">
              <i className="fas fa-sign-out-alt Sidebarfont__icon"></i>
              <h5 className="Sidebarfont__text">登出</h5>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
