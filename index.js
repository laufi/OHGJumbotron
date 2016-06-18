var express = require('express'); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/debug', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/client', express.static(__dirname + '/client'));
app.use('/remote', express.static(__dirname + '/remote'));
app.use('/data', express.static(__dirname + '/data'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3333, function(){
  console.log('listening on *:3333');
});