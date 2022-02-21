import { React, useState, useEffect } from 'react';
import socket from 'socket.io-client';

import { BE_URL } from '../utils/config';

function FloatingChatModal(props) {
  const { isExpand, setIsExpand } = props;
  const [animation, setAnimation] = useState(false);
  const [ws, setWs] = useState();
  const [sendingMessage, setSendingMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const roomName = 'id';

  const isEmptyMessage = messages.length === 0;

  const connectWebSocket = () => {
    setWs(socket(BE_URL, { withCredentials: true }));
  };

  const initWebSocket = () => {
    /* on: 監聽指定這個頻道 得到從server傳來的訊息 */
    // ws.on('connect', () => {
    //   console.log(ws.id);
    // });
    ws.on(roomName, (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
  };

  const sendMessage = () => {
    // emit: 指定頻道 傳送訊息給server
    if (sendingMessage !== '') {
      ws.emit(roomName, { sender: 'user', message: sendingMessage });
      setSendingMessage('');
    }
  };

  const handleFieldChange = (e) => {
    if (e.target.value !== '') {
      setSendingMessage(e.target.value);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     sendMessage();
  //   }
  // };

  /* 如果有連線到 就把webSocket寫到ws state裡
  是用來配合useEffect+相依性陣列檢查是否有連線成功 */
  useEffect(() => {
    if (ws) {
      try {
        initWebSocket();
        console.log('連線成功');
      } catch (error) {
        console.log(error);
      }
    }
  }, [ws]);

  return (
    <>
      <div
        className={`c-floating-menu c-floating-menu--chat ${
          isExpand &&
          'animation animation__floating-chat animation__floating-chat--in'
        } ${
          animation &&
          'animation animation__floating-chat animation__floating-chat--out'
        }`}
      >
        <div className={`c-floating-menu__content`}>
          <div className="c-chat c-chat--user">
            <div className="c-chat__header">
              <div className="c-chat__title">客服</div>
              <div className="c-chat__subtitle">目前在線</div>
            </div>
            <div className="c-chat__content">
              {!ws && (
                <button
                  type="button"
                  className="e-btn e-btn--primary c-chat__action"
                  onClick={connectWebSocket}
                >
                  聯繫客服
                </button>
              )}
              {!isEmptyMessage &&
                messages.map((msg, index) => {
                  const { sender, message } = msg;
                  return (
                    <>
                      <div key={index} className="c-chat__msg" sender={sender}>
                        <div>{message}</div>
                      </div>
                    </>
                  );
                })}
            </div>
            {ws && (
              <>
                <div className="c-chat__footer">
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <input
                      type="text"
                      className="form-control c-form__input"
                      value={sendingMessage}
                      onChange={handleFieldChange}
                      // onKeyDown={handleKeyDown}
                    />
                    <button
                      type="button"
                      className="e-btn e-btn--icon c-chat__btn"
                      onClick={sendMessage}
                    >
                      <i className="fas fa-paper-plane c-chat__icon"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="c-floating-menu__bg"
          onClick={() => {
            if (window.confirm('關閉視窗將失去連線 是否確定要退出?')) {
              setAnimation(true);
              setTimeout(() => {
                setIsExpand(false);
              }, 1000);
            } else {
              return;
            }
          }}
        ></div>
      </div>
    </>
  );
}

export default FloatingChatModal;
