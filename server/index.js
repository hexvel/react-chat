const express = require("express");
const app = express();
const PORT = 5000;

const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    // если захотите чтобы к вам могли подключаться остальные - оставьте там "*" вместо адреса)
    origin: "http://localhost:5173",
  },
});

app.get("api", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

const users = []

socketIO.on("connection", (socket) => {
  console.log("Подключение к сокету с индентификатором", socket.id)
  
  socket.on("message", (data) => {
    socketIO.emit("new_message", data);
  })

  socket.on("typing", (data) => {
    socket.broadcast.emit("new_typing", data);
  })

  socket.on("disconnect", () => {
    console.log(
      "Подключение к сокету с индентификатором",
      socket.id,
      "отключено"
    )
  })
})

http.listen(PORT, () => {
  console.log(`Сервер с портом ${PORT} запущен!`);
});
