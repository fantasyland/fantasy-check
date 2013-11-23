var λ = require('../../src/adapters/nodeunit'),
    monad = require('../../src/laws/monad'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,

    Identity = require('fantasy-identities');

exports.laws = {
    'All (Monad)': monad.laws(λ)(Identity, identity),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Identity, identity),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Identity, identity),
    'Associativity (Monad)': monad.associativity(λ)(Identity, identity)
};
