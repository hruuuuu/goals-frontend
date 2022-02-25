import { React, useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import dayjs from 'dayjs';

import { UPLOAD_URL } from '../../utils/config';
import { useDietlog } from '../../context/dietlog';

function LogItem(props) {
  const { dietlog } = props;
  const { id, title, description, image, created_at } = dietlog;
  const { dietlogCategoryData } = useDietlog();
  const [category, setCategory] = useState({ id: '', name: '' });

  const isFetchingCategory = dietlogCategoryData.length === 0;
  const isEmptyDescription = description === null || description === '';
  const isEmptyImage = image === null || image === '';
  const time = dayjs(created_at).format('HH:MM');

  const categoryTagClass = () => {
    switch (category.id) {
      case 1:
        return 'e-tag--breakfast';
      case 2:
        return 'e-tag--lunch';
      case 3:
        return 'e-tag--dinner';
      case 4:
        return 'e-tag--others';
      default:
        return;
    }
  };

  const cardClass = () => {
    switch (category.id) {
      case 1:
        return 'l-dietlog__card--breakfast';
      case 2:
        return 'l-dietlog__card--lunch';
      case 3:
        return 'l-dietlog__card--dinner';
      case 4:
        return 'l-dietlog__card--others';
      default:
        return;
    }
  };

  useEffect(() => {
    if (!isFetchingCategory) {
      const matchedCategory = dietlogCategoryData.find(
        (category) => dietlog.category_id === category.id
      );
      setCategory({ ...matchedCategory });
    }
  }, [dietlogCategoryData]);

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0" bsPrefix="l-dietlog__accordion">
          <Accordion.Button bsPrefix={`l-dietlog__card ${cardClass()}`}>
            <div className={`e-tag e-tag--normal mb-2 ${categoryTagClass()}`}>
              {category.name}
            </div>
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex flex-column align-items-start justify-content-end">
                <h6 className="l-dietlog__heading">{title}</h6>
                {/* <div className="l-dietlog__cal">熱量300卡</div> */}
                <div className="l-dietlog__time">{time}</div>
              </div>
              {!isEmptyImage && (
                <div className="l-dietlog__cover">
                  <img
                    className="e-img--cover"
                    src={`${UPLOAD_URL}/${image}`}
                    alt="diet-img"
                  />
                </div>
              )}
            </div>
          </Accordion.Button>
          <Accordion.Body>
            <h6 className="l-dietlog__heading mb-2">
              <i className="fas fa-pencil-alt e-icon e-icon--left e-icon--primary"></i>
              {title}
            </h6>
            {!isEmptyDescription && (
              <p className="l-dietlog__text mb-2">{description}</p>
            )}
            {/* <div>熱量</div>
            <div>蛋白質</div>
            <div>脂肪</div>
            <div>飽和脂肪</div>
            <div>反式脂肪</div>
            <div>碳水化合物</div>
            <div>糖</div>
            <div>鈉</div> */}
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                className="e-btn e-btn--icon e-btn--outline me-2"
              >
                <i className="fas fa-edit e-icon e-icon--primary"></i>
              </button>
              <button
                type="button"
                className="e-btn e-btn--icon e-btn--outline"
              >
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
