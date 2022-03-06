import { React, useState } from 'react';

import { useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../../utils/config';
import { useLogin } from '../../context/LoginStatus';

function ReceiveList() {
  const [data, setData] = useState([]);
  const { user } = useLogin();
  const isReceiveList = data.length === 0;

  useEffect(() => {
    let getcoupon = async () => {
      let response = await axios.post(`${API_URL}/coupon/receive`, user, {
        withCredentials: true,
      });
      setData(response.data);
    };
    getcoupon();
  }, []);
  return (
    <>
      {!isReceiveList ? (
        <div className="coupons">
          <div className="row gx-3 gy-4">
            {data.map((coupon) => {
              return (
                <div className="col-lg-6 col-md-6 col-sm-12" key={coupon.id}>
                  <div className="couponWrapper1">
                    <div className="coupon">
                      <div className="coupon-detail pt-4 mb-3">
                        <div className="row gx-1">
                          <div className="col-3 d-flex align-items-center">
                            <h4 className="coupon-amount">
                              {/* <i className="fas fa-dollar-sign"></i> */}
                              {coupon.title}
                            </h4>
                          </div>
                          <div className="col-1">
                            <div className="sperate-line"></div>
                          </div>
                          <div className="col-8">
                            <div className="coupon-statement">
                              <h6 className="coupon-title">
                                {coupon.discription}
                              </h6>
                              <p className="coupon-period">
                                使用期間:
                                <br />
                                {coupon.start_time}至<br />
                                {coupon.end_time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="remain-coupon">剩餘{order.amount}張</div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty_img">
          <img
            className="img-responsive"
            src={
              require('../../img/common/illustration/order-empty.svg').default
            }
            alt=""
          />
          <h5>目前還沒有可使用的優惠券喔！</h5>
        </div>
      )}
    </>
  );
}

export default ReceiveList;
