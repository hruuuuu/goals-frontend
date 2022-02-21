import React from 'react';
// import Shipping from './Shipping';
import CheckoutModal from './CheckoutModal';

function Summary() {
  return (
    <>
      <div className="checkoutBox row gx-4 gx-md-5 gy-2 align-items-end">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between py-2">
            <p>總計</p>
            <p className="txt_org">$2200</p>
          </div>
          <div className="d-flex justify-content-between py-2">
            <p>活動折扣</p>
            <p className="txt_org">-$ 20</p>
          </div>
          <div className="d-flex justify-content-between pt-2">
            <input
              type="text"
              className="rounded-3 coupon_input flex-grow-1 me-2"
              placeholder="請輸入折扣券編號"
            />
            <button className="btn-sm btn_grn rounded-3" type="button">
              送出
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between py-2">
            <span>應付金額</span>
            <span className="txt_org fs-1">$2200</span>
          </div>
          <div className="d-grid gap-2">
            {/* <Shipping /> */}
            <CheckoutModal />
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
