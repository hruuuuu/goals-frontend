import { React, useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import Accordion from 'react-bootstrap/Accordion';

import { UPLOAD_URL } from '../../utils/config';
import { API_URL } from '../../utils/config';
import { useDietlog } from '../../context/dietlog';

function LogItem(props) {
  const { dietlog, getDietlogData, refreshImg, setRefreshImg } = props;
  const { id, title, description, created_at, edited_at, category_id } =
    dietlog;
  const { setDietlogData, dietlogCategoryData } = useDietlog();
  const [category, setCategory] = useState({ id: '', name: '' });
  const [dietlogImg, setDietlogImg] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editFields, setEditFields] = useState({
    title: title,
    description: description,
    category: category_id,
    imgs: [],
  });

  const isFetchingCategory = dietlogCategoryData.length === 0;
  const isEmptyDescription =
    description === null || description === '' || description === 'null';
  const isEmptyImage = dietlogImg.length === 0;
  const isEmptyEditedAt = edited_at === null || edited_at === '';
  const isEmptyEditImage = editFields.imgs.length === 0;

  const createdAt = dayjs(created_at).format('HH:mm');
  const editedAt = dayjs(edited_at).format('HH:mm');

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

  const getDietlogImg = async () => {
    const data = { id: id };
    try {
      const response = await axios.post(`${API_URL}/dietlog/image`, data, {
        withCredentials: true,
      });
      const dietlogImg = response.data;
      setDietlogImg([...dietlogImg]);
    } catch (error) {}
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    let imgArr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imgArr.push(e.target.files[i]);
    }
    setEditFields({ ...editFields, [e.target.name]: imgArr });
  };

  const handleBack = () => {
    setEditMode(false);
  };

  const handleSave = async () => {
    const editData = new FormData();
    editData.append('id', id);
    editData.append('title', editFields.title);
    editData.append('description', editFields.description);
    editData.append('category', editFields.category);
    if (!isEmptyEditImage) {
      editFields.imgs.forEach((img) => {
        editData.append('imgs', img);
      });
    }
    editData.append('datetime', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    // for (var pair of editData.entries()) {
    //   console.log(pair[0] + ' : ' + pair[1]);
    // }
    try {
      const response = await axios.post(
        `${API_URL}/dietlog/update/data`,
        editData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 202) {
        Toast.fire({
          icon: 'success',
          title: '編輯成功',
        });
      }
      getDietlogData();
      setRefreshImg(true);
      setTimeout(() => {
        setRefreshImg(false);
      }, 1000);
      handleBack();
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: '有東西出錯了',
      });
    }
  };

  const handleDelete = async () => {
    const data = { id: id };
    try {
      const response = await axios.patch(
        `${API_URL}/dietlog/update/valid`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 202) {
        Toast.fire({
          icon: 'success',
          title: '刪除成功',
        });
      }
      getDietlogData();
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: '有東西出錯了',
      });
    }
  };

  const descriptionLayout = () => {
    if (!isEmptyDescription && !editMode) {
      return <p className="l-dietlog__text">{description}</p>;
    } else if (
      (!isEmptyDescription && editMode) ||
      (isEmptyDescription && editMode)
    ) {
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
            placeholder="請輸入內容..."
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

  useEffect(() => {
    if (refreshImg) {
      getDietlogImg();
    }
  }, [refreshImg]);

  useEffect(() => {
    getDietlogImg();
  }, []);

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
                {!isEmptyImage && (
                  <div className="l-dietlog__hint">
                    {dietlogImg.length}張照片
                  </div>
                )}
                <div className="l-dietlog__time">
                  {!isEmptyEditedAt ? editedAt : createdAt}
                </div>
              </div>
              <div className="l-dietlog__row mt-2">
                {!isEmptyImage && (
                  <div className="l-dietlog__cover">
                    <img
                      className="e-img--cover"
                      src={`${UPLOAD_URL}/${dietlogImg[0]['name']}`}
                      alt="diet-img"
                    />
                  </div>
                )}
              </div>
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
                    placeholder="請輸入標題..."
                  />
                </>
              )}
            </div>
            {descriptionLayout()}
            <div className="l-dietlog__row mt-2">
              {!isEmptyImage &&
                dietlogImg.map((img) => {
                  const { id, name } = img;
                  return (
                    <div key={id} className="l-dietlog__cover">
                      <img
                        className="e-img--cover"
                        src={`${UPLOAD_URL}/${name}`}
                        alt="diet-img"
                      />
                    </div>
                  );
                })}
            </div>
            {/* <div>熱量</div>
            <div>蛋白質</div>
            <div>脂肪</div>
            <div>飽和脂肪</div>
            <div>反式脂肪</div>
            <div>碳水化合物</div>
            <div>糖</div>
            <div>鈉</div> */}
            {editMode && (
              <div className="mt-2">
                <label htmlFor="imgs" className="c-form__label">
                  上傳圖片(上限6張)
                </label>
                <input
                  type="file"
                  className="c-form__input"
                  name="imgs"
                  id="imgs"
                  accept="image/*"
                  multiple
                  onChange={handleImgChange}
                />
              </div>
            )}
            <div className="d-flex align-items-center justify-content-end mt-4">
              {!editMode ? (
                <>
                  <button
                    type="button"
                    className="e-btn e-btn--icon e-btn--outline me-2"
                    onClick={handleEdit}
                  >
                    <i className="fas fa-edit e-icon e-icon--primary"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="e-btn e-btn--icon e-btn--outline me-2"
                    onClick={handleBack}
                  >
                    <i className="fas fa-undo-alt e-icon e-icon--primary"></i>
                  </button>
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
