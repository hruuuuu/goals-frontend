import React from 'react';
import LogItem from './LogItem';
import LogModal from './LogModal';

function LogList() {
  return (
    <>
      <button>今天 2022-02-25</button>
      <button>增加紀錄</button>
      <div>
        <h4>Tabs</h4>
        <button>飲食</button>
        <button>統計</button>
      </div>
      <LogItem />
      <LogModal />
    </>
  );
}

export default LogList;
