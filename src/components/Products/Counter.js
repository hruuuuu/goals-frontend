import { React, useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(1);
  return (
    <>
      <div className="c-counter">
        <button type="button">
          <i className="fas fa-plus"></i>
        </button>
        {number}
        <button type="button">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </>
  );
}

export default Counter;
