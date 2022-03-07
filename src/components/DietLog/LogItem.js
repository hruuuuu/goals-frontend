import { React, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import Accordion from 'react-bootstrap/Accordion';
import Skeleton from '@mui/material/Skeleton';

import { UPLOAD_URL } from '../../utils/config';
import { API_URL } from '../../utils/config';
import { useDietlog } from '../../context/dietlog';

import LogFoodFieldList from './LogFoodFieldList';

function LogItem(props) {
  const {
    dietlog,
    getDietlogData,
    refresh,
    setRefresh,
    mealSummary,
    setMealSummary,
  } = props;
  const { id, title, description, datetime, edited_at, category_id } = dietlog;
  const { dietlogCategoryData } = useDietlog();
  const [category, setCategory] = useState({ id: '', name: '' });
  const [editMode, setEditMode] = useState(false);
  const [dietlogImg, setDietlogImg] = useState([]);
  const [dietlogFood, setDietlogFood] = useState([]);
  const [foodFields, setFoodFields] = useState([]);
  const [editFields, setEditFields] = useState({
    title: title,
    description: description,
    category: category_id,
    imgs: [],
  });
  const [foodSummary, setFoodSummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  });

  const isFetchingCategory = dietlogCategoryData.length === 0;
  const isEmptyDescription =
    description === null || description === '' || description === 'null';
  const isEmptyImage = dietlogImg.length === 0;
  const isEmptyEditedAt = edited_at === null || edited_at === '';
  const isEmptyEditImage = editFields.imgs.length === 0;
  const isEmptyFields = foodFields.length === 0;
  const isEmptyFood = dietlogFood.length === 0;

  const createdAt = dayjs(datetime).format('HH:mm');
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

  const getDietlogImg = async () => {
    const data = { id: id };
    try {
      const response = await axios.post(`${API_URL}/dietlog/image`, data, {
        withCredentials: true,
      });
      const img = response.data;
      setDietlogImg([...img]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDietlogFood = async () => {
    const data = { id: id };
    try {
      const response = await axios.post(`${API_URL}/dietlog/food`, data, {
        withCredentials: true,
      });
      const food = response.data;
      setDietlogFood([...food]);
      setFoodFields([...food]);
    } catch (error) {
      console.log(error);
    }
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
    if (!isEmptyFields) {
      // 更新diet資料表裡的dietlog data
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

      const foodData = { id: id, foods: [...foodFields] };
      try {
        const responseData = await axios.post(
          `${API_URL}/dietlog/update/data`,
          editData,
          {
            withCredentials: true,
          }
        );
        const responseFood = await axios.post(
          `${API_URL}/dietlog/update/food`,
          foodData,
          {
            withCredentials: true,
          }
        );
        if (responseData.status === 202 && responseFood.status === 202) {
          Toast.fire({
            icon: 'success',
            title: '編輯成功',
            customClass: {
              popup: 'c-alert__toast',
              title: 'c-alert__subtitle',
            },
          });
        }
        getDietlogData();
        setFoodFields([]);
        setRefresh(true);
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
        handleBack();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: '有東西出錯了',
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
      }
    } else {
      Toast.fire({
        icon: 'warning',
        title: '請至少新增一項食物',
        customClass: {
          popup: 'c-alert__toast',
          title: 'c-alert__subtitle',
        },
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
          customClass: {
            popup: 'c-alert__toast',
            title: 'c-alert__subtitle',
          },
        });
      }
      getDietlogData();
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: '有東西出錯了',
        customClass: {
          popup: 'c-alert__toast',
          title: 'c-alert__subtitle',
        },
      });
    }
  };

  const handleSumFood = () => {
    const sum = (data) => {
      return dietlogFood.reduce((prev, food) => prev + Number(food[data]), 0);
    };
    setFoodSummary({
      ...foodSummary,
      calories: sum('calories'),
      protein: sum('protein'),
      fat: sum('fat'),
      carb: sum('carb'),
    });
  };

  useEffect(() => {
    if (!isFetchingCategory) {
      const matchedCategory = dietlogCategoryData.find(
        (category) => dietlog.category_id === category.id
      );
      setCategory({ ...matchedCategory });
    }
  }, [dietlogCategoryData, dietlogFood]);

  useEffect(() => {
    if (refresh) {
      getDietlogImg();
      getDietlogFood();
    }
  }, [refresh]);

  useEffect(() => {
    if (!isEmptyFood) {
      handleSumFood();
    }
  }, [dietlogFood]);

  useEffect(() => {
    if (!isEmptyFields) {
      const foodFieldsWithFlag = foodFields.map((food, i) => {
        return { ...food, flag: i };
      });
      setFoodFields([...foodFieldsWithFlag]);
    }
  }, [editMode]);

  useEffect(() => {
    getDietlogImg();
    getDietlogFood();
  }, []);

  return (
    <>
      {!isFetchingCategory ? (
        <>
          <Accordion>
            <Accordion.Item eventKey="0" bsPrefix="l-dietlog__accordion">
              <Accordion.Button bsPrefix={`l-dietlog__card ${cardClass()}`}>
                <div
                  className={`e-tag e-tag--normal mb-3 ${categoryTagClass()}`}
                >
                  {category.name}
                </div>
                <div className="d-flex align-items-start justify-content-between">
                  <div className="d-flex flex-column align-items-start justify-content-end">
                    {dietlogFood.map((food) => {
                      const { name } = food;
                      return (
                        <h6 key={uuidv4()} className="l-dietlog__heading mb-1">
                          {name}
                        </h6>
                      );
                    })}
                    <div className="l-dietlog__cal mb-1">
                      總熱量{foodSummary.calories}卡
                    </div>
                    {!isEmptyImage && (
                      <div className="l-dietlog__hint mb-1">
                        {dietlogImg.length}張照片
                      </div>
                    )}
                    <div className="l-dietlog__time">
                      {!isEmptyEditedAt ? editedAt : createdAt}
                    </div>
                  </div>
                  <div className="l-dietlog__row">
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
                    <label
                      htmlFor="category"
                      className="form-label c-form__label"
                    >
                      類別
                    </label>
                    <select
                      className="form-select c-form__select mb-3"
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
                <div className="l-dietlog__heading">
                  {!editMode ? (
                    <>
                      <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-pencil-alt e-icon e-icon--left e-icon--primary"></i>
                        {title}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label
                          htmlFor="title"
                          className="form-label c-form__label"
                        >
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
                      </div>
                    </>
                  )}
                </div>
                {descriptionLayout()}
                {!editMode && (
                  <div className="l-dietlog__row mt-3">
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
                )}
                {editMode && (
                  <div className="mt-3">
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
                <LogFoodFieldList
                  editMode={editMode}
                  foodFields={foodFields}
                  setFoodFields={setFoodFields}
                  isEmptyFields={isEmptyFields}
                  dietlogFood={dietlogFood}
                />
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
      ) : (
        <>
          <div className="col-12">
            <Skeleton variant="rectangular" animation="wave" />
          </div>
        </>
      )}
    </>
  );
}

export default LogItem;
