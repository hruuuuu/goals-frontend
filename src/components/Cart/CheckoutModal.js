import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CartStepper from './CartStepper';
import Swal from 'sweetalert2';
import { useLogin } from '../../context/LoginStatus';
import { useNavigate } from 'react-router-dom';

function CheckoutModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const history = useNavigate();
  const handleShow = () => {
    if (!login) {
      Swal.fire({
        title: '購買前請先登入',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: '前往登入頁',
        cancelButtonText: '返回',
        reverseButtons: true,
        buttonsStyling: false,
        focusCancel: false,
        focusConfirm: false,
        customClass: {
          container: 'c-alert__overlay',
          popup: 'c-alert__modal',
          title: 'c-alert__title',
          htmlContainer: 'c-alert__text',
          confirmButton: 'e-btn e-btn--plain e-btn--medium ms-2',
          cancelButton: 'e-btn e-btn--cancel e-btn--medium',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          history('/login');
        } else {
          setShow(false);
        }
      });
    } else {
      setShow(true);
    }
  };
  const { login } = useLogin();
  const { orderTotal, setOrderTotal } = props;
  const { member, setMember } = props;
  const { couponId, setCouponId } = props;

  return (
    <>
      <button
        className="btn_grn py-3"
        type="button"
        onClick={() => handleShow()}
      >
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
          <CartStepper
            handleClose={handleClose}
            handleShow={handleShow}
            orderTotal={orderTotal}
            setOrderTotal={setOrderTotal}
            member={member}
            setMember={setMember}
            couponId={couponId}
            setCouponId={setCouponId}
          />
        </div>
      </Modal>
    </>
  );
}

export default CheckoutModal;
