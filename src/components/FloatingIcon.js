import { React, useEffect } from 'react';

function FloatingIcon(props) {
  const { isDisplay, setIsDisplay, page } = props;
  return (
    <>
      <div className={`c-floating-icon c-floating-icon--${page}`}>
        <button
          type="button"
          className="c-floating-icon__btn"
          onClick={() => {
            setIsDisplay(true);
          }}
          onMouseEnter={() => {
            setIsDisplay(true);
          }}
        >
          {page === 'member' ? (
            <>
              <i className="fas fa-user c-floating-icon__icon"></i>
            </>
          ) : (
            <>
              <i className="fas fa-shopping-cart c-floating-icon__icon"></i>
              <div className="e-tag e-tag--corner e-tag--floating">5</div>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default FloatingIcon;
