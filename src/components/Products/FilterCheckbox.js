import React from 'react';

function FilterCheckbox(props) {
  const { heading, options } = props;
  return (
    <div className="c-product-filter__checkbox">
      <div className="c-search__heading">{heading}</div>
      {options.map((option, i) => {
        return (
          <div key={i} className="c-checkbox">
            <input
              id={`checkbox-${heading}-${i}`}
              type="checkbox"
              className="form-check-input c-checkbox__input c-form__input"
              autoComplete="off"
            />
            <label
              htmlFor={`checkbox-${heading}-${i}`}
              className="c-checkbox__label"
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
