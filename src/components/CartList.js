import React from 'react';
import '../styles/_cartList.scss';

const cartList = () => {
  return (
    <>
      <table className="table table-borderless">
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
            <td className="productName">叢林能量碗</td>
            <td>$110</td>
            <td>1</td>
            <td>$110</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default cartList;
