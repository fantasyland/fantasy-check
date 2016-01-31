'use strict';

const {tagged} = require('daggy');
const Product = tagged('x');

Product.of = Product;
Product.empty = () => Product(1);
Product.prototype.chain = function(f) {
    return f(this.x);
};
Product.prototype.concat = function(x) {
    return this.chain(a => x.map(b => a * b));
};
Product.prototype.map = function(f) {
    return this.chain(x => Product.of(f(x)));
};

module.exports = Product;
