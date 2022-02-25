import React from 'react';

import Header from '../components/Header';
import LogList from '../components/DietLog/LogList';
import LogSidebar from '../components/DietLog/LogSidebar';

function DietLog() {
  return (
    <>
      <Header />
      <div className="l-dietlog">
        <div className="container">
          <div className="row gx-5">
            <div className="col-6">
              <LogSidebar />
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
