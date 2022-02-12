import { NavLink } from 'react-router-dom';

const OrderList = () => {
  return (
    <>
      <div className="d-flex d-none d-sm-block">
        <table className="orderlisttable table table-borderless">
          <thead>
            <tr>
              <th scope="col">訂單編號</th>
              <th scope="col">訂單日期</th>
              <th scope="col">付款狀態</th>
              <th scope="col">訂單狀態</th>
              <th scope="col">總計</th>
              <th scope="col">查看</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>200</td>
              <td>
                <NavLink to="/" className="fas fa-eye"></NavLink>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>100</td>
              <td>
                <NavLink to="/" className="fas fa-eye"></NavLink>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>50</td>
              <td>50</td>
              <td>
                <NavLink to="/" className="fas fa-eye"></NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex d-sm-none justify-content-center mb-3">
        <div className="card cardorder">
          <div className="card-body">
            <h5 className="card-title">1111</h5>
            <h6 className="card-subtitle mb-2 text-muted">訂單日期</h6>
            <div className="card-text">
              <div className="orderline">
                <div className="my-3 d-flex justify-content-between">
                  <div>付款狀態</div>
                  <div>已付款</div>
                </div>

                <div className="my-3 d-flex justify-content-between">
                  <div>訂單狀態</div>
                  <div>準備中</div>
                </div>

                <div className="my-3 d-flex justify-content-between">
                  <div>付款狀態</div>
                  <div>$123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
