import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../../utils/config';

const OrderList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);
  // const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const isOrderList = data.length === 0;

  //取得已登入會員的ID
  const userID = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    let getOrder = async () => {
      let response = await axios.post(
        `${API_URL}/order`,
        userID,

        {
          withCredentials: true,
        }
      );
      setData(response.data);
    };
    getOrder();
  }, []);

  return (
    <>
      {!isOrderList ? (
        <div className="d-flex d-none d-lg-block">
          <table className="table table-borderless orderlist_table">
            <thead>
              <tr>
                <th scope="col">訂單編號</th>
                <th scope="col">訂單日期</th>
                <th scope="col">付款狀態</th>
                <th scope="col">訂單狀態</th>
                <th scope="col">總計</th>
                <th scope="col">查看</th>
              </tr>
            </thead>

            {data.map((order) => {
              return (
                <tbody key={order.id}>
                  <tr>
                    <th scope="row" className="order_td__order_id">
                      {order.id}
                    </th>
                    <td className="order_td__create_at">{order.create_at}</td>
                    <td className="order_td__payment_status">
                      {order.payment_status}
                    </td>
                    <td className="order_td__order_status">
                      {order.order_status}
                    </td>
                    <td className="order_td__total">
                      {order.price * order.amount}
                    </td>
                    <td className="p-0">
                      <button onClick={handleShow} className="detail rounded-3">
                        <i className="fas fa-eye p-1 icon_grn"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <h1>沒有過去訂單</h1>
      )}
      {/* RWD */}

      {!isOrderList ? (
        data.map((order) => {
          return (
            <div
              className="d-flex d-lg-none justify-content-center mb-3 "
              key={order.id}
            >
              <div className="card cardorder ">
                <div onClick={handleShow} className="card-body ">
                  <h5 className="card-title order_td__order_id">{order.id}</h5>
                  <div className="card-text">
                    <div className="my-3 d-flex justify-content-between">
                      <div>訂單日期</div>
                      <div className="order_td__create_at">
                        {order.create_at}
                      </div>
                    </div>
                    <div className="orderline">
                      <div className="my-3 d-flex justify-content-between">
                        <div>付款狀態</div>
                        <div className="order_td__payment_status">
                          {order.payment_status}
                        </div>
                      </div>

                      <div className="my-3 d-flex justify-content-between">
                        <div>訂單狀態</div>
                        <div className="order_td__order_status">
                          {order.order_status}
                        </div>
                      </div>

                      <div className="my-3 d-flex justify-content-between">
                        <div>總計</div>
                        <div className="order_td__total">
                          {order.price * order.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>沒有過去訂單</h1>
      )}
      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>您的訂單詳情</Modal.Title>
        </Modal.Header>
        <Modal.Body>OrderDetail</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderList;
