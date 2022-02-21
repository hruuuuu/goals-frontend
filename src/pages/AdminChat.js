import { React, useState, useEffect } from 'react';
import io from 'socket.io-client';
import dayjs from 'dayjs';

import { BE_URL } from '../utils/config';

function AdminChat() {
  const [socket, setSocket] = useState();
  const [sendingMessage, setSendingMessage] = useState('');
  const roomName = 'memberId';

  const initWebSocket = () => {
    /* on: 監聽指定這個頻道 得到從server傳來的訊息 */
    // socket.on('connect', () => {
    //   console.log(socket.id);
    // });
    socket.on(roomName, (message) => {
      console.log(message);
    });
    socket.emit(`join chat ${roomName}`, { identity: 'admin' });
  };

  const sendMessage = () => {
    // emit: 指定頻道 傳送訊息給server
    const time = dayjs().format('HH:mm');
    socket.emit(roomName, {
      sender: 'admin',
      message: sendingMessage,
      sentAt: time,
    });
    setSendingMessage('');
  };

  const handleFieldChange = (e) => {
    setSendingMessage(e.target.value);
  };

  useEffect(() => {
    setSocket(io(BE_URL, { withCredentials: true }));
  }, []);

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
      <div className="l-admin-chat">
        <div className="container">
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
        </div>
      </div>
    </>
  );
}

export default AdminChat;
