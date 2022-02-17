import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import axios from 'axios';

import { useProducts, useCategory, useActivity } from '../../context/products';
import { API_URL } from '../../utils/config';

import FilterCheckbox from './FilterCheckbox';

//const categories = ['素食餐盒', '增肌餐盒', '減脂餐盒'];
//const activities = ['新上市', '促銷中', '適用優惠券'];

function Filter(props) {
  const { device } = props;
  const MIN_PRODUCT_PRICE = 50;
  const MAX_PRODUCT_PRICE = 300;
  const { categoryData } = useCategory();
  const { activityData } = useActivity();
  const { productsData, setProductsData } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [filterForm, setFilterForm] = useState({
    search: '',
    minPrice: MIN_PRODUCT_PRICE,
    maxPrice: MAX_PRODUCT_PRICE,
    category: [],
    activity: [],
  });

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/product`, {
        withCredentials: true,
      });
      const productsData = response.data;
      setProductsData([...productsData]);
    } catch (error) {
      console.log(error);
    }
  };
  const getFilterProductsData = async (queryString) => {
    try {
      let response = await axios.get(`${API_URL}/product?${queryString}`, {
        withCredentials: true,
      });
      const filterProductsData = response.data;
      setProductsData([...filterProductsData]);
    } catch (error) {
      console.log(error);
    }
  };

  const locationSearch = location.search;
  useEffect(() => {
    if (locationSearch === '') {
      getProductsData();
    } else {
      const queryString = new URLSearchParams(locationSearch).toString();
      getFilterProductsData(queryString);
    }
  }, [locationSearch]);

  const categoryId = categoryData.map((item) => {
    const categoryId = [];
    categoryId.push(item.id);
    return categoryId;
  });

  const activityId = activityData.map((item) => {
    const activityId = [];
    activityId.push(item.id);
    return activityId;
  });

  // const handlePriceChange = (data) => {
  //   console.log(data);
  // setFilterForm((prev) => {
  //   return {
  //     search: prev.search,
  //     minPrice: data.minPrice,
  //     maxPrice: data.maxPrice,
  //   };
  // });
  // };
  const valuetext = (value) => {
    return `${value}`;
  };

  const RangeInputSlider = () => {
    const [value, setValue] = useState({
      minPrice: MIN_PRODUCT_PRICE + 50,
      maxPrice: MAX_PRODUCT_PRICE - 50,
    });

    const handleSliderChange = (e) => {
      setValue({
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

    const handleBlur = () => {
      if (value[0] < 0) {
        setValue([0, value[1]]);
      } else if (value[1] > MAX_PRODUCT_PRICE) {
        setValue([value[0], MAX_PRODUCT_PRICE]);
      }
    };

    return (
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let category;
    let activity;
    if (
      filterForm.search === '' &&
      filterForm.category.length === 0 &&
      filterForm.activity.length === 0
    ) {
      category = categoryId;
      activity = activityId;
    } else if (
      filterForm.category.length !== 0 &&
      filterForm.activity.length === 0
    ) {
      category = filterForm.category;
      activity = activityId;
    } else if (
      filterForm.category.length === 0 &&
      filterForm.activity.length !== 0
    ) {
      category = categoryId;
      activity = filterForm.activity;
    } else if (
      filterForm.search !== '' &&
      filterForm.category.length !== 0 &&
      filterForm.activity.length !== 0
    ) {
      category = filterForm.category;
      activity = filterForm.activity;
    } else {
      category = categoryId;
      activity = activityId;
    }

    const filterData = new FormData();
    filterData.append('search', filterForm.search);
    filterData.append('minPrice', filterForm.minPrice);
    filterData.append('maxPrice', filterForm.maxPrice);
    filterData.append('category', category);
    filterData.append('activity', activity);
    //console.log(filterForm);
    // for (var pair of filterData.entries()) {
    //   console.log(pair[0] + ' : ' + pair[1]);
    // }

    const queryString = new URLSearchParams(filterData).toString();
    //console.log(queryString);
    navigate(`/product?${queryString}`);
    getFilterProductsData(queryString);
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFilterForm({ ...filterForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className={`c-product-filter c-product-filter--${device}`}>
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
                  name="search"
                  value={filterForm.search}
                  className="form-control c-search__input c-form__input"
                  placeholder="輸入關鍵字"
                  autoComplete="off"
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="c-product-filter__price c-range">
              <div className="c-range__heading">價格</div>
              <RangeInputSlider />
            </div>
            <FilterCheckbox
              heading="類別"
              fieldName="category"
              options={categoryData}
              filterForm={filterForm}
              setFilterForm={setFilterForm}
            />
            <FilterCheckbox
              heading="活動"
              fieldName="activity"
              options={activityData}
              filterForm={filterForm}
              setFilterForm={setFilterForm}
            />
          </div>
        </div>
        <button
          type="submit"
          className="c-product-filter__action e-btn--primary e-btn--medium"
          onClick={handleFormSubmit}
        >
          搜索
        </button>
      </form>
    </>
  );
}

export default Filter;
