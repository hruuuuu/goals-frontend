import { React, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ReceiveList from './ReceiveList';
import Unvalid from './Unvalid';

import { useEffect } from 'react';
import axios from 'axios';

const Coupon = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(`http://127.0.0.1:3002/api/coupon/`, {
        withCredentials: true,
      });
      setData(response.data);
    };
    getStock();

    // console.log(data);
  }, []);

  // function Coupon() {
  //   const [isDisplay, setIsDisplay] = useState(false);
  //   const switchStatus = (e) => {
  //     $('.couponStatus').children().removeClass('active');
  //     $(e.target).addClass('active');
  //   };
  return (
    <>
      <div className="container">
        <div className="couponStatusBar">
          <ul className="couponStatus">
            <NavLink end to="" className="canGet">
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
          <Route path="ReceiveList" element={<ReceiveList />} />
          <Route path="Unvalid" element={<Unvalid />} />
        </Routes>

        <div className="coupons">
          <div className="row">
            {data.map((order) => {
              return (
                <div
                  className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                  key={order.id}
                >
                  <div className="couponWrapper1 mt-3">
                    <div className="coupon">
                      <div className="coupon-detail">
                        <h2 className="coupon-amount">
                          <i className="fas fa-dollar-sign"></i>
                          <p>50</p>
                        </h2>
                        <div className="sperate-line"></div>
                        <div className="coupon-statement">
                          <h5 className="coupon-title">{order.discription}</h5>
                          <p className="coupon-period">
                            使用期間: {order.start_time} 至 {order.end_time}{' '}
                            有效
                          </p>
                        </div>
                      </div>
                      <button className="couponBtn">已領取</button>
                      <div className="remain-coupon">剩餘{order.amount}張</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;

{
  /* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="couponWrapper1">
                    <div className="coupon">
                      <div className="coupon-detail">
                        <h2 className="coupon-amount">
                          <i className="fas fa-dollar-sign"></i>
                          <p>50</p>
                        </h2>
                        <div className="sperate-line"></div>
                        <div className="coupon-statement">
                          <h5 className="coupon-title">新會員折價券</h5>
                          <p className="coupon-period">
                            <span>使用期間:</span>
                            <span>2022/01/01-2022/06/30</span>
                          </p>
                        </div>
                      </div>
                      <button className="couponBtn1">領取優惠券</button>
                      <div className="remain-coupon">剩餘30張</div>
                    </div>
                  </div>
                </div> */
}

{
}
