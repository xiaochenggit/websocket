var ws = require("nodejs-websocket")
var port = 3000;
var count = 1;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	var clentName = 'name' + count ++;
	RoomReact(clentName + "进入房间")
	conn.on("text", function (str) {
		console.log("Received " + str);
		RoomReact(str);
		// conn.sendText(str);
	})
	conn.on("close", function (code, reason) {
		console.log(clentName + "离开房间")
		RoomReact(clentName + "离开房间")
    })
    conn.on("error", function (err) {
        console.log("error");
        console.log(err);
	})
	
}).listen(port);
// 添加一个全部的广播事件 , 所有的链接都可以收到这个消息
function RoomReact(str) {
	server.connections.forEach(function(connection) {
		connection.sendText(str);
	});
}
console.log('websocket server start on  localhost://' + port );