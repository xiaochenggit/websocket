var SquareFactory = function() {
    this.makeCur = function() {
        var cur = new Square();
        cur.origin = {
            x: -2,
            y: 3
        }
        return cur;
    }
    this.makeNext = function() {
        var next = new Square();
        return next;
    }
}