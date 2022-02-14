import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

import FilterCheckbox from './FilterCheckbox';

const categories = ['素食餐盒', '增肌餐盒', '減脂餐盒'];
const activities = ['新上市', '促銷中', '適用優惠券'];

function Filter(props) {
  const { device } = props;
  const maxPrice = 100;
  const valuetext = (value) => {
    return `${value}`;
  };
  const RangeInputSlider = () => {
    const [value, setValue] = useState([10, 90]);
    const handleSliderChange = (e, newValue) => {
      setValue(newValue);
    };
    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
      if (value[0] < 0) {
        setValue([0, value[1]]);
      } else if (value[1] > maxPrice) {
        setValue([value[0], maxPrice]);
      }
    };
    return (
      <Box>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        <div className="d-flex align-items-center">
          <input
            type="number"
            className="form-control c-range__input c-form__input"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value[0]}
            autoComplete="off"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <span className="c-range__text">~</span>
          <input
            type="number"
            className="form-control c-range__input c-form__input"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value[1]}
            autoComplete="off"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
      </Box>
    );
  };
  return (
    <>
      <div className={`c-product-filter c-product-filter--${device}`}>
        <h6 className="c-product-filter__title d-none d-lg-block">
          <i className="fas fa-sliders-h e-icon e-icon--left e-icon--secondary"></i>
          篩選
        </h6>
        <div className="c-product-filter__wrapper">
          <div className="pe-3">
            <div className="c-product-filter__search c-search">
              <label htmlFor="search" className="form-label c-search__heading">
                搜索
              </label>
              <div className="c-search__wrapper">
                <input
                  type="text"
                  id="search"
                  className="form-control c-search__input c-form__input"
                  placeholder="輸入關鍵字"
                  autoComplete="off"
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="c-product-filter__price c-range">
              <div className="c-range__heading">價格</div>
              <RangeInputSlider />
            </div>
            <FilterCheckbox heading="類別" options={categories} />
            <FilterCheckbox heading="活動" options={activities} />
            <FilterCheckbox heading="活動" options={activities} />
          </div>
        </div>
        <button
          type="submit"
          className="c-product-filter__action e-btn--primary e-btn--medium"
        >
          搜索
        </button>
      </div>
    </>
  );
}

export default Filter;
