import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import { useDietlog } from '../../context/dietlog';

import LogModal from './LogModal';

function LogSidebar(props) {
  const { getDietlogData, refresh, setRefresh, foodFields, setFoodFields } =
    props;
  const [showModal, setShowModal] = useState({
    in: false,
    out: false,
  });
  const { canlendarDate, setCalendarDate } = useDietlog();
  const [calendar, setCalendar] = useState(new Date());
  const [editMode, setEditMode] = useState(false);

  const handleSelectToday = () => {
    setCalendar(new Date());
    const date = dayjs(new Date()).format('YYYY-MM-DD');
    setCalendarDate(date);
  };

  const handleSelectDate = (value, e) => {
    setCalendar();
    const date = dayjs(value).format('YYYY-MM-DD');
    setCalendarDate(date);
  };

  /* 控制modal顯示 */
  const handleShow = () => {
    setShowModal({ ...setShowModal, in: true });
    setEditMode(true);
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
          onClick={handleShow}
        >
          <i className="fas fa-pencil-alt e-icon e-icon--left"></i>
          增加紀錄
        </button>
        {showModal && (
          <LogModal
            showModal={showModal}
            setShowModal={setShowModal}
            getDietlogData={getDietlogData}
            refresh={refresh}
            setRefresh={setRefresh}
            foodFields={foodFields}
            setFoodFields={setFoodFields}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </>
  );
}

export default LogSidebar;
