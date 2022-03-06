import React from 'react';

function LogFoodLabel(props) {
  const { editMode } = props;
  return (
    <>
      <div className="c-dietlog-fields__heading">
        <div className="row gx-1">
          <div className={`${editMode ? 'col-2' : 'col-3'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--name c-dietlog-fields__label--start">
              名稱/成分
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'd-none'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              份量
            </span>
          </div>
          <div className={`${editMode ? 'col-2' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              熱量(卡)
            </span>
          </div>
          <div className={`${editMode ? 'col-2' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              蛋白質(克)
            </span>
          </div>
          <div className={`${editMode ? 'col-2' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              脂肪(克)
            </span>
          </div>
          <div className={`${editMode ? 'col-2' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              碳水化合物(克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'd-none'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogFoodLabel;
