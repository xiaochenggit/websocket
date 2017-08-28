var Local = function() {
    // 游戏对象
    var game;
    
    // 键盘绑定事件
    var bindKeyEvent = function() {
        document.onkeydown = function(e) {
            e.preventDefault();
            var keyCode = e.keyCode;
            if(keyCode == 38) { // up

            } else if (keyCode == 39) { // right
                game.right();
            } else if (keyCode == 40) { // down
                game.down();
            } else if (keyCode == 37) { // left 
                game.left();
            } else if (keyCode == 32) { // space

            }
        }
    }

    // start 
    var start = function() {
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
    }

    // 导出
    this.start = start;
}