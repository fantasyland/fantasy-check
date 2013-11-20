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
    'Identity (Functor)': functor.identity(λ)(Id.of)
};

exports.law2 = {
    'Composition (Functor)': functor.composition(λ)(Id.of)
};
