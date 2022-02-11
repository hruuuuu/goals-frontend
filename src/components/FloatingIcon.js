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
        </button>
      </div>
    </>
  );
}

export default FloatingIcon;
