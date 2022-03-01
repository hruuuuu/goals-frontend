import { React, useState, useEffect } from 'react';

function LogFoodFieldItem(props) {
  const { fields, setFields } = props;
  const [foodField, setFoodField] = useState({
    name: '',
    calories: 0,
    protien: 0,
    fat: 0,
    saturated_fat: 0,
    trans_fat: 0,
    carb: 0,
    sugar: 0,
    sodium: 0,
    flag: -1,
  });

  const isDisabled = foodField.name === '';

  const handleFieldChange = (e) => {
    setFoodField({ ...foodField, [e.target.name]: e.target.value });
  };

  const handleSubmitField = () => {
    setFields([...fields, { ...foodField, flag: fields.length }]);
  };

  return (
    <>
      <div className="c-dietlog-fields__field">
        <div className="row gx-1">
          <div className="col-3">
            <input
              type="text"
              className="form-control c-form__input c-dietlog-fields__input"
              name="name"
              id="name"
              value={foodField.name}
              onChange={handleFieldChange}
              placeholder="食物名稱"
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="calories"
              id="calories"
              value={foodField.calories}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="protien"
              id="protien"
              value={foodField.protien}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="fat"
              id="fat"
              value={foodField.fat}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="saturated_fat"
              id="saturatedFat"
              value={foodField.saturated_fat}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="trans_fat"
              id="transFat"
              value={foodField.trans_fat}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="carb"
              id="carb"
              value={foodField.carb}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="sugar"
              id="sugar"
              value={foodField.sugar}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="sodium"
              id="sodium"
              value={foodField.sodium}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-1">
            <button
              type="button"
              className="e-btn e-btn--icon"
              onClick={handleSubmitField}
              disabled={isDisabled}
            >
              <i className="fas fa-plus e-icon e-icon--primary"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogFoodFieldItem;
