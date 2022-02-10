import React, { useState } from 'react';
import '../../styles/_cartList.scss';

const cartList = () => {
  return (
    <>
      <table className="table table-borderless align-middle">
        <thead>
          <tr className="table-secondary">
            <th>商品縮圖</th>
            <th>商品名稱</th>
            <th>商品單價</th>
            <th>數量</th>
            <th>小計</th>
            <th>移除</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="https://picsum.photos/120"
                className="rounded-3"
                alt=""
              />
            </td>
            <td className="productName align-middle">叢林能量碗</td>
            <td className="align-middle">$110</td>
            <td className="align-middle">
              <div className="container bg-light rounded-3 d-flex justify-content-between">
                <span className="btn">
                  <i class="fa-solid fa-minus"></i>
                </span>
                <span></span>
                <span className="btn">
                  <i class="fa-solid fa-plus"></i>
                </span>
              </div>
            </td>
            <td className="align-middle">$110</td>
            <td className="align-middle">X</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="checkoutBox row">
        <div className="col">
          <div className="d-flex justify-content-between">
            <p>總計</p>
            <p>$2200</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>活動折扣</p>
            <p>-$ 20</p>
          </div>
          <div className="d-flex justify-content-between">
            <input type="text" placeholder="請輸入折扣券編號" />
            <button>送出</button>
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-between">
            <p>應付金額</p>
            <p>$2200</p>
          </div>
          <div>
            <button>前往結帳</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default cartList;
