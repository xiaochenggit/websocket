var Local = function() {
    // 游戏对象
    var game;
    
    // start 
    var start = function() {
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        };
        game = new Game();
        game.init(doms);
    }

    // 导出
    this.start = start;
}