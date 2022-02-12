import React from 'react';

function FloatingIcon(props) {
  const { isDisplay, setIsDisplay } = props;
  return (
    <>
      <div className="c-floating-icon">
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
          <i className="fas fa-shopping-cart c-floating-icon__icon"></i>
          <div className="e-tag e-tag--corner e-tag--floating">5</div>
        </button>
      </div>
    </>
  );
}

export default FloatingIcon;