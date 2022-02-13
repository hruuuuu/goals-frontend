import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
  const { SidebarLinks } = props;
  return (
    <div className="d-lg-flex">
      <ul className="Sidebaritems">
        {SidebarLinks.map((link) => {
          return (
            <li className={link.memberclass} key={link.id}>
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
