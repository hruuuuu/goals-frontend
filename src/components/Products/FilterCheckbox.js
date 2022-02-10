import React from 'react';

function FilterCheckbox(props) {
  const { heading, options } = props;
  return (
    <div className="c-product-filter__checkbox">
      <div className="c-search__heading">{heading}</div>
      {options.map((option, i) => {
        return (
          <div key={i} className="form-check">
            <input
              id="checkbox"
              type="checkbox"
              className="form-check-input c-search__checkbox c-checkbox"
              autoComplete="off"
            />
            <label
              htmlFor="checkbox"
              className="form-check-label c-search__heading"
            >
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default FilterCheckbox;
