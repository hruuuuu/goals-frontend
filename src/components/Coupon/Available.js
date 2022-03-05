import { React, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { API_URL } from '../../utils/config';
import { useLogin } from '../../context/LoginStatus';
import Swal from 'sweetalert2';

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

    Swal.fire({
      icon: 'success',
      text: '領取成功',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <>
      {!isAvailableList ? (
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
                                使用期限:
                                <br />
                                {coupon.start_time}至<br />
                                {coupon.end_time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="couponBtn1"
                        onClick={(e) => {
                          getcoupon(coupon, e);
                        }}
                      >
                        可領取
                      </button>

                      <div className="e-tag e-tag--normal remain-coupon">
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
        <div className="coupons">
          <h1>目前還沒有可領取的優惠券</h1>
        </div>
      )}
    </>
  );
};

export default Available;
