var ws = require("nodejs-websocket")
var port = 3000;
var count = 1;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	conn.name = 'name' + count ++;
	// mes 添加消息的类型 和 内容
	var mes = {};
	mes.data = conn.name + "进入房间";
	mes.type = 'enter';
	RoomReact(JSON.stringify(mes));
	conn.on("text", function (str) {
		console.log("Received " + str);
		var mes = {};
		// 谁说的话
		mes.data = conn.name + '说:' + str;
		mes.type = 'message';
		RoomReact(JSON.stringify(mes));
		// conn.sendText(str);
	})
	conn.on("close", function (code, reason) {
		var mes = {};
		mes.data = conn.name + "离开房间";
		mes.type = 'leave';
		RoomReact(JSON.stringify(mes));
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