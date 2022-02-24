import { React, useEffect, useState } from 'react';
import { useCartList } from '../context/cart';

function FloatingIcon(props) {
  const { isDisplay, setIsDisplay, page } = props;
  const { cartListData, setCartListData } = useCartList();
  const [cartIconLength, setCartIconLength] = useState();

  useEffect(() => {
    setCartIconLength(cartListData.length);
  }, [cartListData]);

  return (
    <>
      <div className={`c-floating-icon c-floating-icon--${page}`}>
        <button
          type="button"
          className="c-floating-icon__btn"
          onClick={() => {
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
              <div className="e-tag e-tag--corner e-tag--floating">
                {cartIconLength}
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default FloatingIcon;
