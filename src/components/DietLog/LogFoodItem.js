import { React, useState } from 'react';

function LogFoodItem(props) {
  const { data, editMode, fields, setFields } = props;
  const {
    name,
    calories,
    protein,
    fat,
    saturated_fat,
    trans_fat,
    carb,
    sugar,
    sodium,
    flag,
  } = data;
  const [foodField, setFoodField] = useState({
    name: name,
    calories: calories,
    protein: protein,
    fat: fat,
    saturatedFat: saturated_fat,
    transFat: trans_fat,
    carb: carb,
    sugar: sugar,
    sodium: sodium,
  });

  const handleDeleteFood = () => {
    const remainFood = fields.filter((food, i) => food.flag !== flag);
    const foodFieldsWithFlag = remainFood.map((food, i) => {
      return { ...food, flag: i };
    });
    setFields([...foodFieldsWithFlag]);
  };
  return (
    <>
      <div className="c-dietlog-fields__item">
        <div className="row gx-1">
          <div className="col-3">
            <span className="c-form__label c-dietlog-fields__label c-dietlog-fields__label--name">
              {name}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {calories}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {protein}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">{fat}</span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {saturated_fat}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {trans_fat}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {carb}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {sugar}
            </span>
          </div>
          <div className={`${editMode ? 'col-1' : 'col'}`}>
            <span className="c-form__label c-dietlog-fields__label">
              {sodium}
            </span>
          </div>
          {editMode && (
            <div className="col-1">
              <button
                type="button"
                className="e-btn e-btn--icon"
                onClick={handleDeleteFood}
              >
                <i className="fas fa-minus e-icon e-icon--primary"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LogFoodItem;
