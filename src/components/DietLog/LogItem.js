import { React, useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import Accordion from 'react-bootstrap/Accordion';

import { UPLOAD_URL } from '../../utils/config';
import { API_URL } from '../../utils/config';
import { useDietlog } from '../../context/dietlog';

function LogItem(props) {
  const { dietlog, getDietlogData } = props;
  const { id, title, description, image, created_at, category_id } = dietlog;
  const { setDietlogData, dietlogCategoryData } = useDietlog();
  const [category, setCategory] = useState({ id: '', name: '' });
  const [editMode, setEditMode] = useState(false);
  const [editFields, setEditFields] = useState({
    title: title,
    description: description,
    category: category_id,
  });

  const isFetchingCategory = dietlogCategoryData.length === 0;
  const isEmptyDescription = description === null || description === '';
  const isEmptyImage = image === null || image === '';
  const time = dayjs(created_at).format('HH:MM');

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleSave = () => {};

  const handleDelete = async () => {
    try {
      const response = await axios.post(`${API_URL}/dietlog/${id}`, {
        withCredentials: true,
      });
      if (response.status === 202) {
        Toast.fire({
          icon: 'success',
          title: '刪除成功',
        });
      } else if (response.status === 400) {
        Toast.fire({
          icon: 'error',
          title: '有東西出錯了',
        });
      }
      getDietlogData();
    } catch (error) {
      console.log(error);
    }
  };

  const descriptionLayout = () => {
    if (!isEmptyDescription && !editMode) {
      return <p className="l-dietlog__text">{description}</p>;
    } else if (!isEmptyDescription && editMode) {
      return (
        <>
          <label htmlFor="description" className="form-label c-form__label">
            記錄
          </label>
          <textarea
            type="text"
            className="form-control c-form__input c-form__input--textarea"
            id="description"
            name="description"
            value={editFields.description}
            onChange={handleFieldChange}
          />
        </>
      );
    } else {
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
            {editMode && (
              <>
                <label htmlFor="category" className="form-label c-form__label">
                  類別
                </label>
                <select
                  className="form-select c-form__select mb-2"
                  id="category"
                  name="category"
                  value={editFields.category}
                  onChange={handleFieldChange}
                >
                  {dietlogCategoryData.map((category) => {
                    const { id, name } = category;
                    return (
                      <option
                        key={id}
                        value={id}
                        disabled={id === editFields.category ? true : false}
                      >
                        {name}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
            <div className="l-dietlog__heading mb-2">
              {!editMode ? (
                <>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-pencil-alt e-icon e-icon--left e-icon--primary"></i>
                    {title}
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="title" className="form-label c-form__label">
                    標題
                  </label>

                  <textarea
                    type="text"
                    className="form-control c-form__input c-form__input--textarea"
                    name="title"
                    id="title"
                    value={editFields.title}
                    onChange={handleFieldChange}
                  />
                </>
              )}
            </div>
            {descriptionLayout()}
            {/* <div>熱量</div>
            <div>蛋白質</div>
            <div>脂肪</div>
            <div>飽和脂肪</div>
            <div>反式脂肪</div>
            <div>碳水化合物</div>
            <div>糖</div>
            <div>鈉</div> */}
            <div className="d-flex align-items-center justify-content-end mt-4">
              {!editMode ? (
                <button
                  type="button"
                  className="e-btn e-btn--icon e-btn--outline me-2"
                  onClick={handleEdit}
                >
                  <i className="fas fa-edit e-icon e-icon--primary"></i>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="e-btn e-btn--icon e-btn--outline me-2"
                    onClick={handleSave}
                  >
                    <i className="fas fa-save e-icon e-icon--primary"></i>
                  </button>
                </>
              )}
              <button
                type="button"
                className="e-btn e-btn--icon e-btn--outline"
                onClick={handleDelete}
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
