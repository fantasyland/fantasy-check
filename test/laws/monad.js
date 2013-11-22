var λ = require('../../src/adapters/nodeunit'),
    monad = require('../../src/laws/monad'),
    combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    identity = combinators.identity,

    Id = daggy.tagged('x');

Id.of = Id;
Id.prototype.chain = function(f) {
    return f(this.x);
};

exports.laws = {
    'All (Monad)': monad.laws(λ)(Id, identity),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Id, identity),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Id, identity),
    'Associativity (Monad)': monad.associativity(λ)(Id, identity)
};
