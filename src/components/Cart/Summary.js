import React from 'react';

import Shipping from './Shipping';

function Summary() {
  return (
    <>
      <div className="checkoutBox row align-items-end pt-2 pb-5">
        <div className="col me-5">
          <div className="d-flex justify-content-between py-2">
            <p>總計</p>
            <p className="txt_Org">$2200</p>
          </div>
          <div className="d-flex justify-content-between py-2">
            <p>活動折扣</p>
            <p className="txt_Org">-$ 20</p>
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
        <div className="col ms-5">
          <div className="d-flex justify-content-between py-2">
            <span>應付金額</span>
            <span className="txt_Org fs-1">$2200</span>
          </div>
          <div className="d-grid gap-2">
            {/* Button trigger modal */}
            <button
              className="btn btn_grn rounded-3 py-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              前往結帳
            </button>
            <Shipping />
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
