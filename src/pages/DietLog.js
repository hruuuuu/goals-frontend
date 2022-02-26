import { React, useState } from 'react';
import axios from 'axios';

import { API_URL } from '../utils/config';
import { useDietlog } from '../context/dietlog';

import Header from '../components/Header';
import LogList from '../components/DietLog/LogList';
import LogSidebar from '../components/DietLog/LogSidebar';
import FloatingChat from '../components/FloatingChat';

function DietLog() {
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const [refreshImg, setRefreshImg] = useState(false);

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
            <div className="col-6">
              <LogSidebar
                getDietlogData={getDietlogData}
                refreshImg={refreshImg}
                setRefreshImg={setRefreshImg}
              />
            </div>
            <div className="col-6">
              <LogList
                getDietlogData={getDietlogData}
                refreshImg={refreshImg}
                setRefreshImg={setRefreshImg}
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
