var SquareFactory = function() {

    // 创建一个当前 cur 
    this.makeCur = function() {
        var cur = new Square();
        cur.origin = {
            x: -2,
            y: 3
        }
        return cur;
    }
    
    // 创建一个 next 
    this.makeNext = function() {
        var next = new Square();
        return next;
    }
}