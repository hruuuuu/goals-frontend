import { React, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Available from './Available';
import ReceiveList from './ReceiveList';
import Unvalid from './Unvalid';

const Coupon = () => {
  return (
    <>
      <div className="container">
        <div className="couponStatusBar">
          <ul className="couponStatus">
            <NavLink to="Available" className="canGet">
              可領取
            </NavLink>
            <NavLink to="ReceiveList" className="canUse ">
              可使用
            </NavLink>
            <NavLink to="Unvalid" className="expired">
              已失效
            </NavLink>
          </ul>
        </div>

        <Routes>
          <Route path="Available" element={<Available />} />
          <Route path="ReceiveList" element={<ReceiveList />} />
          <Route path="Unvalid" element={<Unvalid />} />
          <Route path="*" element={<Navigate to="Available" />} />
        </Routes>
      </div>
    </>
  );
};

export default Coupon;
