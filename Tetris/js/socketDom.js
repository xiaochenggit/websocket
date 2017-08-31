var SocketDom = function() {
    var local = new Local();
    var screen = document.getElementById('screen');
    var textDom = document.getElementById('sendText');
    var local_name = document.getElementById('local_name');
    var remote_name = document.getElementById('remote_name');

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
    var local_info = document.getElementById('local_info');
    var remote_info = document.getElementById('remote_info');
    local_info.onclick = function(event) {
        var target = event.target;
        if(target.nodeName == 'BUTTON') {
            var mes =  target.innerHTML == '准备';
            socket.emit('setReadyMes', mes);
            target.innerHTML = (target.innerHTML == '准备' ? '已准备' : '准备');
        }
    }
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
        if(gameDivs.length == 0){
            initDiv(gameDiv, gameData, gameDivs);
            initDiv(nextDiv, nextData, nextDivs);
        }
        refreshDiv(gameData, gameDivs);
        refreshDiv(nextData, nextDivs);
    });

    socket.on('getReady', function() {
        var btn = document.createElement('button');
        btn.innerHTML = '准备';
        btn.id = 'ready_btn';
        var info = document.createElement('span');
        info.id = 'remote_ready_info';
        info.innerHTML = '未准备';
        local_info.appendChild(btn);
        remote_info.appendChild(info);
    });

    socket.on('setReadyMes', function(mes) {
        var remote_ready_info = document.getElementById('remote_ready_info');
        remote_ready_info.innerHTML = mes ? '已准备' : '未准备';
    });

    socket.on('gameover', function(){
        var ready_btn = document.getElementById('ready_btn') || '';
        if(ready_btn) {
            var remote_ready_info = document.getElementById('remote_ready_info');
            local_info.removeChild(ready_btn);
            remote_ready_info.innerHTML = '已结束';
        }
        remote_name.innerHTML = '对方';
    });
    socket.on('setUser', function(user) {
        if(user.length == 1) {
            local_name.innerHTML = user[0].name;
        } else {
            local_name.innerHTML = user[1].name;
            remote_name.innerHTML = user[0].name;
        }
    });

    socket.on('setotherUser', function(userName) {
        remote_name.innerHTML = userName;
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