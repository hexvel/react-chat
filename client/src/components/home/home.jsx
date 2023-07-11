import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", user);
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Войти в чат</h2>
      <label htmlFor="user"></label>
      <input
        className={styles.userInput}
        type="text"
        id="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button type="submit" className={styles.joinBtn}>
        Войти
      </button>
    </form>
  );
};

export default Home;
