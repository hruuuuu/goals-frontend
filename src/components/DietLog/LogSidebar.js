import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import { useDietlog } from '../../context/dietlog';

function LogSidebar() {
  const { canlendarDate, setCalendarDate } = useDietlog();
  const [calendar, setCalendar] = useState(new Date());
  const navigate = useNavigate();

  const handleSelectToday = () => {
    setCalendar(new Date());
    const date = dayjs(new Date()).format('YYYY-MM-DD');
    // navigate(`/dietlog?date=${date}`);
    setCalendarDate(date);
  };

  const handleSelectDate = (value, e) => {
    setCalendar();
    const date = dayjs(value).format('YYYY-MM-DD');
    // navigate(`/dietlog?date=${date}`);
    setCalendarDate(date);
  };
  return (
    <>
      <div className="l-dietlog__sidebar">
        <button
          type="button"
          className="e-btn e-btn--plain e-btn--medium e-btn--w100 e-btn--secondary mb-3"
          onClick={handleSelectToday}
        >
          今天 {dayjs().format('YYYY-MM-DD')}
        </button>
        <Calendar
          className="l-dietlog__calendar mb-3"
          onChange={handleSelectDate}
          value={calendar}
          formatDay={(locale, date) => dayjs(date).format('D')}
          // formatShortWeekday={(locale, date) => dayjs(date).format('dd')}
          nextLabel=""
          next2Label=""
          prevLabel=""
          prev2Label=""
          minDetail="year"
        />
        <button
          type="button"
          className="e-btn e-btn--primary e-btn--medium e-btn--w100"
        >
          <i className="fas fa-pencil-alt e-icon e-icon--left"></i>
          增加紀錄
        </button>
      </div>
    </>
  );
}

export default LogSidebar;
