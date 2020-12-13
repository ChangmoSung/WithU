const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

connectDB();

app.use(express.json({ extended: false }));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/lights", require("./routes/lights"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let users = [];

io.on("connection", (socket) => {
  users = users.push(socket.id);
  socket.emit("userSignedIn", users, socket.id);

  socket.on("userSignedOut", (userId) => {
    users = users.filter((user) => user !== userId);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
