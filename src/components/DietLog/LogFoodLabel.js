import React from 'react';

function LogFoodLabel(props) {
  const { editMode } = props;
  return (
    <>
      <div className="c-dietlog-fields__heading">
        <div className="row gx-1">
          <div className="col-3">
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--name c-dietlog-fields__label--start">
              名稱/成分(每份)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              熱量
              <br />
              (卡)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              蛋白質
              <br />
              (克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              脂肪
              <br />
              (克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              飽和
              <br />
              脂肪(克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              反式
              <br />
              脂肪(克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              碳水
              <br />
              化合物(克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              糖<br />
              (克)
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--start">
              鈉<br />
              (毫克)
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogFoodLabel;
