var λ = require('../../src/adapters/nodeunit'),
    functor = require('../../src/laws/functor'),
    daggy = require('daggy'),

    Id = daggy.tagged('x');

Id.of = Id;
Id.prototype.chain = function(f) {
    return f(this.x);
};
Id.prototype.map = function(f) {
    return this.chain(function(a) {
        return Id.of(f(a));
    });
};

exports.law1 = {
    'when mapping identity over a functor value, should return original functor value': functor.law1(λ)(Id.of)
};

exports.law2 = {
    'when composing two functions and then mapping the result function over a functor should be same as mapping one function over the functor and then mapping the other one': functor.law2(λ)(Id.of)
};
