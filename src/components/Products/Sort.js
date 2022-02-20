import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Sort() {
  const [sort, setSort] = useState('default');
  const navigate = useNavigate();
  const queryString = useLocation().search;
  useEffect(() => {
    if (queryString === '') {
      setSort('default');
    }
  }, [queryString]);

  return (
    <>
      <div className="l-header__sort">
        <div className="l-header__select-wrapper">
          <select
            className="form-select l-header__select"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              navigate(`/product?sortBy=${e.target.value}`);
            }}
          >
            <option value="default" disabled>
              商品排序依...
            </option>
            <option value="priceDesc">價格高 → 低</option>
            <option value="priceAsc">價格低 → 高</option>
            <option value="caloriesDesc">熱量高 → 低</option>
            <option value="caloriesAsc">熱量低 → 高</option>
          </select>
        </div>
        <Link
          to="/product"
          role="button"
          className="e-btn e-btn--medium e-btn--plain l-header__action"
        >
          清除篩選
        </Link>
      </div>
    </>
  );
}

export default Sort;
