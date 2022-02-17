import { React, useState } from 'react';

function CartMoblie(props) {
  const [count, setCount] = useState(1);
  return (
    <>
      <div className="floatingCart">
        <div className="mt-2 mx-1">
          <h2>購物車</h2>
        </div>
        <div className="floatingCartItem">
          <div
            className="row justify-content-between g-0 mx-1
              my-3"
          >
            <div className="col-4">
              <img
                src="https://picsum.photos/91"
                className="rounded-3"
                alt=""
              />
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-between mt-0">
                <div className="mt-0">
                  <p className="mb-2 txt_bolder font_larger">叢林能量碗</p>
                  <div className="d-flex pt-1">
                    <p>單價</p>
                    <p className="txt_grn ps-1">$110</p>
                  </div>
                </div>
                <div>
                  <button className="del_btn">
                    <i className="fas fa-trash-alt icon_grn"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-0 mt-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </div>
                  <div className="px-4 txt_bolder font_larger">{count}</div>
                  <div
                    className="btn"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </div>
                </div>
                <div>
                  <p className="txt_org txt_bolder font_larger">$110</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row justify-content-between g-0 mx-1
              my-3"
          >
            <div className="col-4">
              <img
                src="https://picsum.photos/91"
                className="rounded-3"
                alt=""
              />
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-between mt-0">
                <div className="mt-0">
                  <p className="mb-2 txt_bolder font_larger">叢林能量碗</p>
                  <div className="d-flex pt-1">
                    <p>單價</p>
                    <p className="txt_grn ps-1">$110</p>
                  </div>
                </div>
                <div>
                  <button className="del_btn">
                    <i className="fas fa-trash-alt icon_grn"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-0 mt-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </div>
                  <div className="px-4 txt_bolder font_larger">{count}</div>
                  <div
                    className="btn"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </div>
                </div>
                <div>
                  <p className="txt_org txt_bolder font_larger">$110</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row justify-content-between g-0 mx-1
              my-3"
          >
            <div className="col-4">
              <img
                src="https://picsum.photos/91"
                className="rounded-3"
                alt=""
              />
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-between mt-0">
                <div className="mt-0">
                  <p className="mb-2 txt_bolder font_larger">叢林能量碗</p>
                  <div className="d-flex pt-1">
                    <p>單價</p>
                    <p className="txt_grn ps-1">$110</p>
                  </div>
                </div>
                <div>
                  <button className="del_btn">
                    <i className="fas fa-trash-alt icon_grn"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-0 mt-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </div>
                  <div className="px-4 txt_bolder font_larger">{count}</div>
                  <div
                    className="btn"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </div>
                </div>
                <div>
                  <p className="txt_org txt_bolder font_larger">$110</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="floatingCartSummary">
          <div className="d-flex justify-content-between mb-2">
            <p>活動折扣</p>
            <p className="txt_bolder txt_error">-$ 20</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="font_larger txt_bolder">總計</p>
            <p className="txt_org txt_bolder fs-2">$110</p>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn_grn rounded-3 py-2" type="button">
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartMoblie;
