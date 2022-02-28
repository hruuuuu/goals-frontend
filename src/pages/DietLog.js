import { React, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { API_URL } from '../utils/config';
import { useDietlog } from '../context/dietlog';

import Header from '../components/Header';
import LogList from '../components/DietLog/LogList';
import LogSidebar from '../components/DietLog/LogSidebar';
import FloatingChat from '../components/FloatingChat';

function DietLog() {
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const [refresh, setRefresh] = useState(false);
  const [foodFields, setFoodFields] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [dayDietlog, setDayDietlog] = useState([]);
  const [mealDietlog, setMealDietlog] = useState([]);
  const [meal, setMeal] = useState([]);

  const getDietlogData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/dietlog?date=${calendarDate}`,
        {
          withCredentials: true,
        }
      );
      const dietData = response.data;
      setDietlogData([...dietData]);
      setMealDietlog([...dietData]);
      const dayDietId = dietData.map((diet) => diet.id);
      setDayDietlog([...dayDietId]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="l-dietlog">
        <div className="container">
          <div className="row gx-5">
            <div className="col-5">
              <LogSidebar
                getDietlogData={getDietlogData}
                refresh={refresh}
                setRefresh={setRefresh}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </div>
            <div className="col-7">
              <LogList
                getDietlogData={getDietlogData}
                refresh={refresh}
                setRefresh={setRefresh}
                foodFields={foodFields}
                setFoodFields={setFoodFields}
                editMode={editMode}
                setEditMode={setEditMode}
                dayDietlog={dayDietlog}
                mealDietlog={mealDietlog}
              />
            </div>
          </div>
        </div>
      </div>
      <FloatingChat />
    </>
  );
}

export default DietLog;
