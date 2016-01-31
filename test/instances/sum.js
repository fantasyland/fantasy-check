'use strict';

const {tagged} = require('daggy'),
const Sum = tagged('x');

Sum.of = Sum;
Sum.empty = () => Sum(0);
Sum.prototype.chain = function(f) {
    return f(this.x);
};
Sum.prototype.concat = function(x) {
    return this.chain(a => x.map(b => a + b));
};
Sum.prototype.map = function(f) {
    return this.chain(x => Sum.of(f(x)));
};

module.exports = Sum;
