import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

function RangeInputSlider(props) {
  const { MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE, filterForm, setFilterForm } =
    props;
  const valuetext = (value) => {
    return `${value}`;
  };
  const [value, setValue] = useState({
    minPrice: MIN_PRODUCT_PRICE + 50,
    maxPrice: MAX_PRODUCT_PRICE - 50,
  });

  const handleSliderChange = (e) => {
    setValue({
      minPrice: Number(e.target.value[0]),
      maxPrice: Number(e.target.value[1]),
    });
    setFilterForm({
      ...filterForm,
      minPrice: Number(e.target.value[0]),
      maxPrice: Number(e.target.value[1]),
    });
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'minPrice') {
      setValue((prev) => {
        return {
          minPrice: Number(e.target.value),
          maxPrice: prev.maxPrice,
        };
      });
    } else if (e.target.name === 'maxPrice') {
      setValue((prev) => {
        return {
          minPrice: prev.minPrice,
          maxPrice: Number(e.target.value),
        };
      });
    }
  };

  const handleMinBlur = () => {
    if (value.minPrice <= MIN_PRODUCT_PRICE) {
      setValue({ minPrice: MIN_PRODUCT_PRICE, maxPrice: value.maxPrice });
    }
  };
  const handleMaxBlur = () => {
    if (value.maxPrice >= MAX_PRODUCT_PRICE) {
      setValue({ minPrice: value.minPrice, maxPrice: MAX_PRODUCT_PRICE });
    }
  };
  return (
    <>
      <Box>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={[value.minPrice, value.maxPrice]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          min={MIN_PRODUCT_PRICE}
          max={MAX_PRODUCT_PRICE}
        />
        <div className="d-flex align-items-center">
          <Input
            type="number"
            className="form-control c-range__input c-form__input"
            value={value.minPrice}
            inputMode="numeric"
            pattern="[0-9]*"
            size="small"
            onChange={handleInputChange}
            onBlur={handleMinBlur}
            autoComplete="off"
            inputProps={{
              min: MIN_PRODUCT_PRICE,
              max: MAX_PRODUCT_PRICE,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              'aria-labelledby': 'input-slider',
            }}
            name="minPrice"
          />
          <span className="c-range__text">~</span>
          <Input
            type="number"
            className="form-control c-range__input c-form__input"
            value={value.maxPrice}
            inputMode="numeric"
            pattern="[0-9]*"
            size="small"
            onChange={handleInputChange}
            onBlur={handleMaxBlur}
            autoComplete="off"
            inputProps={{
              min: MIN_PRODUCT_PRICE,
              max: MAX_PRODUCT_PRICE,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              'aria-labelledby': 'input-slider',
            }}
            name="maxPrice"
          />
        </div>
      </Box>
    </>
  );
}

export default RangeInputSlider;
