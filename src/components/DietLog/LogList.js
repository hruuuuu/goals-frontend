import { React, useState, useEffect } from 'react';

import { useDietlog } from '../../context/dietlog';

import LogItem from './LogItem';

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
  } = props;
  const { calendarDate, setCalendarDate, dietlogData, setDietlogData } =
    useDietlog();
  const [tab, setTab] = useState(1);

  const isEmptyDietlog = dietlogData.length === 0;

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
      ) : (
        <h3>這天沒有任何日誌</h3>
      )}
      {/* <LogAdd /> */}
    </>
  );
}

export default LogList;
