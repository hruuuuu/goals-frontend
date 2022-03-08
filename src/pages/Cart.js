import { React, useEffect, useState } from 'react';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header';
import MemberSidebar from '../components/MemberSidebar';

import FloatingMember from '../components/FloatingMember';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

import picBanner from '../img/page_banner/calculator.webp';

function Cart() {
  const [isDisplay, setIsDisplay] = useState(false);

  const history = useNavigate();

  // 顯示結帳成功訊息
  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    const paymentStatus = new URLSearchParams(window.location.search).get(
      'redirect_status'
    );

    if (clientSecret && paymentStatus === 'succeeded') {
      Swal.fire({
        icon: 'success',
        text: '付款成功',
      }).then((result) => {
        if (result.isConfirmed) {
          history('/member/order');
        }
      });
    } else if (clientSecret && paymentStatus === 'processing') {
      Swal.fire({
        icon: 'info',
        text: '您的付款正在處理中',
      }).then((result) => {
        if (result.isConfirmed) {
          history('/');
        }
      });
    } else if (clientSecret && paymentStatus === 'requires_payment_method') {
      Swal.fire({
        icon: 'warning',
        text: '您的付款不成功，請再試一次',
      }).then((result) => {
        if (result.isConfirmed) {
          history('/');
        }
      });
    }
    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     text: '發生不明錯誤',
    //   });
    // }
  }, []);

  return (
    <>
      <PageBanner img={picBanner} />
      <Header />
      <div className="u-height u-height--page u-margin u-margin--page-bottom">
        <div className="container">
          <div className="row gx-4 h-100">
            <div className="col-lg-3 col-xl-3 d-none d-lg-block">
              <MemberSidebar />
            </div>
            <div className="col col-xl-9 col-lg-9 col-md-12 col-sm-12">
              <CartList />
            </div>
          </div>
        </div>
        {/* {message && <div id="payment-message">{message}</div>} */}
      </div>
      {/* 浮動視窗 */}
      <FloatingMember />
      <FloatingChat />
      <ScrollButton />
    </>
  );
}

export default Cart;
