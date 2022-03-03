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
          <div className="row">
            {data.map((coupon) => {
              return (
                <div
                  className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                  key={coupon.id}
                >
                  <div className="couponWrapper1 mt-3">
                    <div className="coupon">
                      <div className="coupon-detail">
                        <h2 className="coupon-amount">
                          {/* <i className="fas fa-dollar-sign"></i> */}
                          <p>{coupon.title}</p>
                        </h2>
                        <div className="sperate-line"></div>
                        <div className="coupon-statement">
                          <h5 className="coupon-title">{coupon.discription}</h5>
                          <p className="coupon-period">
                            使用期間: {coupon.start_time} 至 {coupon.end_time}{' '}
                            有效
                          </p>
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
        <h1>目前還沒有優惠券</h1>
      )}
    </>
  );
}

export default ReceiveList;
