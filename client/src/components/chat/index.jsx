import { useState, useEffect } from "react";
import Body from "./components/body/body";
import MessageBlock from "./components/messageBlock/message-block";
import styles from "./styles.module.css";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on('new_message', (data) => setMessages([...messages, data]))
  }, [socket, messages]);

  useEffect(() => {
    socket.on('new_typing', (data) => {
      setStatus(data)
      setTimeout(() => setStatus(''), 1000)
    })
  }, [socket])

  return (
    <div className={styles.chat}>
      <main className={styles.main}>
        <Body messages={messages} status={status} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};

export default ChatPage;
