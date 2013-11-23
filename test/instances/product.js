var daggy = require('daggy'),

    Product = daggy.tagged('x');

Product.of = Product;
Product.empty = Product.of.bind(null, 1);
Product.prototype.chain = function(f) {
    return f(this.x);
};
Product.prototype.concat = function(x) {
    return this.chain(function(a) {
        return x.map(function(b) {
            return a * b;
        });
    });
};
Product.prototype.map = function(f) {
    return this.chain(function(x) {
        return Product.of(f(x));
    });
};

if(typeof module != 'undefined')
    module.exports = Product;
