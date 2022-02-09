import React from 'react';
import Breadcrumb from './Header/Breadcrumb';

function Header() {
  return (
    <>
      <header className="l-header">
        <div className="container">
          <div className="l-header__wrapper">
            <Breadcrumb />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
