/* 
server side 
    send event to client - io
        to send every client io.emit
        to send one client io.to(socketID).emit
    take event from client
        socket.on
client side
    send event to server
        socket.emit
    take event from server
        socket.on

*/

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send msg get msg
  socket.on("sendMsg", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMsg", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user has been disconnected");
    removeUser(socket.id);
  });
});
