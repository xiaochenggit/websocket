var SocketDom = function() {
    var local = new Local();
    var screen = document.getElementById('screen');
    var textDom = document.getElementById('sendText');

    var game = new Game();
    var initDiv = game.initDiv;
    var refreshDiv = game.refreshDiv;
    // divs
    var nextDivs = [];
    var gameDivs = [];

    var gameDiv = document.getElementById('remote_game');
    var nextDiv = document.getElementById('remote_next');
    var timeDiv = document.getElementById('remote_time');
    var scoreDiv = document.getElementById('remote_score');

    document.getElementById('sendBtn').onclick = function() {
        var text = textDom.value;
        if(text.trim()) {
            // 发送消息
            socket.emit('message', text);
            textDom.value = '';
            textDom.focus();            
        }
    }
    // 监听不同的消息
    socket.on('enter',function(data){
        createMessage(data, 'enter');
    });
    socket.on('message',function(data){
        createMessage(data, 'message');
    });
    socket.on('leave',function(data){
        createMessage(data, 'leave');
    });
    socket.on('gameStart', function() {
        local.start(socket);
    });
    socket.on('gameDes',function(gameData, nextData, gameTime, score){   
        refreshDiv(gameData, gameDivs);
        refreshDiv(nextData, nextDivs);
        timeDiv.innerHTML = gameTime.toFixed(1);
        scoreDiv.innerHTML = score;
    });

    socket.on('init',function(gameData, nextData){
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, nextData, nextDivs);
        refreshDiv(gameData, gameDivs);
        refreshDiv(nextData, nextDivs);
    });

    socket.on('close', function() {
        window.close();
    });
    // 根据不同类型 创建dom消息
    function createMessage (mes, type) {
        var message = document.createElement('div');
        if(type == 'enter') {
            message.style.color = 'blue';
        } else if(type == 'leave') {
            message.style.color = 'red';
        }
        message.innerHTML = mes;
        screen.appendChild(message);
    }
}