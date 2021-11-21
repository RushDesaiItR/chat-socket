var express = require('express')
require('dotenv').config()
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3800;
io.on("connection",socket=>{
    console.log("User Connected")
})
app.listen(port, ()=> console.log(`http://localhost/${port}`))