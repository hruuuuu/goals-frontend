import { React } from 'react';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import FavIcon from './FavIcon';
import Counter from './Counter';

function ProductDetail(props) {
  const { open, setOpen } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/product');
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="m-product-detail"
      >
        <Fade in={open}>
          <Box className="m-product-detail__modal">
            <div className="row">
              <div className="col-7">
                <div className="m-product-detail__cover">
                  <img
                    className="m-product-detail__img"
                    src={require('../../img/products/sunshine_bowl.jpeg')}
                    alt="product"
                  />
                </div>
              </div>
              <div className="col-5 d-flex flex-column justify-content-between">
                <div>
                  <div className="position-relative">
                    <div className="e-tag e-tag--normal">素食餐盒</div>
                    <h4 className="my-3">叢林能量碗</h4>
                    <FavIcon size="large" />
                    <div className="m-product-detail__nutrition">
                      <ul className="m-product-detail__list">
                        <li className="m-product-detail__item">379卡路里</li>
                        <li className="m-product-detail__item">8克脂肪</li>
                      </ul>
                      <ul className="m-product-detail__list">
                        <li className="m-product-detail__item">14克蛋白質</li>
                        <li className="m-product-detail__item">
                          68克碳水化合物
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="m-product-detail__detail">
                    <div className="m-product-detail__description">
                      <div className="m-product-detail__subtitle">
                        <i className="fas fa-pencil-alt e-icon e-icon--left m-product-detail__icon"></i>
                        <h6 className="m-product-detail__heading">商品描述</h6>
                      </div>
                      <p className="m-product-detail__text">
                        我們能量碗系列中最陽光的一面。有機藜麥與大蒜羽衣甘藍拌勻，淋上薑黃花椰菜、特級初榨橄欖油、鷹嘴豆和烤無鹽南瓜籽。
                      </p>
                    </div>
                    <div className="m-product-detail__description">
                      <div className="m-product-detail__subtitle">
                        <i className="fas fa-pepper-hot e-icon e-icon--left m-product-detail__icon"></i>
                        <h6 className="m-product-detail__heading">商品成分</h6>
                      </div>
                      <p className="m-product-detail__text">
                        有機藜麥、羽衣甘藍、花椰菜、薑黃、辣椒粉、鷹嘴豆、檸檬汁、米醋、新鮮大蒜、鷹嘴豆、烤有機南瓜子、特級初榨橄欖油、海鹽和黑胡椒。
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <hr className="e-hr e-hr--divider my-3" />
                  <div className="d-flex justify-content-between align-items-end mb-3">
                    <Counter />
                    <div className="d-flex flex-column align-items-end ps-5">
                      <h6 className="m-product-detail__o-price">$150</h6>
                      <h2 className="m-product-detail__price">$110</h2>
                    </div>
                  </div>
                  <button className="e-btn e-btn--primary e-btn--w100 e-btn--large">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ProductDetail;
