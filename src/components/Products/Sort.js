import { React, useState } from 'react';
import { Link } from 'react-router-dom';

function Sort() {
  const [sort, setSort] = useState('default');
  return (
    <>
      <div className="d-flex align-items-center">
        <select name="" id="" className="l-header__select">
          <option value="default" disabled>
            排序
          </option>
          <option value="discountPriceDesc">價格高 → 低</option>
          <option value="discountPriceAsc">價格低 → 高</option>
          <option value="caloriesDesc">熱量高 → 低</option>
          <option value="caloriesAsc">熱量低 → 高</option>
        </select>
        <Link
          to="/product"
          role="button"
          className="e-btn e-btn--medium e-btn--plain"
        >
          清除篩選
        </Link>
      </div>
    </>
  );
}

export default Sort;
