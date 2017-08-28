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
    /**
     * 判断是否可以下移
     * @param {any} pos cur + 1之后的坐标
     * @param {any} data 
     * @returns 
     */
    var isValid = function(pos,data) {
        for(var i = 0; i< data.length; i++) {
            for(var j = 0; j< data[0].length; j++) {
                if(data[i][j] != 0) {
                    if(!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * 判断位置是否合法 
     * @param {Object} pos cur坐标
     * @param {any} x 
     * @param {any} y 
     * @returns 
     */
    var check = function(pos, x, y) {
       if (pos.x + x < 0) {
           return false
       } else if (pos.x + x >= gameData.length) {
           return false;
       } else if (pos.y + y < 0) {
           return false
       } else if (pos.y + y >= gameData[0].length) {
           return false;
       } else if (gameData[pos.x + x][pos.y + y] == 1) { // 已经有块了
           return false
       } else {
           return true;
       }
    }

    // 清空 cur 在 gameDate 中的数据
    var clearGameData = function() {
        var origin = cur.origin;
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if(check(origin,i,j)){
                    gameData[origin.x + i][origin.y + j] = 0;
                }
            }
        }
    }

    // 替换数据 gameData 矩阵中的数据
    var setGameData = function() {
        var origin = cur.origin;
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if(check(origin,i,j)){
                    gameData[origin.x + i][origin.y + j] = cur.data[i][j];
                }
            }
        }
    }

    // 下移方法
    var down = function() {
        if(cur.canDown(isValid)) {
            clearGameData();
            cur.down();
            setGameData();
            refreshDiv(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    }

    // 左移方法
    var left = function() {
        if(cur.canLeft(isValid)) {
            clearGameData();
            cur.left();
            setGameData();
            refreshDiv(gameData, gameDivs);
        }
    }

    // 右移方法
    var right = function() {
        if(cur.canRight(isValid)) {
            clearGameData();
            cur.right();
            setGameData();
            refreshDiv(gameData, gameDivs);
        }
    }

    // 旋转方法
    var rotate = function() {
        if(cur.canRotate(isValid)) {
            clearGameData();
            cur.rotate();
            setGameData();
            refreshDiv(gameData, gameDivs);
        }
    }

    /**
     * 初始化
     * @param {Object} doms dom元素 
     */
    var init = function(doms) {
        var squareFactory = new SquareFactory();
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = squareFactory.make();
        next = new Square();
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        // 设置数据
        setGameData();
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    
    // 导出 api 

    this.init = init;
    this.down = down;
    this.right = right;
    this.left = left;
    this.rotate = rotate;

    // 下落
    this.fall = function(){
        while (down()) {
        }
    }
}