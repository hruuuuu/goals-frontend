import { React, useState } from 'react';

import Calendar from 'react-calendar';
import dayjs from 'dayjs';

function LogSidebar() {
  const [calendar, setCalendar] = useState(new Date());
  return (
    <>
      <div className="l-dietlog__sidebar">
        <button
          type="button"
          className="e-btn e-btn--plain e-btn--medium e-btn--w100 e-btn--secondary mb-3"
          onClick={() => {
            setCalendar(new Date());
          }}
        >
          今天 {dayjs().format('YYYY-MM-DD')}
        </button>
        <Calendar
          className="l-dietlog__calendar mb-3"
          onChange={setCalendar}
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
