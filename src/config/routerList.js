import Home from '../pages/Home';
import Products from '../pages/Products';
import Member from '../pages/Member';
import Fav from '../pages/Fav';
import Cart from '../pages/Cart';
import Coupon from '../pages/Coupon';
import Order from '../pages/Order';
import About from '../pages/About';
import Calculator from '../pages/Calculator';
import NotFound from '../pages/NotFound';
import ProductDetail from '../components/Products/ProductDetail';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { Navigate } from 'react-router-dom';

import imgFood from '../img/common/illustration/food.svg';

const routerList = [
  {
    path: `/`,
    element: <Home />,
    exact: true,
    breadcrumbName: '首頁',
  },
  {
    path: `products`,
    breadcrumbName: '商品列表',
    header: '健康餐盒',
    headerImg: imgFood,
    children: [
      {
        path: ``,
        element: <Products />,
        breadcrumbName: '商品列表',
        header: '健康餐盒',
        headerImg: imgFood,
      },
      {
        path: `detail`,
        element: <ProductDetail />,
        breadcrumbName: '商品細節',
      },
    ],
  },
  {
    path: `member`,
    breadcrumbName: '會員',
    header: '會員',
    headerImg: imgFood,
    children: [
      {
        path: ``,
        element: <Member />,
        breadcrumbName: '會員',
        header: '會員',
        headerImg: imgFood,
      },
      {
        path: `info`,
        element: <Member />,
        breadcrumbName: '會員資料',
        header: '會員資料',
        headerImg: imgFood,
      },
      {
        path: `fav`,
        element: <Fav />,
        breadcrumbName: '收藏清單',
        header: '收藏清單',
        headerImg: imgFood,
      },
      {
        path: `cart`,
        element: <Cart />,
        breadcrumbName: '購物車',
        header: '購物車',
        headerImg: imgFood,
      },
      {
        path: `coupon`,
        element: <Coupon />,
        breadcrumbName: '優惠券',
        header: '優惠券',
        headerImg: imgFood,
      },
      {
        path: `order`,
        element: <Order />,
        breadcrumbName: '歷史訂單',
        header: '歷史訂單',
        headerImg: imgFood,
      },
      {
        path: `*`,
        element: <Navigate to="info" />,
      },
    ],
  },
  {
    path: `about`,
    element: <About />,
    breadcrumbName: '關於',
  },
  {
    path: `calculator`,
    element: <Calculator />,
    breadcrumbName: '計算機',
  },
  {
    path: `signup`,
    element: <Signup />,
  },
  {
    path: `login`,
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routerList;
