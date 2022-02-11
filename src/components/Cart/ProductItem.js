import React, { useState } from 'react';

function ProductItem(props) {
  const [count, setCount] = useState(1);
  return (
    <>
      <div className="cartItem">
        <table className="table table-borderless align-middle">
          <thead>
            <tr className="table-secondary">
              <th>商品縮圖</th>
              <th>商品名稱</th>
              <th>商品單價</th>
              <th className="text-center">數量</th>
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
              <td className="align-middle txt_grn">$110</td>
              <td className="align-middle px-5">
                <div className="container bg-light rounded-3 d-flex justify-content-between align-items-center p-0">
                  <span
                    className="btn pe-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </span>
                  <span className="p-0">{count}</span>
                  <span
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </span>
                </div>
              </td>
              <td className="align-middle txt_Org">$110</td>
              <td className="align-middle">
                <button className="del_btn rounded-3 py-1">
                  <i className="fas fa-trash-alt p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://picsum.photos/120"
                  className="rounded-3"
                  alt=""
                />
              </td>
              <td className="productName align-middle">叢林能量碗</td>
              <td className="align-middle txt_grn">$110</td>
              <td className="align-middle px-5">
                <div className="container bg-light rounded-3 d-flex justify-content-between align-items-center p-0">
                  <span
                    className="btn pe-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </span>
                  <span className="p-0">{count}</span>
                  <span
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </span>
                </div>
              </td>
              <td className="align-middle txt_Org">$110</td>
              <td className="align-middle">
                <button className="del_btn rounded-3 py-1">
                  <i className="fas fa-trash-alt p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://picsum.photos/120"
                  className="rounded-3"
                  alt=""
                />
              </td>
              <td className="productName align-middle">叢林能量碗</td>
              <td className="align-middle txt_grn">$110</td>
              <td className="align-middle px-5">
                <div className="container bg-light rounded-3 d-flex justify-content-between align-items-center p-0">
                  <span
                    className="btn pe-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </span>
                  <span className="p-0">{count}</span>
                  <span
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </span>
                </div>
              </td>
              <td className="align-middle txt_Org">$110</td>
              <td className="align-middle">
                <button className="del_btn rounded-3 py-1">
                  <i className="fas fa-trash-alt p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://picsum.photos/120"
                  className="rounded-3"
                  alt=""
                />
              </td>
              <td className="productName align-middle">叢林能量碗</td>
              <td className="align-middle txt_grn">$110</td>
              <td className="align-middle px-5">
                <div className="container bg-light rounded-3 d-flex justify-content-between align-items-center p-0">
                  <span
                    className="btn pe-0"
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <i className="fas fa-minus icon_grn"></i>
                  </span>
                  <span className="p-0">{count}</span>
                  <span
                    className="btn ps-0"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <i className="fas fa-plus icon_grn"></i>
                  </span>
                </div>
              </td>
              <td className="align-middle txt_Org">$110</td>
              <td className="align-middle">
                <button className="del_btn rounded-3 py-1">
                  <i className="fas fa-trash-alt p-1 icon_grn"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductItem;
