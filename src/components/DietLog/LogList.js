import { React, useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { useDietlog } from '../../context/dietlog';
import { API_URL } from '../../utils/config';

import LogItem from './LogItem';
import Statistics from './Statistics';

function LogList(props) {
  const {
    getDietlogData,
    dietlogImg,
    refresh,
    setRefresh,
    foodFields,
    setFoodFields,
    editMode,
    setEditMode,
    dayDietlog,
    mealDietlog,
  } = props;
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const [tab, setTab] = useState(1);
  const [daySummary, setDaySummary] = useState({
    calories: 0,
    protien: 0,
    fat: 0,
    saturated_fat: 0,
    trans_fat: 0,
    carb: 0,
    sugar: 0,
    sodium: 0,
  });

  const isEmptyDietlog = dietlogData.length === 0;
  const isEmptyDay = dayDietlog.length === 0;

  const getDaySummary = async () => {
    const data = { ids: dayDietlog };
    try {
      const response = await axios.post(`${API_URL}/dietlog/food`, data, {
        withCredentials: true,
      });
      const day = response.data;
      setDaySummary({
        calories: day.calories,
        protien: day.protien,
        fat: day.fat,
        saturated_fat: day.saturated_fat,
        trans_fat: day.trans_fat,
        carb: day.carb,
        sugar: day.sugar,
        sodium: day.sodium,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (calendarDate) {
      getDietlogData();
    }
  }, [calendarDate]);

  useEffect(() => {
    if (!isEmptyDay) {
      getDaySummary();
      // getMealSummary();
    }
  }, [dayDietlog]);

  const tabLayout = () => {
    if (!isEmptyDietlog) {
      if (tab === 1) {
        return (
          <>
            {dietlogData.map((log) => {
              const { id } = log;
              return (
                <LogItem
                  key={id}
                  dietlog={log}
                  getDietlogData={getDietlogData}
                  dietlogImg={dietlogImg}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  foodFields={foodFields}
                  setFoodFields={setFoodFields}
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
              );
            })}
          </>
        );
      } else if (tab === 2) {
        return (
          <>
            <Statistics daySummary={daySummary} mealDietlog={mealDietlog} />
          </>
        );
      }
    } else {
      return <h3>這天沒有任何日誌</h3>;
    }
  };

  return (
    <>
      <div className="c-tabs mb-4">
        <button
          type="button"
          className={`c-tabs__btn c-tabs__btn--w100 ${
            tab === 1 ? 'active' : ''
          }`}
          onClick={() => {
            setTab(1);
          }}
        >
          飲食
        </button>
        <button
          type="button"
          className={`c-tabs__btn c-tabs__btn--w100 ${
            tab === 2 ? 'active' : ''
          }`}
          onClick={() => {
            setTab(2);
          }}
        >
          統計
        </button>
      </div>
      {tabLayout()}
    </>
  );
}

export default LogList;
