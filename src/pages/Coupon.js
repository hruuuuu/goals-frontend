import { React, useState } from 'react';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';
import FloatingIcon from '../components/MemberSidebar/FloatingIcon';
import FloatingModal from '../components/MemberSidebar/FloatingModal';

function Coupon() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <Header />
      <div className="container">
<<<<<<< HEAD
        <div className="row gx-4">
          <div className="col-lg-3">
=======
<<<<<<< HEAD
        <div className="row">
<<<<<<< HEAD
          <div className="col-lg-3 d-none d-md-block">
=======
        <div className="row gx-4">
          <div className="col-lg-3">
>>>>>>> 81bbfd97534cff3c4e7840e41ffbfe222e444ac9
=======
          <div className="col-md-3 d-none d-md-block">
>>>>>>> d9049c77b0603eeb9e7031ce679e3c91bcb389be
>>>>>>> c7c88517502d7e096e1df23e0afb49b0824d8068
            <MemberSidebar />
          </div>
          <div className="col col-md-9">
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
                      <button className="couponBtn">已領取</button>
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
                      <button className="couponBtn1">領取優惠券</button>
                      <div className="remain-coupon">剩餘30張</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 浮動視窗 */}
        <div className="d-md-none">
          <FloatingIcon setIsDisplay={setIsDisplay} />
          {isDisplay && (
            <FloatingModal isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
          )}
        </div>
      </div>
    </>
  );
}

export default Coupon;
