var app = require('http').createServer();
var io = require('socket.io')(app);
var port = 3000;
app.listen(port);
var count = 1;
io.on('connection', function (socket) {
  // socket.emit 是当前链接事件。 io.emit 是广播事件
  socket.name = 'name' + count++;
  io.emit('enter',socket.name + '进入房间');
  socket.on('message', function (data) {
    io.emit('message', socket.name + '说：' + data);
  });
  // 断开连接事件
  socket.on('disconnect', function (data) {
    io.emit('leave',socket.name + '离开房间');
  });
});

console.log('websocket server start on  localhost://' + port );