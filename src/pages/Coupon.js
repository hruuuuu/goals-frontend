import React from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import EditProfile from '../components/Member/EditProfile';

function Coupon() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <MemberSidebar />
          </div>
          <div className="col col-lg-9 col-md-12">
            <div className="couponStatusBar">
              <ul className="couponStatus">
                <li className="status">可領取</li>
                <li className="status">可使用</li>
                <li className="status">已失效</li>
              </ul>
            </div>
            <div className="coupons">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="couponWrapper">
                    <div className="coupon">
                      <div className="coupon-detail">
                        <div className="coupon-amount">
                          <i className="fas fa-dollar-sign"></i>
                          <p>50</p>
                        </div>
                        <div className="sperate-line"></div>
                        <div className="coupon-statement">
                          <p className="coupon-title">新會員折價券</p>
                          <p className="coupon-period">
                            使用期間: 2022/01/01-2022/06/30
                          </p>
                        </div>
                      </div>
                      <button className="btn couponBtn">已領取</button>
                      <div className="remain-coupon">剩餘0張</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="couponWrapper1">
                    <div className="coupon">
                      <div className="coupon-detail">
                        <div className="coupon-amount">
                          <i className="fas fa-dollar-sign"></i>
                          <p>50</p>
                        </div>
                        <div className="sperate-line"></div>
                        <div className="coupon-statement">
                          <p className="coupon-title">新會員折價券</p>
                          <p className="coupon-period">
                            使用期間: 2022/01/01-2022/06/30
                          </p>
                        </div>
                      </div>
                      <button className="btn couponBtn1">領取優惠券</button>
                      <div className="remain-coupon">剩餘30張</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <EditProfile /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupon;
