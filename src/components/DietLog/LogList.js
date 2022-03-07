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
    editMode,
    setEditMode,
    dayDietlog,
    mealDietlog,
  } = props;
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const [mainTab, setMainTab] = useState(1);
  const [daySummary, setDaySummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
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
        protein: day.protein,
        fat: day.fat,
        carb: day.carb,
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
      if (mainTab === 1) {
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
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
              );
            })}
          </>
        );
      } else if (mainTab === 2) {
        return (
          <>
            <Statistics
              daySummary={daySummary}
              mealDietlog={mealDietlog}
              setMainTab={setMainTab}
            />
          </>
        );
      }
    } else {
      return (
        <div className="empty_img">
          <img
            className="img-responsive"
            src={
              require('../../img/common/illustration/order-empty.svg').default
            }
            alt=""
          />
          <h5>這天還沒有新增日誌喔！</h5>
        </div>
      );
    }
  };

  return (
    <>
      <div className="c-tabs mb-4">
        <button
          type="button"
          className={`c-tabs__btn c-tabs__btn--w100 ${
            mainTab === 1 ? 'active' : ''
          }`}
          onClick={() => {
            setMainTab(1);
          }}
        >
          飲食
        </button>
        <button
          type="button"
          className={`c-tabs__btn c-tabs__btn--w100 ${
            mainTab === 2 ? 'active' : ''
          }`}
          onClick={() => {
            setMainTab(2);
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
