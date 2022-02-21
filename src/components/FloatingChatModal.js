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
    ws.emit(roomName, { sender: 'user', message: sendingMessage });
    setSendingMessage('');
  };

  const handleFieldChange = (e) => {
    setSendingMessage(e.target.value);
  };

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
          {!ws && (
            <button type="button" onClick={connectWebSocket}>
              聯繫客服
            </button>
          )}
          {!isEmptyMessage &&
            messages.map((msg, index) => {
              const { sender, message } = msg;
              return (
                <>
                  <div key={index} sender={sender}>
                    <div>{message}</div>
                  </div>
                </>
              );
            })}
          {ws && (
            <>
              <input
                type="text"
                value={sendingMessage}
                onChange={handleFieldChange}
              />
              <button
                type="button"
                onClick={() => {
                  sendMessage();
                }}
              >
                傳送
              </button>
            </>
          )}
        </div>
        <div
          className="c-floating-menu__bg"
          onClick={() => {
            setAnimation(true);
            setTimeout(() => {
              setIsExpand(false);
            }, 1000);
          }}
        ></div>
      </div>
    </>
  );
}

export default FloatingChatModal;
