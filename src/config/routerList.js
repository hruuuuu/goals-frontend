import { Navigate, useNavigate } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Member from '../pages/Member';
import Fav from '../pages/Fav';
import Cart from '../pages/Cart';
import Coupon from '../pages/Coupon';
import Order from '../pages/Order';
import About from '../pages/About';
import Calculator from '../pages/Calculator';
import Blog from '../pages/Blog';
import NotFound from '../pages/NotFound';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';

import BlogArticle from '../components/Blog/BlogArticle';

import imgFood from '../img/common/illustration/food.svg';

const routerList = [
  {
    path: `/`,
    element: <Home />,
    exact: true,
    breadcrumbName: '首頁',
  },
  {
    path: `product`,
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
        path: `:productId`,
        element: <Products />,
        breadcrumbName: '商品細節',
        header: '健康餐盒',
        headerImg: imgFood,
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
    header: '關於果實',
    headerImg: imgFood,
  },
  {
    path: `calculator`,
    element: <Calculator />,
    breadcrumbName: '計算機',
    header: 'TDEE/ BMR 計算機',
    headerImg: imgFood,
  },
  {
    path: `blog`,
    breadcrumbName: '健康新知',
    header: '健康新知',
    headerImg: imgFood,
    children: [
      {
        path: ``,
        element: <Blog />,
        breadcrumbName: '健康新知',
        header: '健康新知',
        headerImg: imgFood,
      },
      {
        path: `article`,
        element: <BlogArticle />,
        breadcrumbName: '健康新知',
      },
    ],
  },
  // {
  //   path: `signup`,
  //   element: <Login />,
  // },
  {
    path: `login`,
    element: <Signup />,
  },
  {
    path: `resetpassword`,
    element: <ResetPassword />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routerList;
