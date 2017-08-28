var Square = function() {

    // 方块数据
    this.data = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ];
    
    // 原点
    this.origin = {
        x: 0,
        y: 0
    };

};
Square.prototype.canDown = function(isVlid) {
    var text = {};
    text.x = this.origin.x + 1;
    text.y = this.origin.y;
    return isVlid(text,this.data);
}
Square.prototype.down = function() {
    this.origin.x +=1;
}