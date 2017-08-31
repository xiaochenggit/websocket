window.onload = function() {
    // local.start();
    var game = new Game();
    socket.on('csetUserName', function() {
        game.startSocket();
    });
    socket.on('close', function() {
        alert('房间已满');
    });
}