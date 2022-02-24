import React from 'react';

function FloatingChatIcon(props) {
  const { isExpand, setIsExpand } = props;

  return (
    <>
      <div className="c-floating-icon c-floating-icon--chat">
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
