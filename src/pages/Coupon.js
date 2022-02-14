import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingMember from '../components/FloatingMember';

import $ from 'jquery';

function Coupon() {
  const [isDisplay, setIsDisplay] = useState(false);
  const switchStatus = (e) => {
    $('.couponStatus').children().removeClass('active');
    $(e.target).addClass('active');
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row gx-4">
          <div className="col-md-3 d-none d-lg-block">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9 ">
            <div className="couponStatusBar">
              <ul className="couponStatus">
                <li className="canGet active" onClick={switchStatus}>
                  可領取
                </li>
                <li className="canUse" onClick={switchStatus}>
                  可使用
                </li>
                <li className="expired" onClick={switchStatus}>
                  已失效
                </li>
              </ul>
            </div>
            <div className="coupons">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="couponWrapper">
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
                            使用期間: 2022/01/01-2022/06/30
                          </p>
                        </div>
                      </div>
                      <button className="couponBtn">已領取</button>
                      <div className="remain-coupon">剩餘0張</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
    </>
  );
}

export default Coupon;
