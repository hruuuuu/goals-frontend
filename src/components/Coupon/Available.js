import { React, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';

const Available = () => {
  const [data, setData] = useState([]);
  const [isActive, setActive] = useState(false);

  //取得目前可領取的優惠券
  useEffect(() => {
    let couponValid = async () => {
      let response = await axios.get(`http://127.0.0.1:3002/api/coupon/get/`, {
        withCredentials: true,
      });
      setData(response.data);
    };
    couponValid();
  }, []);

  // async function handleSubmit(e) {
  //   setActive(!isActive);

  //   console.log(data);

  //   alert('領取成功');
  // }

  function getcoupon(name, e) {
    // setActive(!isActive);

    console.log(name);
    $(e.target)
      .parent()
      .parent()
      .removeClass('couponWrapper1')
      .addClass('couponWrapper');

    $(e.target)
      .removeClass('couponBtn1')
      .addClass('couponBtn')
      .attr('disabled', true)
      .html('已領取');

    alert('領取成功');
  }

  return (
    <>
      <div className="container">
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
                          <i className="fas fa-dollar-sign"></i>
                          <p>50</p>
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
                      <button
                        className="couponBtn1 mt-3"
                        onClick={(e) => getcoupon(coupon.id, e)}
                      >
                        可領取
                      </button>
                      <div className="remain-coupon">剩餘{coupon.amount}張</div>
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
