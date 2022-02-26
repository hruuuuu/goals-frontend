import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';

import { API_URL } from '../../utils/config';
import { useDietlog } from '../../context/dietlog';

function LogModal(props) {
  const { showModal, setShowModal, getDietlogData, setRefreshImg } = props;
  const { setDietlogData, dietlogCategoryData, canlendarDate } = useDietlog();
  const [addFields, setAddFields] = useState({
    title: '',
    description: '',
    category: 1,
    imgs: [],
    datetime: '',
  });

  const handleIn = showModal.in
    ? 'animation animation__modal animation__modal--in'
    : '';
  const handleOut = showModal.out
    ? 'animation animation__modal animation__modal--out'
    : '';

  const isFetchingCalendarDate = canlendarDate === undefined;
  const isEmptyAddImage = addFields.imgs.length === 0;

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

  const handleFieldChange = (e) => {
    setAddFields({ ...addFields, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    let imgArr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imgArr.push(e.target.files[i]);
    }
    setAddFields({ ...addFields, [e.target.name]: imgArr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addData = new FormData();
    addData.append('title', addFields.title);
    addData.append('description', addFields.description);
    addData.append('category', addFields.category);
    if (!isEmptyAddImage) {
      addFields.imgs.forEach((img) => {
        addData.append('imgs', img);
      });
    }
    addData.append('datetime', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    try {
      const response = await axios.post(
        `${API_URL}/dietlog/insert/data`,
        addData,
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
      handleClose();
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: '有東西出錯了',
      });
    }
  };

  /* 控制modal關閉 & 淡出淡入效果 */
  const handleClose = () => {
    setAddFields({
      title: '',
      description: '',
      category: 1,
      imgs: [],
      datetime: '',
    });
    setShowModal({ ...showModal, out: true });
    setTimeout(() => {
      setShowModal({ ...showModal, in: false, out: false });
    }, 500);
  };

  useEffect(() => {
    if (!isFetchingCalendarDate) {
      const datetime = `${canlendarDate} 00:00:00`;
      setAddFields({ ...addFields, datetime: datetime });
    }
  }, [canlendarDate]);

  return (
    <>
      <Modal
        show={showModal.in}
        onHide={handleClose}
        dialogClassName={`c-dietlog-modal c-modal c-modal__modal ${handleIn} ${handleOut}`}
        backdropClassName={`c-modal__backdrop ${handleIn} ${handleOut}`}
        contentClassName="c-modal__wrapper"
        centered
        animation={false}
        fullscreen="md-down"
      >
        <div className="c-dietlog-modal__form">
          <div className="c-dietlog-modal__fieldset">
            <label htmlFor="category" className="form-label c-form__label">
              類別
            </label>
            <select
              className="form-select c-form__select"
              id="category"
              name="category"
              value={addFields.category}
              onChange={handleFieldChange}
            >
              {dietlogCategoryData.map((category) => {
                const { id, name } = category;
                return (
                  <option
                    key={id}
                    value={id}
                    disabled={id === addFields.category ? true : false}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="c-dietlog-modal__fieldset">
            <label htmlFor="title" className="form-label c-form__label">
              標題
            </label>
            <textarea
              type="text"
              className="form-control c-form__input c-form__input--textarea"
              name="title"
              id="title"
              value={addFields.title}
              onChange={handleFieldChange}
              placeholder="請輸入標題..."
              required
            />
          </div>
          <div className="c-dietlog-modal__fieldset">
            <label htmlFor="description" className="form-label c-form__label">
              記錄
            </label>
            <textarea
              type="text"
              className="form-control c-form__input c-form__input--textarea c-dietlog-modal__textarea"
              id="description"
              name="description"
              value={addFields.description}
              onChange={handleFieldChange}
              placeholder="請輸入內容..."
            />
          </div>
          <div className="c-dietlog-modal__fieldset">
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
          <div className="c-dietlog-modal__fieldset">
            <label htmlFor="datetime" className="c-form__label">
              日期時間
            </label>
            <input
              type="datetime-local"
              className="form-control c-form__input"
              name="datetime"
              id="datetime"
              value={addFields.datetime}
              onChange={handleFieldChange}
              required
            />
          </div>
          <div className="d-flex align-items-center">
            <button
              type="reset"
              className="e-btn e-btn--plain e-btn--secondary e-btn--medium me-2"
            >
              清空
            </button>
            <button
              type="button"
              className="e-btn e-btn--primary e-btn--medium"
              onClick={handleSubmit}
            >
              送出
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LogModal;
