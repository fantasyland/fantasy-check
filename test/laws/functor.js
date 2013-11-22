var λ = require('../../src/adapters/nodeunit'),
    functor = require('../../src/laws/functor'),
    combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    identity = combinators.identity,

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

exports.laws = {
    'All (Functor)': functor.laws(λ)(Id.of, identity),
    'Identity (Functor)': functor.identity(λ)(Id.of, identity),
    'Composition (Functor)': functor.composition(λ)(Id.of, identity)
};
