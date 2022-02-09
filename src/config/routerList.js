import Home from '../pages/Home';
import Products from '../pages/Products';
import Member from '../pages/Member';
import Fav from '../pages/Fav';
import Cart from '../pages/Cart';
import Coupon from '../pages/Coupon';
import Order from '../pages/Order';
import About from '../pages/About';
import Calculator from '../pages/Calculator';
import ProductDetail from '../components/Products/ProductDetail';

import imgFood from '../img/common/illustration/food.svg';

const routerList = [
  {
    path: ``,
    element: <Home />,
    exact: true,
    breadcrumbName: '首頁',
  },
  {
    path: `/products`,
    element: <Products />,
    breadcrumbName: '商品列表',
    header: '健康餐盒',
    headerImg: imgFood,
    children: [
      {
        path: `detail`,
        element: <ProductDetail />,
        breadcrumbName: '商品細節',
      },
    ],
  },
  {
    path: `/member`,
    element: <Member />,
    breadcrumbName: '會員資料',
    header: '會員資料',
    headerImg: imgFood,
    children: [
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
];

export default routerList;
