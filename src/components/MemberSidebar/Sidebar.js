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
    }
    localStorage.removeItem('cartList');
  };

  return (
    <div className="d-flex justify-content-center">
      <ul className="Sidebaritems">
        {SidebarLinks.map((link) => {
          return (
            <li
              className="Sidebaritem"
              key={link.id}
              onClick={
                link.name === '登出' && login ? () => handleLogout() : null
              }
            >
              <NavLink to={link.router} className="Sidebarfont">
                {link.icon}
                <h5 className="Sidebarfont__text">{link.name}</h5>
              </NavLink>
              {link.line}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
