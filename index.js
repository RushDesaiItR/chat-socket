const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors:{
    origin:"*"
  }
});
const port = process.env.PORT || 5000;


io.on('connection', (socket) => {
  console.log("socket connected sucessfully")
  socket.on('chat', msg => {
    console.log(msg)
    io.emit('chat', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
