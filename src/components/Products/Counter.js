import { React, useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(1);
  return (
    <>
      <div className="c-counter">
        <button type="button" className="c-counter__btn">
          <i className="fas fa-minus e-icon c-counter__icon"></i>
        </button>
        {number}
        <button type="button" className="c-counter__btn">
          <i className="fas fa-plus e-icon c-counter__icon"></i>
        </button>
      </div>
    </>
  );
}

export default Counter;
