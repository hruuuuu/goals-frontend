import { React, useState } from 'react';

function Counter(props) {
  // const [number, setNumber] = useState(1);
  return (
    <>
      <div className="c-counter">
        <button
          type="button"
          className="c-counter__btn"
          onClick={() => {
            props.number <= 1
              ? props.setNumber(1)
              : props.setNumber(props.number - 1);
          }}
        >
          <i className="fas fa-minus e-icon c-counter__icon"></i>
        </button>
        {props.number}
        <button type="button" className="c-counter__btn">
          <i
            className="fas fa-plus e-icon c-counter__icon"
            onClick={() => {
              props.setNumber(props.number + 1);
            }}
          ></i>
        </button>
      </div>
    </>
  );
}

export default Counter;
