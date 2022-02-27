import { React, useState } from 'react';

function Counter(props) {
  const { number, setNumber } = props;
  return (
    <>
      <div className="c-counter">
        <button
          type="button"
          className="c-counter__btn"
          onClick={() => {
            setNumber(number - 1);
          }}
        >
          <i className="fas fa-minus e-icon c-counter__icon"></i>
        </button>
        {number}
        <button type="button" className="c-counter__btn">
          <i
            className="fas fa-plus e-icon c-counter__icon"
            onClick={() => {
              setNumber(number + 1);
            }}
          ></i>
        </button>
      </div>
    </>
  );
}

export default Counter;
