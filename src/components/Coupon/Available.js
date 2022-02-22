import { React, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../../utils/config';

const Available = () => {
  const [data, setData] = useState([]);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(`${API_URL}/coupon/`, {
        withCredentials: true,
      });
      setData(response.data);
    };
    getStock();
  }, []);

  async function handleSubmit(e) {
    setActive(!isActive);

    console.log(data);

    alert('領取成功');
  }

  function deleteUserWithName(name) {
    console.log(name);
  }

  return (
    <>
      <div className="container">
        <div className="coupons">
          <div className="row">
            {data.map((order) => {
              return (
                <div
                  className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                  key={order.id}
                >
                  <div
                    className={
                      isActive ? 'couponWrapper mt-3' : 'couponWrapper1 mt-3'
                    }
                  >
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
                      <button
                        className={
                          isActive ? 'couponBtn mt-3' : 'couponBtn1 mt-3'
                        }
                        onClick={() => deleteUserWithName(order.id)}
                      >
                        已領取
                      </button>
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

export default Available;
