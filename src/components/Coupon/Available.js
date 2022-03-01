import { React, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';

import { API_URL } from '../../utils/config';
import { useLogin } from '../../context/LoginStatus';

const Available = () => {
  const [data, setData] = useState([]);
  const { user } = useLogin();
  const isAvailableList = data.length === 0;
  const [member, setMember] = useState({});

  //取得目前可領取的優惠券

  useEffect(() => {
    let couponValid = async () => {
      let response = await axios.post(`${API_URL}/coupon/get/`, user, {
        withCredentials: true,
      });
      setData(response.data);
    };
    couponValid();

    let getProfile = async () => {
      let response = await axios.post(`${API_URL}/member/getprofile`, user, {
        withCredentials: true,
      });

      setMember(response.data[0]);
    };

    getProfile();
  }, []);

  async function getcoupon(coupon, e) {
    // console.log(coupon.id);

    const couponReceive = { coupon_id: coupon.id, member_id: member.id };
    let response = await axios.post(`${API_URL}/coupon/post`, couponReceive);

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

    $(e.target)
      .next()
      .children()
      .html(coupon.amount - 1);

    alert('領取成功');
  }

  return (
    <>
      {!isAvailableList ? (
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
                      <button
                        className="couponBtn1 mt-3"
                        onClick={(e) => {
                          getcoupon(coupon, e);
                        }}
                      >
                        可領取
                      </button>

                      <div className="remain-coupon">
                        剩餘<span>{coupon.amount}</span>張
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>目前還沒有可領取的優惠券</h1>
      )}
    </>
  );
};

export default Available;
