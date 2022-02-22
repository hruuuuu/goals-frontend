import React from 'react';

function FilterCheckbox(props) {
  const { heading, fieldName, options, filterForm, setFilterForm } = props;
  const handleChange = (e) => {
    if (e.target.checked) {
      if (filterForm[fieldName].includes(Number(e.target.value))) {
        return;
      } else {
        setFilterForm({
          ...filterForm,
          [fieldName]: [...filterForm[fieldName], Number(e.target.value)],
        });
      }
    } else {
      const remainChecks = filterForm[fieldName].filter(
        (item) => item !== Number(e.target.value)
      );
      setFilterForm({
        ...filterForm,
        [fieldName]: [...remainChecks],
      });
    }
  };

  return (
    <div className="c-product-filter__checkbox">
      <div className="c-search__heading">{heading}</div>
      {options.map((option, i) => {
        const { id, name, description } = option;
        return (
          id !== 0 && (
            <div key={id} className="c-checkbox">
              <input
                type="checkbox"
                className="form-check-input c-checkbox__input c-form__input"
                id={`checkbox-${heading}-${id}`}
                name={`${heading}[]`}
                value={id}
                autoComplete="off"
                onChange={handleChange}
              />
              <label
                htmlFor={`checkbox-${heading}-${id}`}
                className="c-checkbox__label"
              >
                {fieldName === 'category' ? name : description}
              </label>
            </div>
          )
        );
      })}
    </div>
  );
}

export default FilterCheckbox;
