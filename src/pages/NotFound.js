import React from 'react';
import { Link } from 'react-router-dom';
import FloatingChat from '../components/FloatingChat';

import picNotFound from '../img/common/illustration/not-found.png';

function NotFound() {
  return (
    <>
      <div className="u-height u-height--full-page">
        <div className="row justify-content-center align-items-center w-100">
          <div className="col-10 col-lg-5 d-flex flex-column justift-content-center align-items-center">
            <div className="c-placeholder">
              <div className="c-placeholder__img c-placeholder__img--not-found">
                <img
                  src={picNotFound}
                  alt="not-found"
                  class="e-img e-img--contain"
                />
              </div>
              <h3 className="my-4 text-center">糟糕，找不到這個頁面耶！</h3>
              <Link
                to="/"
                role="button"
                className="e-btn e-btn--primary e-btn--medium e-btn--w100 c-placeholder__action"
              >
                返回首頁
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FloatingChat />
    </>
  );
}

export default NotFound;
