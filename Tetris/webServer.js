var app = require('http').createServer();
var io = require('socket.io')(app);
var port = 3000;
app.listen(port);

// 链接数量 io.eio.clientsCount
// 所有房间 socket.adapter.rooms 
// 所有链接 socket.nsp.connected 
var users = [];
io.on('connection', function (socket) {
  // socket.emit 是当前链接事件。 io.emit 是广播事件
  // socket.broadcast.emit('enter',socket.name + '进入房间');
  console.log(io.eio.clientsCount);
  if(io.eio.clientsCount > 2) {
    socket.emit('close');
  } else {
    socket.emit('csetUserName');
  }
  // 发送消息
  socket.on('message', function (data) {
    io.emit('message', socket.name + '说：' + data);
  });

  // 设置名字
  socket.on('setUserName', function(userName , callback) {
    if( users.indexOf(userName) != -1) {
        callback(userName);
    } else {
        users.push(userName);
        socket.name = userName;
        socket.broadcast.emit('enter', userName + '进入房间');
        if(io.eio.clientsCount == 1) {
          socket.emit('message', '请等待另一个玩家进入！');
        } else if(io.eio.clientsCount == 2) {
          io.emit('message','即将开始游戏！');
          io.emit('gameStart');
        }
    }
  });

  // 断开连接事件
  socket.on('disconnect', function (data) {
    users.splice(users.indexOf(socket.name), 1);
    socket.broadcast.emit('leave', (socket.name ? socket.name : '匿名') + '离开房间');
  });

  // 发送当前模块的信息
  socket.on('init', function (gameData, nextData) {
    socket.broadcast.emit('init', gameData, nextData);
  });
  socket.on('gameDes', function (gameData, nextData, gameTime, score) {
    socket.broadcast.emit('gameDes', gameData, nextData, gameTime, score);
  });
});

console.log('websocket server start on  localhost://' + port );