import { React, useState, useEffect } from 'react';
import socket from 'socket.io-client';

import { BE_URL } from '../utils/config';

function Chat() {
  const [ws, setWs] = useState();
  const [message, setMessage] = useState('');
  const roomName = 'id';

  /* 如果有連線到 就把webSocket寫到ws state裡
  是用來配合useEffect+相依性陣列檢查是否有連線成功 */
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

  const initWebSocket = () => {
    // on: 監聽指定這個頻道 得到從server傳來的訊息
    ws.on(roomName, (message) => {
      console.log(message);
    });
  };

  const sendMessage = () => {
    // emit: 指定頻道 傳送訊息給server
    ws.emit(roomName, `來自客人的訊息`);
  };

  return (
    <>
      <div>
        <input
          type="button"
          value="送出訊息，讓所有人收到回傳"
          onClick={() => {
            sendMessage();
          }}
        />
      </div>
    </>
  );
}

export default Chat;
