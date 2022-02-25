import { React, useState } from 'react';
import LogItem from './LogItem';
import LogAdd from './LogAdd';

function LogList() {
  const [tab, setTab] = useState(1);
  let arr = [];
  for (let i = 1; i < 5; i++) {
    arr.push(i);
  }
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
      {arr.map((item, i) => {
        return <LogItem key={i} />;
      })}
      {/* <LogAdd /> */}
    </>
  );
}

export default LogList;
