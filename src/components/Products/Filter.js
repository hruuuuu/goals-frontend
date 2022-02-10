import React from 'react';
import FilterCheckbox from './FilterCheckbox';

function Filter() {
  const categories = ['素食餐盒', '增肌餐盒', '減脂餐盒'];
  const activities = ['新上市', '促銷中', '適用優惠券'];
  return (
    <>
      <div className="c-product-filter">
        <div className="c-product-filter__title">
          <i className="fas fa-sliders-h"></i>
          篩選
        </div>
        <div className="c-product-filter__search c-search">
          <label htmlFor="search" className="c-search__heading">
            搜索
          </label>
          <input
            type="text"
            id="search"
            className="c-search__input c-input"
            placeholder="輸入關鍵字"
            autoComplete="off"
            onChange={() => {}}
          />
        </div>
        <div className="c-product-filter__price c-search">
          <label htmlFor="range" className="c-search__title">
            價格
          </label>
          <input
            type="range"
            id="range"
            className="c-search__range c-range"
            onChange={() => {}}
          />
          <div className="d-flex">
            <input
              type="number"
              className="c-search__input c-input"
              inputMode="numeric"
              pattern="[0-9]*"
              value="0"
              autoComplete="off"
              onChange={() => {}}
            />
            <span>~</span>
            <input
              type="number"
              className="c-search__input c-input"
              inputMode="numeric"
              pattern="[0-9]*"
              value="0"
              autoComplete="off"
              onChange={() => {}}
            />
          </div>
        </div>
        <FilterCheckbox heading="類別" options={categories} />
        <FilterCheckbox heading="活動" options={activities} />
        <button type="submit" className="c-product-filter__action">
          搜索
        </button>
      </div>
    </>
  );
}

export default Filter;
