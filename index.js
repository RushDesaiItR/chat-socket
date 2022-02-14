const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors:{
    origin:"*"
  }
});
const port = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getRoomUsers } = require("./entity");


io.on('connect',(socket) => {
  

  socket.on('join',({user,room},callback) => {
    console.log(user,room)
      const {response , error} = addUser({id: socket.id , user:user, room: room})

      console.log(response)

      if(error) {
        callback(error)
        return;
      }
      socket.join(response.room);
      socket.emit('message', { user: 'admin' , text: `Welcome ${response.user} ` });
      socket.broadcast.to(response.room).emit('message', { user: 'admin', text : `${response.user} has joined` })

      io.to(response.room).emit('roomMembers', getRoomUsers(response.room))
  })

  socket.on('sendMessage',(message,callback) => {
    
      const user = getUser(socket.id)

      io.to(user.room).emit('message',{ user: user.user, text : message })

      callback()
  })


 

  socket.on('disconnect',() => {
    console.log("User disconnected");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message',{ user: 'admin', text : `${user.user} has left` })
    }
  })

  


  
})


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// End point

// Socket






//app.listen(8000,() => console.log('Server started on 8000'))