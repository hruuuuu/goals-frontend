import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarMobile(props) {
  const { SidebarLinks } = props;
  return (
    <div className="d-flex justify-content-center">
      <ul className="SidebarMobileitems">
        {SidebarLinks.map((link) => {
          return (
            <li className={link.memberclass} key={link.id}>
              <NavLink to={link.router} className="Sidebarfont">
                {link.icon} &nbsp;
                {link.name}
              </NavLink>
              {link.line}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SidebarMobile;
