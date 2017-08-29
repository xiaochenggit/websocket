var Game = function() {
    var squareFactory = new SquareFactory();
    // 方块
    var cur; // 当前方块
    var next; // 下一个方块

    // 定时器相关
    var timer;
    var TIMENUM = 600;

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
        var length = data.length;
        var dataLength = data[0].length;
        for (var i = 0; i < length; i++) {
            var Div = [];
            for(var j = 0; j < dataLength; j++) {
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
        var length = data.length;
        var dataLength = data[0].length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < dataLength; j++) {
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
     * 判断是目标位置是否合法
     * @param {any} pos 
     * @param {any} data 
     * @returns 
     */
    var isValid = function(pos,data) {
        var Length = data.length;
        var dataLength = data[0].length;
        for(var i = 0; i< Length; i++) {
            for(var j = 0; j< dataLength; j++) {
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
           return true
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
                if(check(origin,i,j) && origin.x + i >= 0){
                    gameData[origin.x + i][origin.y + j] = 0;
                }
            }
        }
    }

    // 替换数据 gameData 矩阵中的数据
    var setGameData = function() {
        var origin = cur.origin;
        var Length = cur.data.length;
        var dataLength = cur.data[0].length;
        for (var i = 0; i < Length; i++) {
            for (var j = 0; j < dataLength; j++) {
                if(check(origin,i,j) && origin.x + i >= 0){
                    gameData[origin.x + i][origin.y + j] = cur.data[i][j];
                }
            }
        }
    }

    // 固定 cur 的方法 (当下落到底部之后无法下落固定 cur 并把其数据 改成 next 的数据，next重新赋值一个 square)
    var fixed = function() {
        var origin = cur.origin;
        var Length = cur.data.length;
        var dataLength = cur.data[0].length;
        for (var i = 0; i < Length; i++) {
            for (var j = 0; j < dataLength; j++) {
                if(cur.data[i][j] == 2 && origin.x + i >= 0){
                    gameData[origin.x + i][origin.y + j] = 1;
                }
            }
        }
        clearLines();
        checkGameOver();
        refreshDiv(gameData, gameDivs); 
        setNextToCur();
    }

    // 判断游戏是否结束
    var checkGameOver = function() {
        var isOver = false;
        for(var i = 0; i < gameData[0].length; i++) {
            if(gameData[0][i] == 1) {
                isOver = true;
                break;
            }
        }
        if(isOver) {
            clearInterval(timer);
        }
    }

    // 判断消行 操作，消行完成数组添加新的行
    var clearLines = function() {
        var length = gameData.length;
        var dataLength = gameData[0].length;
        for(var i = length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0 ; j < dataLength; j ++) {
                if(gameData[i][j] != 1) {
                    clear = false;
                }
            }
            if(clear) {
                gameData.splice(i,1);
                i ++;
                var arr =[];
                for (var k = 0 ; k < dataLength; k ++) {
                    arr.push(0);
                }
                gameData.unshift(arr);
            }
        }
    }
    // 把next 赋值给 cur 并改变他的位置 生成新的 cur 然后渲染页面
    var setNextToCur = function() {
        cur = next;
        cur.origin = {
            x: -2,
            y: 3
        };
        next = squareFactory.makeNext();
        setGameData();
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
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
            fixed();
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
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = squareFactory.makeCur();
        next = squareFactory.makeNext();
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        // 设置数据
        setGameData();
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
        // 定时器下落
        timer = setInterval(function() {
            down();
        }, TIMENUM); 
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