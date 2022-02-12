import React, { useState } from 'react';

function ProductItem(props) {
  const [count, setCount] = useState(1);
  return (
    <>
      <div className="cartItem container">
        <div className="row thead py-2 justify-content-between align-items-center">
          <div className="col">商品縮圖</div>
          <div className="col">商品名稱</div>
          <div className="col">商品單價</div>
          <div className="col-3 text-center">數量</div>
          <div className="col">小計</div>
          <div className="col">移除</div>
        </div>
        <div className="row py-3 justify-content-between align-items-center">
          <div className="col">
            <img src="https://picsum.photos/120" className="rounded-3" alt="" />
          </div>
          <div className="col">叢林能量碗</div>
          <div className="col txt_grn">$110</div>
          <div className="col-3 px-5">
            <div className="qty_btn d-flex align-items-center justify-content-between">
              <div
                className="btn"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div>{count}</div>
              <div
                className="btn"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <i className="fas fa-plus icon_grn"></i>
              </div>
            </div>
          </div>
          <div className="col txt_Org">$110</div>
          <div className="col">
            <button className="del_btn rounded-3 py-1">
              <i className="fas fa-trash-alt p-1 icon_grn"></i>
            </button>
          </div>
        </div>
        <div className="row py-3 justify-content-between align-items-center">
          <div className="col">
            <img src="https://picsum.photos/120" className="rounded-3" alt="" />
          </div>
          <div className="col">叢林能量碗</div>
          <div className="col txt_grn">$110</div>
          <div className="col-3 px-5">
            <div className="qty_btn d-flex align-items-center justify-content-between">
              <div
                className="btn"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div>{count}</div>
              <div
                className="btn"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <i className="fas fa-plus icon_grn"></i>
              </div>
            </div>
          </div>
          <div className="col txt_Org">$110</div>
          <div className="col">
            <button className="del_btn rounded-3 py-1">
              <i className="fas fa-trash-alt p-1 icon_grn"></i>
            </button>
          </div>
        </div>
        <div className="row py-3 justify-content-between align-items-center">
          <div className="col">
            <img src="https://picsum.photos/120" className="rounded-3" alt="" />
          </div>
          <div className="col">叢林能量碗</div>
          <div className="col txt_grn">$110</div>
          <div className="col-3 px-5">
            <div className="qty_btn d-flex align-items-center justify-content-between">
              <div
                className="btn"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div>{count}</div>
              <div
                className="btn"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <i className="fas fa-plus icon_grn"></i>
              </div>
            </div>
          </div>
          <div className="col txt_Org">$110</div>
          <div className="col">
            <button className="del_btn rounded-3 py-1">
              <i className="fas fa-trash-alt p-1 icon_grn"></i>
            </button>
          </div>
        </div>
        <div className="row py-3 justify-content-between align-items-center">
          <div className="col">
            <img src="https://picsum.photos/120" className="rounded-3" alt="" />
          </div>
          <div className="col">叢林能量碗</div>
          <div className="col txt_grn">$110</div>
          <div className="col-3 px-5">
            <div className="qty_btn d-flex align-items-center justify-content-between">
              <div
                className="btn"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                <i className="fas fa-minus icon_grn"></i>
              </div>
              <div>{count}</div>
              <div
                className="btn"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <i className="fas fa-plus icon_grn"></i>
              </div>
            </div>
          </div>
          <div className="col txt_Org">$110</div>
          <div className="col">
            <button className="del_btn rounded-3 py-1">
              <i className="fas fa-trash-alt p-1 icon_grn"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
