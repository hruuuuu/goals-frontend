import { React, useState, useEffect } from 'react';
import socket from 'socket.io-client';

import { BE_URL } from '../utils/config';

function Chat() {
  const [ws, setWs] = useState();
  const [message, setMessage] = useState('');

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
    // ws.on('personal', (message) => {
    //   console.log(message);
    // });
    ws.on('all', (message) => {
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

  return (
    <>
      <div>
        {/* <input
          type="button"
          value="送出訊息，只有自己收到回傳"
          onClick={() => {
            sendMessage('personal');
          }}
        /> */}
        <input
          type="button"
          value="送出訊息，讓所有人收到回傳"
          onClick={() => {
            sendMessage('all');
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
    </>
  );
}

export default Chat;
