var express = require('express')
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 3000
io.on("connection",socket=>{
    console.log("User Connected")
})
app.listen(port, ()=> console.log(`http://localhost/${port}`))git