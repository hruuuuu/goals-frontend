import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../../utils/config';
import { useDietlog } from '../../context/dietlog';

import LogItem from './LogItem';
import LogAdd from './LogAdd';

function LogList() {
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const [tab, setTab] = useState(1);

  const isEmptyDietlog = dietlogData.length === 0;

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

  useEffect(() => {
    if (calendarDate) {
      getDietlogData();
    }
  }, [calendarDate]);

  return (
    <>
      <div className="c-tabs mb-4">
        <button
          type="button"
          className={`c-tabs__btn c-tabs__btn--w100 ${
            tab === 1
              ? 'active animation animation__tabs animation__tabs--in'
              : ''
          }`}
          onClick={() => {
            setTab(1);
          }}
        >
          飲食
        </button>
        {/* <button
          type="button"
          className={`c-tabs__btn c-tabs__btn--w100 ${
            tab === 2
              ? 'active animation animation__tabs animation__tabs--in'
              : ''
          }`}
          onClick={() => {
            setTab(2);
          }}
        >
          統計
        </button> */}
      </div>
      {!isEmptyDietlog ? (
        <>
          {dietlogData.map((log) => {
            const { id } = log;
            return <LogItem key={id} dietlog={log} />;
          })}
        </>
      ) : (
        <h3>這天沒有任何日誌</h3>
      )}
      {/* <LogAdd /> */}
    </>
  );
}

export default LogList;
