var Square = function() {
    var randomNum = function(length) {
        return Math.floor(Math.random() * length);
    }
    // 方块数据
    this.dataArray = [
        // ---- 横条
        [
            [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [2, 2, 2, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ],
        // 田字形
        [
            [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ],
        // Z 
        [
            [
                [2, 2, 0, 0],
                [0, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ],
        // 反Z 
        [
            [
                [0, 2, 2, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0]
            ]
        ],
        // 类似 十
        [
            [
                [0, 2, 0, 0],
                [2, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 2, 0, 0],
                [0, 2, 2, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [2, 2, 2, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0]
            ]
        ],
        // L
        [
            [
                [2, 2, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [2, 0, 0, 0],
                [2, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ],
        // 反L
        [
            [
                [2, 2, 2, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 2, 0],
                [2, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0]
            ]
        ]
    ];
    this.type = randomNum(this.dataArray.length);
    this.index = randomNum(this.dataArray[this.type].length);
    this.data = this.dataArray[this.type][this.index];
    // 原点
    this.origin = {
        x: 0,
        y: 0
    };

};

// Down
Square.prototype.canDown = function(isVlid) {
    var text = {};
    text.x = this.origin.x + 1;
    text.y = this.origin.y;
    return isVlid(text,this.data);
}
Square.prototype.down = function() {
    this.origin.x +=1;
}

// left
Square.prototype.canLeft = function(isVlid) {
    var text = {};
    text.x = this.origin.x;
    text.y = this.origin.y - 1;
    return isVlid(text,this.data);
}
Square.prototype.left = function() {
    this.origin.y -=1;
}

// right
Square.prototype.canRight = function(isVlid) {
    var text = {};
    text.x = this.origin.x;
    text.y = this.origin.y + 1;
    return isVlid(text,this.data);
}
Square.prototype.right = function() {
    this.origin.y +=1;
}

// rotate 改变 data 数据

Square.prototype.canRotate = function(isVlid) {
    var index = this.index + 1;
    if(index >= this.dataArray[this.type].length) {
        index = 0;
    }
    var data = this.dataArray[this.type][index];
    return isVlid(this.origin, data);
}
Square.prototype.rotate = function() {
    this.index += 1;
    if(this.index >= this.dataArray[this.type].length) {
        this.index = 0;
    }
    this.data = this.dataArray[this.type][this.index];
}