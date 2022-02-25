import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import { IMG_URL } from '../../utils/config';

function LogItem() {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0" bsPrefix="l-dietlog__accordion">
          <Accordion.Button bsPrefix="l-dietlog__card l-dietlog__card--breakfast">
            <div className="e-tag e-tag--normal mb-2">早餐</div>
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex flex-column align-items-start justify-content-end">
                <h6 className="l-dietlog__heading">
                  7-11草莓優格、焦糖瑪奇朵、熱狗、水煮蛋
                </h6>
                {/* <div className="l-dietlog__cal">熱量300卡</div> */}
                <div className="l-dietlog__time">09:00</div>
              </div>
              <div className="l-dietlog__cover">
                <img
                  className="e-img--cover"
                  src={`${IMG_URL}/products/salmon.jpeg`}
                  alt="diet-img"
                />
              </div>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            <h6 className="l-dietlog__heading mb-2">
              7-11草莓優格、焦糖瑪奇朵、熱狗、水煮蛋
            </h6>
            <p className="l-dietlog__text mb-2">
              <i className="fas fa-sticky-note e-icon e-icon--left e-icon--primary"></i>
              早上胃口不好 隨便亂吃
            </p>
            {/* <div>熱量</div>
            <div>蛋白質</div>
            <div>脂肪</div>
            <div>飽和脂肪</div>
            <div>反式脂肪</div>
            <div>碳水化合物</div>
            <div>糖</div>
            <div>鈉</div> */}
            <div className="d-flex align-items-center justify-content-end">
              <button className="e-btn e-btn--icon e-btn--outline me-2">
                <i className="fas fa-edit e-icon e-icon--primary"></i>
              </button>
              <button className="e-btn e-btn--icon e-btn--outline">
                <i className="fas fa-trash-alt e-icon e-icon--primary"></i>
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default LogItem;
