import { React, useState, useEffect } from 'react';
import socket from 'socket.io-client';

import { BE_URL } from '../utils/config';

function AdminChat() {
  const [ws, setWs] = useState();
  const [sendingMessage, setSendingMessage] = useState('');
  const roomName = 'id';

  const initWebSocket = () => {
    /* on: 監聽指定這個頻道 得到從server傳來的訊息 */
    // ws.on('connect', () => {
    //   console.log(ws.id);
    // });
    ws.on(roomName, (message) => {
      console.log(message);
    });
  };

  const sendMessage = () => {
    // emit: 指定頻道 傳送訊息給server
    ws.emit(roomName, { sender: 'admin', message: sendingMessage });
    setSendingMessage('');
  };

  const handleFieldChange = (e) => {
    setSendingMessage(e.target.value);
  };

  useEffect(() => {
    setWs(socket(BE_URL, { withCredentials: true }));
  }, []);

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
