var SquareFactory = function() {
    this.make = function() {
        var cur = new Square();
        cur.origin = {
            x: 0,
            y: 3
        }
        return cur;
    }
}