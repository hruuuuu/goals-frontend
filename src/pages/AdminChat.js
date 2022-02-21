import { React, useState, useEffect } from 'react';
import socket from 'socket.io-client';

import { BE_URL } from '../utils/config';

function AdminChat() {
  const [ws, setWs] = useState();
  const [message, setMessage] = useState('');
  const roomName = 'id';

  const initWebSocket = () => {
    // on: 監聽指定這個頻道 得到從server傳來的訊息
    ws.on(roomName, (message) => {
      console.log(message);
    });
    ws.on('broadcast', (message) => {
      console.log(message);
    });
  };

  const sendMessage = (channel) => {
    // emit: 指定頻道 傳送訊息給server
    ws.emit(channel, `來自${channel}的訊息`);
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
            type="button"
            value="送出訊息，讓所有人收到回傳"
            onClick={() => {
              sendMessage(roomName);
            }}
          />
          <input
            type="button"
            value="送出訊息，除了自己外所有人收到回傳"
            onClick={() => {
              sendMessage('broadcast');
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AdminChat;
