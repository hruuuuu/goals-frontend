import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CartStepper from './CartStepper';

function CheckoutModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn_grn py-3" type="button" onClick={handleShow}>
        前往結帳
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen="md-down"
        className="checkoutModal"
      >
        <div className="mt-3 px-3 d-flex justify-content-end">
          <button className="btn btn-lg" onClick={handleClose}>
            <i className="fas fa-times icon_grn"></i>
          </button>
        </div>
        <div className="container mb-4 px-5">
          <CartStepper handleClose={handleClose} />
        </div>
      </Modal>
    </>
  );
}

export default CheckoutModal;
