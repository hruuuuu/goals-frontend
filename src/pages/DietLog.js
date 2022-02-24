import { React, useState } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import Header from '../components/Header';
import LogList from '../components/DietLog/LogList';

function DietLog() {
  const [value, onChange] = useState(new Date());

  const NextIcon = () => {
    return (
      <i className="fas fa-chevron-right e-btn e-btn--icon l-dietlog__icon"></i>
    );
  };
  const DoubleNextIcon = () => {
    return (
      <i className="fas fa-chevron-double-right e-btn e-btn--icon l-dietlog__icon"></i>
    );
  };
  return (
    <>
      <Header />
      <div className="l-dietlog">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Calendar
                className="l-dietlog__calendar"
                onChange={onChange}
                value={value}
                formatDay={(locale, date) => dayjs(date).format('D')}
                // formatShortWeekday={(locale, date) => dayjs(date).format('dd')}
                nextLabel=""
                next2Label=""
                prevLabel=""
                prev2Label=""
                minDetail="year"
              />
            </div>
            <div className="col-6">
              <LogList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DietLog;
