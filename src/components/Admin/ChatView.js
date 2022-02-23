import { React, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ChatView(props) {
  const [currentMessages, setCurrentMessages] = useState([]);
  const {
    currentClient,
    messages,
    sendingMessage,
    setSendingMessage,
    sendMessage,
  } = props;

  const isEmptyCurrentMessages = currentMessages.length === 0;

  const handleFieldChange = (e) => {
    setSendingMessage(e.target.value);
  };

  useEffect(() => {
    const remainMessages = messages.filter((msg) => {
      return (
        msg.to === currentClient.chatId || msg.chatId === currentClient.chatId
      );
    });
    setCurrentMessages([...remainMessages]);
  }, [currentClient, messages]);

  return (
    <>
      <h5 className="mb-4">訪客 {currentClient.chatId}</h5>
      <div className="c-chat__content">
        {!isEmptyCurrentMessages &&
          currentMessages.map((msg) => {
            const { from, content, sentAt } = msg;
            return (
              <div key={uuidv4()} className="c-chat__msg" from={from}>
                {content}
                <div className="c-chat__time">{sentAt}</div>
              </div>
            );
          })}
      </div>
      <div className="l-admin-chat__input d-flex align-items-center">
        <textarea
          type="text"
          className="form-control c-form__input c-chat__input me-2"
          placeholder="請輸入..."
          value={sendingMessage}
          onChange={handleFieldChange}
        />
        <button
          type="button"
          className="e-btn e-btn--primary e-btn--medium c-chat__btn"
          onClick={sendMessage}
        >
          傳送
        </button>
      </div>
    </>
  );
}

export default ChatView;
