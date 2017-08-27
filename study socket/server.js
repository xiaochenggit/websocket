var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function (socket) {
  // 发送事件 （事件名称、参数）
  socket.emit('news', { hello: 'world' });
  // 接收事件 （事件名称，回调函数）
  socket.on('my other event', function (data) {
    console.log(data);
  });
});