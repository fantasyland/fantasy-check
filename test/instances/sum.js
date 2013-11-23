var daggy = require('daggy'),

    Sum = daggy.tagged('x');

Sum.of = Sum;
Sum.empty = Sum.of.bind(null, 0);
Sum.prototype.chain = function(f) {
    return f(this.x);
};
Sum.prototype.concat = function(x) {
    return this.chain(function(a) {
        return x.map(function(b) {
            return a + b;
        });
    });
};
Sum.prototype.map = function(f) {
    return this.chain(function(x) {
        return Sum.of(f(x));
    });
};

if(typeof module != 'undefined')
    module.exports = Sum;
