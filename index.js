require("dotenv").config()
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require("path")
const sockets=require("./src/sockets.js")

//db
require("./db/db-init.js")

//cada usuario que se conecte:
io.on('connection', sockets);


app.use("/",express.static(path.join(__dirname,"public")))



http.listen(3000, () => {
  console.log('listening on *:3000');
});