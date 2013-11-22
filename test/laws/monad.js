var λ = require('../../src/adapters/nodeunit'),
    monad = require('../../src/laws/monad'),
    daggy = require('daggy'),

    Id = daggy.tagged('x');

Id.of = Id;
Id.prototype.chain = function(f) {
    return f(this.x);
};

exports.laws = {
    'All (Monad)': monad.laws(λ)(Id),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Id),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Id),
    'Associativity (Monad)': monad.associativity(λ)(Id)
};
