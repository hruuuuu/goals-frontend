import React from 'react';
import { useMatch } from 'react-router-dom';

function FloatingChatIcon(props) {
  const { isExpand, setIsExpand } = props;

  /* 如果是在商品頁 就用不同樣式的class */
  const matchProduct = useMatch('/product');
  const matchProducts = useMatch('/product/:productId');
  const isProduct = matchProduct !== null || matchProducts !== null;

  return (
    <>
      <div
        className={`c-floating-icon c-floating-icon--chat c-floating-icon--product-mobile ${
          isProduct ? 'c-floating-icon--product-desktop' : ''
        }`}
      >
        <button
          type="button"
          className="c-floating-icon__btn"
          onClick={() => {
            setIsExpand(true);
          }}
        >
          <i className="fas fa-user-headset c-floating-icon__icon"></i>
          <i className="fas fa-question-circle c-floating-icon__icon"></i>
        </button>
      </div>
    </>
  );
}

export default FloatingChatIcon;
