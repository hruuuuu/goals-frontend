import { React, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';

function Invalid() {
  const [data, setData] = useState([]);
  const userID = JSON.parse(localStorage.getItem('user'));
  const isInvalidList = data.length === 0;

  useEffect(() => {
    let getcoupon = async () => {
      let response = await axios.post(`${API_URL}/coupon/invalid`, userID, {
        withCredentials: true,
      });
      setData(response.data);
    };
    getcoupon();
  }, []);
  return (
    <>
      {!isInvalidList ? (
        <div className="coupons">
          <div className="row">
            {data.map((coupon) => {
              return (
                <div
                  className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                  key={coupon.id}
                >
                  <div className="couponWrapper mt-3">
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
                      {/* <button className="couponBtn">已領取</button> */}
                      {/* <div className="remain-coupon">剩餘{order.amount}張</div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>沒有失效的優惠券</h1>
      )}
    </>
  );
}

export default Invalid;
