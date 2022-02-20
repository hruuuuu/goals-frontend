import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);
  // const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(`http://localhost:3002/api/order`, {
        // 為了跨源存取 cookie
        withCredentials: true,
      });
      setData(response.data);
    };
    getStock();
  }, []);

  return (
    <>
      {/* <div>
        {error && <div>{error}</div>}
        <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

        {data.map((stock) => {
          return (
            <div
              key={stock.id}
              className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer"
            >
              <Link to={`/stock/${stock.id}`}>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {stock.id}
                </h2>
                <p className="text-gray-700">{stock.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
      ); */}
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
                  <th scope="row">{order.id}</th>
                  <td>{order.create_at}</td>
                  <td>{order.payment_status}</td>
                  <td>{order.order_status}</td>
                  <td>{order.price * order.amount}</td>
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

      {/* RWD */}
      {data.map((order) => {
        return (
          <div
            className="d-flex d-lg-none justify-content-center mb-3 "
            key={order.id}
          >
            <div className="card cardorder ">
              <div onClick={handleShow} className="card-body ">
                <h5 className="card-title">{order.id}</h5>
                <div className="card-text">
                  <div className="my-3 d-flex justify-content-between">
                    <div>訂單日期</div>
                    <div>{order.create_at}</div>
                  </div>
                  <div className="orderline">
                    <div className="my-3 d-flex justify-content-between">
                      <div>付款狀態</div>
                      <div>{order.payment_status}</div>
                    </div>

                    <div className="my-3 d-flex justify-content-between">
                      <div>訂單狀態</div>
                      <div>{order.order_status}</div>
                    </div>

                    <div className="my-3 d-flex justify-content-between">
                      <div>總計</div>
                      <div>{order.price * order.amount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
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
