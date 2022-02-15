import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const OrderList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
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
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>200</td>
              <td className="p-0">
                <button onClick={handleShow} className="detail rounded-3">
                  <i className="fas fa-eye p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>100</td>
              <td className="p-0">
                <button onClick={handleShow} className="detail rounded-3">
                  <i className="fas fa-eye p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>50</td>
              <td>50</td>
              <td className="p-0">
                <button onClick={handleShow} className="detail rounded-3">
                  <i className="fas fa-eye p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex d-lg-none justify-content-center mb-3 ">
        <div className="card cardorder ">
          <div onClick={handleShow} className="card-body ">
            <h5 className="card-title">1111</h5>
            <h6 className="card-subtitle mb-2 text-muted">訂單日期</h6>
            <div className="card-text">
              <div className="orderline">
                <div className="my-3 d-flex justify-content-between">
                  <div>付款狀態</div>
                  <div>已付款</div>
                </div>

                <div className="my-3 d-flex justify-content-between">
                  <div>訂單狀態</div>
                  <div>準備中</div>
                </div>

                <div className="my-3 d-flex justify-content-between">
                  <div>付款狀態</div>
                  <div>$123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
