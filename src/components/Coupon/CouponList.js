import { React, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Available from './Available';
import ReceiveList from './ReceiveList';
import Invalid from './Invalid';

const Coupon = () => {
  return (
    <>
      <div className="u-height u-height--empty-page u-margin u-margin--page-bottom">
        <div className="container">
          <div className="couponStatusBar">
            <ul className="c-tabs">
              <NavLink to="Available" className="c-tabs__btn c-tabs__btn--w100">
                可領取
              </NavLink>
              <NavLink
                to="ReceiveList"
                className="c-tabs__btn c-tabs__btn--w100"
              >
                可使用
              </NavLink>
              <NavLink to="Invalid" className="c-tabs__btn c-tabs__btn--w100">
                已失效
              </NavLink>
            </ul>
          </div>

          <Routes>
            <Route path="Available" element={<Available />} />
            <Route path="ReceiveList" element={<ReceiveList />} />
            <Route path="Invalid" element={<Invalid />} />
            <Route path="*" element={<Navigate to="Available" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Coupon;
