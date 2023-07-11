import { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const Body = ({ messages, status }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <header className={styles.header}>
        <button className={styles.btn} onClick={handleLeave}>
          Покинуть чат
        </button>
      </header>

      <div className={styles.container}>
        {messages.map((data) => {
            if (data.text !== "") {
              return (
                data.username === localStorage.getItem("user") ? (
                  <div className={styles.chats} key={data.timestamp}>
                    <p className={styles.sender_name}>Вы</p>
                    <div className={styles.message_sender}>
                      <p>{data.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.chats}>
                    <p>{data.username}</p>
                    <div className={styles.message_recipient}>
                      <p>{data.text}</p>
                    </div>
                  </div>
                )
              )}
            })
        }

        <div ref={messagesEndRef} />
        <div className={styles.typing_status}>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};

export default Body;
