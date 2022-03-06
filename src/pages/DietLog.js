import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import { API_URL } from '../utils/config';
import { useDietlog } from '../context/dietlog';
import { useLogin } from '../context/LoginStatus';

import Header from '../components/Header';
import LogList from '../components/DietLog/LogList';
import LogSidebar from '../components/DietLog/LogSidebar';
import FloatingChat from '../components/FloatingChat';
import ScrollButton from '../components/ScrollButton';
import PageBanner from '../components/PageBanner';

import picBanner from '../img/page_banner/dietlog.jpg';

function DietLog() {
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const { login } = useLogin();

  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dayDietlog, setDayDietlog] = useState([]);
  const [mealDietlog, setMealDietlog] = useState([]);
  const [meal, setMeal] = useState([]);

  const getDietlogData = async () => {
    const data = { date: calendarDate };
    try {
      const response = await axios.post(`${API_URL}/dietlog`, data, {
        withCredentials: true,
      });
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
      <PageBanner img={picBanner} />
      <Header />
      {login ? (
        <div className="l-dietlog">
          <div className="container">
            <div className="row gx-0 gx-lg-3 gx-xl-5 gy-5 gy-xl-0">
              <div className="col-12 col-lg-5">
                <LogSidebar
                  getDietlogData={getDietlogData}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </div>
              <div className="col-12 col-lg-7 mb-5 mb-lg-0">
                <div className="l-dietlog__list">
                  <LogList
                    getDietlogData={getDietlogData}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    dayDietlog={dayDietlog}
                    mealDietlog={mealDietlog}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="u-height u-height--empty-page u-margin u-margin--page-bottom">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-7 d-flex flex-column justift-content-center align-items-center">
                <h2 className="mb-5">請先登入以體驗完整功能</h2>
                <Link
                  to="/login"
                  className="e-btn e-btn--primary e-btn--large e-btn--w100"
                >
                  前往登入
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <FloatingChat />
      <ScrollButton />
    </>
  );
}

export default DietLog;
