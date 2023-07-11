import { useState } from "react";
import styles from "./styles.module.css";

const MessageBlock = ({socket}) => {
  const [message, setMessage] = useState("");

  const isTyping = () => socket.emit("typing", `${localStorage.getItem("user")} is typing...`)

  const handleMessageSend = (e) => {
    e.preventDefault();
    
    let user = localStorage.getItem('user')

    if (user) {
      socket.emit("message", {
        text: message,
        username: user,
        timestamp: Date.now()
      })
    }
    setMessage("");
  };

  return (
    <div className={styles.messageBlock}>
      <form className={styles.formMessageSend} onSubmit={handleMessageSend}>
        <input
          type="text"
          className={styles.userMessage}
          value={message}
          placeholder="Напишите сообщение..."
          onChange={(e) => {setMessage(e.target.value)}}
          onKeyDown={isTyping}
        />
        <button type="submit" className={styles.sendBtn}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default MessageBlock;
