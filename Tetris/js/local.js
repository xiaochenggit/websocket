var Local = function() {
    // 游戏对象
    var game;
    // 键盘绑定事件
    var bindKeyEvent = function() {
        document.onkeydown = function(e) {
            if(game.isOver) {
                return false;
            }
            var keyCode = e.keyCode;
            if(keyCode == 38) { // up
                e.preventDefault();
                game.rotate();
            } else if (keyCode == 39) { // right
                e.preventDefault();
                game.right();
            } else if (keyCode == 40) { // down
                e.preventDefault();
                game.down();
            } else if (keyCode == 37) { // left 
                e.preventDefault();
                game.left();
            } else if (keyCode == 32) { // space
                e.preventDefault();
                game.fall();
            }
        }
    }

    // start 
    var start = function() {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            panelDiv: document.getElementById('local_panel')
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
    }

    // 导出
    this.start = start;
}