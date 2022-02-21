import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { BE_URL } from '../utils/config';

function FloatingChatModal(props) {
  const { isExpand, setIsExpand } = props;
  const [animation, setAnimation] = useState(false);
  const [socket, setSocket] = useState();
  const [sendingMessage, setSendingMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const roomName = 'memberId';

  const isEmptyMessage = messages.length === 0;

  const connectWebSocket = () => {
    setSocket(io(BE_URL, { withCredentials: true }));
  };

  const initWebSocket = () => {
    /* on: 監聽指定這個頻道 得到從server傳來的訊息 */
    // socket.on('connect', () => {
    //   console.log(socket.id);
    // });
    socket.on(roomName, (message) => {
      setMessages((prev) => [...prev, message]);
      console.log(message);
    });
    socket.emit(`join chat ${roomName}`, { identity: 'memberId' });
  };

  const sendMessage = () => {
    // emit: 指定頻道 傳送訊息給server
    if (sendingMessage !== '') {
      const time = dayjs().format('HH:mm');
      socket.emit(roomName, {
        sender: 'user',
        message: sendingMessage,
        sentAt: time,
      });
      setSendingMessage('');
    }
  };

  const handleFieldChange = (e) => {
    setSendingMessage(e.target.value);
    console.log();
  };

  const handleCloseChat = () => {
    setAnimation(true);
    setTimeout(() => {
      setIsExpand(false);
    }, 1000);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     sendMessage();
  //   }
  // };

  /* 如果有連線到 就把webSocket寫到socket state裡
  是用來配合useEffect+相依性陣列檢查是否有連線成功 */
  useEffect(() => {
    if (socket) {
      try {
        initWebSocket();
        console.log('連線成功');
      } catch (error) {
        console.log(error);
      }
    }
  }, [socket]);

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
              <button
                className="c-chat__close e-btn e-btn--icon d-md-none"
                onClick={handleCloseChat}
              >
                <i className="fas fa-chevron-left e-icon e-icon--light e-icon--medium"></i>
              </button>
            </div>
            <div className="c-chat__content">
              {!socket ? (
                <button
                  type="button"
                  className="e-btn e-btn--primary c-chat__action"
                  onClick={connectWebSocket}
                >
                  開始使用
                </button>
              ) : (
                <div className="c-chat__date">
                  {dayjs().format('YYYY/MM/DD')}
                </div>
              )}
              {!isEmptyMessage &&
                messages.map((msg) => {
                  const { sender, message, sentAt } = msg;
                  return (
                    <div key={uuidv4()} className="c-chat__msg" sender={sender}>
                      {message}
                      <div className="c-chat__time">{sentAt}</div>
                    </div>
                  );
                })}
            </div>
            {socket && (
              <>
                <div className="c-chat__footer">
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <input
                      type="text"
                      className="form-control c-form__input"
                      placeholder="請輸入..."
                      value={sendingMessage}
                      onChange={handleFieldChange}
                    />
                    <button
                      type="button"
                      className="e-btn e-btn--icon c-chat__btn"
                      onClick={sendMessage}
                    >
                      <i className="fas fa-paper-plane e-icon e-icon--primary e-icon--medium"></i>
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
              handleCloseChat();
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
