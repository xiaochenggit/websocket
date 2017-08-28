var Game = function() {

    // 方块
    var cur; // 当前方块
    var next; // 下一个方块

    // dom 元素
    var gameDiv;
    var nextDiv;

    // 游戏矩阵
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    
    // divs
    var nextDivs = [];
    var gameDivs = [];

    /**
     * 初始化div
     * @param {Dom} container 包裹元素的 dom 对象
     * @param {any} data 初始化的矩阵
     * @param {any} divs 初始化 divs 数组 
     */
    var initDiv = function(container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var Div = [];
            for(var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = i * 20 + 'px';
                newNode.style.left = j * 20 + 'px';
                Div.push(newNode);
                container.appendChild(newNode);
            }
            divs.push(Div);
        }
    };

    /**
     * 刷新divs
     * @param {any} data 刷新根据的矩阵
     * @param {any} divs 刷新divs数组
     */
    var refreshDiv = function(data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done';
                } else if (data[i][j] == 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    };

    // 初始化
    var init = function(doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new Square();
        next = new Square();
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);

        // 手动设置 当前块的位置
        var origin = cur.origin = {
            x: 10,
            y: 5
        }

        // 替换数据 gameData 矩阵中的数据
        
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                gameData[origin.x + i][origin.y + j] = cur.data[i][j];
            }
        }
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }

    // 导出 api 

    this.init = init;
}