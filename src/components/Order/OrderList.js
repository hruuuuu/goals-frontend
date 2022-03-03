import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { useLogin } from '../../context/LoginStatus';
import { IMG_URL } from '../../utils/config';

const OrderList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setOrderData([]);
  };
  const [data, setData] = useState([]);
  const [orderdata, setOrderData] = useState([]);

  const isOrderList = data.length === 0;

  //取得已登入會員的ID
  const { user } = useLogin();

  useEffect(() => {
    let getOrder = async () => {
      let response = await axios.post(`${API_URL}/order`, user, {
        withCredentials: true,
      });
      setData(response.data);

      console.log(response.data);
    };

    getOrder();
  }, []);

  const handleShow = (order) => {
    setShow(true);

    let getOrderdetail = async () => {
      let response = await axios.post(
        `${API_URL}/order/orderdetail`,
        order,

        {
          withCredentials: true,
        }
      );
      setOrderData([...response.data]);
    };
    getOrderdetail();
  };

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
                    <td className="order_td__total">{order.total}</td>
                    <td className="p-0">
                      <button
                        onClick={() => {
                          handleShow(order);
                        }}
                        className="detail rounded-3"
                      >
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
                <div
                  onClick={() => {
                    handleShow(order);
                  }}
                  className="card-body "
                >
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
                        <div className="order_td__total">{order.total}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1></h1>
      )}
      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>您的訂單詳情</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless orderlist_table">
            <thead>
              <tr>
                <th className="order_td__order_id">品名</th>
                <th>商品</th>
                <th>份數</th>
              </tr>
            </thead>
            {orderdata.map((orderdata) => {
              return (
                <tbody key={orderdata.index}>
                  <tr>
                    <td className="order_td__order_id">{orderdata.name}</td>
                    <td>
                      <img
                        className="cartItem__img"
                        src={`${IMG_URL}/products/${orderdata.image}`}
                        alt="thumbnail"
                      />
                    </td>
                    <td className="order_td__order_status">
                      {orderdata.amount}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </Modal.Body>
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
