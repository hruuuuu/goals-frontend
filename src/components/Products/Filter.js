import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useProducts, useCategory } from '../../context/products';
import { useActivity } from '../../context/activity';
import { API_URL } from '../../utils/config';

import FilterCheckbox from './FilterCheckbox';
import RangeInputSlider from './RangeInputSlider';

function Filter(props) {
  const { device } = props;
  const MIN_PRODUCT_PRICE = 50;
  const MAX_PRODUCT_PRICE = 600;
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
      filterForm.search === '' &&
      filterForm.category.length !== 0 &&
      filterForm.activity.length === 0
    ) {
      category = filterForm.category;
      activity = activityId;
    } else if (
      filterForm.search === '' &&
      filterForm.category.length === 0 &&
      filterForm.activity.length !== 0
    ) {
      category = categoryId;
      activity = filterForm.activity;
    } else if (
      filterForm.search === '' &&
      filterForm.category.length !== 0 &&
      filterForm.activity.length !== 0
    ) {
      category = filterForm.category;
      activity = filterForm.activity;
    } else if (
      filterForm.search !== '' &&
      filterForm.category.length !== 0 &&
      filterForm.activity.length !== 0
    ) {
      category = filterForm.category;
      activity = filterForm.activity;
    } else if (
      filterForm.search !== '' &&
      filterForm.category.length !== 0 &&
      filterForm.activity.length === 0
    ) {
      category = filterForm.category;
      activity = activityId;
    } else if (
      filterForm.search !== '' &&
      filterForm.category.length === 0 &&
      filterForm.activity.length !== 0
    ) {
      category = categoryId;
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
              <RangeInputSlider
                MIN_PRODUCT_PRICE={MIN_PRODUCT_PRICE}
                MAX_PRODUCT_PRICE={MAX_PRODUCT_PRICE}
                filterForm={filterForm}
                setFilterForm={setFilterForm}
              />
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
