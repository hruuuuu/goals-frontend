import { React, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { BE_URL } from '../utils/config';
import { useAdmin } from '../context/admin';

import Header from '../components/Header';
import ChatView from '../components/Admin/ChatView';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../context/LoginStatus';

function AdminChat() {
  const { admin } = useLogin();
  const { adminOnline, setAdminOnline } = useAdmin();
  const [socket, setSocket] = useState();
  const [clientList, setClientList] = useState([]);
  const [sendingMessage, setSendingMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentClient, setCurrentClient] = useState({
    onlineNo: -1,
    chatId: '',
  });
  const [connection, setConnection] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  const isEmptyCurrent = currentClient.chatId === '';
  const isEmptyClient = clientList.length === 0;

  /* 連線到socket.io */
  const connectWebSocket = () => {
    setSocket(io(BE_URL, { withCredentials: true }));
  };

  const initWebSocket = () => {
    /* on: 監聽指定這個頻道 得到從server傳來的訊息 */
    socket.on('connect', () => {
      socket.on('connectedClient', (data) => {
        // console.log(data);
        const newClientList = (prev) => [
          ...prev,
          {
            ...data,
            read: false,
          },
        ];
        setClientList(newClientList);
        setConnection((prev) => [...prev, { ...data, action: 'joined' }]); // {chatId, onlineNo, time, action}
      });
      socket.on('disconnectedClient', (data) => {
        setClientList((prev) => {
          const remainclient = prev.filter(
            (item) => item.chatId !== data.chatId
          );
          return remainclient;
        });
        setConnection((prev) => [...prev, { ...data, action: 'left' }]); // {chatId, onlineNo, time, action}
      });
      socket.on('receivedClientMsg', (data) => {
        // console.log(data);
        setMessages((prev) => [...prev, data]);
      });
      socket.on('receivedAdminMsg', (data) => {
        // console.log(data);
        setMessages((prev) => [...prev, data]);
      });
    });
  };

  const sendMessage = () => {
    // emit: 指定頻道 傳送訊息給server
    if (sendingMessage !== '') {
      const time = dayjs().format('HH:mm');
      const data = {
        from: 'admin',
        to: currentClient.chatId,
        chatId: 'admin',
        content: sendingMessage,
        sentAt: time,
      };
      socket.emit('adminMsg', data);
      setSendingMessage('');
    }
  };

  const handleCurrentClient = (e) => {
    setCurrentClient({
      chatId: e.target.attributes.chatid.value,
      onlineNo: e.target.attributes.no.value,
    });
    setActiveTab(e.target.attributes.chatid.value);
    const findClientIndex = clientList.findIndex(
      (client) => client.chatId === e.target.attributes.chatid.value
    );
    setClientList((prev) => {
      prev.forEach((item, i) => {
        if (i === findClientIndex) {
          item['read'] = true;
        }
      });
      return prev;
    });
  };

  useEffect(() => {
    if (socket) {
      try {
        initWebSocket();
        // console.log('連線成功');
      } catch (error) {
        console.log(error);
      }
    }
  }, [socket]);

  useEffect(() => {
    if (!admin) {
      return <Navigate to="/" />;
    }
  }, [admin]);

  return (
    <>
      <div className="l-admin-chat c-chat c-chat--admin">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <aside className="l-admin-chat__sidebar">
                <button
                  type="button"
                  className={`l-admin-chat__tab l-admin-chat__tab--default ${
                    adminOnline && socket ? 'active' : ''
                  }`}
                  onClick={() => {
                    connectWebSocket();
                    setAdminOnline(true);
                  }}
                >
                  {adminOnline && socket ? '客服已上線' : '開始連線'}
                </button>
                {clientList.map((client) => {
                  const { chatId, onlineNo, read } = client;
                  return (
                    <button
                      key={uuidv4()}
                      type="button"
                      className={`l-admin-chat__tab ${
                        activeTab === client.chatId ? 'active' : ''
                      }`}
                      onClick={handleCurrentClient}
                      chatid={chatId}
                      no={onlineNo}
                    >
                      {chatId}
                      {!read && <div className="l-admin-chat__read-hint"></div>}
                    </button>
                  );
                })}
              </aside>
            </div>
            <div className="col-6">
              <main className="l-admin-chat__dialog">
                {!isEmptyCurrent && !isEmptyClient && (
                  <ChatView
                    currentClient={currentClient}
                    messages={messages}
                    sendingMessage={sendingMessage}
                    setSendingMessage={setSendingMessage}
                    sendMessage={sendMessage}
                  />
                )}
              </main>
            </div>
            <div className="col-3">
              <aside className="l-admin-chat__sidebar">
                {connection.map((client) => {
                  const { chatId, time, action } = client;
                  const actionStr = action === 'joined' ? '已連線' : '已離線';
                  return (
                    <div key={uuidv4()} className="l-admin-chat__hint">
                      {time}
                      <br />
                      {chatId} {actionStr}
                    </div>
                  );
                })}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminChat;
