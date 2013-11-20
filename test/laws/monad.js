var λ = require('../../src/adapters/nodeunit'),
    monad = require('../../src/laws/monad'),
    daggy = require('daggy'),

    Id = daggy.tagged('x');

Id.of = Id;
Id.prototype.chain = function(f) {
    return f(this.x);
};

exports.law1 = {
    'Left Identity (Monad)': monad.leftIdentity(λ)(Id)
};

exports.law2 = {
    'Right Identity (Monad)': monad.rightIdentity(λ)(Id)
};

exports.law3 = {
    'Associativity (Monad)': monad.associativity(λ)(Id)
};
