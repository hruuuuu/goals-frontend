import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { useLogin } from '../../context/LoginStatus';
import { IMG_URL } from '../../utils/config';

const OrderList = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [sortDate, setSortDate] = useState(false);
  const [sortTotal, setSortTotal] = useState(false);
  const [sort, setSort] = useState('default');
  const [orderdata, setOrderData] = useState([
    { recipient: '', image: '3.webp' },
  ]);

  const isOrderList = data.length === 0;

  //取得已登入會員的ID
  const { user } = useLogin();

  useEffect(() => {
    let getOrder = async () => {
      let response = await axios.post(`${API_URL}/order`, user, {
        withCredentials: true,
      });
      setData(response.data);
    };

    getOrder();
  }, []);

  const sortObject = (sortType) => {
    if (sortType === 'create_at') {
      if (sortDate === true) {
        return data.sort((a, b) => a.id - b.id);
      } else {
        return data.sort((a, b) => a.id - b.id).reverse();
      }
    } else {
      if (sortTotal === true) {
        return data.sort((a, b) => a.total - b.total);
      } else {
        return data.sort((a, b) => a.total - b.total).reverse();
      }
    }
  };

  const changeSort = (sortType) => {
    if (sortType === 'create_at') {
      return data.sort((a, b) => {
        var dateA = new Date(a.create_at);
        var dateB = new Date(b.create_at);
        return dateA - dateB;
      });
    } else {
      return data.sort((a, b) => a.total - b.total);
    }
  };

  const handleShow = (order) => {
    setShow(true);

    let getOrderdetail = async () => {
      let response = await axios.post(`${API_URL}/order/orderdetail`, order, {
        withCredentials: true,
      });
      setOrderData([...response.data]);
    };

    getOrderdetail();
  };

  const handleClose = () => {
    setShow(false);
    // setOrderData([]);
  };

  return (
    <>
      {!isOrderList ? (
        <div className="d-none d-lg-block u-height u-height--page">
          <div className="d-flex d-none d-lg-block">
            <table className="table table-borderless orderlist_table">
              <thead>
                <tr>
                  <th scope="col">訂單編號</th>
                  <th
                    scope="col"
                    onClick={() => {
                      sortObject('create_at');
                      setSortDate(!sortDate);
                    }}
                  >
                    訂單日期 {''}
                    <i
                      className="fa fa-sort"
                      aria-hidden="true"
                      style={{ color: '#f8bc5d' }}
                    ></i>
                  </th>
                  <th scope="col">付款狀態</th>
                  <th scope="col">訂單狀態</th>
                  <th
                    scope="col"
                    onClick={() => {
                      sortObject('total');
                      setSortTotal(!sortTotal);
                    }}
                  >
                    總計 {''}
                    <i
                      className="fa fa-sort"
                      aria-hidden="true"
                      style={{ color: '#f8bc5d' }}
                    ></i>
                  </th>
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
                          className="e-btn e-btn--icon e-btn--outline"
                        >
                          <i className="fas fa-eye icon_grn e-icon"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* RWD */}

      <div className="d-flex d-lg-none justify-content-center mb-3 pb-3">
        <Form.Select
          className="form-select c-form__select"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            changeSort(e.target.value);
          }}
        >
          <option value="default" disabled>
            訂單排序依...
          </option>
          <option value="create_at">訂單日期</option>
          <option value="total">總計價格</option>
        </Form.Select>
      </div>
      {!isOrderList ? (
        data.map((order) => {
          return (
            <div
              className="d-flex d-lg-none justify-content-center mb-3 "
              key={order.id}
            >
              <div className="container">
                <div className="card cardorder">
                  <div
                    onClick={() => {
                      handleShow(order);
                    }}
                    className="card-body "
                  >
                    <h5 className="card-title order_td__order_id">
                      訂單編號:{order.id}
                    </h5>
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
            </div>
          );
        })
      ) : (
        <div className="u-height u-height--empty-page">
          <div className="empty_img">
            <img
              className="img-responsive"
              src={
                require('../../img/common/illustration/order-empty.svg').default
              }
              alt=""
            />
            <h5>沒有歷史訂單喔！趕快去下單吧！</h5>
          </div>
        </div>
      )}
      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>您的訂單詳情</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pb-3">
            <h6 className="c-product-detail__heading  d-inline">收件人 : </h6>
            <h6 className="d-inline">{orderdata[0].recipient}</h6>
          </div>
          <div className="pb-3">
            <h6 className="c-product-detail__heading  d-inline">付款方式 :</h6>
            <h6 className="d-inline">{orderdata[0].provider}</h6>
          </div>
          <div className="pb-3">
            <h6 className="c-product-detail__heading  d-inline">取貨方式 :</h6>
            <h6 className="d-inline">{orderdata[0].method}</h6>
          </div>
          <div className="pb-3">
            <h6 className="c-product-detail__heading  d-inline">配送地址 : </h6>
            <h6 className="d-inline">
              {orderdata[0].county}
              {orderdata[0].district}
              {orderdata[0].address}
            </h6>
          </div>

          <table className="table table-borderless orderlist_table">
            <thead>
              <tr>
                <th className="detailContent">品名</th>
                <th className="detailContent">商品</th>
                <th className="detailContent" style={{ width: '20%' }}>
                  份數
                </th>
              </tr>
            </thead>
            {orderdata.map((orderdata) => {
              return (
                <tbody key={orderdata.image}>
                  <tr>
                    <td className="detailContent">{orderdata.name}</td>
                    <td className="detailContent">
                      <img
                        className="orderDetail detailContent"
                        src={`${IMG_URL}/products/${orderdata.image}`}
                        alt="thumbnail"
                      />
                    </td>
                    <td className="detailContent">{orderdata.amount}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default OrderList;
