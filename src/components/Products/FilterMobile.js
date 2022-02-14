import React from 'react';

import Filter from './Filter';

function FilterMobile() {
  return (
    <>
      <div className="c-floating-filter d-flex d-lg-none">
        <input
          type="checkbox"
          id="filterToggle"
          className="c-floating-filter__check"
        />
        <label htmlFor="filterToggle" className="c-floating-filter__toggle">
          <div className="d-flex align-items-center">
            <i className="fas fa-filter c-floating-filter__icon e-icon e-icon--left e-icon--secondary"></i>
            <span className="c-floating-filter__text">篩選</span>
          </div>
        </label>
        <div className="c-floating-filter__menu">
          <Filter device="mobile" />
        </div>
      </div>
    </>
  );
}

export default FilterMobile;
