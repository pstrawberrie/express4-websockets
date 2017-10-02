const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static('client'))

// Socket Listener
io.on('connection', function(socket){

  //-new connection
  console.log('a user connected');

  //-colorz
  socket.on('goBlack', function(){
    io.emit('goBlack');
    console.log('WE GOIN BLACK');
  });
  socket.on('goWhite', function(){
    io.emit('goWhite');
    console.log('WE GOIN BACK');
  });

  //-on chat message
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  //-on disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

// Start Server
http.listen(3069, function(){
  console.log('listening on localhost:3069');
});
