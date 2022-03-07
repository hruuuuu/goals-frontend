import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../../utils/config';

function LogFoodFieldItem(props) {
  const { fields, setFields } = props;
  const [foodField, setFoodField] = useState({
    name: '',
    serving: 1,
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
    flag: -1,
  });
  const [food, setFood] = useState([]);
  const [foodHint, setFoodHint] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);

  const isEmptyName = foodField.name === '';
  const isEmptySelected = selectedFood.length === 0;

  const handleFieldChange = (e) => {
    setFoodField({
      ...foodField,
      [e.target.name]: foodField.serving * e.target.value,
    });
  };

  const handleNameFieldChange = (e) => {
    setFoodField({
      ...foodField,
      name: e.target.value,
    });
    const filteredFood = food.filter((item) =>
      item.name.includes(e.target.value)
    );
    setFoodHint([...filteredFood]);
  };

  const handleServingFieldChange = (e) => {
    setFoodField({
      ...foodField,
      serving: e.target.value,
    });
  };

  const getFood = async () => {
    try {
      const response = await axios.get(`${API_URL}/food`, {
        withCredentials: true,
      });
      const food = response.data;
      setFood([...food]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecimal = (num) => {
    return num <= 0 ? 0 : Math.round(num * 10) / 10;
  };

  const handleSubmitField = () => {
    setFields([...fields, { ...foodField, flag: fields.length }]);
  };

  useEffect(() => {
    if (!isEmptyName) {
      const filteredFood = food.filter((item) => item.name === foodField.name);
      setSelectedFood([...filteredFood]);
    }
  }, [foodField.name]);

  useEffect(() => {
    if (!isEmptySelected) {
      const foodData = selectedFood[0];
      setFoodField({
        ...foodField,
        calories: foodField.serving * handleDecimal(foodData.calories),
        protein: foodField.serving * handleDecimal(foodData.protein),
        fat: foodField.serving * handleDecimal(foodData.fat),
        carb: foodField.serving * handleDecimal(foodData.carb),
      });
    }
  }, [selectedFood, foodField.serving]);

  useEffect(() => {
    getFood();
  }, []);

  return (
    <>
      <div className="c-dietlog-fields__field">
        <div className="row gx-1">
          <div className="col-2">
            <input
              type="text"
              className="form-control c-form__input c-dietlog-fields__input"
              name="name"
              id="name"
              value={foodField.name}
              onChange={handleNameFieldChange}
              placeholder="食物名稱"
              list="food-list"
              autoComplete="off"
            />
            <datalist id="food-list">
              {foodHint.map((food) => {
                const { id, name } = food;
                return <option key={id} value={name} dataid={id} />;
              })}
            </datalist>
          </div>
          <div className="col-1 d-flex align-items-center">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="serving"
              id="serving"
              value={foodField.serving}
              onChange={handleServingFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
            {/* <span className="c-form__label c-dietlog-fields__label mb-0 ms-1">
              份
            </span> */}
          </div>
          <div className="col-2">
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
          <div className="col-2">
            <input
              type="number"
              className="form-control c-form__input c-dietlog-fields__input"
              name="protein"
              id="protein"
              value={foodField.protein}
              onChange={handleFieldChange}
              onFocus={(e) => {
                e.target.value = '';
              }}
            />
          </div>
          <div className="col-2">
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
          <div className="col-2">
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
            <button
              type="button"
              className="e-btn e-btn--icon"
              onClick={handleSubmitField}
              disabled={isEmptyName}
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
