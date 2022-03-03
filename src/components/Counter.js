import { React, useState } from 'react';

function Counter(props) {
  const { number, setNumber, show } = props;
  return (
    <>
      <div className={show ? 'c-counter w-50 mobile-counter' : 'c-counter'}>
        <button
          type="button"
          className="c-counter__btn"
          onClick={() => {
            number <= 1 ? setNumber(1) : setNumber(number - 1);
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
