import { React, useState } from 'react';

import { useEffect } from 'react';
import axios from 'axios';

function Invalid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(
        `http://127.0.0.1:3002/api/coupon/invalid`,
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    };
    getStock();
  }, []);
  return (
    <>
      <div className="coupons">
        <div className="row">
          {data.map((order) => {
            return (
              <div
                className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                key={order.id}
              >
                <div className="couponWrapper mt-3">
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
                          使用期間: {order.start_time} 至 {order.end_time} 有效
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
    </>
  );
}

export default Invalid;
