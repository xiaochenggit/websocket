window.onload = function() {
    // local.start();
    var game = new Game();
    socket.on('csetUserName', function() {
        game.startSocket();
    });
}